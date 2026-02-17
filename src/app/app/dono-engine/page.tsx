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
  duration?: number;
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

// \u2500\u2500 Real Animations from DA_RoxAnimCatalog (96 entries) \u2500\u2500
const ROXY_ANIMATIONS: Array<{ id: string; label: string; tags: string }> = [
  // Happy / Excited
  { id: "AD_Bouncy_Happy_Dramatic", label: "Bouncy Happy Dramatic", tags: "happy" },
  { id: "AD_Bouncy_Happy_Stand", label: "Bouncy Happy Stand", tags: "happy,idle" },
  { id: "AD_Jump_About_Excited", label: "Jump About Excited", tags: "excited" },
  { id: "AD_Jumps_For_Joy", label: "Jumps For Joy", tags: "excited" },
  { id: "AD_Urika_Moment", label: "Eureka Moment", tags: "excited" },
  { id: "AD_Check_Me_Out_Im_Cool_", label: "Check Me Out I'm Cool", tags: "confident" },
  { id: "AD_Excitable_Fidgeting", label: "Excitable Fidgeting", tags: "excited" },
  // Love / Heart
  { id: "AD_Hand_Heart_1", label: "Hand Heart 1", tags: "love" },
  { id: "AD_Hand_Heart_1_EXTENDED", label: "Hand Heart 1 (Extended)", tags: "love" },
  { id: "AD_Hand_Heart_2", label: "Hand Heart 2", tags: "love" },
  { id: "AD_Hand_Heart_2_EXTENDED", label: "Hand Heart 2 (Extended)", tags: "love" },
  { id: "AD_Enamoured", label: "Enamoured", tags: "love" },
  // Laugh
  { id: "AD_Giggle_Dramatic", label: "Giggle Dramatic", tags: "laugh" },
  { id: "AD_Giggle_Stand", label: "Giggle Stand", tags: "laugh,idle" },
  { id: "AD_Fall_About_Laugh", label: "Fall About Laugh", tags: "laugh" },
  { id: "AD_Hysterical_Laugh", label: "Hysterical Laugh", tags: "laugh" },
  { id: "AD_Hysterical_Laugh_LOOP", label: "Hysterical Laugh (Loop)", tags: "laugh" },
  // Shy / Bashful
  { id: "AD_Bashful_Stand", label: "Bashful Stand", tags: "shy,idle" },
  { id: "AD_Timid_Stand", label: "Timid Stand", tags: "shy,idle" },
  { id: "AD_Ashamed", label: "Ashamed", tags: "shy" },
  { id: "AD_Awkward_Stand", label: "Awkward Stand", tags: "shy,idle" },
  { id: "AD_Awkward_Turtle_Hand_Gesture", label: "Awkward Turtle", tags: "shy" },
  // Sad / Cry
  { id: "AD_Cry_Dramatic", label: "Cry Dramatic", tags: "sad" },
  { id: "AD_Cry_Emote", label: "Cry Emote", tags: "sad" },
  { id: "AD_Crying", label: "Crying", tags: "sad" },
  { id: "AD_Crying_Contained", label: "Crying Contained", tags: "sad" },
  { id: "AD_Sad_Crying", label: "Sad Crying", tags: "sad" },
  { id: "AD_Sad_Stand", label: "Sad Stand", tags: "sad,idle" },
  { id: "AD_Depressed", label: "Depressed", tags: "sad" },
  // Confused / Thinking
  { id: "AD_Confused", label: "Confused", tags: "confused" },
  { id: "AD_Confused_Rocking", label: "Confused Rocking", tags: "confused" },
  { id: "AD_Puzzled_Scratch_Head", label: "Puzzled Scratch Head", tags: "confused" },
  { id: "AD_Thinking", label: "Thinking", tags: "thinking" },
  { id: "AD_Cross_Fingers", label: "Cross Fingers", tags: "thinking" },
  // Bored / Disappointed
  { id: "AD_Bored_Dramatic", label: "Bored Dramatic", tags: "bored" },
  { id: "AD_Bored_Stand", label: "Bored Stand", tags: "bored,idle" },
  { id: "AD_Disappointed_Dramatic", label: "Disappointed Dramatic", tags: "disappointed" },
  { id: "AD_Disappointed_Emote", label: "Disappointed Emote", tags: "disappointed" },
  { id: "AD_Disappointed_Stand", label: "Disappointed Stand", tags: "disappointed,idle" },
  { id: "AD_Stroppy_Stand", label: "Stroppy Stand", tags: "angry,idle" },
  // Calm / Relief
  { id: "AD_Relief", label: "Relief", tags: "calm" },
  { id: "AD_Relief_Dramatic", label: "Relief Dramatic", tags: "calm" },
  { id: "AD_Serenity_Stand", label: "Serenity Stand", tags: "calm,idle" },
  { id: "AD_Behold_the_Sky", label: "Behold the Sky", tags: "calm" },
  // Misc
  { id: "AD_Oh_Wow", label: "Oh Wow", tags: "wow" },
  { id: "AD_Worried", label: "Worried", tags: "worried" },
  { id: "AD_Ashamed_Walk_Around", label: "Ashamed Walk Around", tags: "locomotion" },
  { id: "AD_Confused_Jog_LOOPED", label: "Confused Jog (Loop)", tags: "locomotion" },
];

