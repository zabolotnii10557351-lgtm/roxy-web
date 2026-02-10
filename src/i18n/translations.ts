import type { Locale } from "@/i18n/locales";

export type Translations = {
  common: {
    brand: string;
    dashboard: string;
    openDashboard: string;
    signIn: string;
    signOut: string;
    downloadDemo: string;
    back: string;
    comingSoon: string;
    preview: string;
    saved: string;
    now: string;
    loading: string;
    save: string;
    saving: string;
    thinking: string;
    generating: string;
    testing: string;
    connected: string;
    cancel: string;
    close: string;
    featureComingSoonDescription: string;
    proPerks: string;
    desktopOnlyTitle: string;
    desktopOnlyMessage: string;
    draftUpdated: string;
    published: string;
    planUpgradeRequired: string;
    creditsLimitReached: string;
  };
  nav: {
    home: string;
    useCases: string;
    pricing: string;
    docs: string;
    blog: string;
    about: string;
    contact: string;
    team: string;
    terms: string;
    privacy: string;
    cookies: string;
  };
  auth: {
    welcomeBack: string;
    createAccount: string;
    resetPassword: string;
    email: string;
    password: string;
    newPassword: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    passwordMin: string;
    createAccountDescription: string;
    signInDescription: string;
    resetDescription: string;
    captchaMissing: string;
    captchaError: string;
    captchaRequired: string;
    alreadyHaveAccount: string;
    newHere: string;
    forgotPassword: string;
    backToSignIn: string;
  };
  marketing: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    demoPrimary: string;
    demoSecondary: string;
    demoNote: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    featuresTitle: string;
    featuresSubtitle: string;
    useCasesTitle: string;
    useCasesSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    faqTitle: string;
    faqSubtitle: string;
  };
  app: {
    overview: string;
    overviewSubtitle: string;
    systemToastsTitle: string;
    systemToastsSubtitle: string;
    startSession: string;
    upgradeRequired: string;
    quickActions: string;
    createCharacter: string;
    setupDonoRules: string;
    deploy: string;
    generateShareLink: string;
    billing: string;
    billingSubtitle: string;
    referrals: string;
    notifications: string;
    currentPlan: string;
    managePlan: string;
    comparePlans: string;
    contactSales: string;
    remainingHours: string;
    unlimitedHours: string;
    promoCodeLabel: string;
    promoCodePlaceholder: string;
    promoCodeHelp: string;
    referralProgramTitle: string;
    referralProgramBody: string;
    referralProgramManage: string;
    referralHowTitle: string;
    referralHowLine1: string;
    referralHowLine2: string;
    referralHowLine3: string;
    referralHowLine4: string;
    referralInviteSubtitle: string;
    referralPromoTitle: string;
    referralPromoPlaceholder: string;
    referralPromoCreate: string;
    referralPromoCopy: string;
    referralBonusTitle: string;
    referralBonusClaim: string;
    referralBonusNeed: string;
    referralRegistrationsTitle: string;
    referralPurchasesTitle: string;
    referralNoSignups: string;
    referralNoPurchases: string;
    notificationsTitle: string;
    notificationsSubtitle: string;
    notificationsMarkAll: string;
    notificationsEmpty: string;
    notificationsMarkRead: string;
    billingSummary: string;
    nextInvoice: string;
    trialEnded: string;
    trialEndsIn: string;
    connectors: string;
    connectorsSubtitle: string;
    connectorsTiktokDescription: string;
    connectorsConnectTiktok: string;
    connectorsOpenSetupGuide: string;
    connectorsJoinWaitlist: string;
    connectorsEarlyAccessNote: string;
    connectorsMultiAccountTitle: string;
    connectorsMultiAccountDescription: string;
    connectorsMultiAccountBody: string;
    connectorsExampleRotationWindow: string;
    connectorsExampleMaxSessionsPerDay: string;
    deployTitle: string;
    deploySubtitle: string;
    settings: string;
    settingsSubtitle: string;
    characters: string;
    charactersSubtitle: string;
    noCharacters: string;
    characterBuilder: string;
    characterBuilderSubtitle: string;
    characterEditorTitle: string;
    characterEditorEnabledNote: string;
    characterEditorComingSoonNote: string;
    characterEditorSectionTitle: string;
    characterEditorEnabledDescription: string;
    characterEditorWaitlistDescription: string;
    polyphoriaModalDescription: string;
    donoEngine: string;
    donoEngineSubtitle: string;
    scripts: string;
    scriptsSubtitle: string;
    avatarScene: string;
    avatarSceneSubtitle: string;
    notFoundTitle: string;
    notFoundSubtitle: string;
    backToOverview: string;

    unrealConnector: string;
    localRuntime: string;
    diagnostics: string;

    unrealHubSubtitle: string;
    unrealGettingStartedTitle: string;
    unrealGettingStartedDescription: string;
    unrealImportMetahumanTitle: string;
    unrealLiveLinkFaceTitle: string;
    unrealManualSetupTitle: string;
    unrealRuntimeConnectorTitle: string;
    unrealOpenRuntimeConnectorButton: string;
    unrealBackToHubButton: string;
    unrealOpenDocsButton: string;

    billingSuccessTitle: string;
    billingSuccessVerifying: string;
    billingSuccessProcessing: string;
    billingSuccessConfirmedRedirecting: string;
    billingSuccessGoToDashboard: string;

    characterBuilderLiveNote: string;
    characterBuilderDraft: string;
    characterBuilderProfileTitle: string;
    characterBuilderCharacterNamePlaceholder: string;
    characterBuilderPrimaryLanguagePlaceholder: string;
    characterBuilderBioPlaceholder: string;
    characterBuilderVoiceTitle: string;
    characterBuilderVoiceProviderLabel: string;
    characterBuilderVoiceProviderOpenAIIncluded: string;
    characterBuilderVoiceProviderElevenLabsByok: string;
    characterBuilderVoiceIdLabel: string;
    characterBuilderVoiceIdPlaceholderElevenLabs: string;
    characterBuilderVoiceIdPlaceholderOpenAI: string;
    characterBuilderTestVoice: string;
    characterBuilderTestResponseTitle: string;
    characterBuilderTestResponseDescription: string;
    characterBuilderTestResponse: string;
    characterBuilderReplyLabel: string;
    characterBuilderNotesTitle: string;
    characterBuilderNotesDescription: string;
    characterBuilderNoWorkspaceConfigured: string;
    characterBuilderNotFound: string;
    characterBuilderTestResponseFailed: string;
    characterBuilderTestVoiceFailed: string;
    characterBuilderDefaultUserMessage: string;

    aiProvidersTitle: string;
    aiProvidersSubtitle: string;
    aiProvidersLoadFailed: string;
    aiProvidersSaveFailed: string;
    aiProvidersSaveKeyFailed: string;
    aiProvidersRemoveKeyFailed: string;
    aiProvidersKeySaved: string;
    aiProvidersKeyRemoved: string;
    aiProvidersBrainTestFailed: string;
    aiProvidersVoiceTestFailed: string;
    aiProvidersBrainProviderLabel: string;
    aiProvidersBrainProviderHelp: string;
    aiProvidersBrainModelLabel: string;
    aiProvidersCostEstimatorTitle: string;
    aiProvidersCostEstimatorBody: string;
    aiProvidersVoiceProviderLabel: string;
    aiProvidersVoiceProviderOpenAIIncluded: string;
    aiProvidersVoiceProviderElevenLabsByok: string;
    aiProvidersVoiceProviderElevenLabsNeedsKey: string;
    aiProvidersVoiceIdLabel: string;
    aiProvidersVoiceIdPlaceholderElevenLabs: string;
    aiProvidersSaveButton: string;
    aiProvidersTestBrainButton: string;
    aiProvidersTestVoiceButton: string;
    aiProvidersTestBrainResponseLabel: string;
    aiProvidersApiKeysTitle: string;
    aiProvidersOpenAiKeyLabel: string;
    aiProvidersElevenLabsKeyLabel: string;
    aiProvidersSaveKeyButton: string;
    aiProvidersReplaceKeyButton: string;
    aiProvidersRemoveKeyButton: string;
    aiProvidersKeysNotReturnedNote: string;

    settingsPageTitle: string;
    settingsProfileTitle: string;
    settingsDisplayNameLabel: string;
    settingsDisplayNameRequired: string;
    settingsUsernameOptionalLabel: string;
    settingsNoProfileFound: string;
    settingsWorkspaceTitle: string;
    settingsNoWorkspaceFound: string;
    settingsSignOutTitle: string;
    settingsSignOutDescription: string;

    unrealExportButton: string;
    unrealExportTitle: string;
    unrealExportDescription: string;
    unrealExportIncludeDonoRules: string;
    unrealExportIncludeScripts: string;
    unrealExportIncludeScenes: string;
    unrealExportFailed: string;
    unrealExportSavedTo: string;
    unrealExportGenerateDownload: string;
    unrealExportFile: string;
  };
  admin: {
    label: string;
    navOverview: string;
    navUsers: string;
    navPricing: string;
    navContent: string;
    navLeads: string;
    navAudit: string;
    navReleases: string;
    dashboardLink: string;

    overviewTitle: string;
    overviewSubtitle: string;
    totalUsers: string;
    totalUsersHelp: string;
    workspaces: string;
    workspacesHelp: string;
    activeSubscriptions: string;
    activeSubscriptionsHelp: string;
    usageEvents24h: string;
    usageEvents24hHelp: string;
    releasesCount: string;
    releasesCountHelp: string;

    usersTitle: string;
    usersSubtitle: string;
    tableEmail: string;
    tableRole: string;
    tablePlan: string;
    tableCreated: string;
    tableSave: string;
    buttonSave: string;
    roleUser: string;
    roleAdmin: string;
    planTrial: string;
    planPro: string;
    planStudio: string;
    planEnterprise: string;

    pricingTitle: string;
    pricingSubtitle: string;
    contentTitle: string;
    contentSubtitle: string;
    leadsTitle: string;
    leadsSubtitle: string;
    auditTitle: string;
    auditSubtitle: string;
    releasesTitle: string;

    errorUnknown: string;
    buttonRefresh: string;
    buttonPublish: string;
    buttonNew: string;
    buttonExportCsv: string;

    statusActive: string;
    statusDraft: string;
    statusPublished: string;
    pricingVersions: string;
    pricingNoVersions: string;
    pricingEditor: string;
    pricingEditingVersion: string;
    pricingSelectVersion: string;
    pricingRawJsonAdvanced: string;
    pricingYearlyDiscountPct: string;
    pricingDefaultTalkRatio: string;
    pricingMinTalkRatio: string;
    pricingMaxTalkRatio: string;
    pricingTooltipText: string;
    pricingPlans: string;
    pricingTablePlan: string;
    pricingTableMonthlyEur: string;
    pricingTableEntitlementsJson: string;
    pricingPlaceholderMonthlyEur: string;
    pricingPlaceholderEntitlementsJson: string;
    pricingTipValidation: string;

    contentSearchPlaceholder: string;
    contentNoBlocks: string;
    contentSelectBlock: string;
    contentSelectBlockError: string;
    contentMarkdown: string;
    contentPreview: string;
    contentMarkdownPlaceholder: string;

    leadsWaitlist: string;
    leadsContact: string;
    leadsInvestors: string;
    leadsShowingRows: string;
    leadsNoLeads: string;

    auditFilterActionPlaceholder: string;
    auditFilterTargetTypePlaceholder: string;
    auditShowingEntries: string;
    auditTime: string;
    auditAction: string;
    auditTarget: string;
    auditPayload: string;
    auditNoEntries: string;

    releasesVersion: string;
    releasesPlatform: string;
    releasesDownloadUrl: string;
    releasesNotes: string;
    releasesMarkLatest: string;
    releasesAddRelease: string;
    releasesUpdate: string;
    releasesDeleteRelease: string;
    releasesPlatformWindows: string;
    releasesPlatformMac: string;
    releasesPlaceholderVersion: string;
    releasesPlaceholderUrl: string;
    releasesPlaceholderNotes: string;
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Dashboard",
      openDashboard: "Open Dashboard",
      signIn: "Sign in",
      signOut: "Sign out",
      downloadDemo: "Download Demo",
      back: "Back",
      comingSoon: "Coming soon",
      preview: "Preview",
      saved: "Saved",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Draft updated",
      published: "Published",
      planUpgradeRequired: "Plan upgrade required",
      creditsLimitReached: "Credits limit reached. Buy more hours.",
    },
    nav: {
      home: "Home",
      useCases: "Cases",
      pricing: "Pricing",
      docs: "Guide",
      blog: "Blog",
      about: "About us",
      contact: "Contact",
      team: "Team",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "Welcome back",
      createAccount: "Create your account",
      resetPassword: "Reset your password",
      email: "Email",
      password: "Password",
      newPassword: "New password",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "At least 8 characters",
      createAccountDescription:
        "Start with a free trial and download the desktop app.",
      signInDescription: "Sign in to access your dashboard and downloads.",
      resetDescription: "We will send you a secure link to reset your password.",
      captchaMissing:
        "HCaptcha site key is missing. Add NEXT_PUBLIC_HCAPTCHA_SITE_KEY to .env.local.",
      captchaError: "Captcha error. Please refresh and try again.",
      captchaRequired: "Please complete the captcha verification.",
      alreadyHaveAccount: "Already have an account?",
      newHere: "New here?",
      forgotPassword: "Forgot password?",
      backToSignIn: "Back to sign in",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Launch AI-hosted streams in minutes.",
      heroSubtitle:
        "Create unique characters for your usage and take streaming to a whole new level without losing control.",
      demoPrimary: "Download demo",
      demoSecondary: "See pricing",
      demoNote: "Clear usage limits. Predictable costs. BYOK supported.",
      howItWorksTitle: "How it works",
      howItWorksSubtitle:
        "Create an account, connect your tools, and go live with guardrails.",
      featuresTitle: "Why teams choose RoxStreamAI",
      featuresSubtitle: "A reliable co-host loop with clear limits and Unreal-ready workflows.",
      useCasesTitle: "Use cases",
      useCasesSubtitle: "Real formats RoxStreamAI is built for.",
      ctaTitle: "Ready to run your first session?",
      ctaSubtitle:
        "Download the demo to try the Desktop companion. See pricing when you are ready to scale usage and concurrency.",
      ctaPrimary: "Download demo",
      ctaSecondary: "See pricing",
      faqTitle: "FAQ",
      faqSubtitle: "Quick answers about Desktop Mode, usage, and BYOK.",
    },
    app: {
      overview: "Overview",
      overviewSubtitle: "See your Active Speech and concurrency usage.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Start Session",
      upgradeRequired: "Upgrade required",
      quickActions: "Quick actions",
      createCharacter: "Create Character",
      setupDonoRules: "Setup Dono Rules",
      deploy: "Deploy",
      generateShareLink: "Generate Share Link",
      billing: "Billing",
      billingSubtitle: "Plans, usage, and invoices.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Current plan",
      managePlan: "Manage plan details and usage.",
      comparePlans: "Compare plans",
      contactSales: "Talk to sales",
      remainingHours: "Remaining active speech hours",
      unlimitedHours: "Unlimited active speech hours (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Billing summary",
      nextInvoice: "Next invoice: Feb 26, 2026",
      trialEnded: "Trial ended",
      trialEndsIn: "Trial ends in {days} days",
      connectors: "Stream Connectors",
      connectorsSubtitle: "Connect your channels and set concurrency limits.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Deploy",
      deploySubtitle: "Publish your session and go live in OBS.",
      settings: "Settings",
      settingsSubtitle: "Providers, keys, and workspace preferences.",
      characters: "Characters",
      charactersSubtitle: "Create and manage streamer personas.",
      noCharacters: "No characters yet. Create your first character to unlock streaming and Unreal export.",
      characterBuilder: "Character Builder",
      characterBuilderSubtitle: "Build a persona profile for your stream. You can change settings later.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle:
        "Build rules that react to gifts and donations.",
      scripts: "Stream Scripts",
      scriptsSubtitle: "Design the show flow with timed scripts and presets.",
      avatarScene: "Avatar + Scene",
      avatarSceneSubtitle: "Manage the visual layer for your AI streamer.",
      notFoundTitle: "Page not found",
      notFoundSubtitle: "This dashboard module is still in preview.",
      backToOverview: "Back to overview",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
  de: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Dashboard",
      openDashboard: "Dashboard öffnen",
      signIn: "Anmelden",
      signOut: "Abmelden",
      downloadDemo: "Demo herunterladen",
      back: "Zurück",
      comingSoon: "Demnächst",
      preview: "Vorschau",
      saved: "Gespeichert",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Entwurf aktualisiert",
      published: "Veröffentlicht",
      planUpgradeRequired: "Plan-Upgrade erforderlich",
      creditsLimitReached: "Credit-Limit erreicht. Mehr Stunden kaufen.",
    },
    nav: {
      home: "Start",
      useCases: "Anwendungsfälle",
      pricing: "Preise",
      docs: "Dokumentation",
      blog: "Blog",
      about: "Über uns",
      contact: "Kontakt",
      team: "Team",
      terms: "AGB",
      privacy: "Datenschutz",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "Willkommen zurück",
      createAccount: "Konto erstellen",
      resetPassword: "Passwort zurücksetzen",
      email: "E-Mail",
      password: "Passwort",
      newPassword: "Neues Passwort",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "Mindestens 8 Zeichen",
      createAccountDescription:
        "Starte mit einer kostenlosen Testphase und lade die Desktop-App herunter.",
      signInDescription:
        "Melde dich an, um Dashboard und Downloads zu nutzen.",
      resetDescription:
        "Wir senden dir einen sicheren Link zum Zurücksetzen.",
      captchaMissing:
        "HCaptcha-Schlüssel fehlt. Füge NEXT_PUBLIC_HCAPTCHA_SITE_KEY in .env.local hinzu.",
      captchaError: "Captcha-Fehler. Bitte aktualisieren und erneut versuchen.",
      captchaRequired: "Bitte die Captcha-Prüfung abschließen.",
      alreadyHaveAccount: "Schon ein Konto?",
      newHere: "Neu hier?",
      forgotPassword: "Passwort vergessen?",
      backToSignIn: "Zurück zur Anmeldung",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Starte einen KI-Streamer in 10 Minuten.",
      heroSubtitle:
        "Roxy liest den Chat, reagiert auf Geschenke, führt Show-Skripte aus und kann 24/7 streamen. Für TikTok Live heute, Twitch und YouTube als Nächstes.",
      demoPrimary: "Demo herunterladen",
      demoSecondary: "45s Demo ansehen",
      demoNote:
        "Pro-Plan funktioniert sofort mit Credits. Basic unterstützt BYOK.",
      howItWorksTitle: "Von null zu live in drei Schritten",
      howItWorksSubtitle:
        "Alles, was du brauchst, um einen steuerbaren KI-Streamer zu starten.",
      featuresTitle: "Premium-Automation",
      featuresSubtitle:
        "Für Retention-Loops, Sicherheit und lange Sessions entwickelt.",
      useCasesTitle: "Für moderne Live-Formate",
      useCasesSubtitle:
        "Eine Plattform für Creator, faceless Formate und агентuren.",
      ctaTitle: "Bereit, es in Aktion zu sehen?",
      ctaSubtitle: "Starte mit einer Testphase oder vergleiche Pläne.",
      ctaPrimary: "Kostenlose Testphase",
      ctaSecondary: "Preise ansehen",
      faqTitle: "Schnelle Antworten",
      faqSubtitle: "Alles zu Plänen und Nutzung.",
    },
    app: {
      overview: "Übersicht",
      overviewSubtitle: "Live-Status, Limits und Schnellaktionen.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Session starten",
      upgradeRequired: "Upgrade erforderlich",
      quickActions: "Schnellaktionen",
      createCharacter: "Charakter erstellen",
      setupDonoRules: "Dono-Regeln einrichten",
      deploy: "Bereitstellen",
      generateShareLink: "Share-Link generieren",
      billing: "Abrechnung",
      billingSubtitle: "Verwalte Plan, Credits und Add-ons.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Aktueller Plan",
      managePlan: "Plan-Details und Nutzung verwalten.",
      comparePlans: "Pläne vergleichen",
      contactSales: "Vertrieb kontaktieren",
      remainingHours: "Verbleibende aktive Sprachstunden",
      unlimitedHours: "Unbegrenzte aktive Sprachstunden (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Abrechnungsübersicht",
      nextInvoice: "Nächste Rechnung: 26. Feb 2026",
      trialEnded: "Testphase beendet",
      trialEndsIn: "Testphase endet in {days} Tagen",
      connectors: "Stream-Connectors",
      connectorsSubtitle:
        "Verbinde TikTok heute. Twitch und YouTube als Nächstes.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Bereitstellen",
      deploySubtitle: "Session veröffentlichen und in OBS live gehen.",
      settings: "Einstellungen",
      settingsSubtitle: "Workspace-Einstellungen und Export-Tools.",
      characters: "Charaktere",
      charactersSubtitle: "Verwalte deine KI-Streamer-Personas.",
      noCharacters: "Noch keine Charaktere. Erstelle deine erste Persona.",
      characterBuilder: "Character Builder",
      characterBuilderSubtitle:
        "Persona, Stimme und Verhalten deines KI-Streamers erstellen.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle:
        "Regeln erstellen, die auf Geschenke reagieren.",
      scripts: "Stream Scripts",
      scriptsSubtitle: "Show-Abläufe mit Skripten planen.",
      avatarScene: "Avatar + Szene",
      avatarSceneSubtitle:
        "Verwalte die visuelle Ebene deines KI-Streamers.",
      notFoundTitle: "Seite не найдена",
      notFoundSubtitle: "Dieses Modul ist noch im Preview.",
      backToOverview: "Zurück zur Übersicht",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
  es: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Panel",
      openDashboard: "Abrir panel",
      signIn: "Iniciar sesión",
      signOut: "Cerrar sesión",
      downloadDemo: "Descargar demo",
      back: "Volver",
      comingSoon: "Próximamente",
      preview: "Vista previa",
      saved: "Guardado",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Borrador actualizado",
      published: "Publicado",
      planUpgradeRequired: "Actualización de plan requerida",
      creditsLimitReached: "Límite de créditos alcanzado. Comprar más horas.",
    },
    nav: {
      home: "Inicio",
      useCases: "Casos de uso",
      pricing: "Precios",
      docs: "Docs",
      blog: "Blog",
      about: "Acerca de",
      contact: "Contacto",
      team: "Equipo",
      terms: "Términos",
      privacy: "Privacidad",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "Bienvenido de nuevo",
      createAccount: "Crear cuenta",
      resetPassword: "Restablecer contraseña",
      email: "Correo",
      password: "Contraseña",
      newPassword: "Nueva contraseña",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "Mínimo 8 caracteres",
      createAccountDescription:
        "Comienza con una prueba gratuita y descarga la app de escritorio.",
      signInDescription:
        "Inicia sesión para acceder al panel y las descargas.",
      resetDescription:
        "Te enviaremos un enlace seguro para restablecerla.",
      captchaMissing:
        "Falta la clave de HCaptcha. Agrega NEXT_PUBLIC_HCAPTCHA_SITE_KEY en .env.local.",
      captchaError: "Error de captcha. Actualiza y vuelve a intentarlo.",
      captchaRequired: "Completa la verificación de captcha.",
      alreadyHaveAccount: "¿Ya tienes cuenta?",
      newHere: "¿Nuevo aquí?",
      forgotPassword: "¿Olvidaste tu contraseña?",
      backToSignIn: "Volver a iniciar sesión",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Lanza un streamer de IA en 10 minutos.",
      heroSubtitle:
        "Roxy lee el chat, reacciona a regalos, ejecuta guiones y puede emitir 24/7. Para TikTok Live hoy, Twitch y YouTube después.",
      demoPrimary: "Descargar demo",
      demoSecondary: "Ver demo de 45s",
      demoNote:
        "El plan Pro funciona listo con créditos incluidos. Basic soporta BYOK.",
      howItWorksTitle: "De cero a en vivo en tres pasos",
      howItWorksSubtitle:
        "Todo lo necesario para lanzar un streamer de IA controlable.",
      featuresTitle: "Automatización premium",
      featuresSubtitle:
        "Diseñado para retención, seguridad y sesiones largas.",
      useCasesTitle: "Hecho para formatos en vivo modernos",
      useCasesSubtitle:
        "Una plataforma para creadores, formatos sin rostro y agencias.",
      ctaTitle: "¿Listo para verlo en acción?",
      ctaSubtitle:
        "Comienza con una prueba gratuita o compara planes en minutos.",
      ctaPrimary: "Iniciar prueba",
      ctaSecondary: "Ver precios",
      faqTitle: "Respuestas rápidas",
      faqSubtitle: "Todo sobre planes y uso.",
    },
    app: {
      overview: "Resumen",
      overviewSubtitle: "Estado en vivo, límites y acciones rápidas.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Iniciar sesión",
      upgradeRequired: "Se requiere actualización",
      quickActions: "Acciones rápidas",
      createCharacter: "Crear personaje",
      setupDonoRules: "Configurar reglas Dono",
      deploy: "Implementar",
      generateShareLink: "Generar enlace",
      billing: "Facturación",
      billingSubtitle: "Gestiona plan, créditos y add-ons.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Plan actual",
      managePlan: "Gestionar plan y uso.",
      comparePlans: "Comparar planes",
      contactSales: "Contactar ventas",
      remainingHours: "Horas de voz restantes",
      unlimitedHours: "Horas ilimitadas (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Resumen de facturación",
      nextInvoice: "Próxima factura: 26 Feb 2026",
      trialEnded: "Prueba finalizada",
      trialEndsIn: "La prueba termina en {days} días",
      connectors: "Conectores de stream",
      connectorsSubtitle:
        "Conecta TikTok hoy. Twitch y YouTube próximamente.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Implementación",
      deploySubtitle: "Publica tu sesión y ve en vivo en OBS.",
      settings: "Configuración",
      settingsSubtitle: "Preferencias del workspace y exportación.",
      characters: "Personajes",
      charactersSubtitle: "Gestiona tus personas de streamer AI.",
      noCharacters: "No hay personajes. Crea tu primera persona.",
      characterBuilder: "Constructor de персонажи",
      characterBuilderSubtitle:
        "Crea la persona, voz y comportamiento de tu streamer de IA.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle: "Reglas que reaccionan a regalos y donaciones.",
      scripts: "Guiones",
      scriptsSubtitle: "Diseña el flujo con guiones y presets.",
      avatarScene: "Avatar + Escena",
      avatarSceneSubtitle: "Gestiona la capa visual del streamer.",
      notFoundTitle: "Página no encontrada",
      notFoundSubtitle: "Este módulo está en vista previa.",
      backToOverview: "Volver al resumen",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
  fr: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Tableau de bord",
      openDashboard: "Ouvrir le tableau",
      signIn: "Se connecter",
      signOut: "Se déconnecter",
      downloadDemo: "Télécharger la démo",
      back: "Retour",
      comingSoon: "Bientôt",
      preview: "Aperçu",
      saved: "Enregistré",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Brouillon mis à jour",
      published: "Publié",
      planUpgradeRequired: "Mise à niveau requise",
      creditsLimitReached: "Limite de crédits atteinte. Acheter plus d'heures.",
    },
    nav: {
      home: "Accueil",
      useCases: "Cas d'usage",
      pricing: "Tarifs",
      docs: "Docs",
      blog: "Blog",
      about: "À propos",
      contact: "Contact",
      team: "Équipe",
      terms: "Conditions",
      privacy: "Confidentialité",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "Bon retour",
      createAccount: "Créer un compte",
      resetPassword: "Réinitialiser le mot de passe",
      email: "Email",
      password: "Mot de passe",
      newPassword: "Nouveau mot de passe",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "Au moins 8 caractères",
      createAccountDescription:
        "Commencez avec un essai gratuit et téléchargez l'application.",
      signInDescription:
        "Connectez-vous pour accéder au tableau et aux téléchargements.",
      resetDescription:
        "Nous enverrons un lien sécurisé pour réinitialiser.",
      captchaMissing:
        "Clé HCaptcha manquante. Ajoutez NEXT_PUBLIC_HCAPTCHA_SITE_KEY dans .env.local.",
      captchaError: "Erreur de captcha. Actualisez et réessayez.",
      captchaRequired: "Veuillez compléter le captcha.",
      alreadyHaveAccount: "Déjà un compte ?",
      newHere: "Nouveau ici ?",
      forgotPassword: "Mot de passe oublié ?",
      backToSignIn: "Retour à la connexion",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Lancez un streamer IA en 10 minutes.",
      heroSubtitle:
        "Roxy lit le chat, réagit aux cadeaux, exécute des scripts et peut streamer 24/7. Pour TikTok Live aujourd'hui, Twitch et YouTube ensuite.",
      demoPrimary: "Télécharger la démo",
      demoSecondary: "Voir la démo de 45s",
      demoNote:
        "Le plan Pro fonctionne immédiatement avec des crédits inclus. Basic prend en charge BYOK.",
      howItWorksTitle: "De zéro au live en trois étapes",
      howItWorksSubtitle:
        "Tout pour lancer un streamer IA contrôlable.",
      featuresTitle: "Automatisation premium",
      featuresSubtitle:
        "Conçu pour la rétention, la sécurité et les longues sessions.",
      useCasesTitle: "Pour les formats live modernes",
      useCasesSubtitle:
        "Une plateforme pour créateurs, formats sans visage et agences.",
      ctaTitle: "Prêt à voir ça en action ?",
      ctaSubtitle: "Commencez par un essai gratuit ou comparez les plans.",
      ctaPrimary: "Démarrer l'essai",
      ctaSecondary: "Voir les tarifs",
      faqTitle: "Réponses rapides",
      faqSubtitle: "Tout sur les plans et l'usage.",
    },
    app: {
      overview: "Aperçu",
      overviewSubtitle: "Statut live, limites et actions rapides.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Démarrer la session",
      upgradeRequired: "Mise à niveau requise",
      quickActions: "Actions rapides",
      createCharacter: "Créer un персонаж",
      setupDonoRules: "Configurer les règles Dono",
      deploy: "Déployer",
      generateShareLink: "Générer un lien",
      billing: "Facturation",
      billingSubtitle: "Gérer plan, crédits et add-ons.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Plan actuel",
      managePlan: "Gérer le plan et l'usage.",
      comparePlans: "Comparer les plans",
      contactSales: "Contacter les ventes",
      remainingHours: "Heures restantes",
      unlimitedHours: "Heures illimitées (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Résumé de facturation",
      nextInvoice: "Prochaine facture : 26 fév 2026",
      trialEnded: "Essai terminé",
      trialEndsIn: "L'essai se termine dans {days} jours",
      connectors: "Connecteurs de stream",
      connectorsSubtitle:
        "Connectez TikTok aujourd'hui. Twitch et YouTube ensuite.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Déploiement",
      deploySubtitle: "Publiez votre session et passez live dans OBS.",
      settings: "Paramètres",
      settingsSubtitle: "Préférences workspace et export.",
      characters: "Personnages",
      charactersSubtitle: "Gérez vos personas de streamer IA.",
      noCharacters: "Aucun personnage. Créez votre première persona.",
      characterBuilder: "Character Builder",
      characterBuilderSubtitle:
        "Créez la persona, la voix et le comportement de votre streamer IA.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle: "Règles qui réagissent aux cadeaux.",
      scripts: "Scripts",
      scriptsSubtitle: "Concevez le flux avec scripts et presets.",
      avatarScene: "Avatar + Scène",
      avatarSceneSubtitle: "Gérez la couche visuelle du streamer.",
      notFoundTitle: "Page introuvable",
      notFoundSubtitle: "Ce module est encore en aperçu.",
      backToOverview: "Retour à l'aperçu",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
  it: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Dashboard",
      openDashboard: "Apri dashboard",
      signIn: "Accedi",
      signOut: "Esci",
      downloadDemo: "Scarica demo",
      back: "Indietro",
      comingSoon: "In arrivo",
      preview: "Anteprima",
      saved: "Salvato",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Bozza aggiornata",
      published: "Pubblicato",
      planUpgradeRequired: "Aggiornamento piano richiesto",
      creditsLimitReached: "Limite crediti raggiunto. Acquista più ore.",
    },
    nav: {
      home: "Home",
      useCases: "Casi d'uso",
      pricing: "Prezzi",
      docs: "Docs",
      blog: "Blog",
      about: "Chi siamo",
      contact: "Contatto",
      team: "Team",
      terms: "Termini",
      privacy: "Privacy",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "Bentornato",
      createAccount: "Crea account",
      resetPassword: "Reimposta password",
      email: "Email",
      password: "Password",
      newPassword: "Nuova password",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "Almeno 8 caratteri",
      createAccountDescription:
        "Inizia con una prova gratuita e scarica l'app desktop.",
      signInDescription:
        "Accedi per usare dashboard e download.",
      resetDescription: "Ti invieremo un link sicuro per ripristinare.",
      captchaMissing:
        "Manca la chiave HCaptcha. Aggiungi NEXT_PUBLIC_HCAPTCHA_SITE_KEY in .env.local.",
      captchaError: "Errore captcha. Aggiorna e riprova.",
      captchaRequired: "Completa la verifica captcha.",
      alreadyHaveAccount: "Hai già un account?",
      newHere: "Nuovo qui?",
      forgotPassword: "Password dimenticata?",
      backToSignIn: "Torna al login",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Lancia uno streamer AI in 10 minuti.",
      heroSubtitle:
        "Roxy legge la chat, reagisce ai regali, esegue script e può streamare 24/7. Per TikTok Live oggi, Twitch e YouTube dopo.",
      demoPrimary: "Scarica demo",
      demoSecondary: "Guarda demo 45s",
      demoNote:
        "Il piano Pro funziona subito con crediti inclusi. Basic supporta BYOK.",
      howItWorksTitle: "Da zero a live in tre шаги",
      howItWorksSubtitle:
        "Tutto ciò che serve per lanciare uno streamer AI controllabile.",
      featuresTitle: "Automazione premium",
      featuresSubtitle:
        "Progettato per retention, sicurezza e sessioni lunghe.",
      useCasesTitle: "Per formati live moderni",
      useCasesSubtitle:
        "Una piattaforma per creator, formati faceless e agenzie.",
      ctaTitle: "Pronto a vederlo in azione?",
      ctaSubtitle:
        "Inizia con una prova gratuita o confronta i piani in pochi minuti.",
      ctaPrimary: "Inizia prova",
      ctaSecondary: "Vedi prezzi",
      faqTitle: "Risposte rapide",
      faqSubtitle: "Tutto su piani e utilizzo.",
    },
    app: {
      overview: "Panoramica",
      overviewSubtitle: "Stato live, limiti e azioni rapide.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Avvia sessione",
      upgradeRequired: "Aggiornamento richiesto",
      quickActions: "Azioni rapide",
      createCharacter: "Crea personaggio",
      setupDonoRules: "Configura regole Dono",
      deploy: "Distribuisci",
      generateShareLink: "Genera link",
      billing: "Fatturazione",
      billingSubtitle: "Gestisci piano, crediti e add-on.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Piano attuale",
      managePlan: "Gestisci piano e utilizzo.",
      comparePlans: "Confronta piani",
      contactSales: "Contatta vendite",
      remainingHours: "Ore rimanenti",
      unlimitedHours: "Ore illimitate (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Riepilogo fatturazione",
      nextInvoice: "Prossima fattura: 26 feb 2026",
      trialEnded: "Prova terminata",
      trialEndsIn: "La prova termina tra {days} giorni",
      connectors: "Connettori streaming",
      connectorsSubtitle:
        "Connetti TikTok oggi. Twitch e YouTube più avanti.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Deploy",
      deploySubtitle: "Pubblica la sessione e vai live in OBS.",
      settings: "Impostazioni",
      settingsSubtitle: "Preferenze workspace ed export.",
      characters: "Personaggi",
      charactersSubtitle: "Gestisci le personas di streamer AI.",
      noCharacters: "Nessun personaggio. Crea il primo.",
      characterBuilder: "Character Builder",
      characterBuilderSubtitle:
        "Crea la persona, la voce e il comportamento del tuo streamer AI.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle: "Regole che reagiscono ai regali.",
      scripts: "Script",
      scriptsSubtitle: "Disegna il flusso con script e preset.",
      avatarScene: "Avatar + Scena",
      avatarSceneSubtitle: "Gestisci il livello visivo dello streamer.",
      notFoundTitle: "Pagina non trovata",
      notFoundSubtitle: "Questo modulo è ancora in anteprima.",
      backToOverview: "Torna alla panoramica",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
  pt: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Painel",
      openDashboard: "Abrir painel",
      signIn: "Entrar",
      signOut: "Sair",
      downloadDemo: "Baixar demo",
      back: "Voltar",
      comingSoon: "Em breve",
      preview: "Prévia",
      saved: "Salvo",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Rascunho atualizado",
      published: "Publicado",
      planUpgradeRequired: "Upgrade de plano necessário",
      creditsLimitReached: "Limite de créditos atingido. Compre mais horas.",
    },
    nav: {
      home: "Início",
      useCases: "Casos de uso",
      pricing: "Preços",
      docs: "Docs",
      blog: "Blog",
      about: "Sobre",
      contact: "Contato",
      team: "Equipe",
      terms: "Termos",
      privacy: "Privacidade",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "Bem-vindo de volta",
      createAccount: "Criar conta",
      resetPassword: "Redefinir senha",
      email: "Email",
      password: "Senha",
      newPassword: "Nova senha",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "Pelo menos 8 caracteres",
      createAccountDescription:
        "Comece com um teste gratuito e baixe o app desktop.",
      signInDescription:
        "Entre para acessar painel e downloads.",
      resetDescription: "Enviaremos um link seguro para redefinir.",
      captchaMissing:
        "Chave HCaptcha ausente. Adicione NEXT_PUBLIC_HCAPTCHA_SITE_KEY em .env.local.",
      captchaError: "Erro de captcha. Atualize e tente novamente.",
      captchaRequired: "Conclua a verificação do captcha.",
      alreadyHaveAccount: "Já tem conta?",
      newHere: "Novo aqui?",
      forgotPassword: "Esqueceu a senha?",
      backToSignIn: "Voltar para login",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Lance um streamer de IA em 10 minutos.",
      heroSubtitle:
        "Roxy lê o chat, reage a presentes, executa scripts e pode transmitir 24/7. TikTok Live hoje, Twitch e YouTube depois.",
      demoPrimary: "Baixar demo",
      demoSecondary: "Ver demo 45s",
      demoNote:
        "Plano Pro funciona imediatamente com créditos inclusos. Basic suporta BYOK.",
      howItWorksTitle: "Do zero ao live em três passos",
      howItWorksSubtitle:
        "Tudo para lançar um streamer de IA controlável.",
      featuresTitle: "Automação premium",
      featuresSubtitle:
        "Projetado para retenção, segurança e sessões longas.",
      useCasesTitle: "Para formatos live modernos",
      useCasesSubtitle:
        "Uma plataforma para criadores, formatos faceless e agências.",
      ctaTitle: "Pronto para ver em ação?",
      ctaSubtitle:
        "Comece com um teste gratuito ou compare planos.",
      ctaPrimary: "Iniciar teste",
      ctaSecondary: "Ver preços",
      faqTitle: "Respostas rápidas",
      faqSubtitle: "Tudo sobre planos e uso.",
    },
    app: {
      overview: "Visão geral",
      overviewSubtitle: "Status ao vivo, limites e ações rápidas.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Iniciar sessão",
      upgradeRequired: "Upgrade necessário",
      quickActions: "Ações rápidas",
      createCharacter: "Criar personagem",
      setupDonoRules: "Configurar regras Dono",
      deploy: "Deploy",
      generateShareLink: "Gerar link",
      billing: "Faturamento",
      billingSubtitle: "Gerencie plano, créditos e add-ons.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Plano atual",
      managePlan: "Gerenciar plano e uso.",
      comparePlans: "Comparar planos",
      contactSales: "Falar com vendas",
      remainingHours: "Horas restantes",
      unlimitedHours: "Horas ilimitadas (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Resumo da fatura",
      nextInvoice: "Próxima fatura: 26 Fev 2026",
      trialEnded: "Teste encerrado",
      trialEndsIn: "O teste termina em {days} dias",
      connectors: "Conectores de stream",
      connectorsSubtitle:
        "Conecte TikTok hoje. Twitch e YouTube depois.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Deploy",
      deploySubtitle: "Publique sua sessão e faça live no OBS.",
      settings: "Configurações",
      settingsSubtitle: "Preferências do workspace e exportação.",
      characters: "Personagens",
      charactersSubtitle: "Gerencie personas de streamer AI.",
      noCharacters: "Nenhum personagem. Crie o primeiro.",
      characterBuilder: "Character Builder",
      characterBuilderSubtitle:
        "Crie a persona, voz e comportamento do streamer AI.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle: "Regras que reagem a presentes e doações.",
      scripts: "Scripts",
      scriptsSubtitle: "Desenhe o fluxo com scripts e presets.",
      avatarScene: "Avatar + Cena",
      avatarSceneSubtitle: "Gerencie a camada visual do streamer.",
      notFoundTitle: "Página não encontrada",
      notFoundSubtitle: "Este módulo ainda está em preview.",
      backToOverview: "Voltar ao overview",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
  ru: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Кабинет",
      openDashboard: "Открыть кабинет",
      signIn: "Войти",
      signOut: "Выйти",
      downloadDemo: "Скачать демо",
      back: "Назад",
      comingSoon: "Скоро",
      preview: "Превью",
      saved: "Сохранено",
      now: "сейчас",
      loading: "Загрузка…",
      save: "Сохранить",
      saving: "Сохранение…",
      thinking: "Думаю…",
      generating: "Генерирую…",
      testing: "Проверяю…",
      connected: "Подключено",
      cancel: "Отмена",
      close: "Закрыть",
      featureComingSoonDescription: "Эта функция скоро будет доступна.",
      proPerks: "Преимущества Pro",
      desktopOnlyTitle: "Только для Desktop",
      desktopOnlyMessage: "Этот раздел доступен в приложении RoxStreamAI Desktop.",
      draftUpdated: "Черновик обновлен",
      published: "Опубликовано",
      planUpgradeRequired: "Требуется апгрейд тарифа",
      creditsLimitReached: "Лимит кредитов исчерпан. Купите больше часов.",
    },
    nav: {
      home: "Главная",
      useCases: "Кейсы",
      pricing: "Тарифы",
      docs: "Гайд",
      blog: "Блог",
      about: "О нас",
      contact: "Контакты",
      team: "Команда",
      terms: "Условия",
      privacy: "Конфиденциальность",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "С возвращением",
      createAccount: "Создать аккаунт",
      resetPassword: "Сбросить пароль",
      email: "Email",
      password: "Пароль",
      newPassword: "Новый пароль",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "Минимум 8 символов",
      createAccountDescription:
        "Начните с бесплатного триала и скачайте десктоп-приложение.",
      signInDescription:
        "Войдите, чтобы получить доступ к кабинету и загрузкам.",
      resetDescription:
        "Мы отправим безопасную ссылку для сброса пароля.",
      captchaMissing:
        "Отсутствует ключ HCaptcha. Добавьте NEXT_PUBLIC_HCAPTCHA_SITE_KEY в .env.local.",
      captchaError: "Ошибка captcha. Обновите и попробуйте снова.",
      captchaRequired: "Пожалуйста, завершите проверку captcha.",
      alreadyHaveAccount: "Уже есть аккаунт?",
      newHere: "Впервые здесь?",
      forgotPassword: "Забыли пароль?",
      backToSignIn: "Назад ко входу",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Запустите AI‑ведущего для стримов за считанные минуты.",
      heroSubtitle:
        "Создавайте уникальных персонажей под свой формат и выводите стриминг на новый уровень, не теряя контроля.",
      demoPrimary: "Скачать демо",
      demoSecondary: "Смотреть тарифы",
      demoNote: "Понятные лимиты. Предсказуемая стоимость. BYOK поддерживается.",
      howItWorksTitle: "Как это работает",
      howItWorksSubtitle:
        "Создайте аккаунт, подключите инструменты и запускайте с guardrails.",
      featuresTitle: "Почему выбирают RoxStreamAI",
      featuresSubtitle:
        "Надёжный co‑host‑цикл с понятными лимитами и Unreal‑готовыми workflow.",
      useCasesTitle: "Для современных live-форматов",
      useCasesSubtitle:
        "Одна платформа для авторов, faceless-форматов и агентств.",
      ctaTitle: "Готовы увидеть в действии?",
      ctaSubtitle: "Начните с триала или сравните тарифы.",
      ctaPrimary: "Скачать демо",
      ctaSecondary: "Смотреть тарифы",
      faqTitle: "Быстрые ответы",
      faqSubtitle: "Все о тарифах и лимитах.",
    },
    app: {
      overview: "Обзор",
      overviewSubtitle: "Статус, лимиты и быстрые действия.",
      systemToastsTitle: "Системные уведомления",
      systemToastsSubtitle: "Последние обновления в воркспейсе.",
      startSession: "Начать сессию",
      upgradeRequired: "Требуется апгрейд",
      quickActions: "Быстрые действия",
      createCharacter: "Создать персонажа",
      setupDonoRules: "Настроить Dono Rules",
      deploy: "Развертывание",
      generateShareLink: "Сгенерировать ссылку",
      billing: "Биллинг",
      billingSubtitle: "Управляйте тарифом, кредитами и аддонами.",
      referrals: "Рефералы",
      notifications: "Уведомления",
      currentPlan: "Текущий тариф",
      managePlan: "Управление тарифом и лимитами.",
      comparePlans: "Сравнить тарифы",
      contactSales: "Связаться с sales",
      remainingHours: "Оставшиеся активные часы",
      unlimitedHours: "Безлимитные активные часы (BYOK).",
      promoCodeLabel: "Промокод",
      promoCodePlaceholder: "Введите промокод",
      promoCodeHelp: "Используйте реферальный код, чтобы получить бонусные часы Active Speech после оплаты.",
      referralProgramTitle: "Реферальная программа",
      referralProgramBody: "Поделитесь промокодом и получайте бонусные часы Active Speech для себя и приглашенных.",
      referralProgramManage: "Управлять рефералами",
      referralHowTitle: "Как это работает",
      referralHowLine1: "Пользователи, которые вводят ваш код, получают бонусные часы Active Speech после оплаты.",
      referralHowLine2: "Starter: +1ч. Creator: +2ч. Pro: +5ч. Studio: +10ч. Scale: +20ч.",
      referralHowLine3: "Каждые 3 покупки (Creator или выше) дают вам 4 часа.",
      referralHowLine4: "Бонус 4 часа можно получать снова за каждые следующие 3 покупки.",
      referralInviteSubtitle: "Приглашайте пользователей и получайте бонусные часы Active Speech.",
      referralPromoTitle: "Ваш промокод",
      referralPromoPlaceholder: "Придумайте промокод",
      referralPromoCreate: "Создать промокод",
      referralPromoCopy: "Скопировать реферальную ссылку",
      referralBonusTitle: "Прогресс бонусов",
      referralBonusClaim: "Забрать бонус 4ч",
      referralBonusNeed: "Нужно 3 покупки, чтобы забрать бонус.",
      referralRegistrationsTitle: "Регистрации",
      referralPurchasesTitle: "Покупки",
      referralNoSignups: "Пока нет регистраций.",
      referralNoPurchases: "Пока нет покупок.",
      notificationsTitle: "Уведомления",
      notificationsSubtitle: "Обновления по лимитам, бонусам и биллингу.",
      notificationsMarkAll: "Отметить все прочитанными",
      notificationsEmpty: "Уведомлений пока нет.",
      notificationsMarkRead: "Прочитано",
      billingSummary: "Сводка",
      nextInvoice: "Следующий счет: 26 фев 2026",
      trialEnded: "Триал завершён",
      trialEndsIn: "Триал закончится через {days} дней",
      connectors: "Коннекторы",
      connectorsSubtitle:
        "Подключите TikTok сегодня. Twitch и YouTube далее.",
      connectorsTiktokDescription:
        "Коннекторы настраиваются через Desktop-компаньон. Этот дашборд будет показывать статус, когда API коннекторов будут включены.",
      connectorsConnectTiktok: "Подключить TikTok",
      connectorsOpenSetupGuide: "Открыть гайд по настройке",
      connectorsJoinWaitlist:
        "Запишитесь в лист ожидания, чтобы получить ранний доступ.",
      connectorsEarlyAccessNote: "Ранний доступ сначала для Pro и Studio.",
      connectorsMultiAccountTitle: "Планировщик мульти-аккаунтов",
      connectorsMultiAccountDescription:
        "Доступно в Pro+. Ротация нескольких аккаунтов по правилам расписания.",
      connectorsMultiAccountBody:
        "Этот модуль в превью. После включения вы сможете ротировать аккаунты по расписанию и лимитам.",
      connectorsExampleRotationWindow: "Пример: окно ротации — каждые 4 часа",
      connectorsExampleMaxSessionsPerDay: "Пример: максимум сессий в день — 3",
      deployTitle: "Deploy",
      deploySubtitle: "Опубликуйте сессию и выходите в эфир в OBS.",
      settings: "Настройки",
      settingsSubtitle: "Параметры воркспейса и экспорт.",
      characters: "Персонажи",
      charactersSubtitle: "Управляйте персонами AI-стримеров.",
      noCharacters: "Персонажей нет. Создайте первого.",
      characterBuilder: "Конструктор персонажа",
      characterBuilderSubtitle:
        "Настройте персону, голос и поведение AI-стримера.",
      characterEditorTitle: "3D редактор персонажа",
      characterEditorEnabledNote: "Интеграция Polyphoria включена (в разработке).",
      characterEditorComingSoonNote: "Скоро: встроенный 3D редактор на базе Polyphoria.",
      characterEditorSectionTitle: "Редактор",
      characterEditorEnabledDescription:
        "Здесь появится встроенный редактор. Пока используйте Character Builder для персоны и голоса.",
      characterEditorWaitlistDescription:
        "Запишитесь в лист ожидания, чтобы получить ранний доступ.",
      polyphoriaModalDescription:
        "Мы готовим интеграцию встроенного редактора персонажа. Пока можно импортировать MetaHuman или использовать вашу существующую сцену Unreal.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle: "Правила реакции на донаты и подарки.",
      scripts: "Сценарии",
      scriptsSubtitle: "Проектируйте шоу с таймингами.",
      avatarScene: "Аватар + Сцена",
      avatarSceneSubtitle: "Управление визуальным слоем стримера.",
      notFoundTitle: "Страница не найдена",
      notFoundSubtitle: "Этот модуль пока в превью.",
      backToOverview: "Назад к обзору",

      unrealConnector: "Unreal Connector",
      localRuntime: "Локальный рантайм",
      diagnostics: "Диагностика",

      unrealHubSubtitle: "Гайды по workflow RoxStreamAI → Unreal. Runtime Connector в превью.",
      unrealGettingStartedTitle: "Быстрый старт",
      unrealGettingStartedDescription:
        "Выберите один из путей настройки ниже. Если проект Unreal уже есть — начните с ручной настройки.",
      unrealImportMetahumanTitle: "Как импортировать MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (архив)",
      unrealManualSetupTitle: "Ручная настройка Unreal",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton: "Открыть Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Назад в Unreal-хаб",
      unrealOpenDocsButton: "Открыть документацию Unreal",

      billingSuccessTitle: "Платеж получен",
      billingSuccessVerifying: "Проверяем платеж…",
      billingSuccessProcessing: "Мы всё ещё обрабатываем ваш платеж. Пожалуйста, обновите страницу позже.",
      billingSuccessConfirmedRedirecting: "Платеж подтвержден. Перенаправляем…",
      billingSuccessGoToDashboard: "В дашборд",

      characterBuilderLiveNote: "Тестирование Brain + Voice включено.",
      characterBuilderDraft: "Черновик",
      characterBuilderProfileTitle: "Профиль",
      characterBuilderCharacterNamePlaceholder: "Имя персонажа",
      characterBuilderPrimaryLanguagePlaceholder: "Основной язык (en/ru)",
      characterBuilderBioPlaceholder: "Персона и рекомендации по тону",
      characterBuilderVoiceTitle: "Голос",
      characterBuilderVoiceProviderLabel: "Провайдер голоса",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (включено)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Пресет / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Тест голоса",
      characterBuilderTestResponseTitle: "Тест ответа",
      characterBuilderTestResponseDescription: "Вызывает brain-провайдера воркспейса и применяет персону персонажа.",
      characterBuilderTestResponse: "Тест ответа",
      characterBuilderReplyLabel: "Ответ",
      characterBuilderNotesTitle: "Заметки",
      characterBuilderNotesDescription: "Настройте значения по умолчанию в Настройки → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "Рабочее пространство не настроено.",
      characterBuilderNotFound: "Персонаж не найден.",
      characterBuilderTestResponseFailed: "Тест ответа не удался.",
      characterBuilderTestVoiceFailed: "Тест голоса не удался.",
      characterBuilderDefaultUserMessage: "Привет! Дай короткое, веселое приветствие.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Настройте brain + voice для воркспейса. Ключи хранятся на сервере.",
      aiProvidersLoadFailed: "Не удалось загрузить настройки AI.",
      aiProvidersSaveFailed: "Не удалось сохранить настройки.",
      aiProvidersSaveKeyFailed: "Не удалось сохранить ключ.",
      aiProvidersRemoveKeyFailed: "Не удалось удалить ключ.",
      aiProvidersKeySaved: "Ключ сохранен.",
      aiProvidersKeyRemoved: "Ключ удален.",
      aiProvidersBrainTestFailed: "Тест brain не удался.",
      aiProvidersVoiceTestFailed: "Тест голоса не удался.",
      aiProvidersBrainProviderLabel: "Провайдер brain",
      aiProvidersBrainProviderHelp:
        "Другие провайдеры показаны для наглядности, но пока недоступны. Сейчас приложение работает на OpenAI.",
      aiProvidersBrainModelLabel: "Модель brain",
      aiProvidersCostEstimatorTitle: "Оценка стоимости ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Мы добавим встроенный калькулятор, когда появятся дополнительные провайдеры (токены, символы голоса и прогноз расходов). Сейчас голос OpenAI включен, а BYOK-провайдеры вы оплачиваете напрямую.",
      aiProvidersVoiceProviderLabel: "Провайдер голоса",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (включено)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Добавьте ключ ElevenLabs ниже, чтобы использовать этого провайдера.",
      aiProvidersVoiceIdLabel: "Пресет / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Сохранить настройки AI",
      aiProvidersTestBrainButton: "Тест brain",
      aiProvidersTestVoiceButton: "Тест голоса",
      aiProvidersTestBrainResponseLabel: "Ответ brain (тест)",
      aiProvidersApiKeysTitle: "API-ключи (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (опционально)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Сохранить ключ",
      aiProvidersReplaceKeyButton: "Заменить ключ",
      aiProvidersRemoveKeyButton: "Удалить ключ",
      aiProvidersKeysNotReturnedNote:
        "Ключи никогда не возвращаются в браузер. В UI показывается только “{connected}”.",

      settingsPageTitle: "Настройки",
      settingsProfileTitle: "Профиль",
      settingsDisplayNameLabel: "Отображаемое имя",
      settingsDisplayNameRequired: "Укажите отображаемое имя.",
      settingsUsernameOptionalLabel: "Юзернейм (опционально)",
      settingsNoProfileFound: "Профиль не найден.",
      settingsWorkspaceTitle: "Воркспейс",
      settingsNoWorkspaceFound: "Воркспейс не найден.",
      settingsSignOutTitle: "Выйти",
      settingsSignOutDescription: "Выйти из аккаунта на этом устройстве.",

      unrealExportButton: "Экспорт для Unreal",
      unrealExportTitle: "Экспорт для Unreal",
      unrealExportDescription:
        "Сгенерируйте JSON-конфиг для ручной настройки Unreal сейчас и для Runtime Connector позже.",
      unrealExportIncludeDonoRules: "Включить правила Dono",
      unrealExportIncludeScripts: "Включить скрипты",
      unrealExportIncludeScenes: "Включить сцены",
      unrealExportFailed: "Ошибка экспорта.",
      unrealExportSavedTo: "Сохранено в: {path}",
      unrealExportGenerateDownload: "Сгенерировать и скачать",
      unrealExportFile: "Файл: {filename}",
    },
    admin: {
      label: "Админ",
      navOverview: "Обзор",
      navUsers: "Пользователи",
      navPricing: "Тарифы",
      navContent: "Контент",
      navLeads: "Лиды",
      navAudit: "Аудит",
      navReleases: "Релизы",
      dashboardLink: "Кабинет",

      overviewTitle: "Обзор центра управления",
      overviewSubtitle:
        "Ключевые итоги по пользователям, воркспейсам, биллингу и использованию.",
      totalUsers: "Всего пользователей",
      totalUsersHelp: "Профили, созданные в Supabase.",
      workspaces: "Воркспейсы",
      workspacesHelp: "Всего воркспейсов у всех пользователей.",
      activeSubscriptions: "Активные подписки",
      activeSubscriptionsHelp: "Строки billing_state со status=active.",
      usageEvents24h: "События использования (24ч)",
      usageEvents24hHelp: "События, полученные за последние 24 часа.",
      releasesCount: "Релизы",
      releasesCountHelp: "Десктоп-сборки, доступные для скачивания.",

      usersTitle: "Управление доступом",
      usersSubtitle: "Обновите роль и тариф пользователя.",
      tableEmail: "Email",
      tableRole: "Роль",
      tablePlan: "Тариф",
      tableCreated: "Создан",
      tableSave: "Сохранить",
      buttonSave: "Сохранить",
      roleUser: "Пользователь",
      roleAdmin: "Админ",
      planTrial: "Триал",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "CMS тарифов",
      pricingSubtitle:
        "Редактируйте версионированную конфигурацию тарифов и публикуйте активную версию.",
      contentTitle: "CMS маркетинга",
      contentSubtitle:
        "Редактируйте маркетинговый текст через markdown-блоки. Страницы подтягивают по ключу с фоллбэками.",
      leadsTitle: "Лист ожидания и контакты",
      leadsSubtitle: "Просматривайте лиды и экспортируйте CSV.",
      auditTitle: "Логи админ-аудита",
      auditSubtitle:
        "Недавние действия админа по пользователям, тарифам, контенту и лидам.",
      releasesTitle: "Релизы",

      errorUnknown: "Неизвестная ошибка",
      buttonRefresh: "Обновить",
      buttonPublish: "Опубликовать",
      buttonNew: "Новая",
      buttonExportCsv: "Экспорт CSV",

      statusActive: "Активная",
      statusDraft: "Черновик",
      statusPublished: "Опубликовано",

      pricingVersions: "Версии",
      pricingNoVersions: "Пока нет версий.",
      pricingEditor: "Редактор",
      pricingEditingVersion: "Редактирование v{version}",
      pricingSelectVersion: "Выберите версию",
      pricingRawJsonAdvanced: "Raw JSON (для продвинутых)",
      pricingYearlyDiscountPct: "Годовая скидка (%)",
      pricingDefaultTalkRatio: "Talk ratio по умолчанию",
      pricingMinTalkRatio: "Минимальный talk ratio",
      pricingMaxTalkRatio: "Максимальный talk ratio",
      pricingTooltipText: "Текст подсказки",
      pricingPlans: "Тарифы",
      pricingTablePlan: "Тариф",
      pricingTableMonthlyEur: "Месяц (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "например 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Подсказка: сохранение валидирует схему на сервере.",

      contentSearchPlaceholder: "Поиск по ключам или тексту…",
      contentNoBlocks: "Пока нет блоков контента.",
      contentSelectBlock: "Выберите блок",
      contentSelectBlockError: "Выберите блок для редактирования",
      contentMarkdown: "Markdown",
      contentPreview: "Превью",
      contentMarkdownPlaceholder: "# Заголовок\n\nВаш текст…",

      leadsWaitlist: "Лист ожидания",
      leadsContact: "Контакты",
      leadsInvestors: "Инвесторы",
      leadsShowingRows: "Показано строк: {count}",
      leadsNoLeads: "Лидов пока нет.",

      auditFilterActionPlaceholder: "Фильтр по action…",
      auditFilterTargetTypePlaceholder: "Фильтр по target_type…",
      auditShowingEntries: "Показано записей: {count}",
      auditTime: "Время",
      auditAction: "Действие",
      auditTarget: "Цель",
      auditPayload: "Payload",
      auditNoEntries: "Записей аудита пока нет.",

      releasesVersion: "Версия",
      releasesPlatform: "Платформа",
      releasesDownloadUrl: "Ссылка на скачивание",
      releasesNotes: "Заметки",
      releasesMarkLatest: "Отметить как latest",
      releasesAddRelease: "Добавить релиз",
      releasesUpdate: "Обновить",
      releasesDeleteRelease: "Удалить релиз",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "Что нового...",
    },
  },
  tr: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Kontrol paneli",
      openDashboard: "Paneli aç",
      signIn: "Giriş",
      signOut: "Çıkış",
      downloadDemo: "Demo indir",
      back: "Geri",
      comingSoon: "Yakında",
      preview: "Önizleme",
      saved: "Kaydedildi",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Taslak güncellendi",
      published: "Yayınlandı",
      planUpgradeRequired: "Plan yükseltme gerekli",
      creditsLimitReached: "Kredi limiti doldu. Daha fazla saat satın alın.",
    },
    nav: {
      home: "Ana sayfa",
      useCases: "Kullanım alanları",
      pricing: "Fiyatlandırma",
      docs: "Dokümanlar",
      blog: "Blog",
      about: "Hakkında",
      contact: "İletişim",
      team: "Ekip",
      terms: "Şartlar",
      privacy: "Gizlilik",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "Tekrar hoş geldin",
      createAccount: "Hesap oluştur",
      resetPassword: "Parola sıfırla",
      email: "E-posta",
      password: "Parola",
      newPassword: "Yeni parola",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "En az 8 karakter",
      createAccountDescription:
        "Ücretsiz denemeyle başla ve masaüstü uygulamayı indir.",
      signInDescription:
        "Panel ve indirmeler için giriş yap.",
      resetDescription:
        "Parola sıfırlama için güvenli bağlantı göndereceğiz.",
      captchaMissing:
        "HCaptcha anahtarı eksik. .env.local içine NEXT_PUBLIC_HCAPTCHA_SITE_KEY ekleyin.",
      captchaError: "Captcha hatası. Yenileyin ve tekrar deneyin.",
      captchaRequired: "Lütfen captcha doğrulamasını tamamlayın.",
      alreadyHaveAccount: "Zaten hesabın var mı?",
      newHere: "Yeni misin?",
      forgotPassword: "Parolanı mı unuttun?",
      backToSignIn: "Girişe dön",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "10 dakikada bir AI streamer başlatın.",
      heroSubtitle:
        "Roxy sohbeti okur, hediyelere tepki verir, senaryoları çalıştırır ve 24/7 yayın yapabilir. Bugün TikTok Live, yakında Twitch ve YouTube.",
      demoPrimary: "Demo indir",
      demoSecondary: "45s demoyu izle",
      demoNote:
        "Pro planı kredilerle hazır gelir. Basic BYOK destekler.",
      howItWorksTitle: "Sıfırdan canlıya üç adım",
      howItWorksSubtitle:
        "Kontrollü bir AI streamer başlatmak için gereken her şey.",
      featuresTitle: "Premium otomasyon",
      featuresSubtitle:
        "Retention, güvenlik ve uzun oturumlar için tasarlandı.",
      useCasesTitle: "Modern canlı форматlar için",
      useCasesSubtitle:
        "Creatorlar, faceless formatlar ve ajanslar için tek platform.",
      ctaTitle: "Canlı görmek ister misin?",
      ctaSubtitle: "Ücretsiz deneme başlat или planları karşılaştır.",
      ctaPrimary: "Deneme başlat",
      ctaSecondary: "Fiyatları gör",
      faqTitle: "Hızlı cevaplar",
      faqSubtitle: "Planlar ve kullanım hakkında her şey.",
    },
    app: {
      overview: "Genel bakış",
      overviewSubtitle: "Canlı durum, limitler ve hızlı işlemler.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Oturumu başlat",
      upgradeRequired: "Yükseltme gerekli",
      quickActions: "Hızlı işlemler",
      createCharacter: "Karakter oluştur",
      setupDonoRules: "Dono kurallarını ayarla",
      deploy: "Deploy",
      generateShareLink: "Paylaşım linki üret",
      billing: "Faturalandırma",
      billingSubtitle: "Plan, krediler ve eklentiler.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Mevcut plan",
      managePlan: "Plan ve kullanım yönetimi.",
      comparePlans: "Planları karşılaştır",
      contactSales: "Satış ile iletişim",
      remainingHours: "Kalan konuşma saatleri",
      unlimitedHours: "Sınırsız konuşma saati (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Fatura özeti",
      nextInvoice: "Sonraki fatura: 26 Şub 2026",
      trialEnded: "Deneme bitti",
      trialEndsIn: "Deneme {days} gün içinde biter",
      connectors: "Stream bağlayıcıları",
      connectorsSubtitle:
        "TikTok'u bugün bağla. Twitch и YouTube sonra.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Deploy",
      deploySubtitle: "Oturumu yayınla ve OBS'de canlıya geç.",
      settings: "Ayarlar",
      settingsSubtitle: "Workspace tercihleri ve dışa aktarım.",
      characters: "Karakterler",
      charactersSubtitle: "AI streamer personelerini yönet.",
      noCharacters: "Karakter yok. İlki oluştur.",
      characterBuilder: "Character Builder",
      characterBuilderSubtitle:
        "AI streamer personasını, sesini ve davranışını oluştur.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle: "Hediyelere/donasyonlara tepki kuralları.",
      scripts: "Scriptler",
      scriptsSubtitle: "Akışı scriptlerle tasarla.",
      avatarScene: "Avatar + Sahne",
      avatarSceneSubtitle: "Streamer'ın görsel katmanını yönet.",
      notFoundTitle: "Sayfa bulunamadı",
      notFoundSubtitle: "Bu modül önizlemede.",
      backToOverview: "Genel bakışa dön",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
  uk: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Кабінет",
      openDashboard: "Відкрити кабінет",
      signIn: "Увійти",
      signOut: "Вийти",
      downloadDemo: "Завантажити демо",
      back: "Назад",
      comingSoon: "Скоро",
      preview: "Превʼю",
      saved: "Збережено",
      now: "now",
      loading: "Loading…",
      save: "Save",
      saving: "Saving…",
      thinking: "Thinking…",
      generating: "Generating…",
      testing: "Testing…",
      connected: "Connected",
      cancel: "Cancel",
      close: "Close",
      featureComingSoonDescription: "This feature will be enabled soon.",
      proPerks: "Pro perks",
      desktopOnlyTitle: "Desktop-only",
      desktopOnlyMessage: "This section is available in the RoxStreamAI Desktop app.",
      draftUpdated: "Чернетка оновлена",
      published: "Опубліковано",
      planUpgradeRequired: "Потрібне оновлення тарифу",
      creditsLimitReached: "Ліміт кредитів вичерпано. Купіть більше годин.",
    },
    nav: {
      home: "Головна",
      useCases: "Кейси",
      pricing: "Тарифи",
      docs: "Документація",
      blog: "Блог",
      about: "Про нас",
      contact: "Контакти",
      team: "Команда",
      terms: "Умови",
      privacy: "Конфіденційність",
      cookies: "Cookies",
    },
    auth: {
      welcomeBack: "З поверненням",
      createAccount: "Створити акаунт",
      resetPassword: "Скинути пароль",
      email: "Email",
      password: "Пароль",
      newPassword: "Новий пароль",
      emailPlaceholder: "you@company.com",
      passwordPlaceholder: "••••••••",
      passwordMin: "Мінімум 8 символів",
      createAccountDescription:
        "Почніть з безкоштовного тріалу та завантажте десктоп-додаток.",
      signInDescription: "Увійдіть, щоб отримати доступ до кабінету.",
      resetDescription: "Ми надішлемо безпечне посилання.",
      captchaMissing:
        "Немає ключа HCaptcha. Додайте NEXT_PUBLIC_HCAPTCHA_SITE_KEY у .env.local.",
      captchaError: "Помилка captcha. Оновіть і спробуйте ще раз.",
      captchaRequired: "Завершіть перевірку captcha.",
      alreadyHaveAccount: "Вже є акаунт?",
      newHere: "Вперше тут?",
      forgotPassword: "Забули пароль?",
      backToSignIn: "Назад до входу",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Запустіть AI-стрімера за 10 хвилин.",
      heroSubtitle:
        "Roxy читає чат, реагує на подарунки, запускає сценарії і може стрімити 24/7. TikTok Live сьогодні, Twitch і YouTube далі.",
      demoPrimary: "Завантажити демо",
      demoSecondary: "Дивитися демо 45с",
      demoNote:
        "Pro-тариф працює відразу з кредитами. Basic підтримує BYOK.",
      howItWorksTitle: "Від нуля до ефіру за три кроки",
      howItWorksSubtitle:
        "Все необхідне для запуску керованого AI-стрімера.",
      featuresTitle: "Преміальна автоматизація",
      featuresSubtitle:
        "Для утримання, безпеки і довгих сесій.",
      useCasesTitle: "Для сучасних live-форматів",
      useCasesSubtitle:
        "Одна платформа для авторів, faceless-форматів і агентств.",
      ctaTitle: "Готові побачити в дії?",
      ctaSubtitle: "Почніть з тріалу або порівняйте тарифи.",
      ctaPrimary: "Почати тріал",
      ctaSecondary: "Переглянути тарифи",
      faqTitle: "Швидкі відповіді",
      faqSubtitle: "Все про тарифи і ліміти.",
    },
    app: {
      overview: "Огляд",
      overviewSubtitle: "Статус, ліміти й швидкі дії.",
      systemToastsTitle: "System toasts",
      systemToastsSubtitle: "Recent updates from the workspace.",
      startSession: "Почати сесію",
      upgradeRequired: "Потрібен апгрейд",
      quickActions: "Швидкі дії",
      createCharacter: "Створити персонажа",
      setupDonoRules: "Налаштувати Dono Rules",
      deploy: "Деплой",
      generateShareLink: "Згенерувати посилання",
      billing: "Білінг",
      billingSubtitle: "Керуйте тарифом, кредитами й адонами.",
      referrals: "Referrals",
      notifications: "Notifications",
      currentPlan: "Поточний тариф",
      managePlan: "Керування тарифом і лімітами.",
      comparePlans: "Порівняти тарифи",
      contactSales: "Зв'язатися з sales",
      remainingHours: "Залишок активних годин",
      unlimitedHours: "Безлімітні активні години (BYOK).",
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to receive bonus Active Speech hours after purchase.",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share a promo code to unlock bonus Active Speech hours for you and your invitees.",
      referralProgramManage: "Manage referrals",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1h. Creator: +2h. Pro: +5h. Studio: +10h. Scale: +20h.",
      referralHowLine3: "Every 3 qualifying purchases (Creator or higher) unlock 4h for you.",
      referralHowLine4: "You can claim the 4h bonus each time another 3 qualifying purchases land.",
      referralInviteSubtitle: "Invite creators and unlock bonus Active Speech hours.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4h bonus",
      referralBonusNeed: "Need 3 qualifying purchases to claim a bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Updates about usage, bonuses, and billing.",
      notificationsMarkAll: "Mark all read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark read",
      billingSummary: "Зведення",
      nextInvoice: "Наступний рахунок: 26 лют 2026",
      trialEnded: "Тріал завершено",
      trialEndsIn: "Тріал завершиться через {days} днів",
      connectors: "Коннектори",
      connectorsSubtitle:
        "Підключіть TikTok сьогодні. Twitch і YouTube далі.",
      connectorsTiktokDescription:
        "Connectors are configured via the Desktop companion. This dashboard will show live status once the connector APIs are enabled.",
      connectorsConnectTiktok: "Connect TikTok",
      connectorsOpenSetupGuide: "Open setup guide",
      connectorsJoinWaitlist: "Join the waitlist to get early access.",
      connectorsEarlyAccessNote: "Early access rolling out to Pro and Studio first.",
      connectorsMultiAccountTitle: "Multi-account scheduler",
      connectorsMultiAccountDescription:
        "Available in Pro+. Rotate multiple accounts with scheduling rules.",
      connectorsMultiAccountBody:
        "This module is a preview. Once enabled, you'll be able to rotate accounts by schedules and usage limits.",
      connectorsExampleRotationWindow: "Example: Rotation window: every 4 hours",
      connectorsExampleMaxSessionsPerDay: "Example: Max sessions per day: 3",
      deployTitle: "Деплой",
      deploySubtitle: "Опублікуйте сесію і виходьте в ефір у OBS.",
      settings: "Налаштування",
      settingsSubtitle: "Параметри воркспейса й експорт.",
      characters: "Персонажі",
      charactersSubtitle: "Керуйте персонами AI-стрімерів.",
      noCharacters: "Персонажів нема. Створіть першого.",
      characterBuilder: "Конструктор персонажа",
      characterBuilderSubtitle:
        "Налаштуйте персону, голос і поведінку AI-стрімера.",
      characterEditorTitle: "3D Character Editor",
      characterEditorEnabledNote:
        "Polyphoria editor integration is enabled (work in progress).",
      characterEditorComingSoonNote:
        "Coming soon: an in-app 3D editor powered by Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.",
      characterEditorWaitlistDescription:
        "Join the waitlist to get early access when we roll this out.",
      polyphoriaModalDescription:
        "We’re preparing an in-app character editor integration. For now, you can import your MetaHuman or use your existing Unreal scene.",
      donoEngine: "Dono Engine",
      donoEngineSubtitle: "Правила реакцій на донати і подарунки.",
      scripts: "Сценарії",
      scriptsSubtitle: "Проєктуйте шоу з таймінгами.",
      avatarScene: "Аватар + Сцена",
      avatarSceneSubtitle: "Керування візуальним шаром стрімера.",
      notFoundTitle: "Сторінка не знайдена",
      notFoundSubtitle: "Цей модуль поки в превʼю.",
      backToOverview: "Назад до огляду",

      unrealConnector: "Unreal Connector",
      localRuntime: "Local Runtime",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides for your RoxStreamAI → Unreal workflow. The Runtime Connector is in preview.",
      unrealGettingStartedTitle: "Getting started",
      unrealGettingStartedDescription:
        "Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.",
      unrealImportMetahumanTitle: "How to import MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingSuccessTitle: "Payment received",
      billingSuccessVerifying: "Verifying payment...",
      billingSuccessProcessing: "We are still processing your payment. Please refresh later.",
      billingSuccessConfirmedRedirecting: "Payment confirmed. Redirecting...",
      billingSuccessGoToDashboard: "Go to dashboard",

      characterBuilderLiveNote: "Brain + Voice testing is live.",
      characterBuilderDraft: "Draft",
      characterBuilderProfileTitle: "Profile",
      characterBuilderCharacterNamePlaceholder: "Character name",
      characterBuilderPrimaryLanguagePlaceholder: "Primary language (en/ru)",
      characterBuilderBioPlaceholder: "Persona and tone guidelines",
      characterBuilderVoiceTitle: "Voice",
      characterBuilderVoiceProviderLabel: "Voice provider",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (included)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      characterBuilderVoiceIdLabel: "Voice preset / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Test Voice",
      characterBuilderTestResponseTitle: "Test Response",
      characterBuilderTestResponseDescription: "Calls the workspace brain provider and applies your character persona.",
      characterBuilderTestResponse: "Test Response",
      characterBuilderReplyLabel: "Reply",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription: "Configure provider defaults in Settings → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "No workspace configured.",
      characterBuilderNotFound: "Character not found.",
      characterBuilderTestResponseFailed: "Test Response failed.",
      characterBuilderTestVoiceFailed: "Test Voice failed.",
      characterBuilderDefaultUserMessage: "Hi! Give me a short, fun greeting.",

      aiProvidersTitle: "AI Providers",
      aiProvidersSubtitle: "Configure brain + voice per workspace. Keys are stored server-side.",
      aiProvidersLoadFailed: "Failed to load AI settings.",
      aiProvidersSaveFailed: "Failed to save settings.",
      aiProvidersSaveKeyFailed: "Failed to save key.",
      aiProvidersRemoveKeyFailed: "Failed to remove key.",
      aiProvidersKeySaved: "Key saved.",
      aiProvidersKeyRemoved: "Key removed.",
      aiProvidersBrainTestFailed: "Brain test failed.",
      aiProvidersVoiceTestFailed: "Voice test failed.",
      aiProvidersBrainProviderLabel: "Brain provider",
      aiProvidersBrainProviderHelp:
        "Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on OpenAI.",
      aiProvidersBrainModelLabel: "Brain model",
      aiProvidersCostEstimatorTitle: "Cost estimator ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters, and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.",
      aiProvidersVoiceProviderLabel: "Voice provider",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (included)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Add your ElevenLabs key below to use this provider.",
      aiProvidersVoiceIdLabel: "Voice preset / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Voice ID",
      aiProvidersSaveButton: "Save AI settings",
      aiProvidersTestBrainButton: "Test brain",
      aiProvidersTestVoiceButton: "Test voice",
      aiProvidersTestBrainResponseLabel: "Test brain response",
      aiProvidersApiKeysTitle: "API keys (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API key",
      aiProvidersSaveKeyButton: "Save key",
      aiProvidersReplaceKeyButton: "Replace key",
      aiProvidersRemoveKeyButton: "Remove key",
      aiProvidersKeysNotReturnedNote:
        "Keys are never returned to the browser. The UI only shows “{connected}”.",

      settingsPageTitle: "Settings",
      settingsProfileTitle: "Profile",
      settingsDisplayNameLabel: "Display name",
      settingsDisplayNameRequired: "Display name is required.",
      settingsUsernameOptionalLabel: "Username (optional)",
      settingsNoProfileFound: "No profile found.",
      settingsWorkspaceTitle: "Workspace",
      settingsNoWorkspaceFound: "No workspace found.",
      settingsSignOutTitle: "Sign out",
      settingsSignOutDescription: "Sign out of your account on this device.",

      unrealExportButton: "Export for Unreal",
      unrealExportTitle: "Export for Unreal",
      unrealExportDescription:
        "Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.",
      unrealExportIncludeDonoRules: "Include Dono rules",
      unrealExportIncludeScripts: "Include scripts",
      unrealExportIncludeScenes: "Include scenes",
      unrealExportFailed: "Export failed.",
      unrealExportSavedTo: "Saved to: {path}",
      unrealExportGenerateDownload: "Generate + download",
      unrealExportFile: "File: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Overview",
      navUsers: "Users",
      navPricing: "Pricing",
      navContent: "Content",
      navLeads: "Leads",
      navAudit: "Audit",
      navReleases: "Releases",
      dashboardLink: "Dashboard",

      overviewTitle: "Control center overview",
      overviewSubtitle: "Key totals across users, workspaces, billing, and usage.",
      totalUsers: "Total users",
      totalUsersHelp: "Profiles created in Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total workspaces across all users.",
      activeSubscriptions: "Active subscriptions",
      activeSubscriptionsHelp: "billing_state rows with status=active.",
      usageEvents24h: "Usage events (24h)",
      usageEvents24hHelp: "Events ingested during last 24 hours.",
      releasesCount: "Releases",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "Email",
      tableRole: "Role",
      tablePlan: "Plan",
      tableCreated: "Created",
      tableSave: "Save",
      buttonSave: "Save",
      roleUser: "User",
      roleAdmin: "Admin",
      planTrial: "Trial",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Pricing CMS",
      pricingSubtitle: "Edit versioned pricing config and publish the active version.",
      contentTitle: "Marketing CMS",
      contentSubtitle: "Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.",
      leadsTitle: "Waitlist & contact",
      leadsSubtitle: "View captured leads and export CSV.",
      auditTitle: "Admin audit logs",
      auditSubtitle: "Recent admin actions across users, pricing, content, and leads.",
      releasesTitle: "Releases",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Versions",
      pricingNoVersions: "No versions yet.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editing v{version}",
      pricingSelectVersion: "Select a version",
      pricingRawJsonAdvanced: "Raw JSON (advanced)",
      pricingYearlyDiscountPct: "Yearly discount (%)",
      pricingDefaultTalkRatio: "Default talk ratio",
      pricingMinTalkRatio: "Min talk ratio",
      pricingMaxTalkRatio: "Max talk ratio",
      pricingTooltipText: "Tooltip text",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monthly (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "e.g. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation: "Tip: Save runs schema validation server-side.",

      contentSearchPlaceholder: "Search keys or text…",
      contentNoBlocks: "No content blocks yet.",
      contentSelectBlock: "Select a block",
      contentSelectBlockError: "Select a block to edit",
      contentMarkdown: "Markdown",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contact",
      leadsInvestors: "Investors",
      leadsShowingRows: "Showing {count} rows",
      leadsNoLeads: "No leads yet.",

      auditFilterActionPlaceholder: "Filter action…",
      auditFilterTargetTypePlaceholder: "Filter target_type…",
      auditShowingEntries: "Showing {count} entries",
      auditTime: "Time",
      auditAction: "Action",
      auditTarget: "Target",
      auditPayload: "Payload",
      auditNoEntries: "No audit entries yet.",

      releasesVersion: "Version",
      releasesPlatform: "Platform",
      releasesDownloadUrl: "Download URL",
      releasesNotes: "Notes",
      releasesMarkLatest: "Mark as latest",
      releasesAddRelease: "Add release",
      releasesUpdate: "Update",
      releasesDeleteRelease: "Delete release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "What's new...",
    },
  },
};
