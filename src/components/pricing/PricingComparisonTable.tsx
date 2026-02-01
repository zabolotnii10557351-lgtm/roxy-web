"use client";

import { Fragment, useMemo, useState } from "react";
import type { PricingPlan } from "@/config/pricingPlans";
import { calcEstimatedStreamHours } from "@/config/pricingPlans";
import { formatHours } from "@/components/pricing/format";

type ComparisonGroup = {
  id: string;
  title: string;
  rows: Array<{
    label: string;
    getValue: (plan: PricingPlan, talkRatio: number) => string;
  }>;
};

function yesNo(v: boolean) {
  return v ? "Yes" : "No";
}

export default function PricingComparisonTable(props: {
  plans: PricingPlan[];
  talkRatio: number;
}) {
  const [openGroupId, setOpenGroupId] = useState<string>("usage");

  const groups: ComparisonGroup[] = useMemo(
    () => [
      {
        id: "usage",
        title: "Usage",
        rows: [
          {
            label: "Active Speech included (OpenAI)",
            getValue: (plan) =>
              plan.entitlements
                ? `${formatHours(plan.entitlements.included_active_speech_hours_openai)}h`
                : "Custom",
          },
          {
            label: "Estimated stream hours (at talk ratio)",
            getValue: (plan, talkRatio) => {
              if (!plan.entitlements) return "Custom";
              const est = calcEstimatedStreamHours(
                plan.entitlements.included_active_speech_hours_openai,
                talkRatio
              );
              return `${formatHours(est)}h`;
            },
          },
          {
            label: "BYOK (ElevenLabs)",
            getValue: (plan) =>
              plan.entitlements ? yesNo(plan.entitlements.allow_byok_elevenlabs) : "Custom",
          },
        ],
      },
      {
        id: "limits",
        title: "Limits",
        rows: [
          {
            label: "Characters",
            getValue: (plan) =>
              plan.entitlements ? String(plan.entitlements.max_characters) : "Custom",
          },
          {
            label: "Concurrent streams",
            getValue: (plan) =>
              plan.entitlements ? String(plan.entitlements.max_concurrent_streams) : "Custom",
          },
          {
            label: "Linked accounts",
            getValue: (plan) =>
              plan.entitlements ? String(plan.entitlements.max_accounts_linked) : "Custom",
          },
          {
            label: "Scenes",
            getValue: (plan) =>
              plan.entitlements ? String(plan.entitlements.scenes_limit) : "Custom",
          },
        ],
      },
      {
        id: "automation",
        title: "Automation",
        rows: [
          {
            label: "Scheduler",
            getValue: (plan) =>
              plan.entitlements ? yesNo(plan.entitlements.scheduler_enabled) : "Custom",
          },
          {
            label: "Dono rules",
            getValue: (plan) =>
              plan.entitlements ? String(plan.entitlements.dono_rules_limit) : "Custom",
          },
          {
            label: "Stream scripts",
            getValue: (plan) =>
              plan.entitlements ? String(plan.entitlements.stream_scripts_limit) : "Custom",
          },
        ],
      },
      {
        id: "branding",
        title: "Branding",
        rows: [
          {
            label: "Remove watermark",
            getValue: (plan) => {
              if (!plan.entitlements) return "Custom";
              return yesNo(!plan.entitlements.watermark_branding);
            },
          },
        ],
      },
    ],
    []
  );

  const plans = props.plans;

  return (
    <div className="space-y-4">
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/60">
                  Feature
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/60"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Fragment key={group.id}>
                  <tr>
                    <td
                      colSpan={plans.length + 1}
                      className="px-4 pt-6 text-xs font-semibold uppercase tracking-widest text-white/60"
                    >
                      {group.title}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr
                      key={`${group.id}:${row.label}`}
                      className="border-t border-white/10"
                    >
                      <td className="px-4 py-3 text-white/70">{row.label}</td>
                      {plans.map((plan) => (
                        <td key={`${plan.id}:${row.label}`} className="px-4 py-3 text-white">
                          {row.getValue(plan, props.talkRatio)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden">
        <div className="space-y-3">
          {groups.map((group) => {
            const open = openGroupId === group.id;
            return (
              <div key={group.id} className="glass-card rounded-3xl p-4">
                <button
                  type="button"
                  onClick={() => setOpenGroupId(open ? "" : group.id)}
                  className="flex w-full items-center justify-between gap-3"
                >
                  <span className="text-sm font-semibold text-white">{group.title}</span>
                  <span className="text-xs text-white/60">{open ? "Hide" : "Show"}</span>
                </button>

                {open ? (
                  <div className="mt-4 space-y-4">
                    {group.rows.map((row) => (
                      <div key={row.label} className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                          {row.label}
                        </p>
                        <div className="grid gap-2">
                          {plans.map((plan) => (
                            <div
                              key={`${group.id}:${row.label}:${plan.id}`}
                              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                            >
                              <span className="text-xs text-white/70">{plan.name}</span>
                              <span className="text-xs font-semibold text-white">
                                {row.getValue(plan, props.talkRatio)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