const ANIM_GROUPS = [
  { label: "\u2764\uFE0F Happy / Excited", filter: (a: typeof ROXY_ANIMATIONS[0]) => /happy|excited|confident/.test(a.tags) },
  { label: "\uD83D\uDC97 Love / Heart", filter: (a: typeof ROXY_ANIMATIONS[0]) => a.tags.includes("love") },
  { label: "\uD83D\uDE02 Laugh", filter: (a: typeof ROXY_ANIMATIONS[0]) => a.tags.includes("laugh") },
  { label: "\uD83D\uDE33 Shy / Bashful", filter: (a: typeof ROXY_ANIMATIONS[0]) => a.tags.includes("shy") },
  { label: "\uD83D\uDE22 Sad / Cry", filter: (a: typeof ROXY_ANIMATIONS[0]) => a.tags.includes("sad") },
  { label: "\uD83E\uDD14 Confused / Thinking", filter: (a: typeof ROXY_ANIMATIONS[0]) => /confused|thinking/.test(a.tags) },
  { label: "\uD83D\uDE12 Bored / Disappointed", filter: (a: typeof ROXY_ANIMATIONS[0]) => /bored|disappointed|angry/.test(a.tags) },
  { label: "\uD83D\uDE0C Calm / Relief", filter: (a: typeof ROXY_ANIMATIONS[0]) => a.tags.includes("calm") },
  { label: "\uD83C\uDFAD Other", filter: (a: typeof ROXY_ANIMATIONS[0]) => /wow|worried|locomotion/.test(a.tags) },
];

const UNREAL_TRIGGER_PRESETS = [
  // Scene / Background changes (via setBackground command)
  "BG_Studio",
  "BG_Outdoor",
  // VFX states for sphere effects
  "NS_Snow_Attract",
  "NS_Snow_Idle",
  "NS_Holy_Attract",
  "NS_Basic_Attract",
  // Misc
  "NS_Torch",
  "NS_leaf",
];

// \u2500\u2500 VFX Donation Effects Registry \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Thumbnails served from Supabase Storage: /storage/v1/object/public/vfx-previews/
const VFX_THUMB_BASE = "/vfx-thumbs"; // TODO: replace with Supabase storage URL

type VfxEntry = { name: string; category: "wings" | "sphere"; thumb: string; states?: string[] };

