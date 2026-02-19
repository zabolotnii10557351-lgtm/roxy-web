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
    promoCodeLabel: string;
    promoCodePlaceholder: string;
    promoCodeHelp: string;
    referrals: string;
    referralProgramTitle: string;
    referralProgramBody: string;
    referralProgramManage: string;
    referralInviteSubtitle: string;
    referralHowTitle: string;
    referralHowLine1: string;
    referralHowLine2: string;
    referralHowLine3: string;
    referralHowLine4: string;
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
    notifications: string;
    notificationsTitle: string;
    notificationsSubtitle: string;
    notificationsMarkAll: string;
    notificationsEmpty: string;
    notificationsMarkRead: string;
    currentPlan: string;
    managePlan: string;
    comparePlans: string;
    contactSales: string;
    remainingHours: string;
    unlimitedHours: string;
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

    billingCurrentPlanCheck: string;
    billingUpgrade: string;
    billingUpgradeNote: string;
    billingDowngrade: string;
    billingDowngradeNote: string;
    billingSubscribe: string;

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

const en: Translations = {
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
      useCases: "Use Cases",
      pricing: "Pricing",
      docs: "Docs",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      team: "Our Team",
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
        "RoxStreamAI is a web dashboard plus a desktop companion that helps you run consistent, interactive live shows. It can read chat, react to gifts, follow a script, and keep your stream format stable across time zones.",
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
      promoCodeLabel: "Promo code",
      promoCodePlaceholder: "Enter promo code",
      promoCodeHelp: "Use a referral code to unlock bonus Active Speech hours after purchase.",
      referrals: "Referrals",
      referralProgramTitle: "Referral program",
      referralProgramBody: "Share your promo code to unlock bonus Active Speech hours for you and invitees.",
      referralProgramManage: "Manage referrals",
      referralInviteSubtitle: "Invite creators and earn bonus Active Speech hours.",
      referralHowTitle: "How it works",
      referralHowLine1: "People who use your code get bonus Active Speech hours after purchase.",
      referralHowLine2: "Starter: +1 hour. Creator: +2 hours. Pro: +5 hours. Studio: +10 hours. Scale: +20 hours.",
      referralHowLine3: "Every 3 eligible purchases (Creator or higher) earn you 4 hours.",
      referralHowLine4: "You can earn the 4-hour bonus again for every next 3 purchases.",
      referralPromoTitle: "Your promo code",
      referralPromoPlaceholder: "Choose your promo code",
      referralPromoCreate: "Create code",
      referralPromoCopy: "Copy referral link",
      referralBonusTitle: "Bonus progress",
      referralBonusClaim: "Claim 4-hour bonus",
      referralBonusNeed: "3 eligible purchases are required for the bonus.",
      referralRegistrationsTitle: "Registrations",
      referralPurchasesTitle: "Purchases",
      referralNoSignups: "No signups yet.",
      referralNoPurchases: "No purchases yet.",
      notifications: "Notifications",
      notificationsTitle: "Notification Center",
      notificationsSubtitle: "Usage, bonuses, and billing updates.",
      notificationsMarkAll: "Mark all as read",
      notificationsEmpty: "No notifications yet.",
      notificationsMarkRead: "Mark as read",
      currentPlan: "Current plan",
      managePlan: "Manage plan details and usage.",
      comparePlans: "Compare plans",
      contactSales: "Talk to sales",
      remainingHours: "Remaining active speech hours",
      unlimitedHours: "Unlimited active speech hours (BYOK).",
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
      unrealLiveLinkFaceTitle: "Live Link Face (archives)",
      unrealManualSetupTitle: "Manual Unreal setup",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Open Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Back to Unreal hub",
      unrealOpenDocsButton: "Open Unreal docs",

      billingCurrentPlanCheck: "Current plan \u2713",
      billingUpgrade: "Upgrade",
      billingUpgradeNote: "No refund for current period",
      billingDowngrade: "Downgrade",
      billingDowngradeNote: "Takes effect next billing period",
      billingSubscribe: "Subscribe",

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
      label: "Administration",
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
      releasesCount: "Versions",
      releasesCountHelp: "Desktop builds available for download.",

      usersTitle: "Manage access",
      usersSubtitle: "Update user role and plan.",
      tableEmail: "E-mail",
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
      releasesTitle: "Versions",

      errorUnknown: "Unknown error",
      buttonRefresh: "Refresh",
      buttonPublish: "Publish",
      buttonNew: "New",
      buttonExportCsv: "Export CSV",

      statusActive: "Active",
      statusDraft: "Draft",
      statusPublished: "Published",

      pricingVersions: "Pricing versions",
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
      contentMarkdown: "Markdown (md)",
      contentPreview: "Preview",
      contentMarkdownPlaceholder: "# Title\n\nYour content…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Contacts",
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
  };

