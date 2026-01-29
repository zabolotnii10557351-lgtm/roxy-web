import Button from "@/components/Button";

export default function CharactersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Characters</h2>
          <p className="text-sm text-white/60">
            Manage your AI streamer personas.
          </p>
        </div>
        <Button>Create Character</Button>
      </div>

      <div className="glass-card rounded-3xl p-10 text-center">
        <p className="text-sm text-white/70">
          No characters yet. Create your first AI streamer persona.
        </p>
        <Button className="mt-4" variant="secondary">
          Create Character
        </Button>
      </div>
    </div>
  );
}
