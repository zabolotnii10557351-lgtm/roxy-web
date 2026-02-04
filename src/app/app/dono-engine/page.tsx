"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

type GiftRegion =
  | "global"
  | string;

type DonoTriggerGift = {
  type: "gift";
  region: GiftRegion;
  giftId: string;
  minAmount: number;
};

type DonoTriggerLikes = { type: "likes"; minLikes: number };
type DonoTriggerReposts = { type: "reposts"; minReposts: number };
type DonoTriggerSubscribe = { type: "subscribe"; minCount: number };
type DonoTriggerFollow = { type: "follow"; minCount: number };

type DonoTrigger =
  | DonoTriggerGift
  | DonoTriggerLikes
  | DonoTriggerReposts
  | DonoTriggerSubscribe
  | DonoTriggerFollow;

type DonoActionAnimation = {
  type: "play_animation";
  gender: "female" | "male";
  animationId: string;
  label: string;
};

type DonoActionUnrealTrigger = {
  type: "unreal_trigger";
  triggerName: string;
};

type DonoAction = DonoActionAnimation | DonoActionUnrealTrigger;

type DonoRuleConfig = {
  trigger: DonoTrigger;
  cooldownSeconds: number;
  reaction: {
    text: string;
    emotionTag: string;
    actions: DonoAction[];
  };
  enabled: boolean;
};

type DonoRuleRow = {
  id: string;
  name: string;
  config?: DonoRuleConfig | null;
  created_at?: string;
};

type GiftItem = {
  id: string;
  name: string;
  emoji: string;
  imageUrl?: string;
  regions: GiftRegion[];
};

type ApiRegionItem = { code: string; name: string; flagUrl?: string };
type ApiGiftItem = { id: string; name: string; cost: number; imageUrl?: string };
type ApiCatalog = {
  ok: true;
  source: "streamtoearn" | "fallback";
  region: string;
  lastUpdate?: string;
  regions: ApiRegionItem[];
  gifts: ApiGiftItem[];
};

// NOTE: This is a starter list (not exhaustive). Regions can differ.
const TIKTOK_GIFTS: GiftItem[] = [
  {
    id: "rose",
    name: "Rose",
    emoji: "\uD83C\uDF39",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk", "br", "tr", "id", "jp", "kr"],
  },
  { id: "hand_hearts", name: "Hand Hearts", emoji: "\uD83E\uDD0D", regions: ["global", "us", "eu", "uk"] },
  {
    id: "finger_heart",
    name: "Finger Heart",
    emoji: "\uD83E\uDEF6",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/a4c4dc437fd3a6632aba149769491f49.png~tplv-obj.webp",
    regions: ["global", "jp", "kr"],
  },
  {
    id: "ice_cream",
    name: "Ice Cream Cone",
    emoji: "\uD83C\uDF66",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/968820bc85e274713c795a6aef3f7c67~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk", "br"],
  },
  {
    id: "perfume",
    name: "Perfume",
    emoji: "\uD83E\uDDF4",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/20b8f61246c7b6032777bb81bf4ee055~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk", "tr"],
  },
  { id: "coffee", name: "Coffee", emoji: "\u2615", regions: ["global", "us", "eu", "uk", "br", "tr", "id"] },
  { id: "teddy", name: "Teddy Bear", emoji: "\uD83E\uDDF8", regions: ["global", "us", "eu", "uk", "br", "tr", "id", "jp", "kr"] },
  {
    id: "confetti",
    name: "Confetti",
    emoji: "\uD83C\uDF89",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/cb4e11b3834e149f08e1cdcc93870b26~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk"],
  },
  { id: "fireworks", name: "Fireworks", emoji: "\uD83C\uDF86", regions: ["global", "us", "eu", "uk", "jp", "kr"] },
  { id: "disco_ball", name: "Disco Ball", emoji: "\uD83E\uDE79", regions: ["global", "us", "eu", "uk"] },
  { id: "diamond", name: "Diamond", emoji: "\uD83D\uDC8E", regions: ["global", "us", "eu", "uk", "br", "tr"] },
  {
    id: "money_gun",
    name: "Money Gun",
    emoji: "\uD83D\uDCB8",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/e0589e95a2b41970f0f30f6202f5fce6~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk"],
  },
  {
    id: "sports_car",
    name: "Sports Car",
    emoji: "\uD83C\uDFCE\uFE0F",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/e7ce188da898772f18aaffe49a7bd7db~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk", "tr"],
  },
  { id: "yacht", name: "Yacht", emoji: "\uD83D\uDEF3\uFE0F", regions: ["global", "us", "eu", "uk"] },
  {
    id: "lion",
    name: "Lion",
    emoji: "\uD83E\uDD81",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/4fb89af2082a290b37d704e20f4fe729~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk", "tr"],
  },
  {
    id: "galaxy",
    name: "Galaxy",
    emoji: "\uD83C\uDF0C",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/resource/79a02148079526539f7599150da9fd28.png~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk", "jp", "kr"],
  },
  {
    id: "universe",
    name: "TikTok Universe",
    emoji: "\uD83C\uDF0E",
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/8f471afbcebfda3841a6cc515e381f58~tplv-obj.webp",
    regions: ["global", "us", "eu", "uk"],
  },
  { id: "castle", name: "Castle", emoji: "\uD83C\uDFF0", regions: ["global", "us", "eu", "uk"] },
  { id: "crown", name: "Crown", emoji: "\uD83D\uDC51", regions: ["global", "us", "eu", "uk", "br", "tr", "id"] },
  { id: "rocket", name: "Rocket", emoji: "\uD83D\uDE80", regions: ["global", "us", "eu", "uk", "jp", "kr"] },
  { id: "ring", name: "Ring", emoji: "\uD83D\uDC8D", regions: ["global", "us", "eu", "uk", "br"] },
  { id: "bouquet", name: "Bouquet", emoji: "\uD83D\uDC90", regions: ["global", "us", "eu", "uk", "br", "tr"] },
  { id: "rainbow", name: "Rainbow", emoji: "\uD83C\uDF08", regions: ["global", "us", "eu", "uk"] },
];