const VFX_REGISTRY: Record<string, VfxEntry> = {
  // \u2500\u2500 Wings (NS_Wing_1..13) \u2500\u2500
  NS_Wing_1:  { name: "Golden Phoenix",    category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_2.webp` }, // no NS_Wing_1.webp, placeholder
  NS_Wing_2:  { name: "Crystal Butterfly",  category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_2.webp` },
  NS_Wing_3:  { name: "Prism Wings",        category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_3.webp` },
  NS_Wing_4:  { name: "Fairy Fire",         category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_4.webp` },
  NS_Wing_5:  { name: "Demon Shadow",       category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_5.webp` },
  NS_Wing_6:  { name: "Spirit Glow",        category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_6.webp` },
  NS_Wing_7:  { name: "Cyber Grid",         category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_7.webp` },
  NS_Wing_8:  { name: "Arcane Sigil",       category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_8.webp` },
  NS_Wing_9:  { name: "Inferno",            category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_9.webp` },
  NS_Wing_10: { name: "Wing 10",            category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_10.webp` },
  NS_Wing_11: { name: "Aqua Splash",        category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_11.webp` },
  NS_Wing_12: { name: "Void Ribbon",        category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_12.webp` },
  NS_Wing_13: { name: "Lightning Storm",    category: "wings",  thumb: `${VFX_THUMB_BASE}/NS_Wing_13.webp` },
  // \u2500\u2500 Spheres (AttractionVFX) \u2013 each has _Attract, _Get, _Idle states \u2500\u2500
  NS_Basic:   { name: "Sparkle Burst",      category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore.webp`,         states: ["Attract","Get","Idle"] },
  NS_Book:    { name: "Crystal Shatter",    category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Child.webp`,   states: ["Attract","Get","Idle"] },
  NS_Coin:    { name: "Gold Coin",          category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Coin.webp`,    states: ["Attract","Get","Idle"] },
  NS_Eye:     { name: "Dark Magic",         category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_DarkMagic.webp`, states: ["Attract","Get","Idle"] },
  NS_Holy:    { name: "Holy Light",         category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Holy.webp`,    states: ["Attract","Get","Idle"] },
  NS_Music:   { name: "Music Note",         category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Music.webp`,   states: ["Attract","Get","Idle"] },
  NS_Nature:  { name: "Nature Bloom",       category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Nature.webp`,  states: ["Attract","Get","Idle"] },
  NS_Rock:    { name: "Cosmic Ring",        category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Cosmic.webp`,  states: ["Attract","Get","Idle"] },
  NS_Scifi:   { name: "Plasma Core",        category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Scifi.webp`,   states: ["Attract","Get","Idle"] },
  NS_Snow:    { name: "Snowfall",           category: "sphere", thumb: `${VFX_THUMB_BASE}/BP_EnergyCore_Snow.webp`,    states: ["Attract","Get","Idle"] },
};

const VFX_CATEGORIES = [
  { key: "wings" as const,  label: "\uD83E\uDD86 Wings (13)",   count: 13 },
  { key: "sphere" as const, label: "\u26A1 Sphere (10)",  count: 10 },
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
            <p className="mt-3 text-xs text-white/50">Loading catalog\u2026</p>
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
                        {g.cost} coins \u00B7 id: {g.id}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-[11px] text-white/40">
            Catalog source: streamtoearn.io (external). If your connector uses numeric gift IDs,
            you can still paste them into \u201CGift ID (advanced)\u201D. Selecting a gift stores its name
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
  if (first.type === "unreal_trigger") {
    const vfx = VFX_REGISTRY[first.triggerName as keyof typeof VFX_REGISTRY];
    return vfx ? `VFX: ${vfx.name}` : `Unreal: ${first.triggerName}`;
  }
  return "Action";
}

function VfxPickerModal(props: {
  open: boolean;
  selectedId: string;
  onPick: (bpName: string) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"wings" | "sphere">("wings");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!props.open) setQ("");
  }, [props.open]);

  if (!props.open) return null;

  const query = q.trim().toLowerCase();
  const entries = Object.entries(VFX_REGISTRY).filter(([, v]) => {
    if (v.category !== tab) return false;
    if (query.length === 0) return true;
    return v.name.toLowerCase().includes(query);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0F1A] shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Pick VFX Effect</p>
            <p className="mt-0.5 text-xs text-white/55">
              Unreal Blueprint name will be sent as trigger
            </p>
          </div>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </div>

        <div className="p-5">
          {/* Category tabs */}
          <div className="flex gap-2">
            {VFX_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setTab(cat.key)}
                className={
                  "rounded-2xl px-4 py-2 text-xs font-medium transition " +
                  (tab === cat.key
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80")
                }
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Search VFX effects..."
          />

          {/* Grid */}
          <div className="mt-4 max-h-[55vh] overflow-y-auto pr-2">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {entries.map(([bpName, vfx]) => {
                const selected = bpName === props.selectedId;
                return (
                  <button
                    key={bpName}
                    type="button"
                    onClick={() => props.onPick(bpName)}
                    className={
                      "group relative overflow-hidden rounded-2xl border text-left transition " +
                      (selected
                        ? "border-cyan-400/60 bg-cyan-500/10 ring-1 ring-cyan-400/30"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10")
                    }
                  >
                    {/* Thumbnail */}
                    <div className="flex aspect-square items-center justify-center overflow-hidden bg-black/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vfx.thumb}
                        alt={vfx.name}
                        className="h-full w-full object-cover transition group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    {/* Label */}
                    <div className="px-3 py-2">
                      <p className="truncate text-xs font-medium text-white">
                        {vfx.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/45">{bpName}</p>
                    </div>
                    {selected ? (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] text-white">
                        \u2713
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STARTER_TEMPLATES: Array<{ name: string; config: DonoRuleConfig }> = [
  {
    name: "Rose x1 \u2192 Hand Heart",
    config: {
      trigger: { type: "gift", region: "global", giftId: "rose", minAmount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0440\u043e\u0437\u0443!",
        emotionTag: "happy",
        actions: [{ type: "play_animation", gender: "female", animationId: "AD_Hand_Heart_1", label: "Hand Heart 1" }],
      },
      enabled: true,
    },
  },
  {
    name: "Rose x10 \u2192 VFX: Snow Attract",
    config: {
      trigger: { type: "gift", region: "global", giftId: "rose", minAmount: 10 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u0412\u0430\u0443! \u042d\u0442\u043e \u043c\u043d\u043e\u0433\u043e \u0440\u043e\u0437!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Snow_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Hand Hearts x1 \u2192 Enamoured",
    config: {
      trigger: { type: "gift", region: "us", giftId: "hand_hearts", minAmount: 1 },
      cooldownSeconds: 12,
      reaction: {
        text: "\u041c\u0438\u043b\u043e! \u041b\u043e\u0432\u043b\u044e \u0445\u0430\u0440\u0442\u044b!",
        emotionTag: "cute",
        actions: [{ type: "play_animation", gender: "female", animationId: "AD_Enamoured", label: "Enamoured" }],
      },
      enabled: true,
    },
  },
  {
    name: "Ice Cream x1 \u2192 Bouncy Happy",
    config: {
      trigger: { type: "gift", region: "global", giftId: "ice_cream", minAmount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u041c\u043c\u043c, \u043c\u043e\u0440\u043e\u0436\u0435\u043d\u043e\u0435!",
        emotionTag: "happy",
        actions: [{ type: "play_animation", gender: "female", animationId: "AD_Bouncy_Happy_Dramatic", label: "Bouncy Happy Dramatic" }],
      },
      enabled: true,
    },
  },
  {
    name: "Perfume x1 \u2192 VFX: Holy Light",
    config: {
      trigger: { type: "gift", region: "eu", giftId: "perfume", minAmount: 1 },
      cooldownSeconds: 15,
      reaction: {
        text: "\u041e\u0445, \u043a\u0430\u043a\u043e\u0439 \u0430\u0440\u043e\u043c\u0430\u0442!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Holy_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Fireworks x1 \u2192 VFX: Sparkle Burst",
    config: {
      trigger: { type: "gift", region: "jp", giftId: "fireworks", minAmount: 1 },
      cooldownSeconds: 25,
      reaction: {
        text: "\u0424\u0435\u0439\u0435\u0440\u0432\u0435\u0440\u043a!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Basic_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Galaxy x1 \u2192 VFX: Wings 5 (Demon Shadow)",
    config: {
      trigger: { type: "gift", region: "global", giftId: "galaxy", minAmount: 1 },
      cooldownSeconds: 40,
      reaction: {
        text: "\u041a\u043e\u0441\u043c\u043e\u0441! \u041f\u0435\u0440\u0435\u043d\u043e\u0441\u0438\u043c\u0441\u044f!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Wing_5" }],
      },
      enabled: true,
    },
  },
  {
    name: "Universe x1 \u2192 VFX: Wings 1 (Golden Phoenix)",
    config: {
      trigger: { type: "gift", region: "global", giftId: "universe", minAmount: 1 },
      cooldownSeconds: 60,
      reaction: {
        text: "\u042d\u0442\u043e \u0442\u043e\u043f! \u041a\u0440\u044b\u043b\u044c\u044f!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Wing_1" }],
      },
      enabled: true,
    },
  },
  {
    name: "Money Gun x1 \u2192 Check Me Out I'm Cool",
    config: {
      trigger: { type: "gift", region: "us", giftId: "money_gun", minAmount: 1 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e! \u041f\u043e\u0431\u0435\u0434\u0430!",
        emotionTag: "confident",
        actions: [{ type: "play_animation", gender: "male", animationId: "AD_Check_Me_Out_Im_Cool_", label: "Check Me Out I'm Cool" }],
      },
      enabled: true,
    },
  },
  {
    name: "Likes x50 \u2192 Jumps For Joy",
    config: {
      trigger: { type: "likes", minLikes: 50 },
      cooldownSeconds: 8,
      reaction: {
        text: "\u0412\u0438\u0436\u0443 \u043b\u0430\u0439\u043a\u0438! \u041f\u0440\u0438\u0432\u0435\u0442!",
        emotionTag: "happy",
        actions: [{ type: "play_animation", gender: "female", animationId: "AD_Jumps_For_Joy", label: "Jumps For Joy" }],
      },
      enabled: true,
    },
  },
  {
    name: "Likes x200 \u2192 VFX: Plasma Core",
    config: {
      trigger: { type: "likes", minLikes: 200 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u041c\u043e\u0449\u043d\u043e! \u042d\u043d\u0435\u0440\u0433\u0438\u044f!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Scifi_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Repost x1 \u2192 Relief Dramatic",
    config: {
      trigger: { type: "reposts", minReposts: 1 },
      cooldownSeconds: 15,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0440\u0435\u043f\u043e\u0441\u0442!",
        emotionTag: "grateful",
        actions: [{ type: "play_animation", gender: "female", animationId: "AD_Relief_Dramatic", label: "Relief Dramatic" }],
      },
      enabled: true,
    },
  },
  {
    name: "Subscribe \u2192 VFX: Music Attract",
    config: {
      trigger: { type: "subscribe", minCount: 1 },
      cooldownSeconds: 30,
      reaction: {
        text: "\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 \u0441\u0435\u043c\u044c\u044e!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Music_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Follow \u2192 Oh Wow",
    config: {
      trigger: { type: "follow", minCount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0443!",
        emotionTag: "happy",
        actions: [{ type: "play_animation", gender: "male", animationId: "AD_Oh_Wow", label: "Oh Wow" }],
      },
      enabled: true,
    },
  },
  {
    name: "Teddy Bear x1 \u2192 Hysterical Laugh",
    config: {
      trigger: { type: "gift", region: "global", giftId: "teddy", minAmount: 1 },
      cooldownSeconds: 12,
      reaction: {
        text: "\u041e\u0443\u0443\u0443, \u043c\u0438\u0448\u043a\u0430!",
        emotionTag: "cute",
        actions: [{ type: "play_animation", gender: "female", animationId: "AD_Hysterical_Laugh", label: "Hysterical Laugh" }],
      },
      enabled: true,
    },
  },
  {
    name: "Coffee x1 \u2192 Serenity Stand",
    config: {
      trigger: { type: "gift", region: "global", giftId: "coffee", minAmount: 1 },
      cooldownSeconds: 10,
      reaction: {
        text: "\u041a\u043e\u0444\u0435\u0439\u043e\u0447\u0435\u043a! \u0421\u043f\u0430\u0441\u0438\u0431\u043e!",
        emotionTag: "relaxed",
        actions: [{ type: "play_animation", gender: "male", animationId: "AD_Serenity_Stand", label: "Serenity Stand" }],
      },
      enabled: true,
    },
  },
  {
    name: "Diamond x1 \u2192 VFX: Gold Coin",
    config: {
      trigger: { type: "gift", region: "global", giftId: "diamond", minAmount: 1 },
      cooldownSeconds: 20,
      reaction: {
        text: "\u0411\u043b\u0435\u0441\u043a!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Coin_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Sports Car x1 \u2192 VFX: Nature Bloom",
    config: {
      trigger: { type: "gift", region: "global", giftId: "sports_car", minAmount: 1 },
      cooldownSeconds: 25,
      reaction: {
        text: "\u041d\u0438\u0447\u0435\u0433\u043e \u0441\u0435\u0431\u0435 \u0442\u0430\u0447\u043a\u0430!",
        emotionTag: "excited",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Nature_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Lion x1 \u2192 VFX: Dark Magic (Eye)",
    config: {
      trigger: { type: "gift", region: "global", giftId: "lion", minAmount: 1 },
      cooldownSeconds: 60,
      reaction: {
        text: "\u041b\u0415\u0412! \u041f\u043e\u0435\u0445\u0430\u043b\u0438!",
        emotionTag: "wow",
        actions: [{ type: "unreal_trigger", triggerName: "NS_Eye_Attract" }],
      },
      enabled: true,
    },
  },
  {
    name: "Crown x1 \u2192 Excitable Fidgeting",
    config: {
      trigger: { type: "gift", region: "global", giftId: "crown", minAmount: 1 },
      cooldownSeconds: 18,
      reaction: {
        text: "\u041a\u043e\u0440\u043e\u043b\u0435\u0432\u0441\u043a\u0438!",
        emotionTag: "happy",
        actions: [{ type: "play_animation", gender: "female", animationId: "AD_Excitable_Fidgeting", label: "Excitable Fidgeting" }],
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
  const [vfxPickerOpen, setVfxPickerOpen] = useState(false);
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
      : ROXY_ANIMATIONS[0]?.id ?? "AD_Bouncy_Happy_Dramatic",
  );
  const [unrealTriggerName, setUnrealTriggerName] = useState(
    existingAction && existingAction.type === "unreal_trigger"
      ? existingAction.triggerName
      : UNREAL_TRIGGER_PRESETS[0] ?? "NS_Basic_Attract",
  );
  const [vfxDuration, setVfxDuration] = useState(
    existingAction && existingAction.type === "unreal_trigger"
      ? (existingAction as any).duration ?? 10
      : 10,
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
        : [{ type: "unreal_trigger", triggerName: unrealTriggerName.trim() || "NS_Basic_Attract", duration: vfxDuration }];

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
              ? `Gift: ${giftDisplayLabel({ giftId, resolved: resolvedGift })} \u00B7 min ${threshold}`
              : `Event: ${triggerType} \u00B7 min ${threshold}`} \u00B7 {actionSummary(buildConfig().reaction.actions)}
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
                      {r.code} \u2014 {r.name}
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
                    ? "Loading regions\u2026"
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
                      {resolvedCatalogId ? ` \u00B7 catalog id: ${resolvedCatalogId}` : ""}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setGiftPickerOpen(true)}
                    disabled={props.busy}
                  >
                    Choose\u2026
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
                    {ANIM_GROUPS.map((group) => {
                      const items = ROXY_ANIMATIONS.filter(group.filter);
                      if (items.length === 0) return null;
                      return (
                        <optgroup key={group.label} label={group.label}>
                          {items.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.label}
                            </option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>
                  <p className="mt-1 text-[11px] text-white/45">
                    {ROXY_ANIMATIONS.length} mocap animations from DA_RoxAnimCatalog.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2">
                  <p className="mb-1 text-[11px] font-medium text-white/70">Unreal trigger</p>

                  {/* VFX preview if a VFX is selected */}
                  {VFX_REGISTRY[unrealTriggerName as keyof typeof VFX_REGISTRY] ? (
                    <div className="mb-3 flex items-center gap-3 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 px-3 py-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={VFX_REGISTRY[unrealTriggerName as keyof typeof VFX_REGISTRY].thumb}
                        alt={VFX_REGISTRY[unrealTriggerName as keyof typeof VFX_REGISTRY].name}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white">
                          {VFX_REGISTRY[unrealTriggerName as keyof typeof VFX_REGISTRY].name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/55">
                          {unrealTriggerName} \u00B7 {VFX_REGISTRY[unrealTriggerName as keyof typeof VFX_REGISTRY].category === "wings" ? "\uD83E\uDD86 Wings" : "\u26A1 Sphere"}
                        </p>
                      </div>
                      <Button variant="ghost" onClick={() => setVfxPickerOpen(true)}>
                        Change
                      </Button>
                    </div>
                  ) : null}

                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex gap-2">
                      <select
                        value={unrealTriggerName}
                        onChange={(e) => setUnrealTriggerName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                      >
                        <optgroup label="Scene Presets">
                          {UNREAL_TRIGGER_PRESETS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="\uD83E\uDD86 VFX Wings">
                          {Object.entries(VFX_REGISTRY).filter(([,v]) => v.category === "wings").map(([bp, v]) => (
                            <option key={bp} value={bp}>{v.name} ({bp})</option>
                          ))}
                        </optgroup>
                        <optgroup label="\u26A1 VFX Sphere">
                          {Object.entries(VFX_REGISTRY).filter(([,v]) => v.category === "sphere").map(([bp, v]) => (
                            <option key={bp} value={bp}>{v.name} ({bp})</option>
                          ))}
                        </optgroup>
                      </select>
                      <Button
                        variant="secondary"
                        onClick={() => setVfxPickerOpen(true)}
                        disabled={props.busy}
                      >
                        VFX\u2026
                      </Button>
                    </div>
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

                  <VfxPickerModal
                    open={vfxPickerOpen}
                    selectedId={unrealTriggerName}
                    onPick={(bpName) => {
                      setUnrealTriggerName(bpName);
                      setVfxPickerOpen(false);
                    }}
                    onClose={() => setVfxPickerOpen(false)}
                  />
                  <div className="mt-3">
                    <p className="mb-1 text-[11px] font-medium text-white/70">Duration: {vfxDuration}s</p>
                    <input
                      type="range"
                      min={1}
                      max={60}
                      value={vfxDuration}
                      onChange={(e) => setVfxDuration(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                    <p className="mt-1 text-[11px] text-white/45">How long the VFX stays (1-60 seconds).</p>
                  </div>
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
      {/* Dark mode fix for native select/option elements */}
      <style>{`
        select option, select optgroup {
          background: #0A0F1A;
          color: #fff;
        }
      `}</style>
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
                      return `Trigger: ${giftLabel(trig.giftId)} \u00B7 min ${trig.minAmount} \u00B7 ${regionLabel}`;
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
