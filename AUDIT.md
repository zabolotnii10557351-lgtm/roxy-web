# RoxStreamAI Web/App Audit (Feb 1, 2026)

This file tracks the current state of the marketing site, the authenticated app (`/app`), and the admin console (`/admin`).

## Shipped fixes (high impact)

- Multi-tenant safety: character creation now assigns `workspace_id`, and Character Builder read/write is scoped by `workspace_id`.
- `/app/characters` is now backed by Supabase (workspace-scoped), with loading/error/empty states.
- `/app` Overview no longer shows misleading “fake” stats; it shows truthful plan/usage and workspace character count.

## Preview modules made honest (no fake data)

These routes remain “preview”, but the UI no longer claims real connections/URLs/assets:

- `/app/stream-connectors`
- `/app/deploy`
- `/app/scripts`
- `/app/dono-engine`
- `/app/avatar-scene`

## Remaining placeholders (still ok, but should be next)

- `/app/character-editor` (explicit placeholder + Polyphoria copy)
- `/app/local-runtime`, `/app/desktop`, `/app/diagnostics` (coming-soon style)
- `/app/unreal/*` (guide placeholders)

## i18n consistency

- Marketing pages are localized (EN/RU) and CMS-driven pages have locale-aware fallback copy.
- App/Admin still contain many hardcoded EN strings inside preview modules; recommended next step is to centralize these strings in `src/i18n/translations.ts` (EN/RU) and replace inline literals.

## Next recommended work

1. Audit `/admin` screens for EN-only strings + empty states; localize and ensure “no data” is friendly.
2. Confirm all workspace-bound queries are scoped by `workspace_id` across app features as they get implemented.
3. Convert remaining preview pages to either:
   - real data (if the backend exists), or
   - clearly labeled preview flows (if backend is not ready).