const ROXY_ANIMATIONS: Array<{ id: string; label: string }> = [
  { id: "heart_hands", label: "\u0421\u0435\u0440\u0434\u0435\u0447\u043a\u043e \u0440\u0443\u043a\u0430\u043c\u0438 (Heart Hands)" },
  { id: "blow_kiss", label: "\u041f\u043e\u0446\u0435\u043b\u0443\u0439 \u0432 \u043a\u0430\u043c\u0435\u0440\u0443 (Blow a Kiss)" },
  { id: "big_wave", label: "\u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u043c\u0430\u0445 \u0440\u0443\u043a\u043e\u0439 (Big Wave)" },
  { id: "cheer_clap", label: "\u0410\u043f\u043b\u043e\u0434\u0438\u0441\u043c\u0435\u043d\u0442\u044b / \u0443\u0440\u0430 (Cheer Clap)" },
  { id: "victory_pose", label: "\u041f\u043e\u0437\u0430 \u043f\u043e\u0431\u0435\u0434\u044b (Victory Pose)" },
  { id: "dance_bounce", label: "\u0422\u0430\u043d\u0435\u0446 \u043d\u0430 \u043c\u0435\u0441\u0442\u0435 (Dance Bounce)" },
  { id: "point_to_cam", label: "\u0423\u043a\u0430\u0437\u0430\u0442\u044c \u043d\u0430 \u043a\u0430\u043c\u0435\u0440\u0443 (Point to Camera)" },
  { id: "thank_you_bow", label: "\u041f\u043e\u043a\u043b\u043e\u043d \u0441\u043f\u0430\u0441\u0438\u0431\u043e (Thank-you Bow)" },
  { id: "laugh", label: "\u0421\u043c\u0435\u0445 (Laugh)" },
  { id: "nod_approve", label: "\u041e\u0434\u043e\u0431\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043a\u0438\u0432\u043e\u043a (Nod / Approve)" },
];

const UNREAL_TRIGGER_PRESETS = [
  "Snow",
  "Confetti",
  "Fireworks",
  "Teleport_A",
  "Teleport_B",
  "ChangeLocation_City",
  "ChangeLocation_Studio",
  "CameraZoom_In",
  "CameraZoom_Out",
  "LightBurst",
];

function normalizeGiftKey(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\s_-]+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function normalizeRegionForApi(region: string) {
  const raw = region.trim();
  if (raw.length === 0) return "US";
  if (raw.toLowerCase() === "global") return "US";

  const legacy: Record<string, string> = {
    us: "US",
    uk: "GB",
    eu: "DE",
    br: "BR",
    tr: "TR",
    id: "ID",
    jp: "JP",
    kr: "KR",
  };
  const low = raw.toLowerCase();
  if (legacy[low]) return legacy[low];
  if (/^[a-z]{2}$/i.test(raw)) return raw.toUpperCase();
  return "US";
}

function resolveGiftFromCatalog(gifts: ApiGiftItem[], giftId: string) {
  if (!giftId) return null;
  const key = normalizeGiftKey(giftId);
  return (
    gifts.find((g) => normalizeGiftKey(g.id) === key) ??
    gifts.find((g) => normalizeGiftKey(g.name) === key) ??
    null
  );
}

function giftDisplayLabel(params: { giftId: string; resolved: ApiGiftItem | GiftItem | null }) {
  const giftId = params.giftId.trim();
  const resolvedName = params.resolved?.name?.trim();
  if (!resolvedName) return giftId.length > 0 ? giftId : "(not set)";

  const same = normalizeGiftKey(resolvedName) === normalizeGiftKey(giftId);
  return same || giftId.length === 0 ? resolvedName : `${resolvedName} (${giftId})`;
}

function giftLabel(id: string) {
  const gift = TIKTOK_GIFTS.find((g) => g.id === id);
  return gift ? `${gift.emoji} ${gift.name}` : id;
}

