"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "@/i18n/client";
import { PricingConfigSchema, type PricingConfig } from "@/lib/pricing/config";

type PricingRow = {
  id: string;
  version: number;
  is_active: boolean;
  json: unknown;
  created_at: string | null;
  created_by: string | null;
};

export default function AdminPricingClient() {
  const { locale } = useLocale();
  const t = useTranslations();

  const [items, setItems] = useState<PricingRow[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [draftJson, setDraftJson] = useState<string>("{}");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const formatError = useCallback(
    (err: unknown) => {
      if (err instanceof Error) return err.message;
      return t.admin.errorUnknown;
    },
    [t],
  );

  const selectedRow = useMemo(() => {
    return items.find((i) => i.version === selectedVersion) ?? null;
  }, [items, selectedVersion]);

  const selectedConfig = useMemo(() => {
    if (!selectedRow) return null;
    const parsed = PricingConfigSchema.safeParse({
      version: selectedRow.version,
      ...(selectedRow.json as object),
    });
    return parsed.success ? parsed.data : null;
  }, [selectedRow]);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/pricing", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to load pricing: ${await res.text()}`);
    }
    const json = (await res.json()) as { items: PricingRow[] };
    setItems(json.items ?? []);

    const active = (json.items ?? []).find((i) => i.is_active);
    const first = active ?? (json.items ?? [])[0];

    if (first) {
      setSelectedVersion(first.version);
      setDraftJson(JSON.stringify(first.json ?? {}, null, 2));
    }
  }, []);

  useEffect(() => {
    void load().catch((e) => setSaveError(formatError(e)));
  }, [formatError, load]);

  async function createVersion() {
    setBusy(true);
    setSaveError(null);
    try {
      const baseVersion = items.find((i) => i.is_active)?.version;
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base_version: baseVersion }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      await load();
    } catch (e) {
      setSaveError(formatError(e));
    } finally {
      setBusy(false);
    }
  }

  async function saveVersion() {
    if (!selectedVersion) return;
    setBusy(true);
    setSaveError(null);

    try {
      const parsedJson = JSON.parse(draftJson) as unknown;
      const validated = PricingConfigSchema.safeParse({
        version: selectedVersion,
        ...(parsedJson as object),
      });

      if (!validated.success) {
        setSaveError(
          `Validation error: ${validated.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; ")}`,
        );
        return;
      }

      const res = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: selectedVersion, json: parsedJson }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      await load();
    } catch (e) {
      setSaveError(formatError(e));
    } finally {
      setBusy(false);
    }
  }

  async function publishVersion(version: number) {
    setBusy(true);
    setSaveError(null);

    try {
      const res = await fetch("/api/admin/pricing/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      await load();
    } catch (e) {
      setSaveError(formatError(e));
    } finally {
      setBusy(false);
    }
  }

  function applyFromForm(next: PricingConfig) {
    setDraftJson(
      JSON.stringify(
        {
          yearly_discount_pct: next.yearly_discount_pct,
          tooltip_text: next.tooltip_text,
          default_talk_ratio: next.default_talk_ratio,
          min_talk_ratio: next.min_talk_ratio,
          max_talk_ratio: next.max_talk_ratio,
          plans: next.plans,
        },
        null,
        2,
      ),
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            {t.admin.pricingVersions}
          </p>
          <button
            onClick={() => void createVersion()}
            disabled={busy}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 disabled:opacity-50"
          >
            {t.admin.buttonNew}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {items.map((row) => (
            <button
              key={row.id}
              onClick={() => {
                setSelectedVersion(row.version);
                setDraftJson(JSON.stringify(row.json ?? {}, null, 2));
                setSaveError(null);
              }}
              className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                row.version === selectedVersion
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">v{row.version}</span>
                {row.is_active ? (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    {t.admin.statusActive}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-white/50">
                {row.created_at ? new Date(row.created_at).toLocaleString(locale) : "—"}
              </p>
            </button>
          ))}
          {!items.length ? (
            <p className="text-sm text-white/60">{t.admin.pricingNoVersions}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        {saveError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {saveError}
          </div>
        ) : null}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                {t.admin.pricingEditor}
              </p>
              <p className="text-sm text-white/80">
                {selectedRow
                  ? t.admin.pricingEditingVersion.replace(
                      "{version}",
                      String(selectedRow.version),
                    )
                  : t.admin.pricingSelectVersion}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {selectedRow && !selectedRow.is_active ? (
                <button
                  onClick={() => void publishVersion(selectedRow.version)}
                  disabled={busy}
                  className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 hover:bg-emerald-500/20 disabled:opacity-50"
                >
                  {t.admin.buttonPublish}
                </button>
              ) : null}
              <button
                onClick={() => void saveVersion()}
                disabled={busy || !selectedRow}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 disabled:opacity-50"
              >
                {t.admin.buttonSave}
              </button>
            </div>
          </div>

          {selectedConfig ? (
            <FormEditor
              config={selectedConfig}
              onChange={(next) => applyFromForm(next)}
              disabled={busy}
            />
          ) : null}

          <div className="mt-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              {t.admin.pricingRawJsonAdvanced}
            </p>
            <textarea
              value={draftJson}
              onChange={(e) => setDraftJson(e.target.value)}
              rows={18}
              className="w-full rounded-2xl border border-white/10 bg-[#0A0F1A] p-4 font-mono text-xs text-white/80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormEditor(props: {
  config: PricingConfig;
  onChange: (cfg: PricingConfig) => void;
  disabled: boolean;
}) {
  const t = useTranslations();
  const [local, setLocal] = useState<PricingConfig>(props.config);

  useEffect(() => {
    setLocal(props.config);
  }, [props.config]);

  function update(next: PricingConfig) {
    setLocal(next);
    props.onChange(next);
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <LabeledInput
          label={t.admin.pricingYearlyDiscountPct}
          value={String(local.yearly_discount_pct)}
          disabled={props.disabled}
          onChange={(v) =>
            update({
              ...local,
              yearly_discount_pct: Number(v) || 0,
            })
          }
        />
        <LabeledInput
          label={t.admin.pricingDefaultTalkRatio}
          value={String(local.default_talk_ratio)}
          disabled={props.disabled}
          onChange={(v) => update({ ...local, default_talk_ratio: Number(v) || 0 })}
        />
        <LabeledInput
          label={t.admin.pricingMinTalkRatio}
          value={String(local.min_talk_ratio)}
          disabled={props.disabled}
          onChange={(v) => update({ ...local, min_talk_ratio: Number(v) || 0 })}
        />
        <LabeledInput
          label={t.admin.pricingMaxTalkRatio}
          value={String(local.max_talk_ratio)}
          disabled={props.disabled}
          onChange={(v) => update({ ...local, max_talk_ratio: Number(v) || 0 })}
        />
        <div className="md:col-span-3">
          <label className="text-xs uppercase tracking-[0.2em] text-white/60">
            {t.admin.pricingTooltipText}
          </label>
          <textarea
            value={local.tooltip_text}
            disabled={props.disabled}
            onChange={(e) => update({ ...local, tooltip_text: e.target.value })}
            rows={2}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">
          {t.admin.pricingPlans}
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-12 gap-3 border-b border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/50">
            <span className="col-span-3">{t.admin.pricingTablePlan}</span>
            <span className="col-span-3">{t.admin.pricingTableMonthlyEur}</span>
            <span className="col-span-6">{t.admin.pricingTableEntitlementsJson}</span>
          </div>
          <div className="divide-y divide-white/5">
            {local.plans.map((plan, idx) => (
              <div
                key={plan.id}
                className="grid grid-cols-12 gap-3 px-4 py-3"
              >
                <div className="col-span-3">
                  <p className="text-sm font-semibold text-white">{plan.name}</p>
                  <p className="text-xs text-white/50">{plan.id}</p>
                </div>
                <div className="col-span-3">
                  <input
                    value={plan.monthly_price_eur ?? ""}
                    disabled={props.disabled}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      const price = value === "" ? null : Number(value);
                      const nextPlans = [...local.plans];
                      nextPlans[idx] = { ...plan, monthly_price_eur: price };
                      update({ ...local, plans: nextPlans });
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    placeholder={t.admin.pricingPlaceholderMonthlyEur}
                  />
                </div>
                <div className="col-span-6">
                  <textarea
                    value={plan.entitlements ? JSON.stringify(plan.entitlements, null, 2) : ""}
                    disabled={props.disabled}
                    onChange={(e) => {
                      const raw = e.target.value;
                      let entitlements: unknown = null;
                      if (raw.trim()) {
                        try {
                          entitlements = JSON.parse(raw);
                        } catch {
                          return;
                        }
                      }
                      const nextPlans = [...local.plans];
                      nextPlans[idx] = {
                        ...plan,
                        entitlements:
                          entitlements as PricingConfig["plans"][number]["entitlements"],
                      };
                      update({ ...local, plans: nextPlans });
                    }}
                    rows={6}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0F1A] p-3 font-mono text-xs text-white/80"
                    placeholder={t.admin.pricingPlaceholderEntitlementsJson}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/40">
          {t.admin.pricingTipValidation}
        </p>
      </div>
    </div>
  );
}

function LabeledInput(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.2em] text-white/60">
        {props.label}
      </label>
      <input
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
      />
    </div>
  );
}