export const translations: Record<Locale, Translations> = {
  en,
  cs: {
    ...en,
    common: {
      brand: "RoxStreamAI",
      dashboard: "Panel",
      openDashboard: "Otevrit dashboard",
      signIn: "Prihlasit se",
      signOut: "Odhlasit se",
      downloadDemo: "Stahnout demo",
      back: "Zpet",
      comingSoon: "Jiz brzy",
      preview: "Nahled",
      saved: "Ulozeno",
      now: "ted",
      loading: "Nacita se…",
      save: "Ulozit",
      saving: "Ukladani…",
      thinking: "Premysli…",
      generating: "Generovani…",
      testing: "Testovani…",
      connected: "Pripojeno",
      cancel: "Zrusit",
      close: "Zavrit",
      featureComingSoonDescription: "Tato funkce bude brzy dostupna.",
      proPerks: "Vyhody Pro",
      desktopOnlyTitle: "Jen desktop",
      desktopOnlyMessage: "Tato sekce je dostupna pouze v aplikaci RoxStreamAI Desktop.",
      draftUpdated: "Koncept aktualizovan",
      published: "Publikovano",
      planUpgradeRequired: "Je vyzadovan upgrade planu",
      creditsLimitReached: "Limit kreditu dosazen. Kupte vice hodin.",
    },
    nav: {
      home: "Domu",
      useCases: "Pripady pouziti",
      pricing: "Cenik",
      docs: "Dokumentace",
      blog: "Novinky",
      about: "O nas",
      contact: "Kontakt",
      team: "Tym",
      terms: "Podminky",
      privacy: "Soukromi",
      cookies: "Susenky",
    },
    auth: {
      welcomeBack: "Vitejte zpet",
      createAccount: "Vytvorit ucet",
      resetPassword: "Obnovit heslo",
      email: "E-mail",
      password: "Heslo",
      newPassword: "Nove heslo",
      emailPlaceholder: "vy@firma.cz",
      passwordPlaceholder: "••••••••",
      passwordMin: "Alespon 8 znaku",
      createAccountDescription:
        "Zacnete s bezplatnym trialem a stahnete si desktop aplikaci.",
      signInDescription:
        "Prihlaste se pro pristup k dashboardu a stahovani.",
      resetDescription:
        "Posleme vam bezpecny odkaz pro obnovu hesla.",
      captchaMissing:
        "Chybi HCaptcha klic. Pridejte NEXT_PUBLIC_HCAPTCHA_SITE_KEY do .env.local.",
      captchaError: "Chyba captcha. Obnovte stranku a zkuste znovu.",
      captchaRequired: "Dokoncete overeni captcha.",
      alreadyHaveAccount: "Uz mate ucet?",
      newHere: "Jste tu poprve?",
      forgotPassword: "Zapomneli jste heslo?",
      backToSignIn: "Zpet na prihlaseni",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Spustte streamy s AI behem nekolika minut.",
      heroSubtitle:
        "RoxStreamAI je webovy dashboard a desktop companion, ktery pomaha vest konzistentni, interaktivni live show. Umi cist chat, reagovat na darky, drzet se scenare a udrzet format stabilni napric casovymi pasmy.",
      demoPrimary: "Stahnout demo",
      demoSecondary: "Zobrazit ceny",
      demoNote: "Jasne limity pouziti. Predvidatelne naklady. BYOK podporovano.",
      howItWorksTitle: "Jak to funguje",
      howItWorksSubtitle:
        "Vytvorte ucet, pripojte nastroje a jdete live s ochrannymi pravidly.",
      featuresTitle: "Proc si tymy vybiraji RoxStreamAI",
      featuresSubtitle:
        "Spolehlivy co-host loop s jasnymi limity a workflow pripravenymi pro Unreal.",
      useCasesTitle: "Pripady pouziti",
      useCasesSubtitle: "Realne formaty, pro ktere je RoxStreamAI staveny.",
      ctaTitle: "Pripraveni spustit prvni sesi?",
      ctaSubtitle:
        "Stahnete demo a vyzkousejte Desktop companion. Ceny si prohlednete, az budete pripraveni skalovat pouziti a soubeznost.",
      ctaPrimary: "Stahnout demo",
      ctaSecondary: "Zobrazit ceny",
      faqTitle: "Caste dotazy",
      faqSubtitle: "Rychle odpovedi k Desktop rezimu, pouziti a BYOK.",
    },
    app: {
      overview: "Prehled",
      overviewSubtitle: "Stav live, limity a rychle akce.",
      systemToastsTitle: "Systemove notifikace",
      systemToastsSubtitle: "Nedavne aktualizace z workspace.",
      startSession: "Spustit sesi",
      upgradeRequired: "Upgrade je nutny",
      quickActions: "Rychle akce",
      createCharacter: "Vytvorit postavu",
      setupDonoRules: "Nastavit Dono pravidla",
      deploy: "Nasazeni",
      generateShareLink: "Vytvorit sdileni",
      billing: "Fakturace",
      billingSubtitle: "Sprava planu, kreditu a doplnku.",
      promoCodeLabel: "Promo kod",
      promoCodePlaceholder: "Zadejte promo kod",
      promoCodeHelp:
        "Pouzijte referral kod pro bonusove hodiny Active Speech po nakupu.",
      referrals: "Referral",
      referralProgramTitle: "Referalni program",
      referralProgramBody:
        "Sdilejte promo kod a ziskejte bonusove hodiny Active Speech pro vas i pozvane.",
      referralProgramManage: "Spravovat referral",
      referralInviteSubtitle:
        "Pozvete creatory a ziskejte bonusove hodiny Active Speech.",
      referralHowTitle: "Jak to funguje",
      referralHowLine1:
        "Ti, kdo pouziji vas kod, ziskaji bonusove hodiny Active Speech po nakupu.",
      referralHowLine2:
        "Starter: +1 hodina. Creator: +2 hodiny. Pro: +5 hodin. Studio: +10 hodin. Scale: +20 hodin.",
      referralHowLine3:
        "Kazde 3 opravnena nakupy (Creator nebo vyssi) vam daji 4 hodiny.",
      referralHowLine4:
        "Bonus 4 hodiny lze znovu ziskat za kazde dalsi 3 nakupy.",
      referralPromoTitle: "Vas promo kod",
      referralPromoPlaceholder: "Zvolte promo kod",
      referralPromoCreate: "Vytvorit kod",
      referralPromoCopy: "Kopirovat referral odkaz",
      referralBonusTitle: "Postup bonusu",
      referralBonusClaim: "Pozadat o bonus 4 hodiny",
      referralBonusNeed: "Pro bonus jsou treba 3 opravnena nakupy.",
      referralRegistrationsTitle: "Registrace",
      referralPurchasesTitle: "Nakupy",
      referralNoSignups: "Zadne registrace.",
      referralNoPurchases: "Zadne nakupy.",
      notifications: "Notifikace",
      notificationsTitle: "Notifikace",
      notificationsSubtitle: "Pouziti, bonusy a aktualizace fakturace.",
      notificationsMarkAll: "Oznacit vse jako prectene",
      notificationsEmpty: "Zadne notifikace.",
      notificationsMarkRead: "Oznacit jako prectene",
      currentPlan: "Aktualni plan",
      managePlan: "Spravovat plan a vyuziti.",
      comparePlans: "Porovnat plany",
      contactSales: "Kontaktovat prodej",
      remainingHours: "Zbyvajici aktivni hodiny",
      unlimitedHours: "Neomezene aktivni hodiny (BYOK).",
      billingSummary: "Prehled fakturace",
      nextInvoice: "Dalsi faktura: 26. unora 2026",
      trialEnded: "Trial skoncil",
      trialEndsIn: "Trial konci za {days} dni",
      connectors: "Stream konektory",
      connectorsSubtitle: "Pripojte kanaly a nastavte limity soubeznosti.",
      connectorsTiktokDescription:
        "Konektory se nastavuji v desktop companionu. Tento dashboard ukaze live stav po zapnuti API konektoru.",
      connectorsConnectTiktok: "Pripojit TikTok",
      connectorsOpenSetupGuide: "Otevrit navod",
      connectorsJoinWaitlist: "Prihlasit se na waitlist pro early access.",
      connectorsEarlyAccessNote: "Early access nejdrive pro Pro a Studio.",
      connectorsMultiAccountTitle: "Planovac vice uctu",
      connectorsMultiAccountDescription:
        "Dostupne v Pro+. Rotujte vice uctu podle pravidel planovani.",
      connectorsMultiAccountBody:
        "Modul je v preview. Po aktivaci budete moci rotovat ucty podle rozvrhu a limitu vyuziti.",
      connectorsExampleRotationWindow: "Priklad: rotacni okno kazde 4 hodiny",
      connectorsExampleMaxSessionsPerDay: "Priklad: max. sezeni za den: 3",
      deployTitle: "Nasazeni",
      deploySubtitle: "Publikujte sesi a jdete live v OBS.",
      settings: "Nastaveni",
      settingsSubtitle: "Provideri, klice a preference workspace.",
      characters: "Postavy",
      charactersSubtitle: "Vytvarejte a spravujte persony streameru.",
      noCharacters:
        "Zadne postavy. Vytvorte prvni postavu pro odemceni streamu a exportu do Unreal.",
      characterBuilder: "Builder postavy",
      characterBuilderSubtitle:
        "Vytvorte profil persony pro stream. Nastaveni muzete pozdeji zmenit.",
      characterEditorTitle: "3D editor postav",
      characterEditorEnabledNote: "Integrace editoru Polyphoria je aktivni (WIP).",
      characterEditorComingSoonNote:
        "Brzy: in-app 3D editor pohanen Polyphoria.",
      characterEditorSectionTitle: "Upravy",
      characterEditorEnabledDescription:
        "Vlozena plocha editoru se zobrazi zde. Prozatim pouzijte Builder postavy pro personu a hlas.",
      characterEditorWaitlistDescription: "Prihlaste se na waitlist pro early access.",
      polyphoriaModalDescription:
        "Pripravujeme integraci editoru postav v aplikaci. Zatim muzete importovat MetaHuman nebo pouzit existujici Unreal scenu.",
      donoEngine: "Dono motor",
      donoEngineSubtitle: "Vytvarejte pravidla, ktera reaguji na darky a donace.",
      scripts: "Stream skripty",
      scriptsSubtitle: "Navrhnete prubeh show pomoci casovanych skriptu a presetu.",
      avatarScene: "Avatar + Scena",
      avatarSceneSubtitle: "Sprava vizualni vrstvy AI streameru.",
      notFoundTitle: "Stranka nenalezena",
      notFoundSubtitle: "Tento modul dashboardu je stale v preview.",
      backToOverview: "Zpet na prehled",

      unrealConnector: "Unreal konektor",
      localRuntime: "Lokalni runtime",
      diagnostics: "Diagnostika",

      unrealHubSubtitle:
        "Navody pro workflow RoxStreamAI → Unreal. Runtime Connector je v preview.",
      unrealGettingStartedTitle: "Zaciname",
      unrealGettingStartedDescription:
        "Zvolte jednu z cest nastaveni niz. Pokud uz mate Unreal projekt, zvolte Manual setup.",
      unrealImportMetahumanTitle: "Jak importovat MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archiv)",
      unrealManualSetupTitle: "Rucni nastaveni Unreal",
      unrealRuntimeConnectorTitle: "Unreal Runtime konektor",
      unrealOpenRuntimeConnectorButton:
        "Otevrit Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Zpet do Unreal hubu",
      unrealOpenDocsButton: "Otevrit Unreal docs",

      billingCurrentPlanCheck: "Aktuální plán \u2713",
      billingUpgrade: "Přejít na vyšší",
      billingUpgradeNote: "Bez vrácení za aktuální období",
      billingDowngrade: "Přejít na nižší",
      billingDowngradeNote: "Platí od dalšího fakturačního období",
      billingSubscribe: "Předplatit",

      billingSuccessTitle: "Platba prijata",
      billingSuccessVerifying: "Overujeme platbu...",
      billingSuccessProcessing:
        "Platbu stale zpracovavame. Obnovte pozdeji.",
      billingSuccessConfirmedRedirecting: "Platba potvrzena. Presmerovani...",
      billingSuccessGoToDashboard: "Do dashboardu",

      characterBuilderLiveNote: "Testovani Brain + Voice je aktivni.",
      characterBuilderDraft: "Koncept",
      characterBuilderProfileTitle: "Profil",
      characterBuilderCharacterNamePlaceholder: "Jmeno postavy",
      characterBuilderPrimaryLanguagePlaceholder: "Primarni jazyk (en/ru)",
      characterBuilderBioPlaceholder: "Persona a ton",
      characterBuilderVoiceTitle: "Hlas",
      characterBuilderVoiceProviderLabel: "Provider hlasu",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (v cene)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, vlastni klic)",
      characterBuilderVoiceIdLabel: "Preset hlasu / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID hlasu ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Testovat hlas",
      characterBuilderTestResponseTitle: "Test odpoved",
      characterBuilderTestResponseDescription:
        "Vola brain provider workspace a aplikuje personu postavy.",
      characterBuilderTestResponse: "Test odpoved",
      characterBuilderReplyLabel: "Odpoved",
      characterBuilderNotesTitle: "Poznamky",
      characterBuilderNotesDescription:
        "Nastavte vychozi providery v Nastaveni → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "Workspace neni nakonfigurovan.",
      characterBuilderNotFound: "Postava nenalezena.",
      characterBuilderTestResponseFailed: "Test odpoved selhal.",
      characterBuilderTestVoiceFailed: "Test hlasu selhal.",
      characterBuilderDefaultUserMessage: "Ahoj! Dej mi kratke a vesele pozdraveni.",

      aiProvidersTitle: "AI Providery",
      aiProvidersSubtitle:
        "Nastavte brain + voice pro workspace. Klice jsou ulozeny na serveru.",
      aiProvidersLoadFailed: "Nepodarilo se nacist AI nastaveni.",
      aiProvidersSaveFailed: "Nepodarilo se ulozit nastaveni.",
      aiProvidersSaveKeyFailed: "Nepodarilo se ulozit klic.",
      aiProvidersRemoveKeyFailed: "Nepodarilo se odstranit klic.",
      aiProvidersKeySaved: "Klic ulozen.",
      aiProvidersKeyRemoved: "Klic odstranen.",
      aiProvidersBrainTestFailed: "Test brain selhal.",
      aiProvidersVoiceTestFailed: "Test hlasu selhal.",
      aiProvidersBrainProviderLabel: "Provider brainu",
      aiProvidersBrainProviderHelp:
        "Ostatni provideri jsou jen pro prehled, zatim nejsou dostupni. Dnes app bezi na OpenAI.",
      aiProvidersBrainModelLabel: "Model brainu",
      aiProvidersCostEstimatorTitle: "Odhad nakladu ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Pridame in-app odhad, az budou dalsi provideri aktivni (tokeny, hlasy a odhad vydaju). Zatim je OpenAI voice zahrnute a BYOK provideri uctuji primo.",
      aiProvidersVoiceProviderLabel: "Provider hlasu",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (v cene)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, vlastni klic)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Pridejte ElevenLabs klic nize pro pouziti tohoto providera.",
      aiProvidersVoiceIdLabel: "Preset hlasu / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID hlasu ElevenLabs",
      aiProvidersSaveButton: "Ulozit AI nastaveni",
      aiProvidersTestBrainButton: "Testovat brain",
      aiProvidersTestVoiceButton: "Testovat hlas",
      aiProvidersTestBrainResponseLabel: "Test odpoved brain",
      aiProvidersApiKeysTitle: "API klice (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API klic (volitelne)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API klic",
      aiProvidersSaveKeyButton: "Ulozit klic",
      aiProvidersReplaceKeyButton: "Nahradit klic",
      aiProvidersRemoveKeyButton: "Odstranit klic",
      aiProvidersKeysNotReturnedNote:
        "Klice se nikdy nevraceji do prohlizece. UI ukazuje jen “{connected}”.",

      settingsPageTitle: "Nastaveni",
      settingsProfileTitle: "Profil",
      settingsDisplayNameLabel: "Zobrazovane jmeno",
      settingsDisplayNameRequired: "Zobrazovane jmeno je povinne.",
      settingsUsernameOptionalLabel: "Uzivatelske jmeno (volitelne)",
      settingsNoProfileFound: "Profil nenalezen.",
      settingsWorkspaceTitle: "Pracovni prostor",
      settingsNoWorkspaceFound: "Workspace nenalezen.",
      settingsSignOutTitle: "Odhlasit",
      settingsSignOutDescription: "Odhlaste se z uctu na tomto zarizeni.",

      unrealExportButton: "Export pro Unreal",
      unrealExportTitle: "Export pro Unreal",
      unrealExportDescription:
        "Vygeneruje JSON konfiguraci pro rucni nastaveni Unreal dnes a pro Runtime Connector pozdeji.",
      unrealExportIncludeDonoRules: "Zahrnout Dono pravidla",
      unrealExportIncludeScripts: "Zahrnout skripty",
      unrealExportIncludeScenes: "Zahrnout sceny",
      unrealExportFailed: "Export selhal.",
      unrealExportSavedTo: "Ulozeno do: {path}",
      unrealExportGenerateDownload: "Vygenerovat + stahnout",
      unrealExportFile: "Soubor: {filename}",
    },
    admin: {
      label: "Administrace",
      navOverview: "Prehled",
      navUsers: "Uzivatele",
      navPricing: "Cenik",
      navContent: "Obsah",
      navLeads: "Leady",
      navAudit: "Audity",
      navReleases: "Release",
      dashboardLink: "Panel",

      overviewTitle: "Prehled ridiciho centra",
      overviewSubtitle:
        "Klicove souhrny uzivatelu, workspace, fakturace a vyuziti.",
      totalUsers: "Celkem uzivatelu",
      totalUsersHelp: "Profily vytvorene v Supabase.",
      workspaces: "Pracovni prostory",
      workspacesHelp: "Celkovy pocet pracovnich prostoru vsech uzivatelu.",
      activeSubscriptions: "Aktivni predplatne",
      activeSubscriptionsHelp: "Radky billing_state se status=active.",
      usageEvents24h: "Udalosti vyuziti (24h)",
      usageEvents24hHelp: "Udalosti prijate za poslednich 24 hodin.",
      releasesCount: "Release",
      releasesCountHelp: "Desktop buildy dostupne ke stazeni.",

      usersTitle: "Sprava pristupu",
      usersSubtitle: "Aktualizujte roli a plan uzivatele.",
      tableEmail: "E-mail",
      tableRole: "Role uzivatele",
      tablePlan: "Tarif",
      tableCreated: "Vytvoreno",
      tableSave: "Ulozit",
      buttonSave: "Ulozit",
      roleUser: "Uzivatel",
      roleAdmin: "Administrator",
      planTrial: "Zkusebni",
      planPro: "Profi",
      planStudio: "Studio plan",
      planEnterprise: "Firemni",

      pricingTitle: "CMS cen",
      pricingSubtitle:
        "Upravte verzovanou konfiguraci cen a publikujte aktivni verzi.",
      contentTitle: "CMS marketingu",
      contentSubtitle:
        "Upravujte marketing text pres markdown bloky. Stranky se nacitaji podle klice s fallbacky.",
      leadsTitle: "Cekaci listina a kontakt",
      leadsSubtitle: "Zobrazte zachycene leady a exportujte CSV.",
      auditTitle: "Auditni logy admina",
      auditSubtitle:
        "Nedavne admin akce nad uzivateli, cenami, obsahem a leady.",
      releasesTitle: "Release",

      errorUnknown: "Neznama chyba",
      buttonRefresh: "Obnovit",
      buttonPublish: "Publikovat",
      buttonNew: "Novy",
      buttonExportCsv: "Exportovat CSV",

      statusActive: "Aktivni",
      statusDraft: "Koncept",
      statusPublished: "Publikovano",

      pricingVersions: "Verze",
      pricingNoVersions: "Zadne verze.",
      pricingEditor: "Editor cen",
      pricingEditingVersion: "Editace v{version}",
      pricingSelectVersion: "Vyberte verzi",
      pricingRawJsonAdvanced: "Raw JSON (pokrocile)",
      pricingYearlyDiscountPct: "Rocni sleva (%)",
      pricingDefaultTalkRatio: "Vychozi talk ratio",
      pricingMinTalkRatio: "Minimalni talk ratio",
      pricingMaxTalkRatio: "Maximalni talk ratio",
      pricingTooltipText: "Text tooltipu",
      pricingPlans: "Plany",
      pricingTablePlan: "Tarif",
      pricingTableMonthlyEur: "Mesicne (€)",
      pricingTableEntitlementsJson: "Opravneni (JSON)",
      pricingPlaceholderMonthlyEur: "napr. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_postavy\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Tip: pri ulozeni se overuje schema na serveru.",

      contentSearchPlaceholder: "Hledat klice nebo text…",
      contentNoBlocks: "Zadne bloky obsahu.",
      contentSelectBlock: "Vybrat blok",
      contentSelectBlockError: "Vyberte blok k uprave",
      contentMarkdown: "Markdown (md)",
      contentPreview: "Nahled",
      contentMarkdownPlaceholder: "# Titulek\n\nVas obsah…",

      leadsWaitlist: "Cekaci listina",
      leadsContact: "Kontakt",
      leadsInvestors: "Investori",
      leadsShowingRows: "Zobrazeno {count} radku",
      leadsNoLeads: "Zadne leady.",

      auditFilterActionPlaceholder: "Filtrovat akci…",
      auditFilterTargetTypePlaceholder: "Filtrovat target_type…",
      auditShowingEntries: "Zobrazeno {count} zaznamu",
      auditTime: "Cas",
      auditAction: "Akce",
      auditTarget: "Cil",
      auditPayload: "Data",
      auditNoEntries: "Zadne auditni zaznamy.",

      releasesVersion: "Verze",
      releasesPlatform: "Platforma",
      releasesDownloadUrl: "URL ke stazeni",
      releasesNotes: "Poznamky",
      releasesMarkLatest: "Oznacit jako latest",
      releasesAddRelease: "Pridat release",
      releasesUpdate: "Aktualizovat",
      releasesDeleteRelease: "Smazat release",
      releasesPlatformWindows: "Windows PC",
      releasesPlatformMac: "macOS Desktop",
      releasesPlaceholderVersion: "napr. 1.0.0",
      releasesPlaceholderUrl: "https://priklad.cz",
      releasesPlaceholderNotes: "Novinky...",
    },
  },
  pl: {
    ...en,
    common: {
      brand: "RoxStreamAI",
      dashboard: "Panel",
      openDashboard: "Otworz panel",
      signIn: "Zaloguj sie",
      signOut: "Wyloguj sie",
      downloadDemo: "Pobierz demo",
      back: "Wstecz",
      comingSoon: "Wkrotce",
      preview: "Podglad",
      saved: "Zapisano",
      now: "teraz",
      loading: "Ladowanie…",
      save: "Zapisz",
      saving: "Zapisywanie…",
      thinking: "Myslenie…",
      generating: "Generowanie…",
      testing: "Testowanie…",
      connected: "Polaczono",
      cancel: "Anuluj",
      close: "Zamknij",
      featureComingSoonDescription: "Ta funkcja bedzie dostepna wkrotce.",
      proPerks: "Korzyści Pro",
      desktopOnlyTitle: "Tylko desktop",
      desktopOnlyMessage: "Ta sekcja jest dostepna tylko w aplikacji RoxStreamAI Desktop.",
      draftUpdated: "Szkic zaktualizowany",
      published: "Opublikowano",
      planUpgradeRequired: "Wymagany upgrade planu",
      creditsLimitReached: "Limit kredytow osiagniety. Kup wiecej godzin.",
    },
    nav: {
      home: "Strona glowna",
      useCases: "Przypadki uzycia",
      pricing: "Cennik",
      docs: "Dokumentacja",
      blog: "Aktualnosci",
      about: "O nas",
      contact: "Kontakt",
      team: "Zespol",
      terms: "Warunki",
      privacy: "Prywatnosc",
      cookies: "Pliki cookie",
    },
    auth: {
      welcomeBack: "Witamy ponownie",
      createAccount: "Utworz konto",
      resetPassword: "Zresetuj haslo",
      email: "E-mail",
      password: "Haslo",
      newPassword: "Nowe haslo",
      emailPlaceholder: "ty@firma.pl",
      passwordPlaceholder: "••••••••",
      passwordMin: "Co najmniej 8 znakow",
      createAccountDescription:
        "Zacznij od darmowego triala i pobierz aplikacje desktopowa.",
      signInDescription:
        "Zaloguj sie, aby uzyskac dostep do panelu i pobran.",
      resetDescription:
        "Wyslemy bezpieczny link do resetu hasla.",
      captchaMissing:
        "Brak klucza HCaptcha. Dodaj NEXT_PUBLIC_HCAPTCHA_SITE_KEY do .env.local.",
      captchaError: "Blad captcha. Odswiez i sprobuj ponownie.",
      captchaRequired: "Dokoncz weryfikacje captcha.",
      alreadyHaveAccount: "Masz juz konto?",
      newHere: "Pierwszy raz?",
      forgotPassword: "Zapomniales hasla?",
      backToSignIn: "Wroc do logowania",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Uruchom streamy z AI w kilka minut.",
      heroSubtitle:
        "RoxStreamAI to panel webowy i desktop companion, ktory pomaga prowadzic spojne, interaktywne live show. Potrafi czytac chat, reagowac na prezenty, trzymac sie scenariusza i utrzymac format stabilny w roznych strefach czasowych.",
      demoPrimary: "Pobierz demo",
      demoSecondary: "Zobacz ceny",
      demoNote: "Jasne limity uzycia. Przewidywalne koszty. BYOK wspierany.",
      howItWorksTitle: "Jak to dziala",
      howItWorksSubtitle:
        "Utworz konto, polacz narzedzia i wejdz na zywo z zabezpieczeniami.",
      featuresTitle: "Dlaczego zespoly wybieraja RoxStreamAI",
      featuresSubtitle:
        "Niezawodny co-host loop z jasnymi limitami i workflow gotowymi do Unreal.",
      useCasesTitle: "Przypadki uzycia",
      useCasesSubtitle: "Rzeczywiste formaty, dla ktorych powstal RoxStreamAI.",
      ctaTitle: "Gotowy na pierwsza sesje?",
      ctaSubtitle:
        "Pobierz demo, by przetestowac Desktop companion. Zobacz ceny, gdy bedziesz gotow skalowac uzycie i wspolbieznosc.",
      ctaPrimary: "Pobierz demo",
      ctaSecondary: "Zobacz ceny",
      faqTitle: "Pytania",
      faqSubtitle: "Szybkie odpowiedzi o Desktop Mode, uzyciu i BYOK.",
    },
    app: {
      overview: "Przeglad",
      overviewSubtitle: "Status live, limity i szybkie akcje.",
      systemToastsTitle: "Powiadomienia systemowe",
      systemToastsSubtitle: "Ostatnie aktualizacje z workspace.",
      startSession: "Rozpocznij sesje",
      upgradeRequired: "Wymagany upgrade",
      quickActions: "Szybkie akcje",
      createCharacter: "Utworz postac",
      setupDonoRules: "Skonfiguruj reguly Dono",
      deploy: "Wdrozenie",
      generateShareLink: "Generuj link udostepniania",
      billing: "Fakturowanie",
      billingSubtitle: "Plany, kredyty i dodatki.",
      promoCodeLabel: "Kod promo",
      promoCodePlaceholder: "Wpisz kod promo",
      promoCodeHelp:
        "Uzyj kodu polecenia, aby odblokowac bonusowe godziny Active Speech po zakupie.",
      referrals: "Polecenia",
      referralProgramTitle: "Program polecen",
      referralProgramBody:
        "Udostepnij kod promo, aby odblokowac bonusowe godziny Active Speech dla siebie i zaproszonych.",
      referralProgramManage: "Zarzadzaj poleceniami",
      referralInviteSubtitle:
        "Zapros tworcow i zdobadz bonusowe godziny Active Speech.",
      referralHowTitle: "Jak to dziala",
      referralHowLine1:
        "Osoby, ktore uzyja twojego kodu, otrzymuja bonusowe godziny Active Speech po zakupie.",
      referralHowLine2:
        "Starter: +1 godzina. Creator: +2 godziny. Pro: +5 godzin. Studio: +10 godzin. Scale: +20 godzin.",
      referralHowLine3:
        "Kazde 3 kwalifikowane zakupy (Creator lub wyzej) daja ci 4 godziny.",
      referralHowLine4:
        "Mozesz zdobywac bonus 4 godzin ponownie za kazde kolejne 3 zakupy.",
      referralPromoTitle: "Twoj kod promo",
      referralPromoPlaceholder: "Wybierz kod promo",
      referralPromoCreate: "Utworz kod",
      referralPromoCopy: "Kopiuj link polecen",
      referralBonusTitle: "Postep bonusu",
      referralBonusClaim: "Odbierz bonus 4 godzin",
      referralBonusNeed: "Do bonusu potrzebne sa 3 kwalifikowane zakupy.",
      referralRegistrationsTitle: "Rejestracje",
      referralPurchasesTitle: "Zakupy",
      referralNoSignups: "Brak rejestracji.",
      referralNoPurchases: "Brak zakupow.",
      notifications: "Powiadomienia",
      notificationsTitle: "Powiadomienia",
      notificationsSubtitle: "Uzycie, bonusy i aktualizacje fakturowania.",
      notificationsMarkAll: "Oznacz wszystko jako przeczytane",
      notificationsEmpty: "Brak powiadomien.",
      notificationsMarkRead: "Oznacz jako przeczytane",
      currentPlan: "Aktualny plan",
      managePlan: "Zarzadzaj planem i wykorzystaniem.",
      comparePlans: "Porownaj plany",
      contactSales: "Kontakt ze sprzedaza",
      remainingHours: "Pozostale aktywne godziny",
      unlimitedHours: "Nielimitowane aktywne godziny (BYOK).",
      billingSummary: "Podsumowanie rozliczen",
      nextInvoice: "Nastepna faktura: 26 lut 2026",
      trialEnded: "Trial zakonczony",
      trialEndsIn: "Trial konczy sie za {days} dni",
      connectors: "Konektory streamu",
      connectorsSubtitle: "Polacz kanaly i ustaw limity wspolbieznosci.",
      connectorsTiktokDescription:
        "Konektory konfiguruje sie w desktop companion. Ten panel pokaze status live po wlaczeniu API konektorow.",
      connectorsConnectTiktok: "Polacz TikTok",
      connectorsOpenSetupGuide: "Otworz instrukcje",
      connectorsJoinWaitlist: "Dolacz do listy oczekujacych na wczesny dostep.",
      connectorsEarlyAccessNote: "Wczesny dostep najpierw dla Pro i Studio.",
      connectorsMultiAccountTitle: "Harmonogram wielu kont",
      connectorsMultiAccountDescription:
        "Dostepne w Pro+. Rotuj wiele kont z zasadami harmonogramu.",
      connectorsMultiAccountBody:
        "Modul w podgladzie. Po wlaczeniu bedziesz rotowac konta wg harmonogramow i limitow uzycia.",
      connectorsExampleRotationWindow: "Przyklad: okno rotacji co 4 godziny",
      connectorsExampleMaxSessionsPerDay: "Przyklad: maks. sesji dziennie: 3",
      deployTitle: "Wdrozenie",
      deploySubtitle: "Opublikuj sesje i wejdz na zywo w OBS.",
      settings: "Ustawienia",
      settingsSubtitle: "Providerzy, klucze i preferencje workspace.",
      characters: "Postacie",
      charactersSubtitle: "Tworz i zarzadzaj personami streamerow.",
      noCharacters:
        "Brak postaci. Utworz pierwsza postac, aby odblokowac stream i export do Unreal.",
      characterBuilder: "Kreator postaci",
      characterBuilderSubtitle:
        "Zbuduj profil persony dla streamu. Ustawienia zmienisz pozniej.",
      characterEditorTitle: "Edytor postaci 3D",
      characterEditorEnabledNote: "Integracja edytora Polyphoria jest wlaczona (WIP).",
      characterEditorComingSoonNote:
        "Wkrotce: wbudowany edytor 3D napedzany przez Polyphoria.",
      characterEditorSectionTitle: "Edytor",
      characterEditorEnabledDescription:
        "Wbudowana powierzchnia edytora pojawi sie tutaj. Na razie uzyj Kreatora postaci do edycji persony i glosu.",
      characterEditorWaitlistDescription: "Dolacz do listy oczekujacych na wczesny dostep.",
      polyphoriaModalDescription:
        "Przygotowujemy integracje edytora postaci w aplikacji. Na razie mozesz importowac MetaHuman lub uzyc swojej sceny Unreal.",
      donoEngine: "Silnik Dono",
      donoEngineSubtitle: "Buduj reguly reakcji na prezenty i donacje.",
      scripts: "Skrypty streamu",
      scriptsSubtitle: "Projektuj przebieg show z czasowymi skryptami i presetami.",
      avatarScene: "Avatar + Scena",
      avatarSceneSubtitle: "Zarzadzaj warstwa wizualna streamera AI.",
      notFoundTitle: "Strona nie znaleziona",
      notFoundSubtitle: "Ten modul dashboardu jest w podgladzie.",
      backToOverview: "Powrot do przegladu",

      unrealConnector: "Konnektor Unreal",
      localRuntime: "Lokalny runtime",
      diagnostics: "Diagnostyka",

      unrealHubSubtitle:
        "Przewodniki po workflow RoxStreamAI → Unreal. Runtime Connector w podgladzie.",
      unrealGettingStartedTitle: "Start",
      unrealGettingStartedDescription:
        "Wybierz jedna z ponizszych sciezek konfiguracji. Jesli masz projekt Unreal, zacznij od Manual setup.",
      unrealImportMetahumanTitle: "Jak zaimportowac MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archiwum)",
      unrealManualSetupTitle: "Reczna konfiguracja Unreal",
      unrealRuntimeConnectorTitle: "Runtime konnektor Unreal",
      unrealOpenRuntimeConnectorButton:
        "Otworz Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Powrot do Unreal hub",
      unrealOpenDocsButton: "Otworz dokumentacje Unreal",

      billingCurrentPlanCheck: "Obecny plan \u2713",
      billingUpgrade: "Uaktualnij",
      billingUpgradeNote: "Bez zwrotu za bieżący okres",
      billingDowngrade: "Przejdź na niższy",
      billingDowngradeNote: "Obowiązuje od następnego okresu rozliczeniowego",
      billingSubscribe: "Subskrybuj",

      billingSuccessTitle: "Platnosc otrzymana",
      billingSuccessVerifying: "Weryfikacja platnosci...",
      billingSuccessProcessing:
        "Wciaz przetwarzamy platnosc. Sprobuj pozniej.",
      billingSuccessConfirmedRedirecting: "Platnosc potwierdzona. Przekierowanie...",
      billingSuccessGoToDashboard: "Przejdz do dashboardu",

      characterBuilderLiveNote: "Testy Brain + Voice sa aktywne.",
      characterBuilderDraft: "Szkic",
      characterBuilderProfileTitle: "Profil",
      characterBuilderCharacterNamePlaceholder: "Nazwa postaci",
      characterBuilderPrimaryLanguagePlaceholder: "Jezyk glowny (en/ru)",
      characterBuilderBioPlaceholder: "Wskazowki persony i tonu",
      characterBuilderVoiceTitle: "Glos",
      characterBuilderVoiceProviderLabel: "Dostawca glosu",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (w cenie)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, wlasny klucz)",
      characterBuilderVoiceIdLabel: "Preset glosu / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID glosu ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Testuj glos",
      characterBuilderTestResponseTitle: "Odpowiedz testowa",
      characterBuilderTestResponseDescription:
        "Wywoluje dostawce brain workspace i stosuje persone postaci.",
      characterBuilderTestResponse: "Odpowiedz testowa",
      characterBuilderReplyLabel: "Odpowiedz",
      characterBuilderNotesTitle: "Notatki",
      characterBuilderNotesDescription:
        "Skonfiguruj domyslne ustawienia w Ustawienia → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "Workspace nie skonfigurowany.",
      characterBuilderNotFound: "Postac nie znaleziona.",
      characterBuilderTestResponseFailed: "Odpowiedz testowa nieudana.",
      characterBuilderTestVoiceFailed: "Test glosu nieudany.",
      characterBuilderDefaultUserMessage: "Czesc! Daj mi krotkie, zabawne powitanie.",

      aiProvidersTitle: "Dostawcy AI",
      aiProvidersSubtitle:
        "Skonfiguruj brain + voice dla workspace. Klucze sa przechowywane na serwerze.",
      aiProvidersLoadFailed: "Nie udalo sie zaladowac ustawien AI.",
      aiProvidersSaveFailed: "Nie udalo sie zapisac ustawien.",
      aiProvidersSaveKeyFailed: "Nie udalo sie zapisac klucza.",
      aiProvidersRemoveKeyFailed: "Nie udalo sie usunac klucza.",
      aiProvidersKeySaved: "Klucz zapisany.",
      aiProvidersKeyRemoved: "Klucz usuniety.",
      aiProvidersBrainTestFailed: "Test brain nieudany.",
      aiProvidersVoiceTestFailed: "Test glosu nieudany.",
      aiProvidersBrainProviderLabel: "Dostawca brain",
      aiProvidersBrainProviderHelp:
        "Inni dostawcy sa pokazani tylko informacyjnie, ale jeszcze niedostepni. Dzis aplikacja dziala na OpenAI.",
      aiProvidersBrainModelLabel: "Model brain",
      aiProvidersCostEstimatorTitle: "Kalkulator kosztow ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Dodamy wbudowany kalkulator po uruchomieniu dodatkowych dostawcow (tokeny, glosy i prognozowane koszty). Na razie glos OpenAI jest wliczony, a dostawcy BYOK rozliczaja bezposrednio.",
      aiProvidersVoiceProviderLabel: "Dostawca glosu",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (w cenie)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, wlasny klucz)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Dodaj ponizej klucz ElevenLabs, aby uzyc tego dostawcy.",
      aiProvidersVoiceIdLabel: "Preset glosu / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID glosu ElevenLabs",
      aiProvidersSaveButton: "Zapisz ustawienia AI",
      aiProvidersTestBrainButton: "Testuj brain",
      aiProvidersTestVoiceButton: "Testuj glos",
      aiProvidersTestBrainResponseLabel: "Testowa odpowiedz brain",
      aiProvidersApiKeysTitle: "Klucze API (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (opcjonalnie)",
      aiProvidersElevenLabsKeyLabel: "Klucz API ElevenLabs",
      aiProvidersSaveKeyButton: "Zapisz klucz",
      aiProvidersReplaceKeyButton: "Zamien klucz",
      aiProvidersRemoveKeyButton: "Usun klucz",
      aiProvidersKeysNotReturnedNote:
        "Klucze nigdy nie wracaja do przegladarki. UI pokazuje tylko “{connected}”.",

      settingsPageTitle: "Ustawienia",
      settingsProfileTitle: "Profil",
      settingsDisplayNameLabel: "Nazwa wyswietlana",
      settingsDisplayNameRequired: "Nazwa wyswietlana jest wymagana.",
      settingsUsernameOptionalLabel: "Nazwa uzytkownika (opcjonalnie)",
      settingsNoProfileFound: "Nie znaleziono profilu.",
      settingsWorkspaceTitle: "Pracovny priestor",
      settingsNoWorkspaceFound: "Nie znaleziono workspace.",
      settingsSignOutTitle: "Wyloguj",
      settingsSignOutDescription: "Wyloguj sie z konta na tym urzadzeniu.",

      unrealExportButton: "Eksport do Unreal",
      unrealExportTitle: "Eksport do Unreal",
      unrealExportDescription:
        "Wygeneruj JSON, ktory mozna uzyc do recznej konfiguracji Unreal teraz i do Runtime Connector pozniej.",
      unrealExportIncludeDonoRules: "Dolacz reguly Dono",
      unrealExportIncludeScripts: "Dolacz skrypty",
      unrealExportIncludeScenes: "Dolacz sceny",
      unrealExportFailed: "Eksport nieudany.",
      unrealExportSavedTo: "Zapisano w: {path}",
      unrealExportGenerateDownload: "Generuj + pobierz",
      unrealExportFile: "Plik: {filename}",
    },
    admin: {
      label: "Yonetim",
      navOverview: "Przeglad",
      navUsers: "Uzytkownicy",
      navPricing: "Ceny",
      navContent: "Tresci",
      navLeads: "Leady",
      navAudit: "Audyt",
      navReleases: "Wydania",
      dashboardLink: "Panel",

      overviewTitle: "Przeglad centrum kontroli",
      overviewSubtitle:
        "Kluczowe sumy uzytkownikow, workspace, rozliczen i uzycia.",
      totalUsers: "Lacznie uzytkownikow",
      totalUsersHelp: "Profile utworzone w Supabase.",
      workspaces: "Obszary robocze",
      workspacesHelp: "Laczna liczba obszarow roboczych wszystkich uzytkownikow.",
      activeSubscriptions: "Aktywne subskrypcje",
      activeSubscriptionsHelp: "Wiersze billing_state ze status=active.",
      usageEvents24h: "Zdarzenia uzycia (24h)",
      usageEvents24hHelp: "Zdarzenia z ostatnich 24 godzin.",
      releasesCount: "Wydania",
      releasesCountHelp: "Buildy desktop do pobrania.",

      usersTitle: "Zarzadzanie dostepem",
      usersSubtitle: "Aktualizuj role i plan uzytkownika.",
      tableEmail: "E-posta",
      tableRole: "Rola",
      tablePlan: "Taryfa",
      tableCreated: "Utworzono",
      tableSave: "Zapisz",
      buttonSave: "Zapisz",
      roleUser: "Uzytkownik",
      roleAdmin: "Administrator",
      planTrial: "Proba",
      planPro: "Profesjonalny",
      planStudio: "Studio",
      planEnterprise: "Biznes",

      pricingTitle: "CMS cen",
      pricingSubtitle:
        "Edytuj wersjonowana konfiguracje cen i publikuj aktywna wersje.",
      contentTitle: "CMS marketingu",
      contentSubtitle:
        "Edytuj marketing w blokach markdown. Strony laduja sie po kluczu z fallbackami.",
      leadsTitle: "Lista oczekujacych i kontakt",
      leadsSubtitle: "Zobacz leady i eksportuj CSV.",
      auditTitle: "Logi audytu admina",
      auditSubtitle:
        "Ostatnie akcje admina na uzytkownikach, cenach, tresci i leadach.",
      releasesTitle: "Wydania",

      errorUnknown: "Nieznany blad",
      buttonRefresh: "Odswiez",
      buttonPublish: "Opublikuj",
      buttonNew: "Nowy",
      buttonExportCsv: "Eksportuj CSV",

      statusActive: "Aktywny",
      statusDraft: "Szkic",
      statusPublished: "Opublikowany",

      pricingVersions: "Wersje",
      pricingNoVersions: "Brak wersji.",
      pricingEditor: "Edytor",
      pricingEditingVersion: "Edycja v{version}",
      pricingSelectVersion: "Wybierz wersje",
      pricingRawJsonAdvanced: "Raw JSON (zaawansowane)",
      pricingYearlyDiscountPct: "Roczna znizka (%)",
      pricingDefaultTalkRatio: "Domyslny talk ratio",
      pricingMinTalkRatio: "Minimalny talk ratio",
      pricingMaxTalkRatio: "Maksymalny talk ratio",
      pricingTooltipText: "Tekst tooltipa",
      pricingPlans: "Plany",
      pricingTablePlan: "Taryfa",
      pricingTableMonthlyEur: "Miesiecznie (€)",
      pricingTableEntitlementsJson: "Uprawnienia (JSON)",
      pricingPlaceholderMonthlyEur: "np. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Tip: zapis waliduje schemat po stronie serwera.",

      contentSearchPlaceholder: "Szukaj kluczy lub tekstu…",
      contentNoBlocks: "Brak blokow tresci.",
      contentSelectBlock: "Wybierz blok",
      contentSelectBlockError: "Wybierz blok do edycji",
      contentMarkdown: "Markdown",
      contentPreview: "Podglad",
      contentMarkdownPlaceholder: "# Tytul\n\nTwoja tresc…",

      leadsWaitlist: "Lista oczekujacych",
      leadsContact: "Kontakt",
      leadsInvestors: "Inwestorzy",
      leadsShowingRows: "Wyswietlono {count} wierszy",
      leadsNoLeads: "Brak leadow.",

      auditFilterActionPlaceholder: "Filtruj akcje…",
      auditFilterTargetTypePlaceholder: "Filtruj target_type…",
      auditShowingEntries: "Wyswietlono {count} wpisow",
      auditTime: "Czas",
      auditAction: "Akcja",
      auditTarget: "Cel",
      auditPayload: "Payload",
      auditNoEntries: "Brak wpisow audytu.",

      releasesVersion: "Wersja",
      releasesPlatform: "Platforma",
      releasesDownloadUrl: "URL pobrania",
      releasesNotes: "Notatki",
      releasesMarkLatest: "Oznacz jako latest",
      releasesAddRelease: "Dodaj release",
      releasesUpdate: "Aktualizuj",
      releasesDeleteRelease: "Usun release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "Co nowego...",
    },
  },
  sk: {
    ...en,
    common: {
      brand: "RoxStreamAI",
      dashboard: "Panel",
      openDashboard: "Otvorit panel",
      signIn: "Prihlasit sa",
      signOut: "Odhlasit sa",
      downloadDemo: "Stiahnut demo",
      back: "Spat",
      comingSoon: "Uz coskoro",
      preview: "Nahlad",
      saved: "Ulozene",
      now: "teraz",
      loading: "Nacitava sa…",
      save: "Ulozit",
      saving: "Ukladanie…",
      thinking: "Premyslam…",
      generating: "Generovanie…",
      testing: "Testovanie…",
      connected: "Pripojene",
      cancel: "Zrusit",
      close: "Zavriet",
      featureComingSoonDescription: "Tato funkcia bude coskoro dostupna.",
      proPerks: "Vyhody Pro",
      desktopOnlyTitle: "Len desktop",
      desktopOnlyMessage: "Tato sekcia je dostupna iba v aplikacii RoxStreamAI Desktop.",
      draftUpdated: "Koncept aktualizovany",
      published: "Publikovane",
      planUpgradeRequired: "Vyžaduje sa upgrade planu",
      creditsLimitReached: "Limit kreditov dosiahnuty. Kupte viac hodin.",
    },
    nav: {
      home: "Domov",
      useCases: "Pripady pouzitia",
      pricing: "Cennik",
      docs: "Dokumentacia",
      blog: "Novinky",
      about: "O nas",
      contact: "Kontakt",
      team: "Tim",
      terms: "Podmienky",
      privacy: "Sukromie",
      cookies: "Susenky",
    },
    auth: {
      welcomeBack: "Vitajte spat",
      createAccount: "Vytvorit ucet",
      resetPassword: "Obnovit heslo",
      email: "E-mail",
      password: "Heslo",
      newPassword: "Nove heslo",
      emailPlaceholder: "vy@firma.sk",
      passwordPlaceholder: "••••••••",
      passwordMin: "Aspoň 8 znakov",
      createAccountDescription:
        "Zacnite s bezplatnym trialom a stiahnite si desktop aplikaciu.",
      signInDescription:
        "Prihlaste sa pre pristup k panelu a stahovaniam.",
      resetDescription:
        "Posleme bezpecny odkaz na obnovu hesla.",
      captchaMissing:
        "Chyba HCaptcha kluc. Pridajte NEXT_PUBLIC_HCAPTCHA_SITE_KEY do .env.local.",
      captchaError: "Chyba captcha. Obnovte stranku a skuste znova.",
      captchaRequired: "Dokoncite overenie captcha.",
      alreadyHaveAccount: "Uz mate ucet?",
      newHere: "Ste tu prvykrat?",
      forgotPassword: "Zabudli ste heslo?",
      backToSignIn: "Spat na prihlasenie",
    },
    marketing: {
      heroBadge: "RoxStreamAI",
      heroTitle: "Spustite AI streamy za par minut.",
      heroSubtitle:
        "RoxStreamAI je webovy dashboard a desktop companion, ktory pomaha viest konzistentne, interaktivne live show. Vie citat chat, reagovat na dary, drzat sa scenara a udrzat format stabilny napriec casovymi pasmami.",
      demoPrimary: "Stiahnut demo",
      demoSecondary: "Pozriet ceny",
      demoNote: "Jasne limity pouzitia. Predvidatelne naklady. BYOK podporovany.",
      howItWorksTitle: "Ako to funguje",
      howItWorksSubtitle:
        "Vytvorte ucet, pripojte nastroje a chodte live s ochrannymi pravidlami.",
      featuresTitle: "Preco si timy vyberaju RoxStreamAI",
      featuresSubtitle:
        "Spolahlivy co-host loop s jasnymi limitmi a workflow pripravenymi pre Unreal.",
      useCasesTitle: "Pripady pouzitia",
      useCasesSubtitle: "Realne formaty, pre ktore je RoxStreamAI postaveny.",
      ctaTitle: "Pripraveni spustit prvu session?",
      ctaSubtitle:
        "Stiahnite demo a vyskusajte Desktop companion. Ceny si pozrite, ked budete pripraveni skalovat pouzitie a subeznost.",
      ctaPrimary: "Stiahnut demo",
      ctaSecondary: "Pozriet ceny",
      faqTitle: "Caste otazky",
      faqSubtitle: "Rychle odpovede o Desktop Mode, pouziti a BYOK.",
    },
    app: {
      overview: "Prehlad",
      overviewSubtitle: "Stav live, limity a rychle akcie.",
      systemToastsTitle: "Systemove notifikacie",
      systemToastsSubtitle: "Nedavne aktualizacie z workspace.",
      startSession: "Spustit session",
      upgradeRequired: "Upgrade je potrebny",
      quickActions: "Rychle akcie",
      createCharacter: "Vytvorit postavu",
      setupDonoRules: "Nastavit Dono pravidla",
      deploy: "Nasadenie",
      generateShareLink: "Vytvorit odkaz na zdielanie",
      billing: "Fakturacia",
      billingSubtitle: "Sprava planu, kreditov a doplnkov.",
      promoCodeLabel: "Promo kod",
      promoCodePlaceholder: "Zadajte promo kod",
      promoCodeHelp:
        "Pouzite referral kod na bonusove hodiny Active Speech po nakupe.",
      referrals: "Referral",
      referralProgramTitle: "Referral program",
      referralProgramBody:
        "Zdielajte promo kod a ziskajte bonusove hodiny Active Speech pre seba a pozvanych.",
      referralProgramManage: "Spravovat referral",
      referralInviteSubtitle:
        "Pozvite creatorov a ziskajte bonusove hodiny Active Speech.",
      referralHowTitle: "Ako to funguje",
      referralHowLine1:
        "Ti, co pouziju vas kod, ziskaju bonusove hodiny Active Speech po nakupe.",
      referralHowLine2:
        "Starter: +1 hodina. Creator: +2 hodiny. Pro: +5 hodin. Studio: +10 hodin. Scale: +20 hodin.",
      referralHowLine3:
        "Kazde 3 opravnena nakupy (Creator alebo vyssi) vam daju 4 hodiny.",
      referralHowLine4:
        "Bonus 4 hodiny mozete ziskat znova za kazde dalsie 3 nakupy.",
      referralPromoTitle: "Vas promo kod",
      referralPromoPlaceholder: "Zvolte promo kod",
      referralPromoCreate: "Vytvorit kod",
      referralPromoCopy: "Kopirovat referral odkaz",
      referralBonusTitle: "Postup bonusu",
      referralBonusClaim: "Poziadat o bonus 4 hodiny",
      referralBonusNeed: "Pre bonus su potrebne 3 opravnena nakupy.",
      referralRegistrationsTitle: "Registracie",
      referralPurchasesTitle: "Nakupy",
      referralNoSignups: "Ziadne registracie.",
      referralNoPurchases: "Ziadne nakupy.",
      notifications: "Notifikacie",
      notificationsTitle: "Notifikacie",
      notificationsSubtitle: "Pouzitie, bonusy a aktualizacie fakturacie.",
      notificationsMarkAll: "Oznacit vsetko ako precitane",
      notificationsEmpty: "Ziadne notifikacie.",
      notificationsMarkRead: "Oznacit ako precitane",
      currentPlan: "Aktualny plan",
      managePlan: "Spravovat plan a vyuzitie.",
      comparePlans: "Porovnat plany",
      contactSales: "Kontaktovat predaj",
      remainingHours: "Zostavajuce aktivne hodiny",
      unlimitedHours: "Neobmedzene aktivne hodiny (BYOK).",
      billingSummary: "Prehlad fakturacie",
      nextInvoice: "Dalsia faktura: 26. februara 2026",
      trialEnded: "Trial skoncil",
      trialEndsIn: "Trial konci za {days} dni",
      connectors: "Stream konektory",
      connectorsSubtitle: "Pripojte kanaly a nastavte limity subeznosti.",
      connectorsTiktokDescription:
        "Konektory sa nastavuju v desktop companion. Tento dashboard zobrazi live stav po zapnuti API konektorov.",
      connectorsConnectTiktok: "Pripojit TikTok",
      connectorsOpenSetupGuide: "Otvorit navod",
      connectorsJoinWaitlist: "Prihlasit sa na waitlist pre early access.",
      connectorsEarlyAccessNote: "Early access najprv pre Pro a Studio.",
      connectorsMultiAccountTitle: "Planovac viac uctov",
      connectorsMultiAccountDescription:
        "Dostupne v Pro+. Rotujte viac uctov s pravidlami planovania.",
      connectorsMultiAccountBody:
        "Modul je v preview. Po aktivacii budete moct rotovat ucty podla rozvrhov a limitov vyuzitia.",
      connectorsExampleRotationWindow: "Priklad: rotacne okno kazde 4 hodiny",
      connectorsExampleMaxSessionsPerDay: "Priklad: max. sessions za den: 3",
      deployTitle: "Nasadenie",
      deploySubtitle: "Publikujte session a chodte live v OBS.",
      settings: "Nastavenia",
      settingsSubtitle: "Provideri, kluce a preferencie workspace.",
      characters: "Postavy",
      charactersSubtitle: "Vytvarajte a spravujte persony streamerov.",
      noCharacters:
        "Ziadne postavy. Vytvorte prvu postavu na odomknutie streamu a exportu do Unreal.",
      characterBuilder: "Builder postavy",
      characterBuilderSubtitle:
        "Vytvorte profil persony pre stream. Nastavenia mozete neskor zmenit.",
      characterEditorTitle: "3D editor postav",
      characterEditorEnabledNote: "Integracia editora Polyphoria je aktivna (WIP).",
      characterEditorComingSoonNote:
        "Coskoro: in-app 3D editor pohanany Polyphoria.",
      characterEditorSectionTitle: "Upravy",
      characterEditorEnabledDescription:
        "Vlozena plocha editora sa objavi tu. Zatial pouzite Builder postavy na personu a hlas.",
      characterEditorWaitlistDescription: "Prihlaste sa na waitlist pre early access.",
      polyphoriaModalDescription:
        "Pripravujeme integraciu editora postav v aplikacii. Zatial mozete importovat MetaHuman alebo pouzit existujucu Unreal scenu.",
      donoEngine: "Dono motor",
      donoEngineSubtitle: "Vytvarajte pravidla, ktore reaguju na dary a donacie.",
      scripts: "Stream skripty",
      scriptsSubtitle: "Navrhnite priebeh show s casovanymi skriptmi a presetmi.",
      avatarScene: "Avatar + Scena",
      avatarSceneSubtitle: "Sprava vizualnej vrstvy AI streamera.",
      notFoundTitle: "Stranka nenajdena",
      notFoundSubtitle: "Tento modul dashboardu je stale v preview.",
      backToOverview: "Spat na prehlad",

      unrealConnector: "Konektor Unreal",
      localRuntime: "Lokalny runtime",
      diagnostics: "Diagnostika",

      unrealHubSubtitle:
        "Navody pre workflow RoxStreamAI → Unreal. Runtime Connector je v preview.",
      unrealGettingStartedTitle: "Zaciatok",
      unrealGettingStartedDescription:
        "Zvolte jednu z ciest nastavenia nizsie. Ak uz mate Unreal projekt, zacnite s Manual setup.",
      unrealImportMetahumanTitle: "Ako importovat MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archiv)",
      unrealManualSetupTitle: "Rucne nastavenie Unreal",
      unrealRuntimeConnectorTitle: "Runtime Connector Unreal",
      unrealOpenRuntimeConnectorButton:
        "Otvorit Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Spat do Unreal hubu",
      unrealOpenDocsButton: "Otvorit Unreal docs",

      billingCurrentPlanCheck: "Aktuálny plán \u2713",
      billingUpgrade: "Prejsť na vyšší",
      billingUpgradeNote: "Bez vrátenia za aktuálne obdobie",
      billingDowngrade: "Prejsť na nižší",
      billingDowngradeNote: "Platí od nasledujúceho fakturačného obdobia",
      billingSubscribe: "Predplatiť",

      billingSuccessTitle: "Platba prijata",
      billingSuccessVerifying: "Overujeme platbu...",
      billingSuccessProcessing:
        "Platbu stale spracovavame. Obnovte neskor.",
      billingSuccessConfirmedRedirecting: "Platba potvrdena. Presmerovanie...",
      billingSuccessGoToDashboard: "Do dashboardu",

      characterBuilderLiveNote: "Testovanie Brain + Voice je aktivne.",
      characterBuilderDraft: "Koncept",
      characterBuilderProfileTitle: "Profil",
      characterBuilderCharacterNamePlaceholder: "Meno postavy",
      characterBuilderPrimaryLanguagePlaceholder: "Primarny jazyk (en/ru)",
      characterBuilderBioPlaceholder: "Persona a ton",
      characterBuilderVoiceTitle: "Hlas",
      characterBuilderVoiceProviderLabel: "Provider hlasu",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (v cene)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, vlastny kluc)",
      characterBuilderVoiceIdLabel: "Preset hlasu / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID hlasu ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Testovat hlas",
      characterBuilderTestResponseTitle: "Test odpoved",
      characterBuilderTestResponseDescription:
        "Vola brain provider workspace a aplikuje personu postavy.",
      characterBuilderTestResponse: "Test odpoved",
      characterBuilderReplyLabel: "Odpoved",
      characterBuilderNotesTitle: "Poznamky",
      characterBuilderNotesDescription:
        "Nastavte vychodzie providery v Nastavenia → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "Workspace nie je nakonfigurovany.",
      characterBuilderNotFound: "Postava nenajdena.",
      characterBuilderTestResponseFailed: "Test odpoved zlyhal.",
      characterBuilderTestVoiceFailed: "Test hlasu zlyhal.",
      characterBuilderDefaultUserMessage: "Ahoj! Daj mi kratke a vesele pozdravenie.",

      aiProvidersTitle: "AI Providery",
      aiProvidersSubtitle:
        "Nastavte brain + voice pre workspace. Kluce su ulozene na serveri.",
      aiProvidersLoadFailed: "Nepodarilo sa nacitat AI nastavenia.",
      aiProvidersSaveFailed: "Nepodarilo sa ulozit nastavenia.",
      aiProvidersSaveKeyFailed: "Nepodarilo sa ulozit kluc.",
      aiProvidersRemoveKeyFailed: "Nepodarilo sa odstranit kluc.",
      aiProvidersKeySaved: "Kluc ulozeny.",
      aiProvidersKeyRemoved: "Kluc odstraneny.",
      aiProvidersBrainTestFailed: "Test brain zlyhal.",
      aiProvidersVoiceTestFailed: "Test hlasu zlyhal.",
      aiProvidersBrainProviderLabel: "Provider brainu",
      aiProvidersBrainProviderHelp:
        "Ostatni provideri su len pre prehlad, zatial nie su dostupni. Dnes app bezi na OpenAI.",
      aiProvidersBrainModelLabel: "Model brainu",
      aiProvidersCostEstimatorTitle: "Odhad nakladov ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Pridame in-app odhad, az budu dalsi provideri aktivni (tokeny, hlasy a odhad vydavkov). Zatial je OpenAI voice zahrnute a BYOK provideri uctuju priamo.",
      aiProvidersVoiceProviderLabel: "Provider hlasu",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (v cene)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, vlastny kluc)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Pridajte ElevenLabs kluc nizsie, aby ste mohli pouzit tento provider.",
      aiProvidersVoiceIdLabel: "Preset hlasu / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID hlasu ElevenLabs",
      aiProvidersSaveButton: "Ulozit AI nastavenia",
      aiProvidersTestBrainButton: "Testovat brain",
      aiProvidersTestVoiceButton: "Testovat hlas",
      aiProvidersTestBrainResponseLabel: "Test odpoved brain",
      aiProvidersApiKeysTitle: "API kluce (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API kluc (volitelne)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API kluc",
      aiProvidersSaveKeyButton: "Ulozit kluc",
      aiProvidersReplaceKeyButton: "Nahradit kluc",
      aiProvidersRemoveKeyButton: "Odstranit kluc",
      aiProvidersKeysNotReturnedNote:
        "Kluce sa nikdy nevracaju do prehliadaca. UI zobrazi len “{connected}”.",

      settingsPageTitle: "Nastavenia",
      settingsProfileTitle: "Profil",
      settingsDisplayNameLabel: "Zobrazovane meno",
      settingsDisplayNameRequired: "Zobrazovane meno je povinne.",
      settingsUsernameOptionalLabel: "Uzivatelske meno (volitelne)",
      settingsNoProfileFound: "Profil nenajdeny.",
      settingsWorkspaceTitle: "Pracovny priestor",
      settingsNoWorkspaceFound: "Workspace nenajdeny.",
      settingsSignOutTitle: "Odhlasit",
      settingsSignOutDescription: "Odhlaste sa z uctu na tomto zariadeni.",

      unrealExportButton: "Export pre Unreal",
      unrealExportTitle: "Export pre Unreal",
      unrealExportDescription:
        "Vygenerujte JSON konfiguraciu pre rucne nastavenie Unreal dnes a pre Runtime Connector neskor.",
      unrealExportIncludeDonoRules: "Zahrnut Dono pravidla",
      unrealExportIncludeScripts: "Zahrnut skripty",
      unrealExportIncludeScenes: "Zahrnut sceny",
      unrealExportFailed: "Export zlyhal.",
      unrealExportSavedTo: "Ulozene do: {path}",
      unrealExportGenerateDownload: "Vygenerovat + stiahnut",
      unrealExportFile: "Subor: {filename}",
    },
    admin: {
      label: "Administracia",
      navOverview: "Prehlad",
      navUsers: "Uzivatelia",
      navPricing: "Ceny",
      navContent: "Obsah",
      navLeads: "Leady",
      navAudit: "Audity",
      navReleases: "Release",
      dashboardLink: "Panel",

      overviewTitle: "Prehlad riadiaceho centra",
      overviewSubtitle:
        "Klicove suhrny uzivatelov, workspace, fakturacie a vyuzitia.",
      totalUsers: "Celkovo uzivatelov",
      totalUsersHelp: "Profily vytvorene v Supabase.",
      workspaces: "Pracovne priestory",
      workspacesHelp: "Celkovy pocet pracovnych priestorov vsetkych uzivatelov.",
      activeSubscriptions: "Aktivne predplatne",
      activeSubscriptionsHelp: "Riadky billing_state so status=active.",
      usageEvents24h: "Udalosti vyuzitia (24h)",
      usageEvents24hHelp: "Udalosti prijate za poslednych 24 hodin.",
      releasesCount: "Release",
      releasesCountHelp: "Desktop buildy dostupne na stiahnutie.",

      usersTitle: "Sprava pristupu",
      usersSubtitle: "Aktualizujte rolu a plan uzivatela.",
      tableEmail: "Email",
      tableRole: "Rola",
      tablePlan: "Tarif",
      tableCreated: "Vytvorene",
      tableSave: "Ulozit",
      buttonSave: "Ulozit",
      roleUser: "Uzivatel",
      roleAdmin: "Administrator",
      planTrial: "Trial",
      planPro: "Profi",
      planStudio: "Studio",
      planEnterprise: "Firemny",

      pricingTitle: "CMS cien",
      pricingSubtitle:
        "Upravte verzovanu konfiguraciu cien a publikujte aktivnu verziu.",
      contentTitle: "CMS marketingu",
      contentSubtitle:
        "Upravujte marketing text cez markdown bloky. Stranky sa nacitaju podla kluca s fallbackmi.",
      leadsTitle: "Waitlist a kontakt",
      leadsSubtitle: "Zobrazte zachytene leady a exportujte CSV.",
      auditTitle: "Auditne logy admina",
      auditSubtitle:
        "Nedavne admin akcie na uzivateloch, cenach, obsahu a leadoch.",
      releasesTitle: "Release",

      errorUnknown: "Neznama chyba",
      buttonRefresh: "Obnovit",
      buttonPublish: "Publikovat",
      buttonNew: "Novy",
      buttonExportCsv: "Exportovat CSV",

      statusActive: "Aktivne",
      statusDraft: "Koncept",
      statusPublished: "Publikovane",

      pricingVersions: "Verzie",
      pricingNoVersions: "Ziadne verzie.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editacia v{version}",
      pricingSelectVersion: "Vyberte verziu",
      pricingRawJsonAdvanced: "Raw JSON (pokrocile)",
      pricingYearlyDiscountPct: "Rocna zlava (%)",
      pricingDefaultTalkRatio: "Vychozi talk ratio",
      pricingMinTalkRatio: "Minimalny talk ratio",
      pricingMaxTalkRatio: "Maximalny talk ratio",
      pricingTooltipText: "Text tooltipu",
      pricingPlans: "Plany",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Mesacne (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "napr. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Tip: pri ulozeni sa overuje schema na serveri.",

      contentSearchPlaceholder: "Hladat kluce alebo text…",
      contentNoBlocks: "Ziadne bloky obsahu.",
      contentSelectBlock: "Vybrat blok",
      contentSelectBlockError: "Vyberte blok na upravu",
      contentMarkdown: "Markdown",
      contentPreview: "Nahlad",
      contentMarkdownPlaceholder: "# Titulok\n\nVas obsah…",

      leadsWaitlist: "Waitlist",
      leadsContact: "Kontakt",
      leadsInvestors: "Investori",
      leadsShowingRows: "Zobrazeno {count} riadkov",
      leadsNoLeads: "Ziadne leady.",

      auditFilterActionPlaceholder: "Filtrovat akciu…",
      auditFilterTargetTypePlaceholder: "Filtrovat target_type…",
      auditShowingEntries: "Zobrazeno {count} zaznamov",
      auditTime: "Cas",
      auditAction: "Akcia",
      auditTarget: "Ciel",
      auditPayload: "Payload",
      auditNoEntries: "Ziadne auditne zaznamy.",

      releasesVersion: "Verzia",
      releasesPlatform: "Platforma",
      releasesDownloadUrl: "URL na stiahnutie",
      releasesNotes: "Poznamky",
      releasesMarkLatest: "Oznacit ako latest",
      releasesAddRelease: "Pridat release",
      releasesUpdate: "Aktualizovat",
      releasesDeleteRelease: "Zmazat release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "Novinky...",
    },
  },
  de: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Übersicht",
      openDashboard: "Dashboard öffnen",
      signIn: "Anmelden",
      signOut: "Abmelden",
      downloadDemo: "Demo herunterladen",
      back: "Zurück",
      comingSoon: "Demnächst",
      preview: "Vorschau",
      saved: "Gespeichert",
      now: "jetzt",
      loading: "Laden…",
      save: "Speichern",
      saving: "Speichert…",
      thinking: "Denkt…",
      generating: "Generiert…",
      testing: "Testet…",
      connected: "Verbunden",
      cancel: "Abbrechen",
      close: "Schliessen",
      featureComingSoonDescription: "Diese Funktion wird bald aktiviert.",
      proPerks: "Pro-Vorteile",
      desktopOnlyTitle: "Nur Desktop",
      desktopOnlyMessage: "Dieser Bereich ist nur in der RoxStreamAI Desktop-App verfügbar.",
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
      blog: "Neuigkeiten",
      about: "Über uns",
      contact: "Kontakt",
      team: "Team",
      terms: "AGB",
      privacy: "Datenschutz",
      cookies: "Cookie-Richtlinie",
    },
    auth: {
      welcomeBack: "Willkommen zurück",
      createAccount: "Konto erstellen",
      resetPassword: "Passwort zurücksetzen",
      email: "E-Mail",
      password: "Passwort",
      newPassword: "Neues Passwort",
      emailPlaceholder: "du@firma.de",
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
        "Eine Plattform für Creator, faceless Formate und Agenturen.",
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
      systemToastsTitle: "Systembenachrichtigungen",
      systemToastsSubtitle: "Aktuelle Updates aus dem Workspace.",
      startSession: "Session starten",
      upgradeRequired: "Upgrade erforderlich",
      quickActions: "Schnellaktionen",
      createCharacter: "Charakter erstellen",
      setupDonoRules: "Dono-Regeln einrichten",
      deploy: "Bereitstellen",
      generateShareLink: "Share-Link generieren",
      billing: "Abrechnung",
      billingSubtitle: "Verwalte Plan, Credits und Add-ons.",
      promoCodeLabel: "Promo-Code",
      promoCodePlaceholder: "Promo-Code eingeben",
      promoCodeHelp:
        "Nutze einen Referral-Code, um nach dem Kauf zusätzliche Active-Speech-Stunden zu erhalten.",
      referrals: "Empfehlungen",
      referralProgramTitle: "Empfehlungsprogramm",
      referralProgramBody:
        "Teile deinen Promo-Code, um für dich und Eingeladene zusätzliche Active-Speech-Stunden zu erhalten.",
      referralProgramManage: "Empfehlungen verwalten",
      referralInviteSubtitle:
        "Lade Creator ein und erhalte zusätzliche Active-Speech-Stunden.",
      referralHowTitle: "So funktioniert's",
      referralHowLine1:
        "Personen, die deinen Code nutzen, erhalten nach dem Kauf zusätzliche Active-Speech-Stunden.",
      referralHowLine2:
        "Starter: +1 Stunde. Creator: +2 Stunden. Pro: +5 Stunden. Studio: +10 Stunden. Scale: +20 Stunden.",
      referralHowLine3:
        "Je 3 berechtigte Käufe (Creator oder höher) bringen dir 4 Stunden.",
      referralHowLine4:
        "Du kannst den 4-Stunden-Bonus erneut für je 3 weitere Käufe erhalten.",
      referralPromoTitle: "Dein Promo-Code",
      referralPromoPlaceholder: "Wähle deinen Promo-Code",
      referralPromoCreate: "Code erstellen",
      referralPromoCopy: "Referral-Link kopieren",
      referralBonusTitle: "Bonusfortschritt",
      referralBonusClaim: "4-Stunden-Bonus anfordern",
      referralBonusNeed: "Für den Bonus sind 3 berechtigte Käufe erforderlich.",
      referralRegistrationsTitle: "Registrierungen",
      referralPurchasesTitle: "Käufe",
      referralNoSignups: "Noch keine Registrierungen.",
      referralNoPurchases: "Noch keine Käufe.",
      notifications: "Benachrichtigungen",
      notificationsTitle: "Benachrichtigungen",
      notificationsSubtitle: "Nutzung, Boni und Abrechnungsupdates.",
      notificationsMarkAll: "Alle als gelesen markieren",
      notificationsEmpty: "Noch keine Benachrichtigungen.",
      notificationsMarkRead: "Als gelesen markieren",
      currentPlan: "Aktueller Plan",
      managePlan: "Plan-Details und Nutzung verwalten.",
      comparePlans: "Pläne vergleichen",
      contactSales: "Vertrieb kontaktieren",
      remainingHours: "Verbleibende aktive Sprachstunden",
      unlimitedHours: "Unbegrenzte aktive Sprachstunden (BYOK).",
      billingSummary: "Abrechnungsübersicht",
      nextInvoice: "Nächste Rechnung: 26. Feb 2026",
      trialEnded: "Testphase beendet",
      trialEndsIn: "Testphase endet in {days} Tagen",
      connectors: "Stream-Connectors",
      connectorsSubtitle:
        "Verbinde TikTok heute. Twitch und YouTube als Nächstes.",
      connectorsTiktokDescription:
        "Connectors werden über die Desktop-Begleitung konfiguriert. Dieses Dashboard zeigt den Live-Status, sobald die Connector-APIs aktiviert sind.",
      connectorsConnectTiktok: "TikTok verbinden",
      connectorsOpenSetupGuide: "Einrichtungsleitfaden öffnen",
      connectorsJoinWaitlist:
        "Zur Warteliste anmelden, um frühen Zugriff zu erhalten.",
      connectorsEarlyAccessNote:
        "Der Early Access wird zuerst für Pro und Studio ausgerollt.",
      connectorsMultiAccountTitle: "Multi-Account-Planer",
      connectorsMultiAccountDescription:
        "Verfügbar in Pro+. Mehrere Accounts mit Zeitplänen rotieren.",
      connectorsMultiAccountBody:
        "Dieses Modul ist in der Vorschau. Nach Aktivierung kannst du Accounts nach Zeitplänen und Nutzungslimits rotieren.",
      connectorsExampleRotationWindow:
        "Beispiel: Rotationsfenster alle 4 Stunden",
      connectorsExampleMaxSessionsPerDay:
        "Beispiel: Max. Sitzungen pro Tag: 3",
      deployTitle: "Bereitstellen",
      deploySubtitle: "Session veröffentlichen und in OBS live gehen.",
      settings: "Einstellungen",
      settingsSubtitle: "Workspace-Einstellungen und Export-Tools.",
      characters: "Charaktere",
      charactersSubtitle: "Verwalte deine KI-Streamer-Personas.",
      noCharacters: "Noch keine Charaktere. Erstelle deine erste Persona.",
      characterBuilder: "Charakter-Builder",
      characterBuilderSubtitle:
        "Persona, Stimme und Verhalten deines KI-Streamers erstellen.",
      characterEditorTitle: "3D-Charaktereditor",
      characterEditorEnabledNote:
        "Polyphoria-Editor-Integration ist aktiviert (in Arbeit).",
      characterEditorComingSoonNote:
        "Demnächst: ein integrierter 3D-Editor mit Polyphoria.",
      characterEditorSectionTitle: "Bearbeitung",
      characterEditorEnabledDescription:
        "Die eingebettete Editor-Oberfläche erscheint hier. Bis dahin nutze den Charakter-Builder für Persona und Stimme.",
      characterEditorWaitlistDescription:
        "Trage dich in die Warteliste ein, um frühen Zugriff zu erhalten.",
      polyphoriaModalDescription:
        "Wir bereiten eine In-App-Charaktereditor-Integration vor. Bis dahin kannst du deinen MetaHuman importieren oder deine bestehende Unreal-Szene nutzen.",
      donoEngine: "Dono-Motor",
      donoEngineSubtitle:
        "Regeln erstellen, die auf Geschenke reagieren.",
      scripts: "Stream-Skripte",
      scriptsSubtitle: "Show-Abläufe mit Skripten planen.",
      avatarScene: "Avatar + Szene",
      avatarSceneSubtitle:
        "Verwalte die visuelle Ebene deines KI-Streamers.",
      notFoundTitle: "Seite nicht gefunden",
      notFoundSubtitle: "Dieses Modul ist noch im Preview.",
      backToOverview: "Zurück zur Übersicht",

      unrealConnector: "Unreal-Connector",
      localRuntime: "Lokale Runtime",
      diagnostics: "Diagnose",

      unrealHubSubtitle:
        "Guides für deinen RoxStreamAI → Unreal Workflow. Der Runtime Connector ist im Preview.",
      unrealGettingStartedTitle: "Erste Schritte",
      unrealGettingStartedDescription:
        "Wähle einen der Setup-Wege unten. Wenn du bereits ein Unreal-Projekt hast, starte mit der manuellen Einrichtung.",
      unrealImportMetahumanTitle: "MetaHuman importieren",
      unrealLiveLinkFaceTitle: "Live Link Face (Archiv)",
      unrealManualSetupTitle: "Manuelle Unreal-Einrichtung",
      unrealRuntimeConnectorTitle: "Runtime Connector Unreal",
      unrealOpenRuntimeConnectorButton:
        "Runtime Connector öffnen ({comingSoon})",
      unrealBackToHubButton: "Zurück zum Unreal-Hub",
      unrealOpenDocsButton: "Unreal-Dokumentation öffnen",

      billingCurrentPlanCheck: "Aktueller Plan \u2713",
      billingUpgrade: "Upgrade",
      billingUpgradeNote: "Keine Rückerstattung für den aktuellen Zeitraum",
      billingDowngrade: "Downgrade",
      billingDowngradeNote: "Wird ab dem nächsten Abrechnungszeitraum wirksam",
      billingSubscribe: "Abonnieren",

      billingSuccessTitle: "Zahlung erhalten",
      billingSuccessVerifying: "Zahlung wird verifiziert...",
      billingSuccessProcessing:
        "Wir verarbeiten deine Zahlung noch. Bitte später aktualisieren.",
      billingSuccessConfirmedRedirecting: "Zahlung bestätigt. Weiterleitung...",
      billingSuccessGoToDashboard: "Zum Dashboard",

      characterBuilderLiveNote: "Brain + Voice-Tests sind live.",
      characterBuilderDraft: "Entwurf",
      characterBuilderProfileTitle: "Profil",
      characterBuilderCharacterNamePlaceholder: "Charaktername",
      characterBuilderPrimaryLanguagePlaceholder: "Primäre Sprache (en/ru)",
      characterBuilderBioPlaceholder: "Persona- und Tonleitlinien",
      characterBuilderVoiceTitle: "Stimme",
      characterBuilderVoiceProviderLabel: "Voice-Anbieter",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (inklusive)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, eigener Schluessel)",
      characterBuilderVoiceIdLabel: "Voice-Preset / Voice-ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs Sprach-ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Voice testen",
      characterBuilderTestResponseTitle: "Testantwort",
      characterBuilderTestResponseDescription:
        "Ruft den Brain-Provider des Workspaces auf und wendet die Charakter-Persona an.",
      characterBuilderTestResponse: "Testantwort",
      characterBuilderReplyLabel: "Antwort",
      characterBuilderNotesTitle: "Notizen",
      characterBuilderNotesDescription:
        "Standardwerte der Provider in Einstellungen → AI Providers konfigurieren.",
      characterBuilderNoWorkspaceConfigured: "Kein Workspace konfiguriert.",
      characterBuilderNotFound: "Charakter nicht gefunden.",
      characterBuilderTestResponseFailed: "Testantwort fehlgeschlagen.",
      characterBuilderTestVoiceFailed: "Voice-Test fehlgeschlagen.",
      characterBuilderDefaultUserMessage: "Hi! Gib mir eine kurze, lustige Begrüßung.",

      aiProvidersTitle: "AI-Provider",
      aiProvidersSubtitle:
        "Brain + Voice pro Workspace konfigurieren. Schlüssel werden serverseitig gespeichert.",
      aiProvidersLoadFailed: "AI-Einstellungen konnten nicht geladen werden.",
      aiProvidersSaveFailed: "Einstellungen konnten nicht gespeichert werden.",
      aiProvidersSaveKeyFailed: "Schlüssel konnte nicht gespeichert werden.",
      aiProvidersRemoveKeyFailed: "Schlüssel konnte nicht entfernt werden.",
      aiProvidersKeySaved: "Schlüssel gespeichert.",
      aiProvidersKeyRemoved: "Schlüssel entfernt.",
      aiProvidersBrainTestFailed: "Brain-Test fehlgeschlagen.",
      aiProvidersVoiceTestFailed: "Voice-Test fehlgeschlagen.",
      aiProvidersBrainProviderLabel: "Brain-Provider",
      aiProvidersBrainProviderHelp:
        "Andere Brain-Provider sind zur Übersicht gelistet, aber noch nicht verfügbar. Aktuell läuft die App auf OpenAI.",
      aiProvidersBrainModelLabel: "Brain-Modell",
      aiProvidersCostEstimatorTitle: "Kostenrechner ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Wir fügen einen In-App-Rechner hinzu, sobald weitere Provider aktiv sind (Tokens, Voice-Charaktere und prognostizierte Ausgaben). Aktuell ist OpenAI-Voice enthalten und BYOK-Provider rechnen direkt ab.",
      aiProvidersVoiceProviderLabel: "Voice-Anbieter",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (inklusive)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, eigener Schluessel)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Füge deinen ElevenLabs-Schlüssel unten hinzu, um diesen Provider zu nutzen.",
      aiProvidersVoiceIdLabel: "Voice-Preset / Voice-ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs Sprach-ID",
      aiProvidersSaveButton: "AI-Einstellungen speichern",
      aiProvidersTestBrainButton: "Brain testen",
      aiProvidersTestVoiceButton: "Voice testen",
      aiProvidersTestBrainResponseLabel: "Testantwort des Brain",
      aiProvidersApiKeysTitle: "API-Schlüssel (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API-Schlüssel (optional)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API-Schlüssel",
      aiProvidersSaveKeyButton: "Schlüssel speichern",
      aiProvidersReplaceKeyButton: "Schlüssel ersetzen",
      aiProvidersRemoveKeyButton: "Schlüssel entfernen",
      aiProvidersKeysNotReturnedNote:
        "Schlüssel werden nie an den Browser zurückgegeben. Die UI zeigt nur “{connected}”.",

      settingsPageTitle: "Einstellungen",
      settingsProfileTitle: "Profil",
      settingsDisplayNameLabel: "Anzeigename",
      settingsDisplayNameRequired: "Anzeigename ist erforderlich.",
      settingsUsernameOptionalLabel: "Benutzername (optional)",
      settingsNoProfileFound: "Kein Profil gefunden.",
      settingsWorkspaceTitle: "Arbeitsbereich",
      settingsNoWorkspaceFound: "Kein Workspace gefunden.",
      settingsSignOutTitle: "Abmelden",
      settingsSignOutDescription: "Melde dich auf diesem Gerät ab.",

      unrealExportButton: "Export für Unreal",
      unrealExportTitle: "Export für Unreal",
      unrealExportDescription:
        "Erzeuge eine JSON-Konfiguration für die manuelle Unreal-Einrichtung heute und für den Runtime Connector später.",
      unrealExportIncludeDonoRules: "Dono-Regeln einbeziehen",
      unrealExportIncludeScripts: "Skripte einbeziehen",
      unrealExportIncludeScenes: "Szenen einbeziehen",
      unrealExportFailed: "Export fehlgeschlagen.",
      unrealExportSavedTo: "Gespeichert unter: {path}",
      unrealExportGenerateDownload: "Erzeugen + herunterladen",
      unrealExportFile: "Datei: {filename}",
    },
    admin: {
      label: "Administration",
      navOverview: "Überblick",
      navUsers: "Benutzer",
      navPricing: "Preise",
      navContent: "Inhalt",
      navLeads: "Anfragen",
      navAudit: "Audit",
      navReleases: "Versionen",
      dashboardLink: "Dashboard",

      overviewTitle: "Übersicht der Kontrollzentrale",
      overviewSubtitle:
        "Gesamtübersicht über Benutzer, Arbeitsbereiche, Abrechnung und Nutzung.",
      totalUsers: "Gesamtbenutzer",
      totalUsersHelp: "In Supabase erstellte Profile.",
      workspaces: "Arbeitsbereiche",
      workspacesHelp: "Gesamte Arbeitsbereiche aller Benutzer.",
      activeSubscriptions: "Aktive Abonnements",
      activeSubscriptionsHelp: "billing_state-Einträge mit status=active.",
      usageEvents24h: "Nutzungsereignisse (24h)",
      usageEvents24hHelp: "In den letzten 24 Stunden aufgenommene Ereignisse.",
      releasesCount: "Versionen",
      releasesCountHelp: "Zum Download verfügbare Desktop-Builds.",

      usersTitle: "Zugriff verwalten",
      usersSubtitle: "Benutzerrolle und Plan aktualisieren.",
      tableEmail: "E-Mail",
      tableRole: "Rolle",
      tablePlan: "Plan",
      tableCreated: "Erstellt",
      tableSave: "Speichern",
      buttonSave: "Speichern",
      roleUser: "Benutzer",
      roleAdmin: "Administrator",
      planTrial: "Testversion",
      planPro: "Profi",
      planStudio: "Studio",
      planEnterprise: "Unternehmen",

      pricingTitle: "Preis-CMS",
      pricingSubtitle:
        "Versionierte Preiskonfiguration bearbeiten und aktive Version veröffentlichen.",
      contentTitle: "Marketing-CMS",
      contentSubtitle:
        "Marketingtexte über Markdown-Blöcke bearbeiten. Seiten laden per Schlüssel mit Fallbacks.",
      leadsTitle: "Warteliste & Kontakt",
      leadsSubtitle: "Erfasste Leads anzeigen und CSV exportieren.",
      auditTitle: "Admin-Auditprotokolle",
      auditSubtitle:
        "Letzte Admin-Aktionen bei Benutzern, Preisen, Inhalten und Leads.",
      releasesTitle: "Versionen",

      errorUnknown: "Unbekannter Fehler",
      buttonRefresh: "Aktualisieren",
      buttonPublish: "Veröffentlichen",
      buttonNew: "Neu",
      buttonExportCsv: "CSV exportieren",

      statusActive: "Aktiv",
      statusDraft: "Entwurf",
      statusPublished: "Veröffentlicht",

      pricingVersions: "Preisversionen",
      pricingNoVersions: "Noch keine Versionen.",
      pricingEditor: "Bearbeitung",
      pricingEditingVersion: "Bearbeite v{version}",
      pricingSelectVersion: "Version auswählen",
      pricingRawJsonAdvanced: "Roh-JSON (erweitert)",
      pricingYearlyDiscountPct: "Jahresrabatt (%)",
      pricingDefaultTalkRatio: "Standard-Talk-Ratio",
      pricingMinTalkRatio: "Min. Talk-Ratio",
      pricingMaxTalkRatio: "Max. Talk-Ratio",
      pricingTooltipText: "Tooltip-Text",
      pricingPlans: "Pläne",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Monatlich (€)",
      pricingTableEntitlementsJson: "Berechtigungen (JSON)",
      pricingPlaceholderMonthlyEur: "z. B. 19,99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Tipp: Beim Speichern wird serverseitig eine Schema-Validierung durchgeführt.",

      contentSearchPlaceholder: "Schlüssel oder Text suchen…",
      contentNoBlocks: "Noch keine Inhaltsblöcke.",
      contentSelectBlock: "Block auswählen",
      contentSelectBlockError: "Wählen Sie einen Block zum Bearbeiten",
      contentMarkdown: "Markdown (md)",
      contentPreview: "Vorschau",
      contentMarkdownPlaceholder: "# Titel\n\nIhr Inhalt…",

      leadsWaitlist: "Warteliste",
      leadsContact: "Kontakte",
      leadsInvestors: "Investoren",
      leadsShowingRows: "{count} Zeilen angezeigt",
      leadsNoLeads: "Noch keine Leads.",

      auditFilterActionPlaceholder: "Aktion filtern…",
      auditFilterTargetTypePlaceholder: "target_type filtern…",
      auditShowingEntries: "{count} Einträge angezeigt",
      auditTime: "Zeit",
      auditAction: "Aktion",
      auditTarget: "Ziel",
      auditPayload: "Nutzlast",
      auditNoEntries: "Noch keine Audit-Einträge.",

      releasesVersion: "Version",
      releasesPlatform: "Plattform",
      releasesDownloadUrl: "Download-URL",
      releasesNotes: "Hinweise",
      releasesMarkLatest: "Als neueste markieren",
      releasesAddRelease: "Version hinzufügen",
      releasesUpdate: "Aktualisieren",
      releasesDeleteRelease: "Version löschen",
      releasesPlatformWindows: "Windows-PC",
      releasesPlatformMac: "macOS-Desktop",
      releasesPlaceholderVersion: "z. B. 1.0.0",
      releasesPlaceholderUrl: "https://beispiel.de",
      releasesPlaceholderNotes: "Was ist neu…",
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
      now: "ahora",
      loading: "Cargando…",
      save: "Guardar",
      saving: "Guardando…",
      thinking: "Pensando…",
      generating: "Generando…",
      testing: "Probando…",
      connected: "Conectado",
      cancel: "Cancelar",
      close: "Cerrar",
      featureComingSoonDescription: "Esta función se habilitará pronto.",
      proPerks: "Ventajas Pro",
      desktopOnlyTitle: "Solo escritorio",
      desktopOnlyMessage: "Esta sección está disponible solo en la app de escritorio RoxStreamAI.",
      draftUpdated: "Borrador actualizado",
      published: "Publicado",
      planUpgradeRequired: "Actualización de plan requerida",
      creditsLimitReached: "Límite de créditos alcanzado. Comprar más horas.",
    },
    nav: {
      home: "Inicio",
      useCases: "Casos de uso",
      pricing: "Precios",
      docs: "Documentación",
      blog: "Notícias",
      about: "Acerca de",
      contact: "Contacto",
      team: "Equipo",
      terms: "Términos",
      privacy: "Privacidad",
      cookies: "Política de cookies",
    },
    auth: {
      welcomeBack: "Bienvenido de nuevo",
      createAccount: "Crear cuenta",
      resetPassword: "Restablecer contraseña",
      email: "Correo",
      password: "Contraseña",
      newPassword: "Nueva contraseña",
      emailPlaceholder: "tu@empresa.com",
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
      featuresTitle: "Por que los equipos eligen RoxStreamAI",
      featuresSubtitle:
        "Un coanfitrion confiable con limites claros y flujos listos para Unreal.",
      useCasesTitle: "Casos de uso",
      useCasesSubtitle: "Formatos reales para los que se creo RoxStreamAI.",
      ctaTitle: "Listo para tu primera sesion?",
      ctaSubtitle:
        "Descarga la demo para probar el companion de escritorio. Consulta precios cuando quieras escalar uso y concurrencia.",
      ctaPrimary: "Descargar demo",
      ctaSecondary: "Ver precios",
      faqTitle: "Preguntas",
      faqSubtitle: "Respuestas rapidas sobre Desktop Mode, uso y BYOK.",
    },
    app: {
      overview: "Resumen",
      overviewSubtitle: "Estado en vivo, límites y acciones rápidas.",
      systemToastsTitle: "Notificaciones del sistema",
      systemToastsSubtitle: "Actualizaciones recientes del espacio de trabajo.",
      startSession: "Iniciar sesión",
      upgradeRequired: "Se requiere actualización",
      quickActions: "Acciones rápidas",
      createCharacter: "Crear personaje",
      setupDonoRules: "Configurar reglas Dono",
      deploy: "Implementar",
      generateShareLink: "Generar enlace",
      billing: "Facturación",
      billingSubtitle: "Gestiona plan, créditos y add-ons.",
      promoCodeLabel: "Código promocional",
      promoCodePlaceholder: "Ingresa código promocional",
      promoCodeHelp:
        "Usa un código de referidos para desbloquear horas extra de Active Speech tras la compra.",
      referrals: "Referidos",
      referralProgramTitle: "Programa de referidos",
      referralProgramBody:
        "Comparte tu código promocional para desbloquear horas extra de Active Speech para ti y tus invitados.",
      referralProgramManage: "Administrar referidos",
      referralInviteSubtitle:
        "Invita creadores y gana horas extra de Active Speech.",
      referralHowTitle: "Cómo funciona",
      referralHowLine1:
        "Quienes usen tu código obtienen horas extra de Active Speech tras la compra.",
      referralHowLine2:
        "Starter: +1 hora. Creator: +2 horas. Pro: +5 horas. Studio: +10 horas. Scale: +20 horas.",
      referralHowLine3:
        "Cada 3 compras elegibles (Creator o superior) te dan 4 horas.",
      referralHowLine4:
        "Puedes ganar el bono de 4 horas otra vez por cada 3 compras.",
      referralPromoTitle: "Tu código promocional",
      referralPromoPlaceholder: "Elige tu código promocional",
      referralPromoCreate: "Crear código",
      referralPromoCopy: "Copiar enlace de referidos",
      referralBonusTitle: "Progreso del bono",
      referralBonusClaim: "Reclamar bono de 4 horas",
      referralBonusNeed: "Se requieren 3 compras elegibles para el bono.",
      referralRegistrationsTitle: "Registros",
      referralPurchasesTitle: "Compras",
      referralNoSignups: "Aún no hay registros.",
      referralNoPurchases: "Aún no hay compras.",
      notifications: "Notificaciones",
      notificationsTitle: "Notificaciones",
      notificationsSubtitle: "Uso, bonos y actualizaciones de facturación.",
      notificationsMarkAll: "Marcar todo como leído",
      notificationsEmpty: "Aún no hay notificaciones.",
      notificationsMarkRead: "Marcar como leído",
      currentPlan: "Plan actual",
      managePlan: "Gestionar plan y uso.",
      comparePlans: "Comparar planes",
      contactSales: "Contactar ventas",
      remainingHours: "Horas de voz restantes",
      unlimitedHours: "Horas ilimitadas (BYOK).",
      billingSummary: "Resumen de facturación",
      nextInvoice: "Próxima factura: 26 Feb 2026",
      trialEnded: "Prueba finalizada",
      trialEndsIn: "La prueba termina en {days} días",
      connectors: "Conectores de stream",
      connectorsSubtitle:
        "Conecta TikTok hoy. Twitch y YouTube próximamente.",
      connectorsTiktokDescription:
        "Los conectores se configuran en la app de escritorio. Este panel mostrará el estado en vivo cuando se habiliten las API de conectores.",
      connectorsConnectTiktok: "Conectar TikTok",
      connectorsOpenSetupGuide: "Abrir guía de configuración",
      connectorsJoinWaitlist:
        "Únete a la lista de espera para acceso temprano.",
      connectorsEarlyAccessNote:
        "El acceso temprano se habilita primero para Pro y Studio.",
      connectorsMultiAccountTitle: "Programador multi-cuenta",
      connectorsMultiAccountDescription:
        "Disponible en Pro+. Rota varias cuentas con reglas de programación.",
      connectorsMultiAccountBody:
        "Este módulo está en vista previa. Cuando se habilite, podrás rotar cuentas por horarios y límites de uso.",
      connectorsExampleRotationWindow:
        "Ejemplo: ventana de rotación: cada 4 horas",
      connectorsExampleMaxSessionsPerDay:
        "Ejemplo: máximo de sesiones por día: 3",
      deployTitle: "Implementación",
      deploySubtitle: "Publica tu sesión y ve en vivo en OBS.",
      settings: "Configuración",
      settingsSubtitle: "Preferencias del workspace y exportación.",
      characters: "Personajes",
      charactersSubtitle: "Gestiona tus personas de streamer AI.",
      noCharacters: "No hay personajes. Crea tu primera persona.",
      characterBuilder: "Constructor de personaje",
      characterBuilderSubtitle:
        "Crea la persona, voz y comportamiento de tu streamer de IA.",
      characterEditorTitle: "Editor de personajes 3D",
      characterEditorEnabledNote:
        "La integración del editor Polyphoria está habilitada (en progreso).",
      characterEditorComingSoonNote:
        "Pronto: un editor 3D en la app impulsado por Polyphoria.",
      characterEditorSectionTitle: "Modifica",
      characterEditorEnabledDescription:
        "La superficie del editor integrado aparecerá aquí. Por ahora, usa el Constructor de personaje para editar persona y voz.",
      characterEditorWaitlistDescription:
        "Únete a la lista de espera para acceso temprano cuando lo lancemos.",
      polyphoriaModalDescription:
        "Estamos preparando una integración del editor de personajes en la app. Por ahora, puedes importar tu MetaHuman o usar tu escena Unreal existente.",
      donoEngine: "Motor Dono",
      donoEngineSubtitle: "Reglas que reaccionan a regalos y donaciones.",
      scripts: "Guiones",
      scriptsSubtitle: "Diseña el flujo con guiones y presets.",
      avatarScene: "Avatar + Escena",
      avatarSceneSubtitle: "Gestiona la capa visual del streamer.",
      notFoundTitle: "Página no encontrada",
      notFoundSubtitle: "Este módulo está en vista previa.",
      backToOverview: "Volver al resumen",

      unrealConnector: "Conector Unreal",
      localRuntime: "Runtime local",
      diagnostics: "Diagnósticos",

      unrealHubSubtitle:
        "Guías para tu flujo RoxStreamAI → Unreal. El Runtime Connector está en vista previa.",
      unrealGettingStartedTitle: "Primeros pasos",
      unrealGettingStartedDescription:
        "Elige una de las rutas de configuración a continuación. Si ya tienes un proyecto Unreal, empieza con la configuración manual.",
      unrealImportMetahumanTitle: "Cómo importar MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archivo)",
      unrealManualSetupTitle: "Configuración manual de Unreal",
      unrealRuntimeConnectorTitle: "Runtime Connector de Unreal",
      unrealOpenRuntimeConnectorButton:
        "Abrir Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Volver al hub de Unreal",
      unrealOpenDocsButton: "Abrir docs de Unreal",

      billingCurrentPlanCheck: "Plan actual \u2713",
      billingUpgrade: "Mejorar plan",
      billingUpgradeNote: "Sin reembolso del período actual",
      billingDowngrade: "Reducir plan",
      billingDowngradeNote: "Efectivo en el próximo período de facturación",
      billingSubscribe: "Suscribirse",

      billingSuccessTitle: "Pago recibido",
      billingSuccessVerifying: "Verificando pago...",
      billingSuccessProcessing:
        "Aún estamos procesando tu pago. Actualiza más tarde.",
      billingSuccessConfirmedRedirecting: "Pago confirmado. Redirigiendo...",
      billingSuccessGoToDashboard: "Ir al panel",

      characterBuilderLiveNote: "Las pruebas de Brain + Voice están activas.",
      characterBuilderDraft: "Borrador",
      characterBuilderProfileTitle: "Perfil",
      characterBuilderCharacterNamePlaceholder: "Nombre del personaje",
      characterBuilderPrimaryLanguagePlaceholder: "Idioma principal (en/ru)",
      characterBuilderBioPlaceholder: "Guía de persona y tono",
      characterBuilderVoiceTitle: "Voz",
      characterBuilderVoiceProviderLabel: "Proveedor de voz",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (incluido)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, clave propia)",
      characterBuilderVoiceIdLabel: "Preset de voz / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID de voz de ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Probar voz",
      characterBuilderTestResponseTitle: "Respuesta de prueba",
      characterBuilderTestResponseDescription:
        "Llama al proveedor brain del workspace y aplica la persona del personaje.",
      characterBuilderTestResponse: "Respuesta de prueba",
      characterBuilderReplyLabel: "Respuesta",
      characterBuilderNotesTitle: "Notas",
      characterBuilderNotesDescription:
        "Configura valores por defecto en Configuración → Proveedores de IA.",
      characterBuilderNoWorkspaceConfigured: "No hay workspace configurado.",
      characterBuilderNotFound: "Personaje no encontrado.",
      characterBuilderTestResponseFailed: "Falló la respuesta de prueba.",
      characterBuilderTestVoiceFailed: "Falló la prueba de voz.",
      characterBuilderDefaultUserMessage: "¡Hola! Dime un saludo corto y divertido.",

      aiProvidersTitle: "Proveedores de IA",
      aiProvidersSubtitle:
        "Configura brain + voice por workspace. Las claves se guardan en el servidor.",
      aiProvidersLoadFailed: "No se pudieron cargar los ajustes de IA.",
      aiProvidersSaveFailed: "No se pudieron guardar los ajustes.",
      aiProvidersSaveKeyFailed: "No se pudo guardar la clave.",
      aiProvidersRemoveKeyFailed: "No se pudo eliminar la clave.",
      aiProvidersKeySaved: "Clave guardada.",
      aiProvidersKeyRemoved: "Clave eliminada.",
      aiProvidersBrainTestFailed: "Falló la prueba de brain.",
      aiProvidersVoiceTestFailed: "Falló la prueba de voz.",
      aiProvidersBrainProviderLabel: "Proveedor de brain",
      aiProvidersBrainProviderHelp:
        "Otros proveedores se muestran por visibilidad, pero aún no están disponibles. Hoy la app funciona con OpenAI.",
      aiProvidersBrainModelLabel: "Modelo de brain",
      aiProvidersCostEstimatorTitle: "Estimador de costos ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Agregaremos un estimador en la app cuando se habiliten proveedores adicionales (tokens, voces y gasto proyectado). Por ahora, la voz de OpenAI está incluida y los proveedores BYOK te cobran directamente.",
      aiProvidersVoiceProviderLabel: "Proveedor de voz",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (incluido)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, clave propia)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Agrega tu clave de ElevenLabs abajo para usar este proveedor.",
      aiProvidersVoiceIdLabel: "Preset de voz / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID de voz de ElevenLabs",
      aiProvidersSaveButton: "Guardar ajustes de IA",
      aiProvidersTestBrainButton: "Probar brain",
      aiProvidersTestVoiceButton: "Probar voz",
      aiProvidersTestBrainResponseLabel: "Respuesta de prueba del brain",
      aiProvidersApiKeysTitle: "Claves de API (BYOK)",
      aiProvidersOpenAiKeyLabel: "Clave API de OpenAI (opcional)",
      aiProvidersElevenLabsKeyLabel: "Clave API de ElevenLabs",
      aiProvidersSaveKeyButton: "Guardar clave",
      aiProvidersReplaceKeyButton: "Reemplazar clave",
      aiProvidersRemoveKeyButton: "Eliminar clave",
      aiProvidersKeysNotReturnedNote:
        "Las claves nunca se devuelven al navegador. La UI solo muestra “{connected}”.",

      settingsPageTitle: "Configuración",
      settingsProfileTitle: "Perfil",
      settingsDisplayNameLabel: "Nombre para mostrar",
      settingsDisplayNameRequired: "El nombre para mostrar es obligatorio.",
      settingsUsernameOptionalLabel: "Usuario (opcional)",
      settingsNoProfileFound: "No se encontró perfil.",
      settingsWorkspaceTitle: "Espacio de trabajo",
      settingsNoWorkspaceFound: "No se encontró workspace.",
      settingsSignOutTitle: "Cerrar sesión",
      settingsSignOutDescription: "Cierra sesión de tu cuenta en este dispositivo.",

      unrealExportButton: "Exportar para Unreal",
      unrealExportTitle: "Exportar para Unreal",
      unrealExportDescription:
        "Genera un JSON que puedes usar para la configuración manual de Unreal hoy y para Runtime Connector más adelante.",
      unrealExportIncludeDonoRules: "Incluir reglas Dono",
      unrealExportIncludeScripts: "Incluir guiones",
      unrealExportIncludeScenes: "Incluir escenas",
      unrealExportFailed: "Error al exportar.",
      unrealExportSavedTo: "Guardado en: {path}",
      unrealExportGenerateDownload: "Generar y descargar",
      unrealExportFile: "Archivo: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Resumen",
      navUsers: "Usuarios",
      navPricing: "Precios",
      navContent: "Contenido",
      navLeads: "Prospectos",
      navAudit: "Auditoria",
      navReleases: "Lanzamientos",
      dashboardLink: "Panel",

      overviewTitle: "Resumen del centro de control",
      overviewSubtitle:
        "Totales clave de usuarios, workspaces, facturacion y uso.",
      totalUsers: "Total de usuarios",
      totalUsersHelp: "Perfiles creados en Supabase.",
      workspaces: "Espacios de trabajo",
      workspacesHelp: "Total de espacios de trabajo de todos los usuarios.",
      activeSubscriptions: "Suscripciones activas",
      activeSubscriptionsHelp: "Filas billing_state con status=active.",
      usageEvents24h: "Eventos de uso (24h)",
      usageEvents24hHelp: "Eventos ingeridos en las ultimas 24 horas.",
      releasesCount: "Lanzamientos",
      releasesCountHelp: "Builds de escritorio disponibles para descargar.",

      usersTitle: "Gestionar acceso",
      usersSubtitle: "Actualiza el rol y el plan del usuario.",
      tableEmail: "Email",
      tableRole: "Rol",
      tablePlan: "Tarifa",
      tableCreated: "Creado",
      tableSave: "Guardar",
      buttonSave: "Guardar",
      roleUser: "Usuario",
      roleAdmin: "Administrador",
      planTrial: "Prueba",
      planPro: "Profesional",
      planStudio: "Estudio",
      planEnterprise: "Empresa",

      pricingTitle: "CMS de precios",
      pricingSubtitle:
        "Edita la configuracion de precios versionada y publica la version activa.",
      contentTitle: "CMS de marketing",
      contentSubtitle:
        "Edita el texto de marketing con bloques markdown. Las paginas se cargan por clave con fallbacks.",
      leadsTitle: "Lista de espera y contacto",
      leadsSubtitle: "Ver leads capturados y exportar CSV.",
      auditTitle: "Logs de auditoria",
      auditSubtitle:
        "Acciones recientes de admin sobre usuarios, precios, contenido y leads.",
      releasesTitle: "Lanzamientos",

      errorUnknown: "Error desconocido",
      buttonRefresh: "Actualizar",
      buttonPublish: "Publicar",
      buttonNew: "Nuevo",
      buttonExportCsv: "Exportar CSV",

      statusActive: "Activo",
      statusDraft: "Borrador",
      statusPublished: "Publicado",

      pricingVersions: "Versiones",
      pricingNoVersions: "Aun no hay versiones.",
      pricingEditor: "Edicion",
      pricingEditingVersion: "Editando v{version}",
      pricingSelectVersion: "Selecciona una version",
      pricingRawJsonAdvanced: "JSON crudo (avanzado)",
      pricingYearlyDiscountPct: "Descuento anual (%)",
      pricingDefaultTalkRatio: "Ratio de habla predeterminado",
      pricingMinTalkRatio: "Ratio de habla minimo",
      pricingMaxTalkRatio: "Ratio de habla maximo",
      pricingTooltipText: "Texto de tooltip",
      pricingPlans: "Planes",
      pricingTablePlan: "Tarifa",
      pricingTableMonthlyEur: "Mensual (€)",
      pricingTableEntitlementsJson: "Permisos (JSON)",
      pricingPlaceholderMonthlyEur: "ej. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Tip: guardar ejecuta la validacion de schema en el servidor.",

      contentSearchPlaceholder: "Buscar claves o texto…",
      contentNoBlocks: "Aun no hay bloques de contenido.",
      contentSelectBlock: "Selecciona un bloque",
      contentSelectBlockError: "Selecciona un bloque para editar",
      contentMarkdown: "Markdown",
      contentPreview: "Vista previa",
      contentMarkdownPlaceholder: "# Titulo\n\nTu contenido…",

      leadsWaitlist: "Lista de espera",
      leadsContact: "Contacto",
      leadsInvestors: "Inversores",
      leadsShowingRows: "Mostrando {count} filas",
      leadsNoLeads: "Aun no hay leads.",

      auditFilterActionPlaceholder: "Filtrar accion…",
      auditFilterTargetTypePlaceholder: "Filtrar target_type…",
      auditShowingEntries: "Mostrando {count} entradas",
      auditTime: "Hora",
      auditAction: "Accion",
      auditTarget: "Objetivo",
      auditPayload: "Payload",
      auditNoEntries: "Aun no hay entradas de auditoria.",

      releasesVersion: "Version",
      releasesPlatform: "Plataforma",
      releasesDownloadUrl: "URL de descarga",
      releasesNotes: "Notas",
      releasesMarkLatest: "Marcar como ultima",
      releasesAddRelease: "Agregar lanzamiento",
      releasesUpdate: "Actualizar",
      releasesDeleteRelease: "Eliminar lanzamiento",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "Novedades...",
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
      now: "maintenant",
      loading: "Chargement…",
      save: "Enregistrer",
      saving: "Enregistrement…",
      thinking: "Réflexion…",
      generating: "Génération…",
      testing: "Test…",
      connected: "Connecté",
      cancel: "Annuler",
      close: "Fermer",
      featureComingSoonDescription: "Cette fonctionnalité sera bientôt disponible.",
      proPerks: "Avantages Pro",
      desktopOnlyTitle: "Desktop uniquement",
      desktopOnlyMessage: "Cette section est disponible uniquement dans l'application RoxStreamAI Desktop.",
      draftUpdated: "Brouillon mis à jour",
      published: "Publié",
      planUpgradeRequired: "Mise à niveau requise",
      creditsLimitReached: "Limite de crédits atteinte. Acheter plus d'heures.",
    },
    nav: {
      home: "Accueil",
      useCases: "Cas d'usage",
      pricing: "Tarifs",
      docs: "Documentation",
      blog: "Actualites",
      about: "À propos",
      contact: "Contact",
      team: "Équipe",
      terms: "Conditions",
      privacy: "Confidentialité",
      cookies: "Politique cookies",
    },
    auth: {
      welcomeBack: "Bon retour",
      createAccount: "Créer un compte",
      resetPassword: "Réinitialiser le mot de passe",
      email: "E-mail",
      password: "Mot de passe",
      newPassword: "Nouveau mot de passe",
      emailPlaceholder: "vous@entreprise.fr",
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
      systemToastsTitle: "Notifications système",
      systemToastsSubtitle: "Mises à jour récentes du workspace.",
      startSession: "Démarrer la session",
      upgradeRequired: "Mise à niveau requise",
      quickActions: "Actions rapides",
      createCharacter: "Créer un personnage",
      setupDonoRules: "Configurer les règles Dono",
      deploy: "Déployer",
      generateShareLink: "Générer un lien",
      billing: "Facturation",
      billingSubtitle: "Gérer plan, crédits et add-ons.",
      promoCodeLabel: "Code promo",
      promoCodePlaceholder: "Saisissez le code promo",
      promoCodeHelp:
        "Utilisez un code de parrainage pour débloquer des heures Active Speech bonus après achat.",
      referrals: "Parrainages",
      referralProgramTitle: "Programme de parrainage",
      referralProgramBody:
        "Partagez votre code promo pour débloquer des heures Active Speech bonus pour vous et vos invités.",
      referralProgramManage: "Gérer les parrainages",
      referralInviteSubtitle:
        "Invitez des créateurs et gagnez des heures Active Speech bonus.",
      referralHowTitle: "Comment ça marche",
      referralHowLine1:
        "Les personnes qui utilisent votre code reçoivent des heures Active Speech bonus après achat.",
      referralHowLine2:
        "Starter : +1 heure. Creator : +2 heures. Pro : +5 heures. Studio : +10 heures. Scale : +20 heures.",
      referralHowLine3:
        "Chaque série de 3 achats éligibles (Creator ou plus) vous donne 4 heures.",
      referralHowLine4:
        "Vous pouvez gagner le bonus de 4 heures à nouveau tous les 3 achats suivants.",
      referralPromoTitle: "Votre code promo",
      referralPromoPlaceholder: "Choisissez votre code promo",
      referralPromoCreate: "Créer le code",
      referralPromoCopy: "Copier le lien de parrainage",
      referralBonusTitle: "Progression du bonus",
      referralBonusClaim: "Réclamer le bonus de 4 heures",
      referralBonusNeed: "3 achats éligibles sont nécessaires pour le bonus.",
      referralRegistrationsTitle: "Inscriptions",
      referralPurchasesTitle: "Achats",
      referralNoSignups: "Pas encore d'inscriptions.",
      referralNoPurchases: "Pas encore d'achats.",
      notifications: "Notifications",
      notificationsTitle: "Notifications",
      notificationsSubtitle: "Usage, bonus et mises à jour de facturation.",
      notificationsMarkAll: "Tout marquer comme lu",
      notificationsEmpty: "Pas encore de notifications.",
      notificationsMarkRead: "Marquer comme lu",
      currentPlan: "Plan actuel",
      managePlan: "Gérer le plan et l'usage.",
      comparePlans: "Comparer les plans",
      contactSales: "Contacter les ventes",
      remainingHours: "Heures restantes",
      unlimitedHours: "Heures illimitées (BYOK).",
      billingSummary: "Résumé de facturation",
      nextInvoice: "Prochaine facture : 26 fév 2026",
      trialEnded: "Essai terminé",
      trialEndsIn: "L'essai se termine dans {days} jours",
      connectors: "Connecteurs de stream",
      connectorsSubtitle:
        "Connectez TikTok aujourd'hui. Twitch et YouTube ensuite.",
      connectorsTiktokDescription:
        "Les connecteurs sont configurés via l'application Desktop. Ce tableau affichera l'état live une fois les API des connecteurs activées.",
      connectorsConnectTiktok: "Connecter TikTok",
      connectorsOpenSetupGuide: "Ouvrir le guide de configuration",
      connectorsJoinWaitlist:
        "Rejoindre la liste d'attente pour un accès anticipé.",
      connectorsEarlyAccessNote:
        "L'accès anticipé arrive d'abord pour Pro et Studio.",
      connectorsMultiAccountTitle: "Planificateur multi-comptes",
      connectorsMultiAccountDescription:
        "Disponible en Pro+. Faites tourner plusieurs comptes avec des règles de planification.",
      connectorsMultiAccountBody:
        "Ce module est en aperçu. Une fois activé, vous pourrez alterner les comptes selon les horaires et les limites d'usage.",
      connectorsExampleRotationWindow:
        "Exemple : fenêtre de rotation toutes les 4 heures",
      connectorsExampleMaxSessionsPerDay:
        "Exemple : maximum de sessions par jour : 3",
      deployTitle: "Déploiement",
      deploySubtitle: "Publiez votre session et passez live dans OBS.",
      settings: "Paramètres",
      settingsSubtitle: "Préférences workspace et export.",
      characters: "Personnages",
      charactersSubtitle: "Gérez vos personas de streamer IA.",
      noCharacters: "Aucun personnage. Créez votre première persona.",
      characterBuilder: "Créateur de personnage",
      characterBuilderSubtitle:
        "Créez la persona, la voix et le comportement de votre streamer IA.",
      characterEditorTitle: "Éditeur de personnage 3D",
      characterEditorEnabledNote:
        "L'intégration de l'éditeur Polyphoria est activée (en cours).",
      characterEditorComingSoonNote:
        "Bientôt : un éditeur 3D intégré propulsé par Polyphoria.",
      characterEditorSectionTitle: "Éditeur",
      characterEditorEnabledDescription:
        "La surface de l'éditeur intégré apparaîtra ici. Pour l'instant, utilisez le Créateur de personnage pour la persona et la voix.",
      characterEditorWaitlistDescription:
        "Rejoignez la liste d'attente pour un accès anticipé.",
      polyphoriaModalDescription:
        "Nous préparons une intégration d'éditeur de personnage dans l'app. Pour l'instant, vous pouvez importer votre MetaHuman ou utiliser votre scène Unreal existante.",
      donoEngine: "Moteur Dono",
      donoEngineSubtitle: "Règles qui réagissent aux cadeaux.",
      scripts: "Scripts",
      scriptsSubtitle: "Concevez le flux avec scripts et presets.",
      avatarScene: "Avatar + Scène",
      avatarSceneSubtitle: "Gérez la couche visuelle du streamer.",
      notFoundTitle: "Page introuvable",
      notFoundSubtitle: "Ce module est encore en aperçu.",
      backToOverview: "Retour à l'aperçu",

      unrealConnector: "Connecteur Unreal",
      localRuntime: "Runtime local",
      diagnostics: "Diagnostics",

      unrealHubSubtitle:
        "Guides pour votre workflow RoxStreamAI → Unreal. Le Runtime Connector est en aperçu.",
      unrealGettingStartedTitle: "Bien démarrer",
      unrealGettingStartedDescription:
        "Choisissez un parcours de setup ci-dessous. Si vous avez déjà un projet Unreal, commencez par la configuration manuelle.",
      unrealImportMetahumanTitle: "Importer MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archive)",
      unrealManualSetupTitle: "Configuration manuelle Unreal",
      unrealRuntimeConnectorTitle: "Runtime Connector Unreal",
      unrealOpenRuntimeConnectorButton:
        "Ouvrir Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Retour au hub Unreal",
      unrealOpenDocsButton: "Ouvrir la documentation Unreal",

      billingCurrentPlanCheck: "Plan actuel \u2713",
      billingUpgrade: "Passer au supérieur",
      billingUpgradeNote: "Pas de remboursement pour la période en cours",
      billingDowngrade: "Passer à l\u2019inférieur",
      billingDowngradeNote: "Prend effet à la prochaine période de facturation",
      billingSubscribe: "S\u2019abonner",

      billingSuccessTitle: "Paiement reçu",
      billingSuccessVerifying: "Vérification du paiement...",
      billingSuccessProcessing:
        "Nous traitons encore votre paiement. Merci de réessayer plus tard.",
      billingSuccessConfirmedRedirecting: "Paiement confirmé. Redirection...",
      billingSuccessGoToDashboard: "Aller au tableau de bord",

      characterBuilderLiveNote: "Les tests Brain + Voice sont actifs.",
      characterBuilderDraft: "Brouillon",
      characterBuilderProfileTitle: "Profil",
      characterBuilderCharacterNamePlaceholder: "Nom du personnage",
      characterBuilderPrimaryLanguagePlaceholder: "Langue principale (en/ru)",
      characterBuilderBioPlaceholder: "Directives de persona et de ton",
      characterBuilderVoiceTitle: "Voix",
      characterBuilderVoiceProviderLabel: "Fournisseur de voix",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (inclus)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, cle perso)",
      characterBuilderVoiceIdLabel: "Preset de voix / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID voix ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Tester la voix",
      characterBuilderTestResponseTitle: "Réponse de test",
      characterBuilderTestResponseDescription:
        "Appelle le fournisseur brain du workspace et applique la persona du personnage.",
      characterBuilderTestResponse: "Réponse de test",
      characterBuilderReplyLabel: "Réponse",
      characterBuilderNotesTitle: "Notes",
      characterBuilderNotesDescription:
        "Configurez les valeurs par défaut dans Paramètres → Fournisseurs IA.",
      characterBuilderNoWorkspaceConfigured: "Aucun workspace configuré.",
      characterBuilderNotFound: "Personnage introuvable.",
      characterBuilderTestResponseFailed: "La réponse de test a échoué.",
      characterBuilderTestVoiceFailed: "Le test de voix a échoué.",
      characterBuilderDefaultUserMessage: "Salut ! Donne-moi un salut court et amusant.",

      aiProvidersTitle: "Fournisseurs IA",
      aiProvidersSubtitle:
        "Configurez brain + voice par workspace. Les clés sont stockées côté serveur.",
      aiProvidersLoadFailed: "Impossible de charger les paramètres IA.",
      aiProvidersSaveFailed: "Impossible d'enregistrer les paramètres.",
      aiProvidersSaveKeyFailed: "Impossible d'enregistrer la clé.",
      aiProvidersRemoveKeyFailed: "Impossible de supprimer la clé.",
      aiProvidersKeySaved: "Clé enregistrée.",
      aiProvidersKeyRemoved: "Clé supprimée.",
      aiProvidersBrainTestFailed: "Le test brain a échoué.",
      aiProvidersVoiceTestFailed: "Le test de voix a échoué.",
      aiProvidersBrainProviderLabel: "Fournisseur brain",
      aiProvidersBrainProviderHelp:
        "D'autres fournisseurs sont listés pour visibilité, mais pas encore disponibles. Aujourd'hui, l'app tourne sur OpenAI.",
      aiProvidersBrainModelLabel: "Modèle brain",
      aiProvidersCostEstimatorTitle: "Estimateur de coûts ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Nous ajouterons un estimateur intégré une fois d'autres fournisseurs activés (tokens, voice characters et dépenses projetées). Pour l'instant, la voix OpenAI est incluse et les fournisseurs BYOK facturent directement.",
      aiProvidersVoiceProviderLabel: "Fournisseur de voix",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (inclus)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, cle perso)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Ajoutez votre clé ElevenLabs ci-dessous pour utiliser ce fournisseur.",
      aiProvidersVoiceIdLabel: "Preset de voix / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID voix ElevenLabs",
      aiProvidersSaveButton: "Enregistrer les paramètres IA",
      aiProvidersTestBrainButton: "Tester brain",
      aiProvidersTestVoiceButton: "Tester la voix",
      aiProvidersTestBrainResponseLabel: "Réponse brain de test",
      aiProvidersApiKeysTitle: "Clés API (BYOK)",
      aiProvidersOpenAiKeyLabel: "Clé API OpenAI (optionnelle)",
      aiProvidersElevenLabsKeyLabel: "Clé API ElevenLabs",
      aiProvidersSaveKeyButton: "Enregistrer la clé",
      aiProvidersReplaceKeyButton: "Remplacer la clé",
      aiProvidersRemoveKeyButton: "Supprimer la clé",
      aiProvidersKeysNotReturnedNote:
        "Les clés ne sont jamais renvoyées au navigateur. L'UI n'affiche que “{connected}”.",

      settingsPageTitle: "Paramètres",
      settingsProfileTitle: "Profil",
      settingsDisplayNameLabel: "Nom d'affichage",
      settingsDisplayNameRequired: "Le nom d'affichage est requis.",
      settingsUsernameOptionalLabel: "Nom d'utilisateur (optionnel)",
      settingsNoProfileFound: "Aucun profil trouvé.",
      settingsWorkspaceTitle: "Espace de travail",
      settingsNoWorkspaceFound: "Aucun workspace trouvé.",
      settingsSignOutTitle: "Se déconnecter",
      settingsSignOutDescription: "Se déconnecter de votre compte sur cet appareil.",

      unrealExportButton: "Exporter pour Unreal",
      unrealExportTitle: "Exporter pour Unreal",
      unrealExportDescription:
        "Générez une config JSON utilisable pour la configuration manuelle d'Unreal aujourd'hui et pour le Runtime Connector plus tard.",
      unrealExportIncludeDonoRules: "Inclure les règles Dono",
      unrealExportIncludeScripts: "Inclure les scripts",
      unrealExportIncludeScenes: "Inclure les scènes",
      unrealExportFailed: "Échec de l'export.",
      unrealExportSavedTo: "Enregistré dans : {path}",
      unrealExportGenerateDownload: "Générer + télécharger",
      unrealExportFile: "Fichier : {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Aperçu",
      navUsers: "Utilisateurs",
      navPricing: "Tarifs",
      navContent: "Contenu",
      navLeads: "Prospects",
      navAudit: "Audits",
      navReleases: "Versions",
      dashboardLink: "Tableau de bord",

      overviewTitle: "Aperçu du centre de contrôle",
      overviewSubtitle:
        "Totaux clés des utilisateurs, workspaces, facturation et usage.",
      totalUsers: "Total utilisateurs",
      totalUsersHelp: "Profils créés dans Supabase.",
      workspaces: "Workspaces",
      workspacesHelp: "Total des workspaces de tous les utilisateurs.",
      activeSubscriptions: "Abonnements actifs",
      activeSubscriptionsHelp: "Lignes billing_state avec status=active.",
      usageEvents24h: "Événements d'usage (24h)",
      usageEvents24hHelp: "Événements ingérés sur les dernières 24 heures.",
      releasesCount: "Releases",
      releasesCountHelp: "Builds desktop disponibles au téléchargement.",

      usersTitle: "Gérer les accès",
      usersSubtitle: "Mettre à jour le rôle et le plan.",
      tableEmail: "Email",
      tableRole: "Rôle",
      tablePlan: "Plan",
      tableCreated: "Créé",
      tableSave: "Enregistrer",
      buttonSave: "Enregistrer",
      roleUser: "Utilisateur",
      roleAdmin: "Administrateur",
      planTrial: "Essai",
      planPro: "Professionnel",
      planStudio: "Studio",
      planEnterprise: "Entreprise",

      pricingTitle: "CMS tarifs",
      pricingSubtitle:
        "Éditer la configuration versionnée des tarifs et publier la version active.",
      contentTitle: "CMS marketing",
      contentSubtitle:
        "Éditer le marketing via blocs markdown. Pages chargées par clé avec fallbacks.",
      leadsTitle: "Liste d'attente & contact",
      leadsSubtitle: "Voir les leads capturés et exporter en CSV.",
      auditTitle: "Logs d'audit admin",
      auditSubtitle:
        "Actions admin récentes sur utilisateurs, tarifs, contenu et leads.",
      releasesTitle: "Releases",

      errorUnknown: "Erreur inconnue",
      buttonRefresh: "Rafraîchir",
      buttonPublish: "Publier",
      buttonNew: "Nouveau",
      buttonExportCsv: "Exporter CSV",

      statusActive: "Actif",
      statusDraft: "Brouillon",
      statusPublished: "Publié",

      pricingVersions: "Versions",
      pricingNoVersions: "Pas encore de versions.",
      pricingEditor: "Éditeur",
      pricingEditingVersion: "Édition v{version}",
      pricingSelectVersion: "Sélectionner une version",
      pricingRawJsonAdvanced: "JSON brut (avancé)",
      pricingYearlyDiscountPct: "Remise annuelle (%)",
      pricingDefaultTalkRatio: "Talk ratio par défaut",
      pricingMinTalkRatio: "Talk ratio min",
      pricingMaxTalkRatio: "Talk ratio max",
      pricingTooltipText: "Texte d'infobulle",
      pricingPlans: "Plans",
      pricingTablePlan: "Plan",
      pricingTableMonthlyEur: "Mensuel (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "ex. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Astuce : l'enregistrement valide le schéma côté serveur.",

      contentSearchPlaceholder: "Rechercher des clés ou du texte…",
      contentNoBlocks: "Pas encore de blocs de contenu.",
      contentSelectBlock: "Sélectionner un bloc",
      contentSelectBlockError: "Sélectionnez un bloc à éditer",
      contentMarkdown: "Markdown",
      contentPreview: "Aperçu",
      contentMarkdownPlaceholder: "# Titre\n\nVotre contenu…",

      leadsWaitlist: "Liste d'attente",
      leadsContact: "Contact",
      leadsInvestors: "Investisseurs",
      leadsShowingRows: "Affichage de {count} lignes",
      leadsNoLeads: "Pas encore de leads.",

      auditFilterActionPlaceholder: "Filtrer l'action…",
      auditFilterTargetTypePlaceholder: "Filtrer target_type…",
      auditShowingEntries: "Affichage de {count} entrées",
      auditTime: "Heure",
      auditAction: "Action",
      auditTarget: "Cible",
      auditPayload: "Payload",
      auditNoEntries: "Pas encore d'entrées d'audit.",

      releasesVersion: "Version",
      releasesPlatform: "Plateforme",
      releasesDownloadUrl: "URL de téléchargement",
      releasesNotes: "Notes",
      releasesMarkLatest: "Marquer comme latest",
      releasesAddRelease: "Ajouter un release",
      releasesUpdate: "Mettre à jour",
      releasesDeleteRelease: "Supprimer le release",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "Nouveautés...",
    },
  },
  it: {
    common: {
      brand: "RoxStreamAI",
      dashboard: "Pannello",
      openDashboard: "Apri dashboard",
      signIn: "Accedi",
      signOut: "Esci",
      downloadDemo: "Scarica demo",
      back: "Indietro",
      comingSoon: "In arrivo",
      preview: "Anteprima",
      saved: "Salvato",
      now: "ora",
      loading: "Caricamento…",
      save: "Salva",
      saving: "Salvataggio…",
      thinking: "Riflette…",
      generating: "Generazione…",
      testing: "Test…",
      connected: "Connesso",
      cancel: "Annulla",
      close: "Chiudi",
      featureComingSoonDescription: "Questa funzione sarà disponibile a breve.",
      proPerks: "Vantaggi Pro",
      desktopOnlyTitle: "Solo desktop",
      desktopOnlyMessage: "Questa sezione è disponibile solo nell'app RoxStreamAI Desktop.",
      draftUpdated: "Bozza aggiornata",
      published: "Pubblicato",
      planUpgradeRequired: "Aggiornamento piano richiesto",
      creditsLimitReached: "Limite crediti raggiunto. Acquista più ore.",
    },
    nav: {
      home: "Inizio",
      useCases: "Casi d'uso",
      pricing: "Prezzi",
      docs: "Documentazione",
      blog: "Notizie",
      about: "Chi siamo",
      contact: "Contatto",
      team: "Squadra",
      terms: "Termini",
      privacy: "Riservatezza",
      cookies: "Cookie",
    },
    auth: {
      welcomeBack: "Bentornato",
      createAccount: "Crea account",
      resetPassword: "Reimposta password",
      email: "E-mail",
      password: "Parola",
      newPassword: "Nuova password",
      emailPlaceholder: "tu@azienda.it",
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
      howItWorksTitle: "Da zero al live in tre passaggi",
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
      systemToastsTitle: "Notifiche di sistema",
      systemToastsSubtitle: "Aggiornamenti recenti dal workspace.",
      startSession: "Avvia sessione",
      upgradeRequired: "Aggiornamento richiesto",
      quickActions: "Azioni rapide",
      createCharacter: "Crea personaggio",
      setupDonoRules: "Configura regole Dono",
      deploy: "Distribuisci",
      generateShareLink: "Genera link",
      billing: "Fatturazione",
      billingSubtitle: "Gestisci piano, crediti e add-on.",
      promoCodeLabel: "Codice promo",
      promoCodePlaceholder: "Inserisci codice promo",
      promoCodeHelp:
        "Usa un codice referral per sbloccare ore bonus di Active Speech dopo l'acquisto.",
      referrals: "Referral",
      referralProgramTitle: "Programma di referral",
      referralProgramBody:
        "Condividi il tuo codice promo per sbloccare ore bonus di Active Speech per te e gli invitati.",
      referralProgramManage: "Gestisci referral",
      referralInviteSubtitle:
        "Invita creator e guadagna ore bonus di Active Speech.",
      referralHowTitle: "Come funziona",
      referralHowLine1:
        "Chi usa il tuo codice ottiene ore bonus di Active Speech dopo l'acquisto.",
      referralHowLine2:
        "Starter: +1 ora. Creator: +2 ore. Pro: +5 ore. Studio: +10 ore. Scale: +20 ore.",
      referralHowLine3:
        "Ogni 3 acquisti idonei (Creator o superiore) ti danno 4 ore.",
      referralHowLine4:
        "Puoi ottenere di nuovo il bonus di 4 ore per ogni altri 3 acquisti.",
      referralPromoTitle: "Il tuo codice promo",
      referralPromoPlaceholder: "Scegli il tuo codice promo",
      referralPromoCreate: "Crea codice",
      referralPromoCopy: "Copia link referral",
      referralBonusTitle: "Progresso bonus",
      referralBonusClaim: "Richiedi bonus di 4 ore",
      referralBonusNeed: "Servono 3 acquisti idonei per il bonus.",
      referralRegistrationsTitle: "Registrazioni",
      referralPurchasesTitle: "Acquisti",
      referralNoSignups: "Ancora nessuna registrazione.",
      referralNoPurchases: "Ancora nessun acquisto.",
      notifications: "Notifiche",
      notificationsTitle: "Notifiche",
      notificationsSubtitle: "Uso, bonus e aggiornamenti di fatturazione.",
      notificationsMarkAll: "Segna tutto come letto",
      notificationsEmpty: "Ancora nessuna notifica.",
      notificationsMarkRead: "Segna come letto",
      currentPlan: "Piano attuale",
      managePlan: "Gestisci piano e utilizzo.",
      comparePlans: "Confronta piani",
      contactSales: "Contatta vendite",
      remainingHours: "Ore rimanenti",
      unlimitedHours: "Ore illimitate (BYOK).",
      billingSummary: "Riepilogo fatturazione",
      nextInvoice: "Prossima fattura: 26 feb 2026",
      trialEnded: "Prova terminata",
      trialEndsIn: "La prova termina tra {days} giorni",
      connectors: "Connettori streaming",
      connectorsSubtitle:
        "Connetti TikTok oggi. Twitch e YouTube più avanti.",
      connectorsTiktokDescription:
        "I connettori si configurano tramite l'app Desktop. Questo dashboard mostrerà lo stato live una volta abilitate le API dei connettori.",
      connectorsConnectTiktok: "Connetti TikTok",
      connectorsOpenSetupGuide: "Apri guida di configurazione",
      connectorsJoinWaitlist:
        "Unisciti alla lista d'attesa per l'accesso anticipato.",
      connectorsEarlyAccessNote:
        "L'accesso anticipato arriva prima per Pro e Studio.",
      connectorsMultiAccountTitle: "Scheduler multi-account",
      connectorsMultiAccountDescription:
        "Disponibile in Pro+. Ruota più account con regole di pianificazione.",
      connectorsMultiAccountBody:
        "Questo modulo è in anteprima. Quando abilitato, potrai ruotare gli account in base a calendari e limiti d'uso.",
      connectorsExampleRotationWindow:
        "Esempio: finestra di rotazione ogni 4 ore",
      connectorsExampleMaxSessionsPerDay:
        "Esempio: massimo sessioni al giorno: 3",
      deployTitle: "Deploy",
      deploySubtitle: "Pubblica la sessione e vai live in OBS.",
      settings: "Impostazioni",
      settingsSubtitle: "Preferenze workspace ed export.",
      characters: "Personaggi",
      charactersSubtitle: "Gestisci le personas di streamer AI.",
      noCharacters: "Nessun personaggio. Crea il primo.",
      characterBuilder: "Creatore personaggio",
      characterBuilderSubtitle:
        "Crea la persona, la voce e il comportamento del tuo streamer AI.",
      characterEditorTitle: "Editor personaggi 3D",
      characterEditorEnabledNote:
        "L'integrazione dell'editor Polyphoria è attiva (in corso).",
      characterEditorComingSoonNote:
        "In arrivo: un editor 3D in-app con Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "La superficie dell'editor integrato apparirà qui. Per ora usa il Creatore personaggio per persona e voce.",
      characterEditorWaitlistDescription:
        "Iscriviti alla lista d'attesa per l'accesso anticipato.",
      polyphoriaModalDescription:
        "Stiamo preparando l'integrazione dell'editor personaggi in-app. Per ora puoi importare il tuo MetaHuman o usare la tua scena Unreal esistente.",
      donoEngine: "Motore Dono",
      donoEngineSubtitle: "Regole che reagiscono ai regali.",
      scripts: "Script",
      scriptsSubtitle: "Disegna il flusso con script e preset.",
      avatarScene: "Avatar + Scena",
      avatarSceneSubtitle: "Gestisci il livello visivo dello streamer.",
      notFoundTitle: "Pagina non trovata",
      notFoundSubtitle: "Questo modulo è ancora in anteprima.",
      backToOverview: "Torna alla panoramica",

      unrealConnector: "Connettore Unreal",
      localRuntime: "Runtime locale",
      diagnostics: "Diagnostica",

      unrealHubSubtitle:
        "Guide per il workflow RoxStreamAI → Unreal. Runtime Connector in anteprima.",
      unrealGettingStartedTitle: "Primi passi",
      unrealGettingStartedDescription:
        "Scegli uno dei percorsi di setup qui sotto. Se hai già un progetto Unreal, inizia con la configurazione manuale.",
      unrealImportMetahumanTitle: "Come importare MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (archivio)",
      unrealManualSetupTitle: "Configurazione manuale di Unreal",
      unrealRuntimeConnectorTitle: "Runtime Connector Unreal",
      unrealOpenRuntimeConnectorButton:
        "Apri Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Torna all'hub Unreal",
      unrealOpenDocsButton: "Apri docs Unreal",

      billingCurrentPlanCheck: "Piano attuale \u2713",
      billingUpgrade: "Aggiorna",
      billingUpgradeNote: "Nessun rimborso per il periodo corrente",
      billingDowngrade: "Declassa",
      billingDowngradeNote: "Effetto dal prossimo periodo di fatturazione",
      billingSubscribe: "Abbonati",

      billingSuccessTitle: "Pagamento ricevuto",
      billingSuccessVerifying: "Verifica del pagamento...",
      billingSuccessProcessing:
        "Stiamo ancora elaborando il pagamento. Riprova più tardi.",
      billingSuccessConfirmedRedirecting: "Pagamento confermato. Reindirizzamento...",
      billingSuccessGoToDashboard: "Vai alla dashboard",

      characterBuilderLiveNote: "I test Brain + Voice sono attivi.",
      characterBuilderDraft: "Bozza",
      characterBuilderProfileTitle: "Profilo",
      characterBuilderCharacterNamePlaceholder: "Nome personaggio",
      characterBuilderPrimaryLanguagePlaceholder: "Lingua principale (en/ru)",
      characterBuilderBioPlaceholder: "Linee guida di persona e tono",
      characterBuilderVoiceTitle: "Voce",
      characterBuilderVoiceProviderLabel: "Fornitore voce",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (incluso)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, chiave propria)",
      characterBuilderVoiceIdLabel: "Preset voce / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID voce ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Testa voce",
      characterBuilderTestResponseTitle: "Risposta di test",
      characterBuilderTestResponseDescription:
        "Chiama il provider brain del workspace e applica la persona del personaggio.",
      characterBuilderTestResponse: "Risposta di test",
      characterBuilderReplyLabel: "Risposta",
      characterBuilderNotesTitle: "Note",
      characterBuilderNotesDescription:
        "Configura i valori predefiniti in Impostazioni → Fornitori IA.",
      characterBuilderNoWorkspaceConfigured: "Nessun workspace configurato.",
      characterBuilderNotFound: "Personaggio non trovato.",
      characterBuilderTestResponseFailed: "Risposta di test non riuscita.",
      characterBuilderTestVoiceFailed: "Test voce non riuscito.",
      characterBuilderDefaultUserMessage: "Ciao! Dammi un saluto breve e divertente.",

      aiProvidersTitle: "Fornitori IA",
      aiProvidersSubtitle:
        "Configura brain + voice per workspace. Le chiavi sono salvate lato server.",
      aiProvidersLoadFailed: "Impossibile caricare le impostazioni IA.",
      aiProvidersSaveFailed: "Impossibile salvare le impostazioni.",
      aiProvidersSaveKeyFailed: "Impossibile salvare la chiave.",
      aiProvidersRemoveKeyFailed: "Impossibile rimuovere la chiave.",
      aiProvidersKeySaved: "Chiave salvata.",
      aiProvidersKeyRemoved: "Chiave rimossa.",
      aiProvidersBrainTestFailed: "Test brain non riuscito.",
      aiProvidersVoiceTestFailed: "Test voce non riuscito.",
      aiProvidersBrainProviderLabel: "Provider brain",
      aiProvidersBrainProviderHelp:
        "Altri provider sono elencati per visibilita, ma non sono ancora disponibili. Oggi l'app gira su OpenAI.",
      aiProvidersBrainModelLabel: "Modello brain",
      aiProvidersCostEstimatorTitle: "Stimatore costi ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Aggiungeremo uno stimatore in-app quando saranno abilitati altri provider (token, voci e spesa prevista). Per ora la voce OpenAI è inclusa e i provider BYOK fatturano direttamente.",
      aiProvidersVoiceProviderLabel: "Fornitore voce",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (incluso)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, chiave propria)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Aggiungi la tua chiave ElevenLabs qui sotto per usare questo provider.",
      aiProvidersVoiceIdLabel: "Preset voce / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID voce ElevenLabs",
      aiProvidersSaveButton: "Salva impostazioni IA",
      aiProvidersTestBrainButton: "Testa brain",
      aiProvidersTestVoiceButton: "Test voce",
      aiProvidersTestBrainResponseLabel: "Risposta brain di test",
      aiProvidersApiKeysTitle: "Chiavi API (BYOK)",
      aiProvidersOpenAiKeyLabel: "Chiave API OpenAI (opzionale)",
      aiProvidersElevenLabsKeyLabel: "Chiave API ElevenLabs",
      aiProvidersSaveKeyButton: "Salva chiave",
      aiProvidersReplaceKeyButton: "Sostituisci chiave",
      aiProvidersRemoveKeyButton: "Rimuovi chiave",
      aiProvidersKeysNotReturnedNote:
        "Le chiavi non vengono mai restituite al browser. La UI mostra solo “{connected}”.",

      settingsPageTitle: "Impostazioni",
      settingsProfileTitle: "Profilo",
      settingsDisplayNameLabel: "Nome visualizzato",
      settingsDisplayNameRequired: "Il nome visualizzato è obbligatorio.",
      settingsUsernameOptionalLabel: "Nome utente (opzionale)",
      settingsNoProfileFound: "Nessun profilo trovato.",
      settingsWorkspaceTitle: "Spazio di lavoro",
      settingsNoWorkspaceFound: "Nessun workspace trovato.",
      settingsSignOutTitle: "Disconnetti",
      settingsSignOutDescription: "Disconnetti il tuo account su questo dispositivo.",

      unrealExportButton: "Esporta per Unreal",
      unrealExportTitle: "Esporta per Unreal",
      unrealExportDescription:
        "Genera una config JSON che puoi usare per la configurazione manuale di Unreal oggi e per il Runtime Connector più avanti.",
      unrealExportIncludeDonoRules: "Includi regole Dono",
      unrealExportIncludeScripts: "Includi script",
      unrealExportIncludeScenes: "Includi scene",
      unrealExportFailed: "Esportazione non riuscita.",
      unrealExportSavedTo: "Salvato in: {path}",
      unrealExportGenerateDownload: "Genera + scarica",
      unrealExportFile: "Nome file: {filename}",
    },
    admin: {
      label: "Amministrazione",
      navOverview: "Panoramica",
      navUsers: "Utenti",
      navPricing: "Prezzi",
      navContent: "Contenuti",
      navLeads: "Contatti",
      navAudit: "Controlli",
      navReleases: "Release",
      dashboardLink: "Pannello",

      overviewTitle: "Panoramica del centro di controllo",
      overviewSubtitle:
        "Totali chiave di utenti, workspace, fatturazione e utilizzo.",
      totalUsers: "Totale utenti",
      totalUsersHelp: "Profili creati in Supabase.",
      workspaces: "Workspace",
      workspacesHelp: "Totale workspace di tutti gli utenti.",
      activeSubscriptions: "Abbonamenti attivi",
      activeSubscriptionsHelp: "Righe billing_state con status=active.",
      usageEvents24h: "Eventi di utilizzo (24h)",
      usageEvents24hHelp: "Eventi acquisiti nelle ultime 24 ore.",
      releasesCount: "Release",
      releasesCountHelp: "Build desktop disponibili per il download.",

      usersTitle: "Gestisci accesso",
      usersSubtitle: "Aggiorna ruolo e piano utente.",
      tableEmail: "E-mail",
      tableRole: "Ruolo",
      tablePlan: "Piano",
      tableCreated: "Creato",
      tableSave: "Salva",
      buttonSave: "Salva",
      roleUser: "Utente",
      roleAdmin: "Amministratore",
      planTrial: "Prova",
      planPro: "Professionale",
      planStudio: "Piano Studio",
      planEnterprise: "Aziendale",

      pricingTitle: "CMS prezzi",
      pricingSubtitle:
        "Modifica la configurazione prezzi versionata e pubblica la versione attiva.",
      contentTitle: "CMS marketing",
      contentSubtitle:
        "Modifica il testo marketing tramite blocchi markdown. Le pagine usano chiavi con fallback.",
      leadsTitle: "Lista d'attesa e contatti",
      leadsSubtitle: "Visualizza lead e esporta CSV.",
      auditTitle: "Log audit admin",
      auditSubtitle:
        "Azioni admin recenti su utenti, prezzi, contenuti e lead.",
      releasesTitle: "Release",

      errorUnknown: "Errore sconosciuto",
      buttonRefresh: "Aggiorna",
      buttonPublish: "Pubblica",
      buttonNew: "Nuovo",
      buttonExportCsv: "Esporta CSV",

      statusActive: "Attivo",
      statusDraft: "Bozza",
      statusPublished: "Pubblicato",

      pricingVersions: "Versioni",
      pricingNoVersions: "Nessuna versione ancora.",
      pricingEditor: "Editor prezzi",
      pricingEditingVersion: "Modifica v{version}",
      pricingSelectVersion: "Seleziona una versione",
      pricingRawJsonAdvanced: "JSON grezzo (avanzato)",
      pricingYearlyDiscountPct: "Sconto annuale (%)",
      pricingDefaultTalkRatio: "Talk ratio predefinito",
      pricingMinTalkRatio: "Talk ratio minimo",
      pricingMaxTalkRatio: "Talk ratio massimo",
      pricingTooltipText: "Testo tooltip",
      pricingPlans: "Piani",
      pricingTablePlan: "Piano",
      pricingTableMonthlyEur: "Mensile (€)",
      pricingTableEntitlementsJson: "Permessi (JSON)",
      pricingPlaceholderMonthlyEur: "es. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_personaggi\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Tip: il salvataggio valida lo schema lato server.",

      contentSearchPlaceholder: "Cerca chiavi o testo…",
      contentNoBlocks: "Nessun blocco contenuto.",
      contentSelectBlock: "Seleziona un blocco",
      contentSelectBlockError: "Seleziona un blocco da modificare",
      contentMarkdown: "Markdown (md)",
      contentPreview: "Anteprima",
      contentMarkdownPlaceholder: "# Titolo\n\nIl tuo contenuto…",

      leadsWaitlist: "Lista d'attesa",
      leadsContact: "Contatto",
      leadsInvestors: "Investitori",
      leadsShowingRows: "Mostrando {count} righe",
      leadsNoLeads: "Nessun lead ancora.",

      auditFilterActionPlaceholder: "Filtra azione…",
      auditFilterTargetTypePlaceholder: "Filtra target_type…",
      auditShowingEntries: "Mostrando {count} voci",
      auditTime: "Ora",
      auditAction: "Azione",
      auditTarget: "Bersaglio",
      auditPayload: "Dati",
      auditNoEntries: "Nessuna voce di audit ancora.",

      releasesVersion: "Versione",
      releasesPlatform: "Piattaforma",
      releasesDownloadUrl: "URL download",
      releasesNotes: "Note",
      releasesMarkLatest: "Segna come latest",
      releasesAddRelease: "Aggiungi release",
      releasesUpdate: "Aggiorna",
      releasesDeleteRelease: "Elimina release",
      releasesPlatformWindows: "Windows PC",
      releasesPlatformMac: "macOS Desktop",
      releasesPlaceholderVersion: "es. 1.0.0",
      releasesPlaceholderUrl: "https://esempio.it",
      releasesPlaceholderNotes: "Novità...",
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
      now: "agora",
      loading: "Carregando…",
      save: "Salvar",
      saving: "Salvando…",
      thinking: "Pensando…",
      generating: "Gerando…",
      testing: "Testando…",
      connected: "Conectado",
      cancel: "Cancelar",
      close: "Fechar",
      featureComingSoonDescription: "Este recurso será habilitado em breve.",
      proPerks: "Vantagens Pro",
      desktopOnlyTitle: "Somente desktop",
      desktopOnlyMessage: "Esta seção está disponível apenas no app RoxStreamAI Desktop.",
      draftUpdated: "Rascunho atualizado",
      published: "Publicado",
      planUpgradeRequired: "Upgrade de plano necessário",
      creditsLimitReached: "Limite de créditos atingido. Compre mais horas.",
    },
    nav: {
      home: "Início",
      useCases: "Casos de uso",
      pricing: "Preços",
      docs: "Documentação",
      blog: "Noticias",
      about: "Sobre",
      contact: "Contato",
      team: "Equipe",
      terms: "Termos",
      privacy: "Privacidade",
      cookies: "Politica de cookies",
    },
    auth: {
      welcomeBack: "Bem-vindo de volta",
      createAccount: "Criar conta",
      resetPassword: "Redefinir senha",
      email: "Email",
      password: "Senha",
      newPassword: "Nova senha",
      emailPlaceholder: "voce@empresa.com",
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
      systemToastsTitle: "Notificações do sistema",
      systemToastsSubtitle: "Atualizações recentes do workspace.",
      startSession: "Iniciar sessão",
      upgradeRequired: "Upgrade necessário",
      quickActions: "Ações rápidas",
      createCharacter: "Criar personagem",
      setupDonoRules: "Configurar regras Dono",
      deploy: "Publicar",
      generateShareLink: "Gerar link",
      billing: "Faturamento",
      billingSubtitle: "Gerencie plano, créditos e add-ons.",
      promoCodeLabel: "Código promocional",
      promoCodePlaceholder: "Insira o código promocional",
      promoCodeHelp:
        "Use um código de indicação para desbloquear horas extra de Active Speech após a compra.",
      referrals: "Indicações",
      referralProgramTitle: "Programa de indicações",
      referralProgramBody:
        "Compartilhe seu código promocional para desbloquear horas extra de Active Speech para você e convidados.",
      referralProgramManage: "Gerenciar indicações",
      referralInviteSubtitle:
        "Convide criadores e ganhe horas extra de Active Speech.",
      referralHowTitle: "Como funciona",
      referralHowLine1:
        "Quem usa seu código recebe horas extra de Active Speech após a compra.",
      referralHowLine2:
        "Starter: +1 hora. Creator: +2 horas. Pro: +5 horas. Studio: +10 horas. Scale: +20 horas.",
      referralHowLine3:
        "A cada 3 compras elegíveis (Creator ou superior) você ganha 4 horas.",
      referralHowLine4:
        "Você pode ganhar o bônus de 4 horas novamente a cada 3 compras.",
      referralPromoTitle: "Seu código promocional",
      referralPromoPlaceholder: "Escolha seu código promocional",
      referralPromoCreate: "Criar código",
      referralPromoCopy: "Copiar link de indicação",
      referralBonusTitle: "Progresso do bônus",
      referralBonusClaim: "Resgatar bônus de 4 horas",
      referralBonusNeed: "São necessárias 3 compras elegíveis para o bônus.",
      referralRegistrationsTitle: "Cadastros",
      referralPurchasesTitle: "Compras",
      referralNoSignups: "Ainda não há cadastros.",
      referralNoPurchases: "Ainda não há compras.",
      notifications: "Notificações",
      notificationsTitle: "Notificações",
      notificationsSubtitle: "Uso, bônus e atualizações de faturamento.",
      notificationsMarkAll: "Marcar tudo como lido",
      notificationsEmpty: "Ainda não há notificações.",
      notificationsMarkRead: "Marcar como lido",
      currentPlan: "Plano atual",
      managePlan: "Gerenciar plano e uso.",
      comparePlans: "Comparar planos",
      contactSales: "Falar com vendas",
      remainingHours: "Horas restantes",
      unlimitedHours: "Horas ilimitadas (BYOK).",
      billingSummary: "Resumo da fatura",
      nextInvoice: "Próxima fatura: 26 Fev 2026",
      trialEnded: "Teste encerrado",
      trialEndsIn: "O teste termina em {days} dias",
      connectors: "Conectores de stream",
      connectorsSubtitle:
        "Conecte TikTok hoje. Twitch e YouTube depois.",
      connectorsTiktokDescription:
        "Os conectores são configurados pelo app desktop. Este painel mostrará o status ao vivo quando as APIs dos conectores estiverem habilitadas.",
      connectorsConnectTiktok: "Conectar TikTok",
      connectorsOpenSetupGuide: "Abrir guia de configuração",
      connectorsJoinWaitlist:
        "Entre na lista de espera para acesso antecipado.",
      connectorsEarlyAccessNote:
        "O acesso antecipado chega primeiro para Pro e Studio.",
      connectorsMultiAccountTitle: "Agendador multi-conta",
      connectorsMultiAccountDescription:
        "Disponível no Pro+. Faça rotação de várias contas com regras de agendamento.",
      connectorsMultiAccountBody:
        "Este módulo está em preview. Quando habilitado, você poderá rotacionar contas por agenda e limites de uso.",
      connectorsExampleRotationWindow:
        "Exemplo: janela de rotação a cada 4 horas",
      connectorsExampleMaxSessionsPerDay:
        "Exemplo: máximo de sessões por dia: 3",
      deployTitle: "Publicação",
      deploySubtitle: "Publique sua sessão e faça live no OBS.",
      settings: "Configurações",
      settingsSubtitle: "Preferências do workspace e exportação.",
      characters: "Personagens",
      charactersSubtitle: "Gerencie personas de streamer AI.",
      noCharacters: "Nenhum personagem. Crie o primeiro.",
      characterBuilder: "Construtor de personagem",
      characterBuilderSubtitle:
        "Crie a persona, a voz e o comportamento do streamer de IA.",
      characterEditorTitle: "Editor de personagem 3D",
      characterEditorEnabledNote:
        "A integração do editor Polyphoria está habilitada (em andamento).",
      characterEditorComingSoonNote:
        "Em breve: um editor 3D no app com Polyphoria.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "A superfície do editor embutido aparecerá aqui. Por enquanto, use o Construtor de personagem para editar persona e voz.",
      characterEditorWaitlistDescription:
        "Entre na lista de espera para acesso antecipado quando lançarmos.",
      polyphoriaModalDescription:
        "Estamos preparando a integração do editor de personagens no app. Por enquanto, você pode importar seu MetaHuman ou usar sua cena Unreal existente.",
      donoEngine: "Motor Dono",
      donoEngineSubtitle: "Regras que reagem a presentes e doações.",
      scripts: "Scripts",
      scriptsSubtitle: "Desenhe o fluxo com scripts e presets.",
      avatarScene: "Avatar + Cena",
      avatarSceneSubtitle: "Gerencie a camada visual do streamer.",
      notFoundTitle: "Página não encontrada",
      notFoundSubtitle: "Este módulo ainda está em preview.",
      backToOverview: "Voltar à visão geral",

      unrealConnector: "Conector Unreal",
      localRuntime: "Runtime local",
      diagnostics: "Diagnósticos",

      unrealHubSubtitle:
        "Guias para seu fluxo RoxStreamAI → Unreal. O Runtime Connector está em preview.",
      unrealGettingStartedTitle: "Primeiros passos",
      unrealGettingStartedDescription:
        "Escolha um dos caminhos de configuração abaixo. Se você já tem um projeto Unreal, comece com a configuração manual.",
      unrealImportMetahumanTitle: "Como importar MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (arquivo)",
      unrealManualSetupTitle: "Configuração manual do Unreal",
      unrealRuntimeConnectorTitle: "Runtime Connector do Unreal",
      unrealOpenRuntimeConnectorButton:
        "Abrir Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Voltar ao hub do Unreal",
      unrealOpenDocsButton: "Abrir docs do Unreal",

      billingCurrentPlanCheck: "Plano atual \u2713",
      billingUpgrade: "Atualizar",
      billingUpgradeNote: "Sem reembolso do período atual",
      billingDowngrade: "Reduzir",
      billingDowngradeNote: "Efetivo no próximo período de faturamento",
      billingSubscribe: "Assinar",

      billingSuccessTitle: "Pagamento recebido",
      billingSuccessVerifying: "Verificando pagamento...",
      billingSuccessProcessing:
        "Ainda estamos processando seu pagamento. Atualize mais tarde.",
      billingSuccessConfirmedRedirecting: "Pagamento confirmado. Redirecionando...",
      billingSuccessGoToDashboard: "Ir para o painel",

      characterBuilderLiveNote: "Testes de Brain + Voice estão ativos.",
      characterBuilderDraft: "Rascunho",
      characterBuilderProfileTitle: "Perfil",
      characterBuilderCharacterNamePlaceholder: "Nome do personagem",
      characterBuilderPrimaryLanguagePlaceholder: "Idioma principal (en/ru)",
      characterBuilderBioPlaceholder: "Diretrizes de persona e tom",
      characterBuilderVoiceTitle: "Voz",
      characterBuilderVoiceProviderLabel: "Provedor de voz",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (incluído)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, chave própria)",
      characterBuilderVoiceIdLabel: "Preset de voz / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID de voz ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Testar voz",
      characterBuilderTestResponseTitle: "Resposta de teste",
      characterBuilderTestResponseDescription:
        "Chama o provedor brain do workspace e aplica a persona do personagem.",
      characterBuilderTestResponse: "Resposta de teste",
      characterBuilderReplyLabel: "Resposta",
      characterBuilderNotesTitle: "Notas",
      characterBuilderNotesDescription:
        "Configure padrões em Configurações → Provedores de IA.",
      characterBuilderNoWorkspaceConfigured: "Nenhum workspace configurado.",
      characterBuilderNotFound: "Personagem não encontrado.",
      characterBuilderTestResponseFailed: "Falha na resposta de teste.",
      characterBuilderTestVoiceFailed: "Falha no teste de voz.",
      characterBuilderDefaultUserMessage: "Oi! Dê um cumprimento curto e divertido.",

      aiProvidersTitle: "Provedores de IA",
      aiProvidersSubtitle:
        "Configure brain + voice por workspace. As chaves ficam no servidor.",
      aiProvidersLoadFailed: "Falha ao carregar ajustes de IA.",
      aiProvidersSaveFailed: "Falha ao salvar ajustes.",
      aiProvidersSaveKeyFailed: "Falha ao salvar a chave.",
      aiProvidersRemoveKeyFailed: "Falha ao remover a chave.",
      aiProvidersKeySaved: "Chave salva.",
      aiProvidersKeyRemoved: "Chave removida.",
      aiProvidersBrainTestFailed: "Falha no teste de brain.",
      aiProvidersVoiceTestFailed: "Falha no teste de voz.",
      aiProvidersBrainProviderLabel: "Provedor de brain",
      aiProvidersBrainProviderHelp:
        "Outros provedores aparecem apenas para visibilidade, mas ainda não estão disponíveis. Hoje o app roda com OpenAI.",
      aiProvidersBrainModelLabel: "Modelo de brain",
      aiProvidersCostEstimatorTitle: "Estimador de custo ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Vamos adicionar um estimador no app quando outros provedores estiverem habilitados (tokens, vozes e gasto projetado). Por agora, a voz da OpenAI está incluída e provedores BYOK cobram diretamente.",
      aiProvidersVoiceProviderLabel: "Provedor de voz",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (incluído)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, chave própria)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Adicione sua chave do ElevenLabs abaixo para usar este provedor.",
      aiProvidersVoiceIdLabel: "Preset de voz / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID de voz ElevenLabs",
      aiProvidersSaveButton: "Salvar ajustes de IA",
      aiProvidersTestBrainButton: "Testar brain",
      aiProvidersTestVoiceButton: "Testar voz",
      aiProvidersTestBrainResponseLabel: "Resposta de teste do brain",
      aiProvidersApiKeysTitle: "Chaves de API (BYOK)",
      aiProvidersOpenAiKeyLabel: "Chave da API OpenAI (opcional)",
      aiProvidersElevenLabsKeyLabel: "Chave da API ElevenLabs",
      aiProvidersSaveKeyButton: "Salvar chave",
      aiProvidersReplaceKeyButton: "Substituir chave",
      aiProvidersRemoveKeyButton: "Remover chave",
      aiProvidersKeysNotReturnedNote:
        "As chaves nunca são retornadas ao navegador. A UI só mostra “{connected}”.",

      settingsPageTitle: "Configurações",
      settingsProfileTitle: "Perfil",
      settingsDisplayNameLabel: "Nome de exibição",
      settingsDisplayNameRequired: "Nome de exibição é obrigatório.",
      settingsUsernameOptionalLabel: "Usuário (opcional)",
      settingsNoProfileFound: "Nenhum perfil encontrado.",
      settingsWorkspaceTitle: "Espaço de trabalho",
      settingsNoWorkspaceFound: "Nenhum espaço de trabalho encontrado.",
      settingsSignOutTitle: "Sair",
      settingsSignOutDescription: "Sair da sua conta neste dispositivo.",

      unrealExportButton: "Exportar para Unreal",
      unrealExportTitle: "Exportar para Unreal",
      unrealExportDescription:
        "Gere um JSON que você pode usar para a configuração manual do Unreal hoje e para o Runtime Connector depois.",
      unrealExportIncludeDonoRules: "Incluir regras Dono",
      unrealExportIncludeScripts: "Incluir scripts",
      unrealExportIncludeScenes: "Incluir cenas",
      unrealExportFailed: "Falha ao exportar.",
      unrealExportSavedTo: "Salvo em: {path}",
      unrealExportGenerateDownload: "Gerar + baixar",
      unrealExportFile: "Arquivo: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Visão geral",
      navUsers: "Usuários",
      navPricing: "Preços",
      navContent: "Conteúdo",
      navLeads: "Leads",
      navAudit: "Auditoria",
      navReleases: "Lançamentos",
      dashboardLink: "Painel",

      overviewTitle: "Visão geral do centro de controle",
      overviewSubtitle:
        "Totais chave de usuários, workspaces, faturamento e uso.",
      totalUsers: "Total de usuários",
      totalUsersHelp: "Perfis criados no Supabase.",
      workspaces: "Espaços de trabalho",
      workspacesHelp: "Total de espaços de trabalho de todos os usuários.",
      activeSubscriptions: "Assinaturas ativas",
      activeSubscriptionsHelp: "Linhas billing_state com status=active.",
      usageEvents24h: "Eventos de uso (24h)",
      usageEvents24hHelp: "Eventos ingeridos nas últimas 24 horas.",
      releasesCount: "Lançamentos",
      releasesCountHelp: "Builds desktop disponíveis para download.",

      usersTitle: "Gerenciar acesso",
      usersSubtitle: "Atualize o papel e plano do usuário.",
      tableEmail: "E-mail",
      tableRole: "Papel",
      tablePlan: "Plano",
      tableCreated: "Criado",
      tableSave: "Salvar",
      buttonSave: "Salvar",
      roleUser: "Usuário",
      roleAdmin: "Administrador",
      planTrial: "Teste",
      planPro: "Profissional",
      planStudio: "Estúdio",
      planEnterprise: "Empresa",

      pricingTitle: "CMS de preços",
      pricingSubtitle:
        "Edite a configuração de preços versionada e publique a versão ativa.",
      contentTitle: "CMS de marketing",
      contentSubtitle:
        "Edite o texto de marketing via blocos markdown. As páginas carregam por chave com fallbacks.",
      leadsTitle: "Lista de espera e contato",
      leadsSubtitle: "Ver leads capturados e exportar CSV.",
      auditTitle: "Logs de auditoria admin",
      auditSubtitle:
        "Ações admin recentes em usuários, preços, conteúdo e leads.",
      releasesTitle: "Lançamentos",

      errorUnknown: "Erro desconhecido",
      buttonRefresh: "Atualizar",
      buttonPublish: "Publicar",
      buttonNew: "Novo",
      buttonExportCsv: "Exportar CSV",

      statusActive: "Ativo",
      statusDraft: "Rascunho",
      statusPublished: "Publicado",

      pricingVersions: "Versões",
      pricingNoVersions: "Ainda não há versões.",
      pricingEditor: "Editor",
      pricingEditingVersion: "Editando v{version}",
      pricingSelectVersion: "Selecionar uma versão",
      pricingRawJsonAdvanced: "JSON bruto (avançado)",
      pricingYearlyDiscountPct: "Desconto anual (%)",
      pricingDefaultTalkRatio: "Taxa de fala padrão",
      pricingMinTalkRatio: "Taxa de fala mínima",
      pricingMaxTalkRatio: "Taxa de fala máxima",
      pricingTooltipText: "Texto da dica",
      pricingPlans: "Planos",
      pricingTablePlan: "Plano",
      pricingTableMonthlyEur: "Mensal (€)",
      pricingTableEntitlementsJson: "Direitos (JSON)",
      pricingPlaceholderMonthlyEur: "ex. 19,99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Dica: salvar executa validação de schema no servidor.",

      contentSearchPlaceholder: "Buscar chaves ou texto…",
      contentNoBlocks: "Ainda não há blocos de conteúdo.",
      contentSelectBlock: "Selecione um bloco",
      contentSelectBlockError: "Selecione um bloco para editar",
      contentMarkdown: "Markdown",
      contentPreview: "Prévia",
      contentMarkdownPlaceholder: "# Título\n\nSeu conteúdo…",

      leadsWaitlist: "Lista de espera",
      leadsContact: "Contato",
      leadsInvestors: "Investidores",
      leadsShowingRows: "Mostrando {count} linhas",
      leadsNoLeads: "Ainda não há leads.",

      auditFilterActionPlaceholder: "Filtrar ação…",
      auditFilterTargetTypePlaceholder: "Filtrar tipo de alvo…",
      auditShowingEntries: "Mostrando {count} entradas",
      auditTime: "Hora",
      auditAction: "Ação",
      auditTarget: "Alvo",
      auditPayload: "Carga útil",
      auditNoEntries: "Ainda não há entradas de auditoria.",

      releasesVersion: "Versão",
      releasesPlatform: "Plataforma",
      releasesDownloadUrl: "URL de download",
      releasesNotes: "Notas",
      releasesMarkLatest: "Marcar como mais recente",
      releasesAddRelease: "Adicionar lançamento",
      releasesUpdate: "Atualizar",
      releasesDeleteRelease: "Excluir lançamento",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "ex. 1.0.0",
      releasesPlaceholderUrl: "https://exemplo.com",
      releasesPlaceholderNotes: "Novidades...",
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
      docs: "Документация",
      blog: "Блог",
      about: "О нас",
      contact: "Контакты",
      team: "Команда",
      terms: "Условия",
      privacy: "Конфиденциальность",
      cookies: "Куки",
    },
    auth: {
      welcomeBack: "С возвращением",
      createAccount: "Создать аккаунт",
      resetPassword: "Сбросить пароль",
      email: "E-mail",
      password: "Пароль",
      newPassword: "Новый пароль",
      emailPlaceholder: "vy@kompanii.ru",
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
        "RoxStreamAI — это веб‑панель плюс десктоп‑компаньон для стабильных, интерактивных лайв‑шоу. Он читает чат, реагирует на подарки, следует сценарию и удерживает формат стрима стабильным по часовым поясам.",
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
      promoCodeLabel: "Промокод",
      promoCodePlaceholder: "Введите промокод",
      promoCodeHelp:
        "Используйте реферальный код, чтобы получить бонусные часы Active Speech после покупки.",
      referrals: "Рефералы",
      referralProgramTitle: "Реферальная программа",
      referralProgramBody:
        "Поделитесь промокодом, чтобы получить бонусные часы Active Speech для себя и приглашенных.",
      referralProgramManage: "Управлять рефералами",
      referralInviteSubtitle:
        "Приглашайте создателей и получайте бонусные часы Active Speech.",
      referralHowTitle: "Как это работает",
      referralHowLine1:
        "Те, кто использует ваш код, получают бонусные часы Active Speech после покупки.",
      referralHowLine2:
        "Starter: +1 час. Creator: +2 часа. Pro: +5 часов. Studio: +10 часов. Scale: +20 часов.",
      referralHowLine3:
        "Каждые 3 подходящие покупки (Creator и выше) дают вам 4 часа.",
      referralHowLine4:
        "Вы можете получать бонус 4 часа снова за каждые следующие 3 покупки.",
      referralPromoTitle: "Ваш промокод",
      referralPromoPlaceholder: "Выберите промокод",
      referralPromoCreate: "Создать код",
      referralPromoCopy: "Копировать реферальную ссылку",
      referralBonusTitle: "Прогресс бонуса",
      referralBonusClaim: "Получить бонус 4 часа",
      referralBonusNeed: "Для бонуса нужно 3 подходящие покупки.",
      referralRegistrationsTitle: "Регистрации",
      referralPurchasesTitle: "Покупки",
      referralNoSignups: "Пока нет регистраций.",
      referralNoPurchases: "Пока нет покупок.",
      notifications: "Уведомления",
      notificationsTitle: "Уведомления",
      notificationsSubtitle: "Использование, бонусы и обновления биллинга.",
      notificationsMarkAll: "Отметить все как прочитанные",
      notificationsEmpty: "Пока нет уведомлений.",
      notificationsMarkRead: "Отметить как прочитанное",
      currentPlan: "Текущий тариф",
      managePlan: "Управление тарифом и лимитами.",
      comparePlans: "Сравнить тарифы",
      contactSales: "Связаться с отделом продаж",
      remainingHours: "Оставшиеся активные часы",
      unlimitedHours: "Безлимитные активные часы (BYOK).",
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
      deployTitle: "Развертывание",
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

      unrealConnector: "Коннектор Unreal",
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

      billingCurrentPlanCheck: "Текущий план \u2713",
      billingUpgrade: "Повысить",
      billingUpgradeNote: "Без возврата за текущий период",
      billingDowngrade: "Понизить",
      billingDowngradeNote: "Вступит в силу в следующем расчётном периоде",
      billingSubscribe: "Подписаться",

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
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, свой ключ)",
      characterBuilderVoiceIdLabel: "Пресет / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID голоса ElevenLabs",
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

      aiProvidersTitle: "AI провайдеры",
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
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, свой ключ)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Добавьте ключ ElevenLabs ниже, чтобы использовать этого провайдера.",
      aiProvidersVoiceIdLabel: "Пресет / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID голоса ElevenLabs",
      aiProvidersSaveButton: "Сохранить настройки AI",
      aiProvidersTestBrainButton: "Тест brain",
      aiProvidersTestVoiceButton: "Тест голоса",
      aiProvidersTestBrainResponseLabel: "Ответ brain (тест)",
      aiProvidersApiKeysTitle: "API-ключи (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (опционально)",
      aiProvidersElevenLabsKeyLabel: "API ключ ElevenLabs",
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
      planPro: "Про",
      planStudio: "Студия",
      planEnterprise: "Корпоративный",

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
      now: "şimdi",
      loading: "Yükleniyor…",
      save: "Kaydet",
      saving: "Kaydediliyor…",
      thinking: "Düşünüyor…",
      generating: "Üretiyor…",
      testing: "Test ediliyor…",
      connected: "Bağlandı",
      cancel: "İptal",
      close: "Kapat",
      featureComingSoonDescription: "Bu özellik yakında etkinleşecek.",
      proPerks: "Pro avantajları",
      desktopOnlyTitle: "Yalnızca desktop",
      desktopOnlyMessage: "Bu bölüm sadece RoxStreamAI Desktop uygulamasında kullanılabilir.",
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
      blog: "Guncellemeler",
      about: "Hakkında",
      contact: "İletişim",
      team: "Ekip",
      terms: "Şartlar",
      privacy: "Gizlilik",
      cookies: "Çerezler",
    },
    auth: {
      welcomeBack: "Tekrar hoş geldin",
      createAccount: "Hesap oluştur",
      resetPassword: "Parola sıfırla",
      email: "E-posta",
      password: "Parola",
      newPassword: "Yeni parola",
      emailPlaceholder: "sen@sirket.com",
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
      useCasesTitle: "Modern canlı formatlar için",
      useCasesSubtitle:
        "Creatorlar, faceless formatlar ve ajanslar için tek platform.",
      ctaTitle: "Canlı görmek ister misin?",
      ctaSubtitle: "Ücretsiz deneme başlat veya planları karşılaştır.",
      ctaPrimary: "Deneme başlat",
      ctaSecondary: "Fiyatları gör",
      faqTitle: "Hızlı cevaplar",
      faqSubtitle: "Planlar ve kullanım hakkında her şey.",
    },
    app: {
      overview: "Genel bakış",
      overviewSubtitle: "Canlı durum, limitler ve hızlı işlemler.",
      systemToastsTitle: "Sistem bildirimleri",
      systemToastsSubtitle: "Workspace'ten son guncellemeler.",
      startSession: "Oturumu başlat",
      upgradeRequired: "Yükseltme gerekli",
      quickActions: "Hızlı işlemler",
      createCharacter: "Karakter oluştur",
      setupDonoRules: "Dono kurallarını ayarla",
      deploy: "Yayinla",
      generateShareLink: "Paylaşım linki üret",
      billing: "Faturalandırma",
      billingSubtitle: "Plan, krediler ve eklentiler.",
      promoCodeLabel: "Promosyon kodu",
      promoCodePlaceholder: "Promosyon kodu girin",
      promoCodeHelp:
        "Satın alma sonrası bonus Active Speech saatleri için referans kodu kullanın.",
      referrals: "Referanslar",
      referralProgramTitle: "Referans programı",
      referralProgramBody:
        "Promosyon kodunu paylaş, sen ve davetliler için bonus Active Speech saatleri kazan.",
      referralProgramManage: "Referansları yönet",
      referralInviteSubtitle:
        "Yaratıcıları davet et ve bonus Active Speech saatleri kazan.",
      referralHowTitle: "Nasıl çalışır",
      referralHowLine1:
        "Kodunu kullananlar satın alma sonrası bonus Active Speech saatleri alır.",
      referralHowLine2:
        "Starter: +1 saat. Creator: +2 saat. Pro: +5 saat. Studio: +10 saat. Scale: +20 saat.",
      referralHowLine3:
        "Her 3 uygun satın alma (Creator ve üzeri) sana 4 saat kazandırır.",
      referralHowLine4:
        "Her sonraki 3 satın alma için 4 saat bonusu yeniden kazanabilirsin.",
      referralPromoTitle: "Promosyon kodun",
      referralPromoPlaceholder: "Promosyon kodunu seç",
      referralPromoCreate: "Kod oluştur",
      referralPromoCopy: "Referans bağlantısını kopyala",
      referralBonusTitle: "Bonus ilerlemesi",
      referralBonusClaim: "4 saat bonusu talep et",
      referralBonusNeed: "Bonus için 3 uygun satın alma gerekir.",
      referralRegistrationsTitle: "Kayıtlar",
      referralPurchasesTitle: "Satın almalar",
      referralNoSignups: "Henüz kayıt yok.",
      referralNoPurchases: "Henüz satın alma yok.",
      notifications: "Bildirimler",
      notificationsTitle: "Bildirimler",
      notificationsSubtitle: "Kullanım, bonuslar ve faturalandırma güncellemeleri.",
      notificationsMarkAll: "Hepsini okundu işaretle",
      notificationsEmpty: "Henüz bildirim yok.",
      notificationsMarkRead: "Okundu işaretle",
      currentPlan: "Mevcut plan",
      managePlan: "Plan ve kullanım yönetimi.",
      comparePlans: "Planları karşılaştır",
      contactSales: "Satış ile iletişim",
      remainingHours: "Kalan konuşma saatleri",
      unlimitedHours: "Sınırsız konuşma saati (BYOK).",
      billingSummary: "Fatura özeti",
      nextInvoice: "Sonraki fatura: 26 Şub 2026",
      trialEnded: "Deneme bitti",
      trialEndsIn: "Deneme {days} gün içinde biter",
      connectors: "Stream bağlayıcıları",
      connectorsSubtitle:
        "TikTok'u bugün bağla. Twitch ve YouTube sonra.",
      connectorsTiktokDescription:
        "Baglayicilar Desktop companion uzerinden ayarlanir. Bu panel, baglayici API'leri etkinlestirildiginde canli durumu gosterecek.",
      connectorsConnectTiktok: "TikTok'u bagla",
      connectorsOpenSetupGuide: "Kurulum rehberini ac",
      connectorsJoinWaitlist:
        "Erken erisim icin bekleme listesine katil.",
      connectorsEarlyAccessNote:
        "Erken erisim once Pro ve Studio icin aciliyor.",
      connectorsMultiAccountTitle: "Coklu hesap zamanlayici",
      connectorsMultiAccountDescription:
        "Pro+ icin mevcut. Zamanlama kurallariyla birden cok hesap rotasyonu.",
      connectorsMultiAccountBody:
        "Bu modul onizleme. Etkinlestirildiginde hesaplari zamanlamalar ve kullanim limitlerine gore dondurebileceksin.",
      connectorsExampleRotationWindow:
        "Ornek: rotasyon penceresi her 4 saatte",
      connectorsExampleMaxSessionsPerDay:
        "Ornek: gunluk maksimum oturum: 3",
      deployTitle: "Yayinla",
      deploySubtitle: "Oturumu yayınla ve OBS'de canlıya geç.",
      settings: "Ayarlar",
      settingsSubtitle: "Workspace tercihleri ve dışa aktarım.",
      characters: "Karakterler",
      charactersSubtitle: "AI streamer personelerini yönet.",
      noCharacters: "Karakter yok. İlki oluştur.",
      characterBuilder: "Karakter Olusturucu",
      characterBuilderSubtitle:
        "AI streamer personasini, sesini ve davranisini olustur.",
      characterEditorTitle: "3D Karakter Editoru",
      characterEditorEnabledNote:
        "Polyphoria editor entegrasyonu etkin (gelistirme asamasinda).",
      characterEditorComingSoonNote:
        "Yakinda: Polyphoria destekli uygulama ici 3D editor.",
      characterEditorSectionTitle: "Editor",
      characterEditorEnabledDescription:
        "Gomulu editor alani burada gorunecek. Simdilik persona ve sesi duzenlemek icin Character Builder'i kullan.",
      characterEditorWaitlistDescription:
        "Erken erisim icin bekleme listesine katil.",
      polyphoriaModalDescription:
        "Uygulama ici karakter editoru entegrasyonu hazirliyoruz. Simdilik MetaHuman'ini ice aktarabilir veya mevcut Unreal sahneni kullanabilirsin.",
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
      localRuntime: "Yerel runtime",
      diagnostics: "Teshisler",

      unrealHubSubtitle:
        "RoxStreamAI → Unreal is akisi icin rehberler. Runtime Connector onizlemede.",
      unrealGettingStartedTitle: "Baslarken",
      unrealGettingStartedDescription:
        "Asagidaki kurulum yollarindan birini sec. Zaten bir Unreal projen varsa, Manual setup ile basla.",
      unrealImportMetahumanTitle: "MetaHuman nasil ice aktarilir",
      unrealLiveLinkFaceTitle: "Live Link Face (arsiv)",
      unrealManualSetupTitle: "Manuel Unreal kurulumu",
      unrealRuntimeConnectorTitle: "Unreal Runtime Connector",
      unrealOpenRuntimeConnectorButton:
        "Runtime Connector'u ac ({comingSoon})",
      unrealBackToHubButton: "Unreal hub'a don",
      unrealOpenDocsButton: "Unreal dokumanlarini ac",

      billingCurrentPlanCheck: "Mevcut plan \u2713",
      billingUpgrade: "Yükselt",
      billingUpgradeNote: "Mevcut dönem için iade yapılmaz",
      billingDowngrade: "Düşür",
      billingDowngradeNote: "Bir sonraki fatura döneminde geçerli olur",
      billingSubscribe: "Abone ol",

      billingSuccessTitle: "Odeme alindi",
      billingSuccessVerifying: "Odeme dogrulaniyor...",
      billingSuccessProcessing:
        "Odemeyi hala isliyoruz. Lutfen daha sonra yenileyin.",
      billingSuccessConfirmedRedirecting: "Odeme onaylandi. Yonlendiriliyor...",
      billingSuccessGoToDashboard: "Paneli ac",

      characterBuilderLiveNote: "Brain + Voice testleri aktif.",
      characterBuilderDraft: "Taslak",
      characterBuilderProfileTitle: "Profil",
      characterBuilderCharacterNamePlaceholder: "Karakter adi",
      characterBuilderPrimaryLanguagePlaceholder: "Birincil dil (en/ru)",
      characterBuilderBioPlaceholder: "Persona ve ton yonergeleri",
      characterBuilderVoiceTitle: "Ses",
      characterBuilderVoiceProviderLabel: "Ses saglayici",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (dahil)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, kendi anahtarin)",
      characterBuilderVoiceIdLabel: "Ses preset'i / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ElevenLabs ses ID",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Sesi test et",
      characterBuilderTestResponseTitle: "Test yaniti",
      characterBuilderTestResponseDescription:
        "Workspace brain saglayicisini cagirir ve karakter personasini uygular.",
      characterBuilderTestResponse: "Test yaniti",
      characterBuilderReplyLabel: "Yanit",
      characterBuilderNotesTitle: "Notlar",
      characterBuilderNotesDescription:
        "Ayarlar → AI Providers'da saglayici varsayilanlarini yapilandirin.",
      characterBuilderNoWorkspaceConfigured: "Workspace yapilandirilmamis.",
      characterBuilderNotFound: "Karakter bulunamadi.",
      characterBuilderTestResponseFailed: "Test yaniti basarisiz.",
      characterBuilderTestVoiceFailed: "Ses testi basarisiz.",
      characterBuilderDefaultUserMessage: "Merhaba! Kisa ve eglenceli bir selam ver.",

      aiProvidersTitle: "AI Saglayicilari",
      aiProvidersSubtitle:
        "Workspace basina brain + voice yapilandirin. Anahtarlar sunucuda saklanir.",
      aiProvidersLoadFailed: "AI ayarlari yuklenemedi.",
      aiProvidersSaveFailed: "Ayarlar kaydedilemedi.",
      aiProvidersSaveKeyFailed: "Anahtar kaydedilemedi.",
      aiProvidersRemoveKeyFailed: "Anahtar kaldirilamadi.",
      aiProvidersKeySaved: "Anahtar kaydedildi.",
      aiProvidersKeyRemoved: "Anahtar kaldirildi.",
      aiProvidersBrainTestFailed: "Brain testi basarisiz.",
      aiProvidersVoiceTestFailed: "Ses testi basarisiz.",
      aiProvidersBrainProviderLabel: "Brain saglayicisi",
      aiProvidersBrainProviderHelp:
        "Diger brain saglayicilari gorunurluk icin listelenir, ancak henuz kullanilabilir degil. Bugun uygulama OpenAI ile calisir.",
      aiProvidersBrainModelLabel: "Brain modeli",
      aiProvidersCostEstimatorTitle: "Maliyet tahmini ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Ek saglayicilar etkinlestiginde (tokenlar, ses karakterleri ve tahmini harcama) uygulama ici tahminci ekleyecegiz. Su an OpenAI sesi dahil ve BYOK saglayicilari ucretlendirir.",
      aiProvidersVoiceProviderLabel: "Ses saglayicisi",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (dahil)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, kendi anahtarin)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Bu saglayiciyi kullanmak icin asagiya ElevenLabs anahtarini ekle.",
      aiProvidersVoiceIdLabel: "Ses preset'i / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ElevenLabs ses ID",
      aiProvidersSaveButton: "AI ayarlarini kaydet",
      aiProvidersTestBrainButton: "Brain'i test et",
      aiProvidersTestVoiceButton: "Sesi test et",
      aiProvidersTestBrainResponseLabel: "Brain test yaniti",
      aiProvidersApiKeysTitle: "API anahtarlari (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API anahtari (opsiyonel)",
      aiProvidersElevenLabsKeyLabel: "ElevenLabs API anahtari",
      aiProvidersSaveKeyButton: "Anahtari kaydet",
      aiProvidersReplaceKeyButton: "Anahtari degistir",
      aiProvidersRemoveKeyButton: "Anahtari kaldir",
      aiProvidersKeysNotReturnedNote:
        "Anahtarlar asla tarayiciya dondurulmez. UI sadece “{connected}” gosterir.",

      settingsPageTitle: "Ayarlar",
      settingsProfileTitle: "Profil",
      settingsDisplayNameLabel: "Gorunen ad",
      settingsDisplayNameRequired: "Gorunen ad gerekli.",
      settingsUsernameOptionalLabel: "Kullanici adi (opsiyonel)",
      settingsNoProfileFound: "Profil bulunamadi.",
      settingsWorkspaceTitle: "Calisma alani",
      settingsNoWorkspaceFound: "Workspace bulunamadi.",
      settingsSignOutTitle: "Cikis yap",
      settingsSignOutDescription: "Bu cihazda hesabindan cikis yap.",

      unrealExportButton: "Unreal icin disari aktar",
      unrealExportTitle: "Unreal icin disari aktar",
      unrealExportDescription:
        "Bugun manuel Unreal kurulumu icin kullanabilecegin ve daha sonra Runtime Connector icin gerekli bir JSON config uret.",
      unrealExportIncludeDonoRules: "Dono kurallarini dahil et",
      unrealExportIncludeScripts: "Scriptleri dahil et",
      unrealExportIncludeScenes: "Sahneleri dahil et",
      unrealExportFailed: "Disa aktarma basarisiz.",
      unrealExportSavedTo: "Kaydedildi: {path}",
      unrealExportGenerateDownload: "Olustur + indir",
      unrealExportFile: "Dosya: {filename}",
    },
    admin: {
      label: "Admin",
      navOverview: "Genel bakis",
      navUsers: "Kullanicilar",
      navPricing: "Fiyatlar",
      navContent: "Icerik",
      navLeads: "Leadler",
      navAudit: "Denetim",
      navReleases: "Surumler",
      dashboardLink: "Panel",

      overviewTitle: "Kontrol merkezi genel bakis",
      overviewSubtitle:
        "Kullanicilar, workspace, faturalandirma ve kullanim icin temel toplamlar.",
      totalUsers: "Toplam kullanici",
      totalUsersHelp: "Supabase'de olusturulan profiller.",
      workspaces: "Workspace'ler",
      workspacesHelp: "Tum kullanicilardaki workspace sayisi.",
      activeSubscriptions: "Aktif abonelikler",
      activeSubscriptionsHelp: "status=active olan billing_state satirlari.",
      usageEvents24h: "Kullanim etkinlikleri (24s)",
      usageEvents24hHelp: "Son 24 saatte alinan etkinlikler.",
      releasesCount: "Surumler",
      releasesCountHelp: "Indirme icin masaustu build'leri.",

      usersTitle: "Erisimi yonet",
      usersSubtitle: "Kullanici rolu ve planini guncelle.",
      tableEmail: "Email",
      tableRole: "Rol",
      tablePlan: "Plan",
      tableCreated: "Olusturuldu",
      tableSave: "Kaydet",
      buttonSave: "Kaydet",
      roleUser: "Kullanici",
      roleAdmin: "Admin",
      planTrial: "Deneme",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "Fiyat CMS",
      pricingSubtitle:
        "Versiyonlu fiyat konfigurasyonunu duzenle ve aktif versiyonu yayinla.",
      contentTitle: "Pazarlama CMS",
      contentSubtitle:
        "Markdown bloklariyla pazarlama metnini duzenle. Sayfalar anahtar ile fallback kullanir.",
      leadsTitle: "Bekleme listesi ve iletisim",
      leadsSubtitle: "Leadleri goruntule ve CSV disa aktar.",
      auditTitle: "Admin denetim kayitlari",
      auditSubtitle:
        "Kullanicilar, fiyatlar, icerik ve leadler uzerindeki son admin islemleri.",
      releasesTitle: "Surumler",

      errorUnknown: "Bilinmeyen hata",
      buttonRefresh: "Yenile",
      buttonPublish: "Yayinla",
      buttonNew: "Yeni",
      buttonExportCsv: "CSV disa aktar",

      statusActive: "Aktif",
      statusDraft: "Taslak",
      statusPublished: "Yayinlandi",

      pricingVersions: "Versiyonlar",
      pricingNoVersions: "Henuz versiyon yok.",
      pricingEditor: "Duzenleyici",
      pricingEditingVersion: "v{version} duzenleniyor",
      pricingSelectVersion: "Bir versiyon sec",
      pricingRawJsonAdvanced: "Ham JSON (gelismis)",
      pricingYearlyDiscountPct: "Yillik indirim (%)",
      pricingDefaultTalkRatio: "Varsayilan talk ratio",
      pricingMinTalkRatio: "Minimum konusma orani",
      pricingMaxTalkRatio: "Maks talk ratio",
      pricingTooltipText: "Tooltip metni",
      pricingPlans: "Planlar",
      pricingTablePlan: "Tarife",
      pricingTableMonthlyEur: "Aylik (€)",
      pricingTableEntitlementsJson: "Yetkiler (JSON)",
      pricingPlaceholderMonthlyEur: "or. 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Ipucu: kaydetme sunucu tarafinda sema dogrulama calistirir.",

      contentSearchPlaceholder: "Anahtar veya metin ara…",
      contentNoBlocks: "Henuz icerik blogu yok.",
      contentSelectBlock: "Bir blok sec",
      contentSelectBlockError: "Duzenlemek icin bir blok sec",
      contentMarkdown: "Markdown (md)",
      contentPreview: "Onizleme",
      contentMarkdownPlaceholder: "# Baslik\n\nIceriginiz…",

      leadsWaitlist: "Bekleme listesi",
      leadsContact: "Iletisim",
      leadsInvestors: "Yatirimcilar",
      leadsShowingRows: "{count} satir gosteriliyor",
      leadsNoLeads: "Henuz lead yok.",

      auditFilterActionPlaceholder: "Aksiyon filtrele…",
      auditFilterTargetTypePlaceholder: "target_type filtrele…",
      auditShowingEntries: "{count} kayit gosteriliyor",
      auditTime: "Zaman",
      auditAction: "Aksiyon",
      auditTarget: "Hedef",
      auditPayload: "Yuk",
      auditNoEntries: "Henuz audit kaydi yok.",

      releasesVersion: "Versiyon",
      releasesPlatform: "Platformu",
      releasesDownloadUrl: "Indirme URL'si",
      releasesNotes: "Notlar",
      releasesMarkLatest: "En guncel olarak isaretle",
      releasesAddRelease: "Surum ekle",
      releasesUpdate: "Guncelle",
      releasesDeleteRelease: "Surumu sil",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "Neler yeni...",
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
      now: "зараз",
      loading: "Завантаження…",
      save: "Зберегти",
      saving: "Збереження…",
      thinking: "Думає…",
      generating: "Генерує…",
      testing: "Тестування…",
      connected: "Підключено",
      cancel: "Скасувати",
      close: "Закрити",
      featureComingSoonDescription: "Цю функцію буде увімкнено незабаром.",
      proPerks: "Переваги Pro",
      desktopOnlyTitle: "Лише desktop",
      desktopOnlyMessage: "Цей розділ доступний лише в застосунку RoxStreamAI Desktop.",
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
      cookies: "Кукі",
    },
    auth: {
      welcomeBack: "З поверненням",
      createAccount: "Створити акаунт",
      resetPassword: "Скинути пароль",
      email: "E-mail",
      password: "Пароль",
      newPassword: "Новий пароль",
      emailPlaceholder: "vy@kompanii.ua",
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
      systemToastsTitle: "Системні сповіщення",
      systemToastsSubtitle: "Останні оновлення з робочого простору.",
      startSession: "Почати сесію",
      upgradeRequired: "Потрібен апгрейд",
      quickActions: "Швидкі дії",
      createCharacter: "Створити персонажа",
      setupDonoRules: "Налаштувати Dono Rules",
      deploy: "Деплой",
      generateShareLink: "Згенерувати посилання",
      billing: "Білінг",
      billingSubtitle: "Керуйте тарифом, кредитами й адонами.",
      promoCodeLabel: "Промокод",
      promoCodePlaceholder: "Введіть промокод",
      promoCodeHelp:
        "Використайте реферальний код, щоб отримати бонусні години Active Speech після покупки.",
      referrals: "Реферали",
      referralProgramTitle: "Реферальна програма",
      referralProgramBody:
        "Поділіться промокодом, щоб отримати бонусні години Active Speech для себе та запрошених.",
      referralProgramManage: "Керувати рефералами",
      referralInviteSubtitle:
        "Запрошуйте авторів і отримуйте бонусні години Active Speech.",
      referralHowTitle: "Як працює",
      referralHowLine1:
        "Ті, хто використає ваш код, отримають бонусні години Active Speech після покупки.",
      referralHowLine2:
        "Starter: +1 година. Creator: +2 години. Pro: +5 годин. Studio: +10 годин. Scale: +20 годин.",
      referralHowLine3:
        "Кожні 3 відповідні покупки (Creator або вище) дають вам 4 години.",
      referralHowLine4:
        "Ви можете знову отримувати бонус 4 години за кожні наступні 3 покупки.",
      referralPromoTitle: "Ваш промокод",
      referralPromoPlaceholder: "Оберіть промокод",
      referralPromoCreate: "Створити код",
      referralPromoCopy: "Скопіювати реферальне посилання",
      referralBonusTitle: "Прогрес бонусу",
      referralBonusClaim: "Отримати бонус 4 години",
      referralBonusNeed: "Для бонусу потрібно 3 відповідні покупки.",
      referralRegistrationsTitle: "Реєстрації",
      referralPurchasesTitle: "Покупки",
      referralNoSignups: "Поки що немає реєстрацій.",
      referralNoPurchases: "Поки що немає покупок.",
      notifications: "Сповіщення",
      notificationsTitle: "Сповіщення",
      notificationsSubtitle: "Використання, бонуси та оновлення білінгу.",
      notificationsMarkAll: "Позначити все як прочитане",
      notificationsEmpty: "Поки що немає сповіщень.",
      notificationsMarkRead: "Позначити як прочитане",
      currentPlan: "Поточний тариф",
      managePlan: "Керування тарифом і лімітами.",
      comparePlans: "Порівняти тарифи",
      contactSales: "Зв'язатися з відділом продажів",
      remainingHours: "Залишок активних годин",
      unlimitedHours: "Безлімітні активні години (BYOK).",
      billingSummary: "Зведення",
      nextInvoice: "Наступний рахунок: 26 лют 2026",
      trialEnded: "Тріал завершено",
      trialEndsIn: "Тріал завершиться через {days} днів",
      connectors: "Коннектори",
      connectorsSubtitle:
        "Підключіть TikTok сьогодні. Twitch і YouTube далі.",
      connectorsTiktokDescription:
        "Конектори налаштовуються через десктопний компаньйон. Цей дашборд покаже статус, коли API конекторів увімкнено.",
      connectorsConnectTiktok: "Підключити TikTok",
      connectorsOpenSetupGuide: "Відкрити гайд з налаштування",
      connectorsJoinWaitlist:
        "Долучитися до листа очікування для раннього доступу.",
      connectorsEarlyAccessNote:
        "Ранній доступ спочатку для Pro і Studio.",
      connectorsMultiAccountTitle: "Планувальник кількох акаунтів",
      connectorsMultiAccountDescription:
        "Доступно в Pro+. Ротація кількох акаунтів за правилами розкладу.",
      connectorsMultiAccountBody:
        "Цей модуль у превʼю. Після увімкнення ви зможете ротувати акаунти за розкладом і лімітами використання.",
      connectorsExampleRotationWindow:
        "Приклад: вікно ротації — кожні 4 години",
      connectorsExampleMaxSessionsPerDay:
        "Приклад: максимум сесій на день — 3",
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
      characterEditorTitle: "3D редактор персонажа",
      characterEditorEnabledNote:
        "Інтеграцію редактора Polyphoria увімкнено (у розробці).",
      characterEditorComingSoonNote:
        "Незабаром: вбудований 3D редактор на базі Polyphoria.",
      characterEditorSectionTitle: "Редактор",
      characterEditorEnabledDescription:
        "Тут зʼявиться вбудований редактор. Поки використовуйте Конструктор персонажа для персони та голосу.",
      characterEditorWaitlistDescription:
        "Долучіться до листа очікування для раннього доступу.",
      polyphoriaModalDescription:
        "Готуємо інтеграцію редактора персонажа в застосунку. Наразі можна імпортувати MetaHuman або використовувати вашу існуючу сцену Unreal.",
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
      localRuntime: "Локальний рантайм",
      diagnostics: "Діагностика",

      unrealHubSubtitle:
        "Гайди для вашого workflow RoxStreamAI → Unreal. Runtime Connector у превʼю.",
      unrealGettingStartedTitle: "Початок роботи",
      unrealGettingStartedDescription:
        "Оберіть один із шляхів налаштування нижче. Якщо у вас уже є проєкт Unreal, почніть з ручного налаштування.",
      unrealImportMetahumanTitle: "Як імпортувати MetaHuman",
      unrealLiveLinkFaceTitle: "Live Link Face (архів)",
      unrealManualSetupTitle: "Ручне налаштування Unreal",
      unrealRuntimeConnectorTitle: "Runtime Connector Unreal",
      unrealOpenRuntimeConnectorButton:
        "Відкрити Runtime Connector ({comingSoon})",
      unrealBackToHubButton: "Назад до Unreal-хабу",
      unrealOpenDocsButton: "Відкрити документацію Unreal",

      billingCurrentPlanCheck: "Поточний план \u2713",
      billingUpgrade: "Підвищити",
      billingUpgradeNote: "Без повернення за поточний період",
      billingDowngrade: "Понизити",
      billingDowngradeNote: "Набуде чинності в наступному розрахунковому періоді",
      billingSubscribe: "Підписатися",

      billingSuccessTitle: "Платіж отримано",
      billingSuccessVerifying: "Перевіряємо платіж...",
      billingSuccessProcessing:
        "Ми все ще обробляємо ваш платіж. Будь ласка, оновіть пізніше.",
      billingSuccessConfirmedRedirecting: "Платіж підтверджено. Перенаправляємо...",
      billingSuccessGoToDashboard: "До дашборду",

      characterBuilderLiveNote: "Тестування Brain + Voice активне.",
      characterBuilderDraft: "Чернетка",
      characterBuilderProfileTitle: "Профіль",
      characterBuilderCharacterNamePlaceholder: "Ім'я персонажа",
      characterBuilderPrimaryLanguagePlaceholder: "Основна мова (en/ru)",
      characterBuilderBioPlaceholder: "Персона і настанови щодо тону",
      characterBuilderVoiceTitle: "Голос",
      characterBuilderVoiceProviderLabel: "Постачальник голосу",
      characterBuilderVoiceProviderOpenAIIncluded: "OpenAI (включено)",
      characterBuilderVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, власний ключ)",
      characterBuilderVoiceIdLabel: "Пресет голосу / Voice ID",
      characterBuilderVoiceIdPlaceholderElevenLabs: "ID голосу ElevenLabs",
      characterBuilderVoiceIdPlaceholderOpenAI: "alloy",
      characterBuilderTestVoice: "Тест голосу",
      characterBuilderTestResponseTitle: "Тест відповіді",
      characterBuilderTestResponseDescription:
        "Викликає brain-провайдера воркспейса та застосовує персону персонажа.",
      characterBuilderTestResponse: "Тест відповіді",
      characterBuilderReplyLabel: "Відповідь",
      characterBuilderNotesTitle: "Нотатки",
      characterBuilderNotesDescription:
        "Налаштуйте значення за замовчуванням у Налаштування → AI Providers.",
      characterBuilderNoWorkspaceConfigured: "Робочий простір не налаштовано.",
      characterBuilderNotFound: "Персонажа не знайдено.",
      characterBuilderTestResponseFailed: "Тест відповіді не вдався.",
      characterBuilderTestVoiceFailed: "Тест голосу не вдався.",
      characterBuilderDefaultUserMessage: "Привіт! Дай коротке, веселе привітання.",

      aiProvidersTitle: "AI провайдери",
      aiProvidersSubtitle:
        "Налаштуйте brain + voice для воркспейса. Ключі зберігаються на сервері.",
      aiProvidersLoadFailed: "Не вдалося завантажити налаштування AI.",
      aiProvidersSaveFailed: "Не вдалося зберегти налаштування.",
      aiProvidersSaveKeyFailed: "Не вдалося зберегти ключ.",
      aiProvidersRemoveKeyFailed: "Не вдалося видалити ключ.",
      aiProvidersKeySaved: "Ключ збережено.",
      aiProvidersKeyRemoved: "Ключ видалено.",
      aiProvidersBrainTestFailed: "Тест brain не вдався.",
      aiProvidersVoiceTestFailed: "Тест голосу не вдався.",
      aiProvidersBrainProviderLabel: "Провайдер brain",
      aiProvidersBrainProviderHelp:
        "Інші провайдери показані для видимості, але поки недоступні. Зараз застосунок працює на OpenAI.",
      aiProvidersBrainModelLabel: "Модель brain",
      aiProvidersCostEstimatorTitle: "Оцінка вартості ({comingSoon})",
      aiProvidersCostEstimatorBody:
        "Ми додамо вбудований калькулятор, коли з'являться додаткові провайдери (токени, голосові персонажі та прогноз витрат). Наразі голос OpenAI включено, а BYOK-провайдери виставляють рахунки напряму.",
      aiProvidersVoiceProviderLabel: "Постачальник голосу",
      aiProvidersVoiceProviderOpenAIIncluded: "OpenAI (включено)",
      aiProvidersVoiceProviderElevenLabsByok: "ElevenLabs (BYOK, власний ключ)",
      aiProvidersVoiceProviderElevenLabsNeedsKey:
        "Додайте нижче ключ ElevenLabs, щоб користуватися цим провайдером.",
      aiProvidersVoiceIdLabel: "Пресет голосу / Voice ID",
      aiProvidersVoiceIdPlaceholderElevenLabs: "ID голосу ElevenLabs",
      aiProvidersSaveButton: "Зберегти налаштування AI",
      aiProvidersTestBrainButton: "Тестувати brain",
      aiProvidersTestVoiceButton: "Тестувати голос",
      aiProvidersTestBrainResponseLabel: "Тестова відповідь brain",
      aiProvidersApiKeysTitle: "API-ключі (BYOK)",
      aiProvidersOpenAiKeyLabel: "OpenAI API key (опційно)",
      aiProvidersElevenLabsKeyLabel: "API ключ ElevenLabs",
      aiProvidersSaveKeyButton: "Зберегти ключ",
      aiProvidersReplaceKeyButton: "Замінити ключ",
      aiProvidersRemoveKeyButton: "Видалити ключ",
      aiProvidersKeysNotReturnedNote:
        "Ключі ніколи не повертаються в браузер. UI показує лише “{connected}”.",

      settingsPageTitle: "Налаштування",
      settingsProfileTitle: "Профіль",
      settingsDisplayNameLabel: "Ім'я для відображення",
      settingsDisplayNameRequired: "Ім'я для відображення обов'язкове.",
      settingsUsernameOptionalLabel: "Ім'я користувача (опційно)",
      settingsNoProfileFound: "Профіль не знайдено.",
      settingsWorkspaceTitle: "Воркспейс",
      settingsNoWorkspaceFound: "Воркспейс не знайдено.",
      settingsSignOutTitle: "Вийти",
      settingsSignOutDescription: "Вийти з акаунта на цьому пристрої.",

      unrealExportButton: "Експорт для Unreal",
      unrealExportTitle: "Експорт для Unreal",
      unrealExportDescription:
        "Згенеруйте JSON-конфіг, який можна використати для ручного налаштування Unreal сьогодні і для Runtime Connector пізніше.",
      unrealExportIncludeDonoRules: "Включити правила Dono",
      unrealExportIncludeScripts: "Включити скрипти",
      unrealExportIncludeScenes: "Включити сцени",
      unrealExportFailed: "Помилка експорту.",
      unrealExportSavedTo: "Збережено до: {path}",
      unrealExportGenerateDownload: "Згенерувати + завантажити",
      unrealExportFile: "Файл: {filename}",
    },
    admin: {
      label: "Адмін",
      navOverview: "Огляд",
      navUsers: "Користувачі",
      navPricing: "Тарифи",
      navContent: "Контент",
      navLeads: "Ліди",
      navAudit: "Аудит",
      navReleases: "Релізи",
      dashboardLink: "Кабінет",

      overviewTitle: "Огляд центру керування",
      overviewSubtitle:
        "Ключові підсумки щодо користувачів, воркспейсів, білінгу та використання.",
      totalUsers: "Всього користувачів",
      totalUsersHelp: "Профілі, створені в Supabase.",
      workspaces: "Воркспейси",
      workspacesHelp: "Загальна кількість воркспейсів у всіх користувачів.",
      activeSubscriptions: "Активні підписки",
      activeSubscriptionsHelp: "Рядки billing_state зі статусом active.",
      usageEvents24h: "Події використання (24 год)",
      usageEvents24hHelp: "Події, отримані за останні 24 години.",
      releasesCount: "Релізи",
      releasesCountHelp: "Десктопні збірки доступні для завантаження.",

      usersTitle: "Керування доступом",
      usersSubtitle: "Оновіть роль і тариф користувача.",
      tableEmail: "Email",
      tableRole: "Роль",
      tablePlan: "Тариф",
      tableCreated: "Створено",
      tableSave: "Зберегти",
      buttonSave: "Зберегти",
      roleUser: "Користувач",
      roleAdmin: "Адмін",
      planTrial: "Тріал",
      planPro: "Pro",
      planStudio: "Studio",
      planEnterprise: "Enterprise",

      pricingTitle: "CMS тарифів",
      pricingSubtitle:
        "Редагуйте версіоновану конфігурацію тарифів і публікуйте активну версію.",
      contentTitle: "CMS маркетингу",
      contentSubtitle:
        "Редагуйте маркетинговий текст через markdown-блоки. Сторінки підтягуються за ключем з фолбеками.",
      leadsTitle: "Лист очікування і контакти",
      leadsSubtitle: "Переглядайте ліди та експортуйте CSV.",
      auditTitle: "Логи адмін-аудиту",
      auditSubtitle:
        "Нещодавні дії адміна щодо користувачів, тарифів, контенту та лідів.",
      releasesTitle: "Релізи",

      errorUnknown: "Невідома помилка",
      buttonRefresh: "Оновити",
      buttonPublish: "Опублікувати",
      buttonNew: "Новий",
      buttonExportCsv: "Експорт CSV",

      statusActive: "Активний",
      statusDraft: "Чернетка",
      statusPublished: "Опубліковано",

      pricingVersions: "Версії",
      pricingNoVersions: "Поки що немає версій.",
      pricingEditor: "Редактор",
      pricingEditingVersion: "Редагування v{version}",
      pricingSelectVersion: "Оберіть версію",
      pricingRawJsonAdvanced: "Raw JSON (для просунутих)",
      pricingYearlyDiscountPct: "Річна знижка (%)",
      pricingDefaultTalkRatio: "Talk ratio за замовчуванням",
      pricingMinTalkRatio: "Мінімальний talk ratio",
      pricingMaxTalkRatio: "Максимальний talk ratio",
      pricingTooltipText: "Текст підказки",
      pricingPlans: "Тарифи",
      pricingTablePlan: "Тариф",
      pricingTableMonthlyEur: "Місяць (€)",
      pricingTableEntitlementsJson: "Entitlements (JSON)",
      pricingPlaceholderMonthlyEur: "наприклад 19.99",
      pricingPlaceholderEntitlementsJson: "{\n  \"max_characters\": 1,\n  \"...\": \"...\"\n}",
      pricingTipValidation:
        "Порада: збереження запускає валідацію схеми на сервері.",

      contentSearchPlaceholder: "Пошук ключів або тексту…",
      contentNoBlocks: "Поки немає блоків контенту.",
      contentSelectBlock: "Оберіть блок",
      contentSelectBlockError: "Оберіть блок для редагування",
      contentMarkdown: "Markdown",
      contentPreview: "Превʼю",
      contentMarkdownPlaceholder: "# Заголовок\n\nВаш контент…",

      leadsWaitlist: "Лист очікування",
      leadsContact: "Контакти",
      leadsInvestors: "Інвестори",
      leadsShowingRows: "Показано рядків: {count}",
      leadsNoLeads: "Лідів поки немає.",

      auditFilterActionPlaceholder: "Фільтр за action…",
      auditFilterTargetTypePlaceholder: "Фільтр за target_type…",
      auditShowingEntries: "Показано записів: {count}",
      auditTime: "Час",
      auditAction: "Дія",
      auditTarget: "Ціль",
      auditPayload: "Payload",
      auditNoEntries: "Записів аудиту поки немає.",

      releasesVersion: "Версія",
      releasesPlatform: "Платформа",
      releasesDownloadUrl: "Посилання на завантаження",
      releasesNotes: "Нотатки",
      releasesMarkLatest: "Позначити як latest",
      releasesAddRelease: "Додати реліз",
      releasesUpdate: "Оновити",
      releasesDeleteRelease: "Видалити реліз",
      releasesPlatformWindows: "Windows",
      releasesPlatformMac: "macOS",
      releasesPlaceholderVersion: "1.0.0",
      releasesPlaceholderUrl: "https://...",
      releasesPlaceholderNotes: "Що нового...",
    },
  },
};