function GiftPickerModal(props: {
  open: boolean;
  title: string;
  regionCode: string;
  loading: boolean;
  error: string | null;
  gifts: ApiGiftItem[];
  selectedGiftId: string;
  onPick: (gift: ApiGiftItem) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!props.open) setQ("");
  }, [props.open]);

  if (!props.open) return null;

  const query = q.trim().toLowerCase();
  const list = query.length === 0
    ? props.gifts
    : props.gifts.filter((g) => {
        const name = g.name.toLowerCase();
        const id = g.id.toLowerCase();
        return name.includes(query) || id.includes(query);
      });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0F1A] shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{props.title}</p>
            <p className="mt-0.5 text-xs text-white/55">Region: {props.regionCode}</p>
          </div>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              placeholder="Search gifts (e.g. Rose, Lion, Universe)"
            />
            <p className="text-xs text-white/50">{list.length} items</p>
          </div>

          {props.loading ? (
            <p className="mt-3 text-xs text-white/50">Loading catalog…</p>
          ) : null}
          {props.error ? (
            <p className="mt-3 text-xs text-rose-200/80">{props.error}</p>
          ) : null}

          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {list.map((g) => {
                const selected = normalizeGiftKey(g.id) === normalizeGiftKey(props.selectedGiftId);
                return (
                  <button
                    key={`${g.id}:${g.cost}`}
                    type="button"
                    onClick={() => props.onPick(g)}
                    className={
                      "flex items-center gap-3 rounded-2xl border px-3 py-2 text-left transition " +
                      (selected
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10")
                    }
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      {g.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={g.imageUrl}
                          alt={g.name}
                          className="h-9 w-9 rounded-xl object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs text-white/40">?</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-white">{g.name}</p>
                      <p className="mt-0.5 text-[11px] text-white/55">
                        {g.cost} coins · id: {g.id}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-[11px] text-white/40">
            Catalog source: streamtoearn.io (external). If your connector uses numeric gift IDs,
            you can still paste them into “Gift ID (advanced)”. Selecting a gift stores its name
            by default.
          </p>
        </div>
      </div>
    </div>
  );
}

function actionSummary(actions: DonoAction[]) {
  const first = actions[0];
  if (!first) return "No action";
  if (first.type === "play_animation") return `Animation: ${first.label}`;
  if (first.type === "unreal_trigger") return `Unreal: ${first.triggerName}`;
  return "Action";
}

const STARTER_TEMPLATES: Array<{ name: string; config: DonoRuleConfig }> = [
  {
    name: "Rose x1 \u2192 Animation: Heart Hands",
    config: {
      trigger: { type: "gift", region: "global", giftId: "rose", minAmount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0440\u043e\u0437\u0443!",
        emotionTag: "happy",
        actions: [
          {
            type: "play_animation",
            gender: "female",
            animationId: "heart_hands",
            label: "\u0421\u0435\u0440\u0434\u0435\u0447\u043a\u043e \u0440\u0443\u043a\u0430\u043c\u0438",
          },
        ],
      },
      enabled: true,
    },
  },
  {
    name: "Rose x10 \u2192 Unreal: Confetti",
    config: {
      trigger: { type: "gift", region: "global", giftId: "rose", minAmount: 10 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u0412\u0430\u0443! \u042d\u0442\u043e \u043c\u043d\u043e\u0433\u043e \u0440\u043e\u0437!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "Confetti" }],
      },
      enabled: true,
    },
  },
  {
    name: "Hand Hearts x1 \u2192 Animation: Blow a Kiss",
    config: {
      trigger: { type: "gift", region: "us", giftId: "hand_hearts", minAmount: 1 },
      cooldownSeconds: 12,
      reaction: {
        text: "\u041c\u0438\u043b\u043e! \u041b\u043e\u0432\u043b\u044e \u0445\u0430\u0440\u0442\u044b!",
        emotionTag: "cute",
        actions: [
          {
            type: "play_animation",
            gender: "female",
            animationId: "blow_kiss",
            label: "\u041f\u043e\u0446\u0435\u043b\u0443\u0439 \u0432 \u043a\u0430\u043c\u0435\u0440\u0443",
          },
        ],
      },
      enabled: true,
    },
  },
  {
    name: "Ice Cream x1 \u2192 Animation: Dance Bounce",
    config: {
      trigger: { type: "gift", region: "global", giftId: "ice_cream", minAmount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u041c\u043c\u043c, \u043c\u043e\u0440\u043e\u0436\u0435\u043d\u043e\u0435!",
        emotionTag: "happy",
        actions: [
          {
            type: "play_animation",
            gender: "female",
            animationId: "dance_bounce",
            label: "\u0422\u0430\u043d\u0435\u0446 \u043d\u0430 \u043c\u0435\u0441\u0442\u0435",
          },
        ],
      },
      enabled: true,
    },
  },
  {
    name: "Perfume x1 \u2192 Unreal: LightBurst",
    config: {
      trigger: { type: "gift", region: "eu", giftId: "perfume", minAmount: 1 },
      cooldownSeconds: 15,
      reaction: {
        text: "\u041e\u0445, \u043a\u0430\u043a\u043e\u0439 \u0430\u0440\u043e\u043c\u0430\u0442!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "LightBurst" }],
      },
      enabled: true,
    },
  },
  {
    name: "Fireworks x1 \u2192 Unreal: Fireworks",
    config: {
      trigger: { type: "gift", region: "jp", giftId: "fireworks", minAmount: 1 },
      cooldownSeconds: 25,
      reaction: {
        text: "\u0424\u0435\u0439\u0435\u0440\u0432\u0435\u0440\u043a!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "Fireworks" }],
      },
      enabled: true,
    },
  },
  {
    name: "Galaxy x1 \u2192 Unreal: ChangeLocation_Studio",
    config: {
      trigger: { type: "gift", region: "global", giftId: "galaxy", minAmount: 1 },
      cooldownSeconds: 40,
      reaction: {
        text: "\u041a\u043e\u0441\u043c\u043e\u0441! \u041f\u0435\u0440\u0435\u043d\u043e\u0441\u0438\u043c\u0441\u044f!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "ChangeLocation_Studio" }],
      },
      enabled: true,
    },
  },
  {
    name: "Universe x1 \u2192 Unreal: ChangeLocation_City",
    config: {
      trigger: { type: "gift", region: "global", giftId: "universe", minAmount: 1 },
      cooldownSeconds: 60,
      reaction: {
        text: "\u042d\u0442\u043e \u0442\u043e\u043f! \u041c\u0435\u043d\u044f\u0435\u043c \u043b\u043e\u043a\u0430\u0446\u0438\u044e!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "ChangeLocation_City" }],
      },
      enabled: true,
    },
  },
  {
    name: "Money Gun x1 \u2192 Animation: Victory Pose",
    config: {
      trigger: { type: "gift", region: "us", giftId: "money_gun", minAmount: 1 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e! \u041f\u043e\u0431\u0435\u0434\u0430!",
        emotionTag: "confident",
        actions: [
          {
            type: "play_animation",
            gender: "male",
            animationId: "victory_pose",
            label: "\u041f\u043e\u0437\u0430 \u043f\u043e\u0431\u0435\u0434\u044b",
          },
        ],
      },
      enabled: true,
    },
  },
  {
    name: "Likes x50 \u2192 Animation: Big Wave",
    config: {
      trigger: { type: "likes", minLikes: 50 },
      cooldownSeconds: 8,
      reaction: {
        text: "\u0412\u0438\u0436\u0443 \u043b\u0430\u0439\u043a\u0438! \u041f\u0440\u0438\u0432\u0435\u0442!",
        emotionTag: "happy",
        actions: [
          {
            type: "play_animation",
            gender: "female",
            animationId: "big_wave",
            label: "\u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u043c\u0430\u0445 \u0440\u0443\u043a\u043e\u0439",
          },
        ],
      },
      enabled: true,
    },
  },
  {
    name: "Likes x200 \u2192 Unreal: CameraZoom_In",
    config: {
      trigger: { type: "likes", minLikes: 200 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u041c\u043e\u0449\u043d\u043e! \u0417\u0443\u043c!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "CameraZoom_In" }],
      },
      enabled: true,
    },
  },
  {
    name: "Repost x1 \u2192 Animation: Thank-you Bow",
    config: {
      trigger: { type: "reposts", minReposts: 1 },
      cooldownSeconds: 15,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0440\u0435\u043f\u043e\u0441\u0442!",
        emotionTag: "grateful",
        actions: [
          {
            type: "play_animation",
            gender: "female",
            animationId: "thank_you_bow",
            label: "\u041f\u043e\u043a\u043b\u043e\u043d \u0441\u043f\u0430\u0441\u0438\u0431\u043e",
          },
        ],
      },
      enabled: true,
    },
  },
  {
    name: "Subscribe \u2192 Unreal: Confetti",
    config: {
      trigger: { type: "subscribe", minCount: 1 },
      cooldownSeconds: 30,
      reaction: {
        text: "\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 \u0441\u0435\u043c\u044c\u044e!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "Confetti" }],
      },
      enabled: true,
    },
  },
  {
    name: "Follow \u2192 Animation: Point to Camera",
    config: {
      trigger: { type: "follow", minCount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0443!",
        emotionTag: "happy",
        actions: [
          {
            type: "play_animation",
            gender: "male",
            animationId: "point_to_cam",
            label: "\u0423\u043a\u0430\u0437\u0430\u0442\u044c \u043d\u0430 \u043a\u0430\u043c\u0435\u0440\u0443",
          },
        ],
      },
      enabled: true,
    },
  },
  // Fill up to 20 templates by repeating varied gifts/actions with different thresholds.
  {
    name: "Teddy Bear x1 \u2192 Animation: Laugh",
    config: {
      trigger: { type: "gift", region: "global", giftId: "teddy", minAmount: 1 },
      cooldownSeconds: 12,
      reaction: {
        text: "\u041e\u0443\u0443\u0443, \u043c\u0438\u0448\u043a\u0430!",
        emotionTag: "cute",
        actions: [{ type: "play_animation", gender: "female", animationId: "laugh", label: "\u0421\u043c\u0435\u0445" }],
      },
      enabled: true,
    },
  },
  {
    name: "Coffee x1 \u2192 Animation: Nod / Approve",
    config: {
      trigger: { type: "gift", region: "global", giftId: "coffee", minAmount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u041a\u043e\u0444\u0435\u0439\u043e\u0447\u0435\u043a! \u0421\u043f\u0430\u0441\u0438\u0431\u043e!",
        emotionTag: "relaxed",
        actions: [{ type: "play_animation", gender: "male", animationId: "nod_approve", label: "\u041e\u0434\u043e\u0431\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043a\u0438\u0432\u043e\u043a" }],
      },
      enabled: true,
    },
  },
  {
    name: "Diamond x1 \u2192 Unreal: LightBurst",
    config: {
      trigger: { type: "gift", region: "global", giftId: "diamond", minAmount: 1 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u0411\u043b\u0435\u0441\u043a!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "LightBurst" }],
      },
      enabled: true,
    },
  },
  {
    name: "Sports Car x1 \u2192 Unreal: CameraZoom_Out",
    config: {
      trigger: { type: "gift", region: "global", giftId: "sports_car", minAmount: 1 },
      cooldownSeconds: 25,
      reaction: {
        text: "\u041d\u0438\u0447\u0435\u0433\u043e \u0441\u0435\u0431\u0435 \u0442\u0430\u0447\u043a\u0430!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "CameraZoom_Out" }],
      },
      enabled: true,
    },
  },
  {
    name: "Lion x1 \u2192 Unreal: Teleport_A",
    config: {
      trigger: { type: "gift", region: "global", giftId: "lion", minAmount: 1 },
      cooldownSeconds: 60,
      reaction: {
        text: "\u041b\u0415\u0412! \u041f\u043e\u0435\u0445\u0430\u043b\u0438!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "Teleport_A" }],
      },
      enabled: true,
    },
  },
  {
    name: "Crown x1 \u2192 Animation: Cheer Clap",
    config: {
      trigger: { type: "gift", region: "global", giftId: "crown", minAmount: 1 },
      cooldownSeconds: 18,
      reaction: {
        text: "\u041a\u043e\u0440\u043e\u043b\u0435\u0432\u0441\u043a\u0438!",
        emotionTag: "happy",
        actions: [{ type: "play_animation", gender: "female", animationId: "cheer_clap", label: "\u0410\u043f\u043b\u043e\u0434\u0438\u0441\u043c\u0435\u043d\u0442\u044b" }],
      },
      enabled: true,
    },
  },
];

