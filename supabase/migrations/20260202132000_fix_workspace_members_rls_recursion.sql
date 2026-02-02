-- Fix Postgres RLS infinite recursion on workspace_members.
--
-- The original policies used subqueries against workspace_members inside
-- workspace_members/workspaces policies, which triggers recursive policy eval:
--   code: 42P17 "infinite recursion detected in policy"
-- This breaks PostgREST requests as 500s.

-- A SECURITY DEFINER function owned by the table owner can read workspace_members
-- without RLS, allowing policies to use it safely.
create or replace function public.is_workspace_member(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
  );
$$;

revoke all on function public.is_workspace_member(uuid) from public;
grant execute on function public.is_workspace_member(uuid) to authenticated;

-- Workspaces: select only where user is a member (no recursion)
drop policy if exists "members can view workspaces" on public.workspaces;
create policy "members can view workspaces"
  on public.workspaces
  for select
  using (public.is_workspace_member(id));

-- Workspace members: allow viewing all members within workspaces the user is in
-- (no recursion)
drop policy if exists "members can view workspace members" on public.workspace_members;
create policy "members can view workspace members"
  on public.workspace_members
  for select
  using (public.is_workspace_member(workspace_id));