function defaultConfig(): DonoRuleConfig {
  return {
    trigger: { type: "gift", region: "global", giftId: "rose", minAmount: 1 },
    cooldownSeconds: 10,
    reaction: { text: "", emotionTag: "neutral", actions: [] },
    enabled: true,
  };
}

function normalizeConfig(input?: DonoRuleConfig | null): DonoRuleConfig {
  const cfg = input ?? defaultConfig();
  const trigger = cfg.trigger ?? defaultConfig().trigger;

  if (trigger.type === "gift") {
    return {
      ...cfg,
      trigger: {
        type: "gift",
        region: (trigger.region ?? "global") as GiftRegion,
        giftId: (trigger.giftId ?? "rose").toString(),
        minAmount: Math.max(1, Number(trigger.minAmount ?? 1)),
      },
    };
  }

  return cfg;
}

function DonoRuleCard(props: {
  rule: DonoRuleRow;
  onSave: (id: string, name: string, config: DonoRuleConfig) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  busy: boolean;
}) {
  const initialConfig = normalizeConfig(props.rule.config);

  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(props.rule.name);
  const [enabled, setEnabled] = useState(initialConfig.enabled);
  const [cooldownSeconds, setCooldownSeconds] = useState(initialConfig.cooldownSeconds);
  const [reactionText, setReactionText] = useState(initialConfig.reaction.text);
  const [emotionTag, setEmotionTag] = useState(initialConfig.reaction.emotionTag);

  const [triggerType, setTriggerType] = useState<DonoTrigger["type"]>(initialConfig.trigger.type);
  const [giftRegion, setGiftRegion] = useState<GiftRegion>(
    initialConfig.trigger.type === "gift" ? initialConfig.trigger.region : "global",
  );
  const [giftId, setGiftId] = useState(
    initialConfig.trigger.type === "gift" ? initialConfig.trigger.giftId : "rose",
  );

  const [catalogRegions, setCatalogRegions] = useState<ApiRegionItem[]>([]);
  const [catalogGifts, setCatalogGifts] = useState<ApiGiftItem[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [giftPickerOpen, setGiftPickerOpen] = useState(false);
  const [threshold, setThreshold] = useState(() => {
    const t = initialConfig.trigger;
    if (t.type === "gift") return t.minAmount;
    if (t.type === "likes") return t.minLikes;
    if (t.type === "reposts") return t.minReposts;
    if (t.type === "subscribe") return t.minCount;
    if (t.type === "follow") return t.minCount;
    return 1;
  });

  const existingAction = (initialConfig.reaction.actions?.[0] ?? null) as DonoAction | null;
  const [actionType, setActionType] = useState<DonoAction["type"]>(existingAction?.type ?? "play_animation");
  const [animationGender, setAnimationGender] = useState<DonoActionAnimation["gender"]>(
    existingAction && existingAction.type === "play_animation" ? existingAction.gender : "female",
  );
  const [animationId, setAnimationId] = useState(
    existingAction && existingAction.type === "play_animation"
      ? existingAction.animationId
      : ROXY_ANIMATIONS[0]?.id ?? "heart_hands",
  );
  const [unrealTriggerName, setUnrealTriggerName] = useState(
    existingAction && existingAction.type === "unreal_trigger"
      ? existingAction.triggerName
      : UNREAL_TRIGGER_PRESETS[0] ?? "Snow",
  );

  const thresholdLabel =
    triggerType === "gift"
      ? "Min gifts"
      : triggerType === "likes"
        ? "Min likes"
        : triggerType === "reposts"
          ? "Min reposts"
          : "Min count";

  useEffect(() => {
    if (!expanded) return;
    if (triggerType !== "gift") return;

    let cancelled = false;
    const run = async () => {
      setCatalogLoading(true);
      setCatalogError(null);

      try {
        const regionCode = normalizeRegionForApi(String(giftRegion));
        const res = await fetch(`/api/tiktok/gifts?region=${encodeURIComponent(regionCode)}`);
        const json = (await res.json().catch(() => null)) as ApiCatalog | null;
        if (!res.ok || !json?.ok) {
          throw new Error("Failed to load gift catalog");
        }
        if (cancelled) return;
        setCatalogRegions(json.regions ?? []);
        setCatalogGifts(json.gifts ?? []);
      } catch (e) {
        if (cancelled) return;
        setCatalogError(e instanceof Error ? e.message : "Failed to load gift catalog");
        setCatalogRegions([]);
        setCatalogGifts([]);
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [expanded, triggerType, giftRegion]);

  const resolvedGift =
    resolveGiftFromCatalog(catalogGifts, giftId) ??
    TIKTOK_GIFTS.find((g) => normalizeGiftKey(g.id) === normalizeGiftKey(giftId)) ??
    null;

  const resolvedCatalogId =
    resolvedGift && "id" in resolvedGift ? (resolvedGift as ApiGiftItem).id : null;

  const buildConfig = (): DonoRuleConfig => {
    const nextTrigger: DonoTrigger =
      triggerType === "gift"
        ? {
            type: "gift",
            region: giftRegion,
            giftId: giftId.trim() || "rose",
            minAmount: Math.max(1, Number(threshold || 1)),
          }
        : triggerType === "likes"
          ? { type: "likes", minLikes: Math.max(1, Number(threshold || 1)) }
          : triggerType === "reposts"
            ? { type: "reposts", minReposts: Math.max(1, Number(threshold || 1)) }
            : triggerType === "subscribe"
              ? { type: "subscribe", minCount: Math.max(1, Number(threshold || 1)) }
              : { type: "follow", minCount: Math.max(1, Number(threshold || 1)) };

    const actions: DonoAction[] =
      actionType === "play_animation"
        ? [
            {
              type: "play_animation",
              gender: animationGender,
              animationId,
              label:
                ROXY_ANIMATIONS.find((a) => a.id === animationId)?.label ?? animationId,
            },
          ]
        : [{ type: "unreal_trigger", triggerName: unrealTriggerName.trim() || "Snow" }];

    return {
      trigger: nextTrigger,
      cooldownSeconds: Math.max(0, Number(cooldownSeconds || 0)),
      reaction: {
        text: reactionText,
        emotionTag,
        actions,
      },
      enabled,
    };
  };

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              placeholder="Template name"
            />
            <Button
              variant="ghost"
              onClick={() => setExpanded((v) => !v)}
              disabled={props.busy}
            >
              {expanded ? "Collapse" : "Edit"}
            </Button>
          </div>
          <p className="mt-2 text-xs text-white/60">
            {triggerType === "gift"
              ? `Gift: ${giftDisplayLabel({ giftId, resolved: resolvedGift })} · min ${threshold}`
              : `Event: ${triggerType} · min ${threshold}`} · {actionSummary(buildConfig().reaction.actions)}
          </p>
        </div>

        <label className="ml-4 flex items-center gap-2 text-xs text-white/70">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enabled
        </label>
      </div>

      {expanded ? (
        <div className="mt-5">
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className="mb-1 text-[11px] font-medium text-white/70">Trigger source</p>
              <select
                value={triggerType}
                onChange={(e) => {
                  const next = e.target.value as DonoTrigger["type"];
                  setTriggerType(next);
                  if (next === "gift") {
                    setGiftRegion("global");
                    setGiftId("rose");
                    setThreshold(1);
                  } else if (next === "likes") {
                    setThreshold(50);
                  } else if (next === "reposts") {
                    setThreshold(1);
                  } else {
                    setThreshold(1);
                  }
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="gift">Gifts</option>
                <option value="likes">Likes</option>
                <option value="reposts">Reposts</option>
                <option value="subscribe">Subscription</option>
                <option value="follow">Follow</option>
              </select>
            </div>

            {triggerType === "gift" ? (
              <div>
                <p className="mb-1 text-[11px] font-medium text-white/70">Region</p>
                <select
                  value={giftRegion}
                  onChange={(e) => {
                    setGiftRegion(e.target.value as GiftRegion);
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                >
                  <option value="global">Global (default)</option>
                  {catalogRegions.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.code} — {r.name}
                    </option>
                  ))}
                  {giftRegion !== "global" &&
                  catalogRegions.length > 0 &&
                  !catalogRegions.some((r) => r.code === giftRegion) ? (
                    <option value={giftRegion}>Custom ({giftRegion})</option>
                  ) : null}
                </select>
                <p className="mt-1 text-[11px] text-white/45">
                  {catalogLoading
                    ? "Loading regions…"
                    : catalogRegions.length > 0
                      ? "Gifts can differ by region."
                      : "Regions will load when you open the picker."}
                </p>
              </div>
            ) : (
              <div>
                <p className="mb-1 text-[11px] font-medium text-white/70">Threshold</p>
                <input
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                  placeholder={thresholdLabel}
                  type="number"
                  min={1}
                />
                <p className="mt-1 text-[11px] text-white/45">{thresholdLabel}</p>
              </div>
            )}

            {triggerType === "gift" ? (
              <div>
                <p className="mb-1 text-[11px] font-medium text-white/70">Gift</p>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-base">
                    {resolvedGift?.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resolvedGift.imageUrl}
                        alt={resolvedGift.name}
                        className="h-8 w-8 rounded-xl object-contain"
                      />
                    ) : (
                      ("emoji" in (resolvedGift ?? {})
                        ? (resolvedGift as GiftItem).emoji
                        : "\uD83C\uDF81")
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white">
                      {giftDisplayLabel({ giftId, resolved: resolvedGift })}
                    </p>
                    {resolvedGift && "cost" in resolvedGift ? (
                      <p className="mt-0.5 text-[11px] text-white/55">
                        {(resolvedGift as ApiGiftItem).cost} coins
                      </p>
                    ) : (
                      <p className="mt-0.5 text-[11px] text-white/45">
                        Selected gift ID / name
                      </p>
                    )}
                    <p className="mt-0.5 text-[11px] text-white/45">
                      Match key: {giftId || "(not set)"}
                      {resolvedCatalogId ? ` · catalog id: ${resolvedCatalogId}` : ""}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setGiftPickerOpen(true)}
                    disabled={props.busy}
                  >
                    Choose…
                  </Button>
                </div>
                <div className="mt-2">
                  <p className="mb-1 text-[11px] font-medium text-white/70">Gift ID (advanced)</p>
                  <input
                    value={giftId}
                    onChange={(e) => setGiftId(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    placeholder="e.g. rose, tiktok_universe, 5655, Rose"
                  />
                  <p className="mt-1 text-[11px] text-white/45">
                    Use when your connector sends a numeric gift ID or a custom name.
                  </p>
                  {resolvedCatalogId ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <p className="text-[11px] text-white/45">Catalog id: {resolvedCatalogId}</p>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          try {
                            void navigator.clipboard.writeText(resolvedCatalogId);
                          } catch {
                            // ignore
                          }
                        }}
                        disabled={props.busy}
                      >
                        Copy
                      </Button>
                    </div>
                  ) : null}
                </div>
                <p className="mt-1 text-[11px] text-white/45">Pick the gift that triggers this rule.</p>

                <GiftPickerModal
                  open={giftPickerOpen}
                  title="Pick a TikTok gift"
                  regionCode={normalizeRegionForApi(String(giftRegion))}
                  loading={catalogLoading}
                  error={catalogError}
                  gifts={catalogGifts}
                  selectedGiftId={giftId}
                  onPick={(g) => {
                    setGiftId(g.name);
                    setGiftPickerOpen(false);
                  }}
                  onClose={() => setGiftPickerOpen(false)}
                />
              </div>
            ) : null}
          </div>

          {triggerType === "gift" ? (
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div>
                <p className="mb-1 text-[11px] font-medium text-white/70">Gifts amount</p>
                <input
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                  placeholder="Min gifts"
                  type="number"
                  min={1}
                />
                <p className="mt-1 text-[11px] text-white/45">Example: Rose x10</p>
              </div>
            </div>
          ) : null}

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div>
              <p className="mb-1 text-[11px] font-medium text-white/70">Action type</p>
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value as DonoAction["type"])}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="play_animation">Animation</option>
                <option value="unreal_trigger">Unreal trigger</option>
              </select>
            </div>

            {actionType === "play_animation" ? (
              <>
                <div>
                  <p className="mb-1 text-[11px] font-medium text-white/70">Animations</p>
                  <select
                    value={animationGender}
                    onChange={(e) => setAnimationGender(e.target.value as DonoActionAnimation["gender"])}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <p className="mt-1 text-[11px] text-white/45">Choose mocap set.</p>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-medium text-white/70">Animation</p>
                  <select
                    value={animationId}
                    onChange={(e) => setAnimationId(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                  >
                    {ROXY_ANIMATIONS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-white/45">
                    Placeholder list (10) for Rokoko capture.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2">
                  <p className="mb-1 text-[11px] font-medium text-white/70">Unreal trigger</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    <select
                      value={unrealTriggerName}
                      onChange={(e) => setUnrealTriggerName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    >
                      {UNREAL_TRIGGER_PRESETS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <input
                      value={unrealTriggerName}
                      onChange={(e) => setUnrealTriggerName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                      placeholder="Custom Unreal trigger name"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-white/45">
                    This name is sent inside the event payload for your Unreal Blueprint to route.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div>
              <p className="mb-1 text-[11px] font-medium text-white/70">Cooldown</p>
              <input
                value={cooldownSeconds}
                onChange={(e) => setCooldownSeconds(Number(e.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="Cooldown seconds"
                type="number"
                min={0}
              />
              <p className="mt-1 text-[11px] text-white/45">Prevents spam of the same rule.</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-medium text-white/70">Emotion tag</p>
              <input
                value={emotionTag}
                onChange={(e) => setEmotionTag(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="Emotion tag"
              />
              <p className="mt-1 text-[11px] text-white/45">Optional. Used by your renderer/logic.</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-medium text-white/70">Reaction text</p>
              <input
                value={reactionText}
                onChange={(e) => setReactionText(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="What should the character say/do?"
              />
              <p className="mt-1 text-[11px] text-white/45">Shown in the event payload.</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() =>
            props.onSave(props.rule.id, name, buildConfig())
          }
          disabled={props.busy || name.trim().length === 0}
        >
          Save
        </Button>
        <Button
          variant="ghost"
          onClick={() => props.onDelete(props.rule.id)}
          disabled={props.busy}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function DonoEnginePage() {
  const t = useTranslations();
  const [rules, setRules] = useState<DonoRuleRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRules = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/dono-rules");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load Dono rules");
      return;
    }
    setRules((json?.items ?? []) as DonoRuleRow[]);
  }, []);

  useEffect(() => {
    void loadRules();
  }, [loadRules]);

  const handleCreateFromTemplate = async (tpl: (typeof STARTER_TEMPLATES)[number]) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/dono-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: tpl.name,
        config: tpl.config,
      }),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to create Dono rule");
      setBusy(false);
      return;
    }

    await loadRules();
    setBusy(false);
  };

  const handleSave = async (id: string, nextName: string, config: DonoRuleConfig) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/dono-rules", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: nextName, config }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to update Dono rule");
      setBusy(false);
      return;
    }

    await loadRules();
    setBusy(false);
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/dono-rules", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to delete Dono rule");
      setBusy(false);
      return;
    }

    await loadRules();
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.donoEngine}</h2>
        <p className="text-sm text-white/60">{t.app.donoEngineSubtitle}</p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">Starter templates</h3>
            <p className="text-xs text-white/55">
              Create from a template, then edit the rule name / trigger / action.
            </p>
          </div>
          <a
            className="text-xs text-white/50 underline decoration-white/20 hover:text-white/70"
            href="https://streamtoearn.io/gifts"
            target="_blank"
            rel="noreferrer"
          >
            Reference gift catalog (external)
          </a>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {STARTER_TEMPLATES.slice(0, 20).map((tpl) => (
            <div key={tpl.name} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">{tpl.name}</p>
              <p className="mt-1 text-xs text-white/60">
                {tpl.config.trigger.type === "gift"
                  ? (() => {
                      const trig = tpl.config.trigger as DonoTriggerGift;
                      const regionLabel =
                        trig.region === "global" ? "Global" : normalizeRegionForApi(String(trig.region));
                      return `Trigger: ${giftLabel(trig.giftId)} · min ${trig.minAmount} · ${regionLabel}`;
                    })()
                  : `Trigger: ${tpl.config.trigger.type}`}
              </p>
              <p className="mt-1 text-xs text-white/60">{actionSummary(tpl.config.reaction.actions)}</p>
              <div className="mt-3">
                <Button
                  variant="secondary"
                  onClick={() => handleCreateFromTemplate(tpl)}
                  disabled={busy}
                >
                  Create
                </Button>
              </div>
            </div>
          ))}
        </div>

        {error ? <p className="mt-3 text-xs text-rose-200/80">{error}</p> : null}
      </div>

      <div className="space-y-4">
        {rules.length === 0 ? (
          <p className="text-xs text-white/50">No Dono rules yet.</p>
        ) : (
          rules.map((rule) => (
            <DonoRuleCard
              key={rule.id}
              rule={rule}
              onSave={handleSave}
              onDelete={handleDelete}
              busy={busy}
            />
          ))
        )}
      </div>
    </div>
  );
}
