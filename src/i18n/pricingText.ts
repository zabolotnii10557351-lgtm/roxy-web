import type { Locale } from "@/i18n/locales";

export type PricingText = {
  monthly: string;
  yearly: string;
  billedYearlySave: string;
  contactSales: string;
  perMonth: string;
  billedYearly: string;
  subscribe: string;
  redirecting: string;
  checkoutFailed: string;
  trialBadge: string;
  trialNote: string;
  estimatedStreamHours: string;
  includesActiveSpeech: string;
  whatsIncluded: string;
  activeSpeechLabel: string;
  activeSpeechDescription: string;
  comparePlans: string;
  comparePlansSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  howUsageWorks: string;
  howUsageWorksBody: string;
  saveBadge: string;
  enterpriseCustomLimits: string;
  enterpriseInvoicing: string;
  enterpriseCompliance: string;
  enterpriseSla: string;
  characterCount: string;
  concurrentStreamCount: string;
  linkedAccountCount: string;
  includedSpeechHours: string;
  streamEstimate: string;
  desktopApp: string;
  tiktokIntegrations: string;
  byokSupport: string;
  featureLabel: string;
  usageGroup: string;
  limitsGroup: string;
  automationGroup: string;
  brandingGroup: string;
  activeSpeechIncluded: string;
  estimatedStreamHoursAtRatio: string;
  byokElevenLabs: string;
  characters: string;
  concurrentStreams: string;
  linkedAccounts: string;
  scenes: string;
  scheduler: string;
  donoRules: string;
  streamScripts: string;
  removeWatermark: string;
  yes: string;
  no: string;
  custom: string;
  show: string;
  hide: string;
  talkRatio: string;
  talkRatioDescription: string;
  howWeEstimate: string;
  current: string;
  talkRatioTip: string;
  faqActiveSpeechQ: string;
  faqActiveSpeechA: string;
  faqByokQ: string;
  faqByokA: string;
  faqEstimateQ: string;
  faqEstimateA: string;
  faqChangePlanQ: string;
  faqChangePlanA: string;
  faqYearlyQ: string;
  faqYearlyA: string;
  faqHigherLimitsQ: string;
  faqHigherLimitsA: string;
};

const en: PricingText = {
  monthly: "Monthly",
  yearly: "Yearly",
  billedYearlySave: "Billed yearly. Save up to {0}%.",
  contactSales: "Contact sales",
  perMonth: "/ month",
  billedYearly: "billed yearly",
  subscribe: "Subscribe",
  redirecting: "Redirecting...",
  checkoutFailed: "Checkout failed",
  trialBadge: "7-day trial",
  trialNote: "7-day trial included. No separate trial plan.",
  estimatedStreamHours: "Estimated stream hours",
  includesActiveSpeech: "Includes {0}h active speech (OpenAI)",
  whatsIncluded: "What's included",
  activeSpeechLabel: "What counts as Active Speech",
  activeSpeechDescription:
    "Active Speech is the time the AI is actually speaking. Silence/idle time doesn't count.",
  comparePlans: "Compare plans",
  comparePlansSubtitle:
    "Stream hours are estimates. We always meter real usage by Active Speech.",
  faqTitle: "Pricing FAQ",
  faqSubtitle: "Common questions, answered.",
  howUsageWorks: "How usage works",
  howUsageWorksBody:
    "Active Speech is the time the AI actually talks on stream. The dashboard converts your settings into estimated stream hours based on your talk ratio. If you use built-in providers, RoxStreamAI covers provider costs up to your plan quota. If you use BYOK, you pay the provider directly and RoxStreamAI tracks usage.",
  saveBadge: "Save {0}%",
  enterpriseCustomLimits: "Custom limits and onboarding",
  enterpriseInvoicing: "Invoicing and procurement support",
  enterpriseCompliance: "Security and compliance review",
  enterpriseSla: "SLA options",
  characterCount: "{0} character(s)",
  concurrentStreamCount: "{0} concurrent stream(s)",
  linkedAccountCount: "{0} linked account(s)",
  includedSpeechHours: "Includes {0}h Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h stream at {1}% talk ratio",
  desktopApp: "Desktop companion app (local integrations)",
  tiktokIntegrations: "TikTok Live + OBS WebSocket integrations",
  byokSupport: "BYOK support for compatible providers",
  featureLabel: "Feature",
  usageGroup: "Usage",
  limitsGroup: "Limits",
  automationGroup: "Automation",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech included (OpenAI)",
  estimatedStreamHoursAtRatio: "Estimated stream hours (at talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Characters",
  concurrentStreams: "Concurrent streams",
  linkedAccounts: "Linked accounts",
  scenes: "Scenes",
  scheduler: "Scheduler",
  donoRules: "Dono rules",
  streamScripts: "Stream scripts",
  removeWatermark: "Remove watermark",
  yes: "Yes",
  no: "No",
  custom: "Custom",
  show: "Show",
  hide: "Hide",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Choose how much of your stream time is active speech.",
  howWeEstimate: "How we estimate",
  current: "Current",
  talkRatioTip:
    "Tip: 20% is a good starting point for most talk-heavy streams.",
  faqActiveSpeechQ: "What is Active Speech?",
  faqActiveSpeechA:
    "Active Speech is the time the AI is actually speaking on stream. Silence and idle time don't count.",
  faqByokQ:
    "What's the difference between included providers and BYOK?",
  faqByokA:
    "Included providers are covered up to your plan's Active Speech quota. With BYOK, you bring your own provider keys and you pay that provider directly; RoxStreamAI still tracks Active Speech for your limits.",
  faqEstimateQ: "Why do you show estimated stream hours?",
  faqEstimateA:
    "Stream hours depend on how talk-heavy your stream is. The talk ratio slider helps you translate Active Speech into a realistic stream-hour estimate.",
  faqChangePlanQ: "Can I change plans later?",
  faqChangePlanA:
    "Yes. You can upgrade at any time. Downgrades take effect on the next billing cycle.",
  faqYearlyQ: "Do you offer yearly billing?",
  faqYearlyA: "Yes. Yearly billing saves up to {0}% compared to monthly.",
  faqHigherLimitsQ: "Need higher limits or invoicing?",
  faqHigherLimitsA:
    "Choose Enterprise to get custom limits, onboarding, and invoicing support.",
};

const cs: PricingText = {
  ...en,
  monthly: "Měsíční",
  yearly: "Roční",
  billedYearlySave: "Roční fakturace. Ušetřete až {0} %.",
  contactSales: "Kontaktovat obchod",
  perMonth: "/ měsíc",
  billedYearly: "roční fakturace",
  subscribe: "Předplatit",
  redirecting: "Přesměrování…",
  checkoutFailed: "Platba se nezdařila",
  trialBadge: "7denní zkušební verze",
  trialNote: "7denní zkušební verze je součástí. Žádný samostatný zkušební tarif.",
  estimatedStreamHours: "Odhadované hodiny streamování",
  includesActiveSpeech: "Zahrnuje {0}h Active Speech (OpenAI)",
  whatsIncluded: "Co je zahrnuto",
  activeSpeechLabel: "Co se počítá jako Active Speech",
  activeSpeechDescription:
    "Active Speech je čas, kdy AI skutečně mluví. Ticho a nečinnost se nepočítají.",
  comparePlans: "Porovnat tarify",
  comparePlansSubtitle:
    "Hodiny streamování jsou odhady. Vždy měříme skutečné využití podle Active Speech.",
  faqTitle: "Často kladené dotazy k cenám",
  faqSubtitle: "Časté otázky, zodpovězené.",
  howUsageWorks: "Jak funguje měření spotřeby",
  howUsageWorksBody:
    "Active Speech je čas, kdy AI skutečně mluví na streamu. Dashboard převádí vaše nastavení na odhadované hodiny streamování na základě talk ratio. Pokud používáte vestavěné poskytovatele, RoxStreamAI pokrývá náklady na poskytovatele v rámci kvóty vašeho tarifu. Pokud používáte BYOK, platíte poskytovateli přímo a RoxStreamAI sleduje využití.",
  saveBadge: "Ušetřete {0} %",
  enterpriseCustomLimits: "Vlastní limity a onboarding",
  enterpriseInvoicing: "Fakturace a podpora nákupu",
  enterpriseCompliance: "Bezpečnostní a compliance kontrola",
  enterpriseSla: "Možnosti SLA",
  characterCount: "{0} postav(a)",
  concurrentStreamCount: "{0} souběžný(ch) stream(ů)",
  linkedAccountCount: "{0} propojený(ch) účet(ů)",
  includedSpeechHours: "Zahrnuje {0}h Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h streamu při {1}% talk ratio",
  desktopApp: "Desktop companion aplikace (lokální integrace)",
  tiktokIntegrations: "TikTok Live + OBS WebSocket integrace",
  byokSupport: "BYOK podpora pro kompatibilní poskytovatele",
  featureLabel: "Funkce",
  usageGroup: "Spotřeba",
  limitsGroup: "Limity",
  automationGroup: "Automatizace",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech v ceně (OpenAI)",
  estimatedStreamHoursAtRatio: "Odhadované hodiny streamování (dle talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Postavy",
  concurrentStreams: "Souběžné streamy",
  linkedAccounts: "Propojené účty",
  scenes: "Scény",
  scheduler: "Plánovač",
  donoRules: "Pravidla donací",
  streamScripts: "Skripty streamu",
  removeWatermark: "Odstranit vodoznak",
  yes: "Ano",
  no: "Ne",
  custom: "Na míru",
  show: "Zobrazit",
  hide: "Skrýt",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Zvolte, jaký podíl streamu tvoří aktivní řeč.",
  howWeEstimate: "Jak odhadujeme",
  current: "Aktuální",
  talkRatioTip:
    "Tip: 20 % je dobrý výchozí bod pro většinu konverzačních streamů.",
  faqActiveSpeechQ: "Co je Active Speech?",
  faqActiveSpeechA:
    "Active Speech je čas, kdy AI skutečně mluví na streamu. Ticho a nečinnost se nepočítají.",
  faqByokQ: "Jaký je rozdíl mezi zahrnutými poskytovateli a BYOK?",
  faqByokA:
    "Zahrnutí poskytovatelé jsou hrazeni v rámci kvóty Active Speech vašeho tarifu. S BYOK používáte vlastní klíče a platíte poskytovateli přímo; RoxStreamAI stále sleduje Active Speech pro vaše limity.",
  faqEstimateQ: "Proč zobrazujete odhadované hodiny streamování?",
  faqEstimateA:
    "Hodiny streamování závisí na tom, jak moc je váš stream konverzační. Posuvník talk ratio vám pomůže převést Active Speech na realistický odhad hodin streamování.",
  faqChangePlanQ: "Mohu tarif změnit později?",
  faqChangePlanA:
    "Ano. Upgrade je možný kdykoliv. Downgrade se projeví v dalším fakturačním období.",
  faqYearlyQ: "Nabízíte roční fakturaci?",
  faqYearlyA: "Ano. Roční fakturace ušetří až {0} % oproti měsíční.",
  faqHigherLimitsQ: "Potřebujete vyšší limity nebo fakturaci?",
  faqHigherLimitsA:
    "Zvolte Enterprise pro vlastní limity, onboarding a fakturační podporu.",
};

const de: PricingText = {
  ...en,
  monthly: "Monatlich",
  yearly: "Jährlich",
  billedYearlySave: "Jährliche Abrechnung. Spare bis zu {0} %.",
  contactSales: "Vertrieb kontaktieren",
  perMonth: "/ Monat",
  billedYearly: "jährliche Abrechnung",
  subscribe: "Abonnieren",
  redirecting: "Weiterleitung…",
  checkoutFailed: "Bezahlung fehlgeschlagen",
  trialBadge: "7-Tage-Testphase",
  trialNote: "7-Tage-Testphase inklusive. Kein separater Testtarif.",
  estimatedStreamHours: "Geschätzte Stream-Stunden",
  includesActiveSpeech: "Enthält {0}h Active Speech (OpenAI)",
  whatsIncluded: "Was enthalten ist",
  activeSpeechLabel: "Was zählt als Active Speech",
  activeSpeechDescription:
    "Active Speech ist die Zeit, in der die KI tatsächlich spricht. Stille und Leerlauf zählen nicht.",
  comparePlans: "Tarife vergleichen",
  comparePlansSubtitle:
    "Stream-Stunden sind Schätzungen. Die Abrechnung erfolgt immer nach tatsächlicher Active Speech.",
  faqTitle: "FAQ zu den Preisen",
  faqSubtitle: "Häufige Fragen, beantwortet.",
  howUsageWorks: "Wie die Nutzung funktioniert",
  howUsageWorksBody:
    "Active Speech ist die Zeit, in der die KI tatsächlich im Stream spricht. Das Dashboard rechnet deine Einstellungen anhand des talk ratio in geschätzte Stream-Stunden um. Wenn du integrierte Anbieter nutzt, übernimmt RoxStreamAI die Anbieterkosten bis zum Kontingent deines Tarifs. Bei BYOK zahlst du den Anbieter direkt und RoxStreamAI erfasst die Nutzung.",
  saveBadge: "Spare {0} %",
  enterpriseCustomLimits: "Individuelle Limits und Onboarding",
  enterpriseInvoicing: "Rechnungsstellung und Beschaffungsunterstützung",
  enterpriseCompliance: "Sicherheits- und Compliance-Prüfung",
  enterpriseSla: "SLA-Optionen",
  characterCount: "{0} Charakter(e)",
  concurrentStreamCount: "{0} gleichzeitige(r) Stream(s)",
  linkedAccountCount: "{0} verknüpfte(s) Konto/Konten",
  includedSpeechHours: "Enthält {0}h Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h Stream bei {1} % talk ratio",
  desktopApp: "Desktop-Companion-App (lokale Integrationen)",
  tiktokIntegrations: "TikTok Live + OBS WebSocket Integrationen",
  byokSupport: "BYOK-Unterstützung für kompatible Anbieter",
  featureLabel: "Funktion",
  usageGroup: "Nutzung",
  limitsGroup: "Limits",
  automationGroup: "Automatisierung",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech inklusive (OpenAI)",
  estimatedStreamHoursAtRatio: "Geschätzte Stream-Stunden (bei talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Charaktere",
  concurrentStreams: "Gleichzeitige Streams",
  linkedAccounts: "Verknüpfte Konten",
  scenes: "Szenen",
  scheduler: "Planer",
  donoRules: "Dono-Regeln",
  streamScripts: "Stream-Skripte",
  removeWatermark: "Wasserzeichen entfernen",
  yes: "Ja",
  no: "Nein",
  custom: "Individuell",
  show: "Anzeigen",
  hide: "Ausblenden",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Wähle, wie viel deiner Stream-Zeit aus aktiver Sprache besteht.",
  howWeEstimate: "Wie wir schätzen",
  current: "Aktuell",
  talkRatioTip:
    "Tipp: 20 % ist ein guter Ausgangspunkt für gesprächsintensive Streams.",
  faqActiveSpeechQ: "Was ist Active Speech?",
  faqActiveSpeechA:
    "Active Speech ist die Zeit, in der die KI tatsächlich im Stream spricht. Stille und Leerlauf zählen nicht.",
  faqByokQ:
    "Was ist der Unterschied zwischen integrierten Anbietern und BYOK?",
  faqByokA:
    "Integrierte Anbieter sind bis zum Active-Speech-Kontingent deines Tarifs abgedeckt. Bei BYOK nutzt du eigene Schlüssel und zahlst den Anbieter direkt; RoxStreamAI erfasst weiterhin Active Speech für deine Limits.",
  faqEstimateQ: "Warum zeigt ihr geschätzte Stream-Stunden an?",
  faqEstimateA:
    "Stream-Stunden hängen davon ab, wie gesprächsintensiv dein Stream ist. Der talk-ratio-Schieberegler hilft dir, Active Speech in eine realistische Schätzung der Stream-Stunden umzurechnen.",
  faqChangePlanQ: "Kann ich den Tarif später wechseln?",
  faqChangePlanA:
    "Ja. Du kannst jederzeit upgraden. Downgrades werden ab dem nächsten Abrechnungszeitraum wirksam.",
  faqYearlyQ: "Bietet ihr jährliche Abrechnung an?",
  faqYearlyA:
    "Ja. Jährliche Abrechnung spart bis zu {0} % gegenüber monatlicher.",
  faqHigherLimitsQ: "Höhere Limits oder Rechnungsstellung nötig?",
  faqHigherLimitsA:
    "Wähle Enterprise für individuelle Limits, Onboarding und Rechnungsunterstützung.",
};

const es: PricingText = {
  ...en,
  monthly: "Mensual",
  yearly: "Anual",
  billedYearlySave: "Facturación anual. Ahorra hasta un {0} %.",
  contactSales: "Contactar ventas",
  perMonth: "/ mes",
  billedYearly: "facturación anual",
  subscribe: "Suscribirse",
  redirecting: "Redirigiendo…",
  checkoutFailed: "Error en el pago",
  trialBadge: "Prueba de 7 días",
  trialNote: "Prueba de 7 días incluida. No hay plan de prueba separado.",
  estimatedStreamHours: "Horas de stream estimadas",
  includesActiveSpeech: "Incluye {0}h de Active Speech (OpenAI)",
  whatsIncluded: "Qué incluye",
  activeSpeechLabel: "Qué cuenta como Active Speech",
  activeSpeechDescription:
    "Active Speech es el tiempo en que la IA está hablando. El silencio y la inactividad no cuentan.",
  comparePlans: "Comparar planes",
  comparePlansSubtitle:
    "Las horas de stream son estimaciones. Siempre medimos el uso real por Active Speech.",
  faqTitle: "Preguntas frecuentes sobre precios",
  faqSubtitle: "Preguntas comunes, respondidas.",
  howUsageWorks: "Cómo funciona el consumo",
  howUsageWorksBody:
    "Active Speech es el tiempo en que la IA habla en el stream. El dashboard convierte tu configuración en horas de stream estimadas según tu talk ratio. Si usas proveedores integrados, RoxStreamAI cubre los costes del proveedor hasta la cuota de tu plan. Si usas BYOK, pagas al proveedor directamente y RoxStreamAI registra el uso.",
  saveBadge: "Ahorra {0} %",
  enterpriseCustomLimits: "Límites personalizados y onboarding",
  enterpriseInvoicing: "Facturación y soporte de compras",
  enterpriseCompliance: "Revisión de seguridad y compliance",
  enterpriseSla: "Opciones de SLA",
  characterCount: "{0} personaje(s)",
  concurrentStreamCount: "{0} stream(s) simultáneo(s)",
  linkedAccountCount: "{0} cuenta(s) vinculada(s)",
  includedSpeechHours: "Incluye {0}h de Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h de stream al {1} % de talk ratio",
  desktopApp: "Aplicación Desktop companion (integraciones locales)",
  tiktokIntegrations: "Integraciones TikTok Live + OBS WebSocket",
  byokSupport: "Soporte BYOK para proveedores compatibles",
  featureLabel: "Característica",
  usageGroup: "Consumo",
  limitsGroup: "Límites",
  automationGroup: "Automatización",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech incluido (OpenAI)",
  estimatedStreamHoursAtRatio:
    "Horas de stream estimadas (según talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Personajes",
  concurrentStreams: "Streams simultáneos",
  linkedAccounts: "Cuentas vinculadas",
  scenes: "Escenas",
  scheduler: "Programador",
  donoRules: "Reglas de donaciones",
  streamScripts: "Scripts de stream",
  removeWatermark: "Eliminar marca de agua",
  yes: "Sí",
  no: "No",
  custom: "Personalizado",
  show: "Mostrar",
  hide: "Ocultar",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Elige qué porcentaje de tu stream es habla activa.",
  howWeEstimate: "Cómo estimamos",
  current: "Actual",
  talkRatioTip:
    "Consejo: 20 % es un buen punto de partida para streams con mucha conversación.",
  faqActiveSpeechQ: "¿Qué es Active Speech?",
  faqActiveSpeechA:
    "Active Speech es el tiempo en que la IA está hablando en el stream. El silencio y la inactividad no cuentan.",
  faqByokQ:
    "¿Cuál es la diferencia entre proveedores incluidos y BYOK?",
  faqByokA:
    "Los proveedores incluidos están cubiertos hasta la cuota de Active Speech de tu plan. Con BYOK, usas tus propias claves y pagas al proveedor directamente; RoxStreamAI sigue registrando Active Speech para tus límites.",
  faqEstimateQ: "¿Por qué muestran horas de stream estimadas?",
  faqEstimateA:
    "Las horas de stream dependen de lo conversacional que sea tu stream. El deslizador de talk ratio te ayuda a traducir Active Speech en una estimación realista de horas de stream.",
  faqChangePlanQ: "¿Puedo cambiar de plan más adelante?",
  faqChangePlanA:
    "Sí. Puedes mejorar en cualquier momento. Las bajadas de plan se aplican en el siguiente ciclo de facturación.",
  faqYearlyQ: "¿Ofrecen facturación anual?",
  faqYearlyA:
    "Sí. La facturación anual ahorra hasta un {0} % respecto a la mensual.",
  faqHigherLimitsQ: "¿Necesitas más límites o facturación?",
  faqHigherLimitsA:
    "Elige Enterprise para límites personalizados, onboarding y soporte de facturación.",
};

const fr: PricingText = {
  ...en,
  monthly: "Mensuel",
  yearly: "Annuel",
  billedYearlySave: "Facturation annuelle. Économisez jusqu'à {0} %.",
  contactSales: "Contacter les ventes",
  perMonth: "/ mois",
  billedYearly: "facturation annuelle",
  subscribe: "S'abonner",
  redirecting: "Redirection…",
  checkoutFailed: "Échec du paiement",
  trialBadge: "Essai de 7 jours",
  trialNote: "Essai de 7 jours inclus. Pas de plan d'essai séparé.",
  estimatedStreamHours: "Heures de stream estimées",
  includesActiveSpeech: "Inclut {0}h d'Active Speech (OpenAI)",
  whatsIncluded: "Ce qui est inclus",
  activeSpeechLabel: "Ce qui compte comme Active Speech",
  activeSpeechDescription:
    "Active Speech est le temps pendant lequel l'IA parle réellement. Le silence et l'inactivité ne comptent pas.",
  comparePlans: "Comparer les offres",
  comparePlansSubtitle:
    "Les heures de stream sont des estimations. Nous mesurons toujours l'utilisation réelle par Active Speech.",
  faqTitle: "FAQ tarifs",
  faqSubtitle: "Questions fréquentes, répondues.",
  howUsageWorks: "Comment fonctionne la consommation",
  howUsageWorksBody:
    "Active Speech est le temps pendant lequel l'IA parle réellement en stream. Le dashboard convertit vos paramètres en heures de stream estimées selon votre talk ratio. Si vous utilisez les fournisseurs intégrés, RoxStreamAI couvre les coûts jusqu'au quota de votre offre. Si vous utilisez BYOK, vous payez le fournisseur directement et RoxStreamAI suit votre consommation.",
  saveBadge: "Économisez {0} %",
  enterpriseCustomLimits: "Limites personnalisées et onboarding",
  enterpriseInvoicing: "Facturation et support achats",
  enterpriseCompliance: "Audit sécurité et compliance",
  enterpriseSla: "Options SLA",
  characterCount: "{0} personnage(s)",
  concurrentStreamCount: "{0} stream(s) simultané(s)",
  linkedAccountCount: "{0} compte(s) lié(s)",
  includedSpeechHours: "Inclut {0}h d'Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h de stream à {1} % de talk ratio",
  desktopApp: "Application Desktop companion (intégrations locales)",
  tiktokIntegrations: "Intégrations TikTok Live + OBS WebSocket",
  byokSupport: "Support BYOK pour les fournisseurs compatibles",
  featureLabel: "Fonctionnalité",
  usageGroup: "Consommation",
  limitsGroup: "Limites",
  automationGroup: "Automatisation",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech inclus (OpenAI)",
  estimatedStreamHoursAtRatio:
    "Heures de stream estimées (selon talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Personnages",
  concurrentStreams: "Streams simultanés",
  linkedAccounts: "Comptes liés",
  scenes: "Scènes",
  scheduler: "Planificateur",
  donoRules: "Règles de dons",
  streamScripts: "Scripts de stream",
  removeWatermark: "Supprimer le filigrane",
  yes: "Oui",
  no: "Non",
  custom: "Sur mesure",
  show: "Afficher",
  hide: "Masquer",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Choisissez quelle part de votre stream est de la parole active.",
  howWeEstimate: "Comment nous estimons",
  current: "Actuel",
  talkRatioTip:
    "Astuce : 20 % est un bon point de départ pour les streams très conversationnels.",
  faqActiveSpeechQ: "Qu'est-ce que l'Active Speech ?",
  faqActiveSpeechA:
    "Active Speech est le temps pendant lequel l'IA parle réellement en stream. Le silence et l'inactivité ne comptent pas.",
  faqByokQ:
    "Quelle est la différence entre les fournisseurs inclus et BYOK ?",
  faqByokA:
    "Les fournisseurs inclus sont couverts jusqu'au quota d'Active Speech de votre offre. Avec BYOK, vous utilisez vos propres clés et payez le fournisseur directement ; RoxStreamAI continue de suivre l'Active Speech pour vos limites.",
  faqEstimateQ: "Pourquoi affichez-vous des heures de stream estimées ?",
  faqEstimateA:
    "Les heures de stream dépendent du niveau de conversation de votre stream. Le curseur talk ratio vous aide à convertir l'Active Speech en une estimation réaliste d'heures de stream.",
  faqChangePlanQ: "Puis-je changer d'offre plus tard ?",
  faqChangePlanA:
    "Oui. Vous pouvez passer à une offre supérieure à tout moment. Les passages à une offre inférieure prennent effet au prochain cycle de facturation.",
  faqYearlyQ: "Proposez-vous une facturation annuelle ?",
  faqYearlyA:
    "Oui. La facturation annuelle permet d'économiser jusqu'à {0} % par rapport à la mensuelle.",
  faqHigherLimitsQ: "Besoin de limites plus élevées ou de facturation ?",
  faqHigherLimitsA:
    "Choisissez Enterprise pour des limites personnalisées, un onboarding et un support de facturation.",
};

const it: PricingText = {
  ...en,
  monthly: "Mensile",
  yearly: "Annuale",
  billedYearlySave: "Fatturazione annuale. Risparmia fino al {0} %.",
  contactSales: "Contatta le vendite",
  perMonth: "/ mese",
  billedYearly: "fatturazione annuale",
  subscribe: "Abbonati",
  redirecting: "Reindirizzamento…",
  checkoutFailed: "Pagamento non riuscito",
  trialBadge: "Prova di 7 giorni",
  trialNote: "Prova di 7 giorni inclusa. Nessun piano di prova separato.",
  estimatedStreamHours: "Ore di stream stimate",
  includesActiveSpeech: "Include {0}h di Active Speech (OpenAI)",
  whatsIncluded: "Cosa è incluso",
  activeSpeechLabel: "Cosa conta come Active Speech",
  activeSpeechDescription:
    "Active Speech è il tempo in cui l'IA sta effettivamente parlando. Il silenzio e l'inattività non contano.",
  comparePlans: "Confronta i piani",
  comparePlansSubtitle:
    "Le ore di stream sono stime. Misuriamo sempre il consumo reale tramite Active Speech.",
  faqTitle: "FAQ sui prezzi",
  faqSubtitle: "Domande frequenti, con risposta.",
  howUsageWorks: "Come funziona il consumo",
  howUsageWorksBody:
    "Active Speech è il tempo in cui l'IA parla effettivamente in stream. La dashboard converte le tue impostazioni in ore di stream stimate in base al tuo talk ratio. Se usi i provider integrati, RoxStreamAI copre i costi del provider fino alla quota del tuo piano. Se usi BYOK, paghi il provider direttamente e RoxStreamAI tiene traccia del consumo.",
  saveBadge: "Risparmia {0} %",
  enterpriseCustomLimits: "Limiti personalizzati e onboarding",
  enterpriseInvoicing: "Fatturazione e supporto acquisti",
  enterpriseCompliance: "Verifica sicurezza e compliance",
  enterpriseSla: "Opzioni SLA",
  characterCount: "{0} personaggio/i",
  concurrentStreamCount: "{0} stream simultaneo/i",
  linkedAccountCount: "{0} account collegato/i",
  includedSpeechHours: "Include {0}h di Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h di stream al {1} % di talk ratio",
  desktopApp: "App Desktop companion (integrazioni locali)",
  tiktokIntegrations: "Integrazioni TikTok Live + OBS WebSocket",
  byokSupport: "Supporto BYOK per provider compatibili",
  featureLabel: "Funzionalità",
  usageGroup: "Consumo",
  limitsGroup: "Limiti",
  automationGroup: "Automazione",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech incluso (OpenAI)",
  estimatedStreamHoursAtRatio: "Ore di stream stimate (per talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Personaggi",
  concurrentStreams: "Stream simultanei",
  linkedAccounts: "Account collegati",
  scenes: "Scene",
  scheduler: "Programmatore",
  donoRules: "Regole donazioni",
  streamScripts: "Script di stream",
  removeWatermark: "Rimuovi filigrana",
  yes: "Sì",
  no: "No",
  custom: "Personalizzato",
  show: "Mostra",
  hide: "Nascondi",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Scegli quanto del tuo tempo di stream è parlato attivo.",
  howWeEstimate: "Come stimiamo",
  current: "Attuale",
  talkRatioTip:
    "Consiglio: 20 % è un buon punto di partenza per gli stream con molta conversazione.",
  faqActiveSpeechQ: "Cos'è Active Speech?",
  faqActiveSpeechA:
    "Active Speech è il tempo in cui l'IA sta effettivamente parlando in stream. Il silenzio e l'inattività non contano.",
  faqByokQ:
    "Qual è la differenza tra provider inclusi e BYOK?",
  faqByokA:
    "I provider inclusi sono coperti fino alla quota di Active Speech del tuo piano. Con BYOK, usi le tue chiavi e paghi il provider direttamente; RoxStreamAI continua a tracciare Active Speech per i tuoi limiti.",
  faqEstimateQ: "Perché mostrate ore di stream stimate?",
  faqEstimateA:
    "Le ore di stream dipendono da quanto è conversazionale il tuo stream. Lo slider del talk ratio ti aiuta a tradurre Active Speech in una stima realistica delle ore di stream.",
  faqChangePlanQ: "Posso cambiare piano in seguito?",
  faqChangePlanA:
    "Sì. Puoi effettuare l'upgrade in qualsiasi momento. I downgrade hanno effetto dal prossimo ciclo di fatturazione.",
  faqYearlyQ: "Offrite fatturazione annuale?",
  faqYearlyA:
    "Sì. La fatturazione annuale fa risparmiare fino al {0} % rispetto a quella mensile.",
  faqHigherLimitsQ: "Servono limiti più alti o fatturazione?",
  faqHigherLimitsA:
    "Scegli Enterprise per limiti personalizzati, onboarding e supporto alla fatturazione.",
};

const pl: PricingText = {
  ...en,
  monthly: "Miesięczny",
  yearly: "Roczny",
  billedYearlySave: "Rozliczanie roczne. Oszczędź do {0}%.",
  contactSales: "Skontaktuj się z działem sprzedaży",
  perMonth: "/ miesiąc",
  billedYearly: "rozliczanie roczne",
  subscribe: "Subskrybuj",
  redirecting: "Przekierowanie…",
  checkoutFailed: "Płatność nie powiodła się",
  trialBadge: "7-dniowy okres próbny",
  trialNote: "7-dniowy okres próbny w zestawie. Brak osobnego planu próbnego.",
  estimatedStreamHours: "Szacowane godziny streamowania",
  includesActiveSpeech: "Zawiera {0}h Active Speech (OpenAI)",
  whatsIncluded: "Co jest zawarte",
  activeSpeechLabel: "Co liczy się jako Active Speech",
  activeSpeechDescription:
    "Active Speech to czas, w którym AI faktycznie mówi. Cisza i bezczynność się nie liczą.",
  comparePlans: "Porównaj plany",
  comparePlansSubtitle:
    "Godziny streamowania to szacunki. Zawsze mierzymy rzeczywiste użycie na podstawie Active Speech.",
  faqTitle: "FAQ cennikowe",
  faqSubtitle: "Najczęstsze pytania z odpowiedziami.",
  howUsageWorks: "Jak działa naliczanie",
  howUsageWorksBody:
    "Active Speech to czas, w którym AI faktycznie mówi na streamie. Dashboard przelicza Twoje ustawienia na szacowane godziny streamowania na podstawie talk ratio. Jeśli używasz wbudowanych dostawców, RoxStreamAI pokrywa koszty dostawcy do limitu Twojego planu. Przy BYOK płacisz dostawcy bezpośrednio, a RoxStreamAI śledzi zużycie.",
  saveBadge: "Oszczędź {0}%",
  enterpriseCustomLimits: "Niestandardowe limity i onboarding",
  enterpriseInvoicing: "Fakturowanie i obsługa zamówień",
  enterpriseCompliance: "Przegląd bezpieczeństwa i zgodności",
  enterpriseSla: "Opcje SLA",
  characterCount: "{0} postać/postaci",
  concurrentStreamCount: "{0} równoczesny(ch) stream(ów)",
  linkedAccountCount: "{0} połączone(ych) konto/kont",
  includedSpeechHours: "Zawiera {0}h Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h streamu przy {1}% talk ratio",
  desktopApp: "Aplikacja Desktop companion (lokalne integracje)",
  tiktokIntegrations: "Integracje TikTok Live + OBS WebSocket",
  byokSupport: "Wsparcie BYOK dla kompatybilnych dostawców",
  featureLabel: "Funkcja",
  usageGroup: "Użycie",
  limitsGroup: "Limity",
  automationGroup: "Automatyzacja",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech w zestawie (OpenAI)",
  estimatedStreamHoursAtRatio:
    "Szacowane godziny streamowania (wg talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Postacie",
  concurrentStreams: "Równoczesne streamy",
  linkedAccounts: "Połączone konta",
  scenes: "Sceny",
  scheduler: "Planista",
  donoRules: "Reguły donacji",
  streamScripts: "Skrypty streamu",
  removeWatermark: "Usuń znak wodny",
  yes: "Tak",
  no: "Nie",
  custom: "Indywidualny",
  show: "Pokaż",
  hide: "Ukryj",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Wybierz, jaka część Twojego streamu to aktywna mowa.",
  howWeEstimate: "Jak szacujemy",
  current: "Bieżący",
  talkRatioTip:
    "Wskazówka: 20% to dobry punkt wyjścia dla streamów z dużą ilością rozmów.",
  faqActiveSpeechQ: "Czym jest Active Speech?",
  faqActiveSpeechA:
    "Active Speech to czas, w którym AI faktycznie mówi na streamie. Cisza i bezczynność się nie liczą.",
  faqByokQ:
    "Jaka jest różnica między wbudowanymi dostawcami a BYOK?",
  faqByokA:
    "Wbudowani dostawcy są objęci limitem Active Speech Twojego planu. W trybie BYOK używasz własnych kluczy i płacisz dostawcy bezpośrednio; RoxStreamAI nadal śledzi Active Speech dla Twoich limitów.",
  faqEstimateQ: "Dlaczego pokazujecie szacowane godziny streamowania?",
  faqEstimateA:
    "Godziny streamowania zależą od tego, jak rozmowny jest Twój stream. Suwak talk ratio pomaga przeliczyć Active Speech na realistyczny szacunek godzin streamowania.",
  faqChangePlanQ: "Czy mogę zmienić plan później?",
  faqChangePlanA:
    "Tak. Możesz ulepszyć plan w dowolnym momencie. Obniżenie planu zaczyna obowiązywać od następnego okresu rozliczeniowego.",
  faqYearlyQ: "Czy oferujecie rozliczanie roczne?",
  faqYearlyA:
    "Tak. Rozliczanie roczne oszczędza do {0}% w porównaniu z miesięcznym.",
  faqHigherLimitsQ: "Potrzebujesz wyższych limitów lub fakturowania?",
  faqHigherLimitsA:
    "Wybierz Enterprise, aby uzyskać niestandardowe limity, onboarding i obsługę fakturowania.",
};

const pt: PricingText = {
  ...en,
  monthly: "Mensal",
  yearly: "Anual",
  billedYearlySave: "Faturação anual. Economize até {0}%.",
  contactSales: "Falar com vendas",
  perMonth: "/ mês",
  billedYearly: "faturação anual",
  subscribe: "Assinar",
  redirecting: "Redirecionando…",
  checkoutFailed: "Falha no pagamento",
  trialBadge: "Teste de 7 dias",
  trialNote: "Teste de 7 dias incluído. Não há plano de teste separado.",
  estimatedStreamHours: "Horas de stream estimadas",
  includesActiveSpeech: "Inclui {0}h de Active Speech (OpenAI)",
  whatsIncluded: "O que está incluído",
  activeSpeechLabel: "O que conta como Active Speech",
  activeSpeechDescription:
    "Active Speech é o tempo em que a IA está realmente falando. Silêncio e inatividade não contam.",
  comparePlans: "Comparar planos",
  comparePlansSubtitle:
    "As horas de stream são estimativas. Sempre medimos o uso real por Active Speech.",
  faqTitle: "FAQ de preços",
  faqSubtitle: "Perguntas comuns, respondidas.",
  howUsageWorks: "Como funciona o consumo",
  howUsageWorksBody:
    "Active Speech é o tempo em que a IA realmente fala na stream. O dashboard converte suas configurações em horas de stream estimadas com base no seu talk ratio. Se você usa provedores integrados, a RoxStreamAI cobre os custos do provedor até a cota do seu plano. Se você usa BYOK, paga o provedor diretamente e a RoxStreamAI acompanha o consumo.",
  saveBadge: "Economize {0}%",
  enterpriseCustomLimits: "Limites personalizados e onboarding",
  enterpriseInvoicing: "Faturamento e suporte a compras",
  enterpriseCompliance: "Análise de segurança e compliance",
  enterpriseSla: "Opções de SLA",
  characterCount: "{0} personagem(ns)",
  concurrentStreamCount: "{0} stream(s) simultânea(s)",
  linkedAccountCount: "{0} conta(s) vinculada(s)",
  includedSpeechHours: "Inclui {0}h de Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h de stream a {1}% de talk ratio",
  desktopApp: "Aplicativo Desktop companion (integrações locais)",
  tiktokIntegrations: "Integrações TikTok Live + OBS WebSocket",
  byokSupport: "Suporte BYOK para provedores compatíveis",
  featureLabel: "Recurso",
  usageGroup: "Consumo",
  limitsGroup: "Limites",
  automationGroup: "Automação",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech incluído (OpenAI)",
  estimatedStreamHoursAtRatio:
    "Horas de stream estimadas (por talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Personagens",
  concurrentStreams: "Streams simultâneas",
  linkedAccounts: "Contas vinculadas",
  scenes: "Cenas",
  scheduler: "Agendador",
  donoRules: "Regras de doações",
  streamScripts: "Scripts de stream",
  removeWatermark: "Remover marca d'água",
  yes: "Sim",
  no: "Não",
  custom: "Personalizado",
  show: "Mostrar",
  hide: "Ocultar",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Escolha quanto do tempo da sua stream é fala ativa.",
  howWeEstimate: "Como estimamos",
  current: "Atual",
  talkRatioTip:
    "Dica: 20% é um bom ponto de partida para streams com muita conversa.",
  faqActiveSpeechQ: "O que é Active Speech?",
  faqActiveSpeechA:
    "Active Speech é o tempo em que a IA está realmente falando na stream. Silêncio e inatividade não contam.",
  faqByokQ:
    "Qual é a diferença entre provedores incluídos e BYOK?",
  faqByokA:
    "Os provedores incluídos são cobertos até a cota de Active Speech do seu plano. Com BYOK, você usa suas próprias chaves e paga o provedor diretamente; a RoxStreamAI ainda rastreia Active Speech para seus limites.",
  faqEstimateQ: "Por que vocês mostram horas de stream estimadas?",
  faqEstimateA:
    "As horas de stream dependem de quanto diálogo tem o seu stream. O controle de talk ratio ajuda a converter Active Speech em uma estimativa realista de horas de stream.",
  faqChangePlanQ: "Posso trocar de plano depois?",
  faqChangePlanA:
    "Sim. Você pode fazer upgrade a qualquer momento. Downgrades entram em vigor no próximo ciclo de faturamento.",
  faqYearlyQ: "Vocês oferecem faturação anual?",
  faqYearlyA:
    "Sim. A faturação anual economiza até {0}% em relação à mensal.",
  faqHigherLimitsQ: "Precisa de limites maiores ou faturamento?",
  faqHigherLimitsA:
    "Escolha Enterprise para limites personalizados, onboarding e suporte de faturamento.",
};

const ru: PricingText = {
  ...en,
  monthly: "Ежемесячно",
  yearly: "Ежегодно",
  billedYearlySave: "Оплата раз в год. Экономия до {0}%.",
  contactSales: "Связаться с sales",
  perMonth: "/ мес",
  billedYearly: "оплата раз в год",
  subscribe: "Подписаться",
  redirecting: "Переходим...",
  checkoutFailed: "Ошибка оплаты",
  trialBadge: "7 дней триал",
  trialNote: "7-дневный триал включен. Отдельного триального тарифа нет.",
  estimatedStreamHours: "Оценка часов стрима",
  includesActiveSpeech: "Включено {0}ч Active Speech (OpenAI)",
  whatsIncluded: "Что включено",
  activeSpeechLabel: "Что считается Active Speech",
  activeSpeechDescription:
    "Active Speech — это время, когда AI реально говорит. Тишина/ожидание не считаются.",
  comparePlans: "Сравнение тарифов",
  comparePlansSubtitle:
    "Часы стрима — оценка. Реальная тарификация идёт по Active Speech.",
  faqTitle: "FAQ по тарифам",
  faqSubtitle: "Коротко и по делу — про usage и лимиты.",
  howUsageWorks: "Как считается usage",
  howUsageWorksBody:
    "Active Speech — это время, когда AI реально говорит в эфире. Дашборд переводит настройки в оценку часов стрима на основе talk ratio. Если вы используете built-in провайдеров, расходы покрываются в рамках квоты тарифа. Если вы используете BYOK, вы оплачиваете провайдера напрямую, а RoxStreamAI отслеживает Active Speech для лимитов.",
  saveBadge: "Экономия {0}%",
  enterpriseCustomLimits: "Кастомные лимиты и онбординг",
  enterpriseInvoicing: "Инвойсинг и поддержка закупок",
  enterpriseCompliance: "Security/compliance review",
  enterpriseSla: "SLA опции",
  characterCount: "{0} персонаж(а)",
  concurrentStreamCount: "{0} одновременный(х) стрим(а)",
  linkedAccountCount: "{0} подключённый(х) аккаунт(а)",
  includedSpeechHours: "Включено {0}ч Active Speech (OpenAI)",
  streamEstimate: "≈ {0}ч стрима при {1}% talk ratio",
  desktopApp: "Desktop companion app (локальные интеграции)",
  tiktokIntegrations: "TikTok Live + OBS WebSocket интеграции",
  byokSupport: "BYOK поддержка для совместимых провайдеров",
  featureLabel: "Параметр",
  usageGroup: "Использование",
  limitsGroup: "Лимиты",
  automationGroup: "Автоматизация",
  brandingGroup: "Брендинг",
  activeSpeechIncluded: "Active Speech (OpenAI)",
  estimatedStreamHoursAtRatio: "Оценка часов стрима (по talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Персонажи",
  concurrentStreams: "Одновременные стримы",
  linkedAccounts: "Подключённые аккаунты",
  scenes: "Сцены",
  scheduler: "Планировщик",
  donoRules: "Правила доната",
  streamScripts: "Скрипты стрима",
  removeWatermark: "Убрать водяной знак",
  yes: "Да",
  no: "Нет",
  custom: "По запросу",
  show: "Показать",
  hide: "Скрыть",
  talkRatio: "Talk ratio",
  talkRatioDescription: "Какая часть стрима — это активная речь.",
  howWeEstimate: "Как мы оцениваем",
  current: "Текущий",
  talkRatioTip:
    "Совет: 20% — хорошая отправная точка для разговорных стримов.",
  faqActiveSpeechQ: "Что такое Active Speech?",
  faqActiveSpeechA:
    "Active Speech — это время, когда AI реально говорит в эфире. Тишина и простой не считаются.",
  faqByokQ: "Чем отличаются included providers и BYOK?",
  faqByokA:
    "Included providers покрываются в рамках квоты Active Speech. В режиме BYOK вы используете свои ключи и оплачиваете провайдера напрямую; RoxStreamAI при этом отслеживает Active Speech для лимитов.",
  faqEstimateQ: "Почему вы показываете оценку часов стрима?",
  faqEstimateA:
    "Часы стрима зависят от того, насколько «разговорный» ваш формат. Слайдер talk ratio переводит Active Speech в реалистичную оценку часов стрима.",
  faqChangePlanQ: "Можно сменить тариф позже?",
  faqChangePlanA:
    "Да. Апгрейд — в любой момент. Даунгрейд применяется со следующего периода.",
  faqYearlyQ: "Есть годовая оплата?",
  faqYearlyA:
    "Да. Годовая оплата экономит до {0}% по сравнению с ежемесячной.",
  faqHigherLimitsQ: "Нужны больше лимиты или инвойсинг?",
  faqHigherLimitsA:
    "Выберите Enterprise: кастомные лимиты, онбординг и поддержка инвойсинга.",
};

const sk: PricingText = {
  ...en,
  monthly: "Mesačne",
  yearly: "Ročne",
  billedYearlySave: "Ročná fakturácia. Ušetrite až {0} %.",
  contactSales: "Kontaktovať obchod",
  perMonth: "/ mesiac",
  billedYearly: "ročná fakturácia",
  subscribe: "Predplatiť",
  redirecting: "Presmerovanie…",
  checkoutFailed: "Platba zlyhala",
  trialBadge: "7-dňová skúšobná verzia",
  trialNote:
    "7-dňová skúšobná verzia je súčasťou. Žiadny samostatný skúšobný tarif.",
  estimatedStreamHours: "Odhadované hodiny streamovania",
  includesActiveSpeech: "Zahŕňa {0}h Active Speech (OpenAI)",
  whatsIncluded: "Čo je zahrnuté",
  activeSpeechLabel: "Čo sa počíta ako Active Speech",
  activeSpeechDescription:
    "Active Speech je čas, kedy AI skutočne hovorí. Ticho a nečinnosť sa nepočítajú.",
  comparePlans: "Porovnať tarify",
  comparePlansSubtitle:
    "Hodiny streamovania sú odhady. Vždy meriame skutočné využitie podľa Active Speech.",
  faqTitle: "Často kladené otázky k cenám",
  faqSubtitle: "Časté otázky, zodpovedané.",
  howUsageWorks: "Ako funguje meranie spotreby",
  howUsageWorksBody:
    "Active Speech je čas, kedy AI skutočne hovorí na streame. Dashboard prevádza vaše nastavenia na odhadované hodiny streamovania na základe talk ratio. Ak používate vstavaných poskytovateľov, RoxStreamAI pokrýva náklady na poskytovateľa v rámci kvóty vášho tarifu. Ak používate BYOK, platíte poskytovateľovi priamo a RoxStreamAI sleduje využitie.",
  saveBadge: "Ušetrite {0} %",
  enterpriseCustomLimits: "Vlastné limity a onboarding",
  enterpriseInvoicing: "Fakturácia a podpora nákupu",
  enterpriseCompliance: "Bezpečnostná a compliance kontrola",
  enterpriseSla: "Možnosti SLA",
  characterCount: "{0} postáv(a)",
  concurrentStreamCount: "{0} súbežný(ch) stream(ov)",
  linkedAccountCount: "{0} prepojený(ch) účet(ov)",
  includedSpeechHours: "Zahŕňa {0}h Active Speech (OpenAI)",
  streamEstimate: "≈ {0}h streamu pri {1}% talk ratio",
  desktopApp: "Desktop companion aplikácia (lokálne integrácie)",
  tiktokIntegrations: "TikTok Live + OBS WebSocket integrácie",
  byokSupport: "BYOK podpora pre kompatibilných poskytovateľov",
  featureLabel: "Funkcia",
  usageGroup: "Spotreba",
  limitsGroup: "Limity",
  automationGroup: "Automatizácia",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech v cene (OpenAI)",
  estimatedStreamHoursAtRatio:
    "Odhadované hodiny streamovania (podľa talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Postavy",
  concurrentStreams: "Súbežné streamy",
  linkedAccounts: "Prepojené účty",
  scenes: "Scény",
  scheduler: "Plánovač",
  donoRules: "Pravidlá donácií",
  streamScripts: "Skripty streamu",
  removeWatermark: "Odstrániť vodoznak",
  yes: "Áno",
  no: "Nie",
  custom: "Na mieru",
  show: "Zobraziť",
  hide: "Skryť",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Zvoľte, aký podiel streamu tvorí aktívna reč.",
  howWeEstimate: "Ako odhadujeme",
  current: "Aktuálny",
  talkRatioTip:
    "Tip: 20 % je dobrý východiskový bod pre väčšinu konverzačných streamov.",
  faqActiveSpeechQ: "Čo je Active Speech?",
  faqActiveSpeechA:
    "Active Speech je čas, kedy AI skutočne hovorí na streame. Ticho a nečinnosť sa nepočítajú.",
  faqByokQ: "Aký je rozdiel medzi zahrnutými poskytovateľmi a BYOK?",
  faqByokA:
    "Zahrnutí poskytovatelia sú hradení v rámci kvóty Active Speech vášho tarifu. S BYOK používate vlastné kľúče a platíte poskytovateľovi priamo; RoxStreamAI naďalej sleduje Active Speech pre vaše limity.",
  faqEstimateQ: "Prečo zobrazujete odhadované hodiny streamovania?",
  faqEstimateA:
    "Hodiny streamovania závisia od toho, ako veľmi je váš stream konverzačný. Posuvník talk ratio vám pomôže previesť Active Speech na realistický odhad hodín streamovania.",
  faqChangePlanQ: "Môžem tarif zmeniť neskôr?",
  faqChangePlanA:
    "Áno. Upgrade je možný kedykoľvek. Downgrade sa prejaví v ďalšom fakturačnom období.",
  faqYearlyQ: "Ponúkate ročnú fakturáciu?",
  faqYearlyA:
    "Áno. Ročná fakturácia ušetrí až {0} % oproti mesačnej.",
  faqHigherLimitsQ: "Potrebujete vyššie limity alebo fakturáciu?",
  faqHigherLimitsA:
    "Zvoľte Enterprise pre vlastné limity, onboarding a fakturačnú podporu.",
};

const tr: PricingText = {
  ...en,
  monthly: "Aylık",
  yearly: "Yıllık",
  billedYearlySave: "Yıllık faturalandırılır. %{0}'e kadar tasarruf edin.",
  contactSales: "Satışla iletişime geçin",
  perMonth: "/ ay",
  billedYearly: "yıllık faturalandırılır",
  subscribe: "Abone ol",
  redirecting: "Yönlendiriliyor…",
  checkoutFailed: "Ödeme başarısız oldu",
  trialBadge: "7 günlük deneme",
  trialNote: "7 günlük deneme dahildir. Ayrı bir deneme planı yoktur.",
  estimatedStreamHours: "Tahmini yayın saatleri",
  includesActiveSpeech: "{0}s Active Speech dahil (OpenAI)",
  whatsIncluded: "Neler dahil",
  activeSpeechLabel: "Active Speech olarak ne sayılır",
  activeSpeechDescription:
    "Active Speech, yapay zekanın gerçekten konuştuğu süredir. Sessizlik ve boşta bekleme sayılmaz.",
  comparePlans: "Planları karşılaştır",
  comparePlansSubtitle:
    "Yayın saatleri tahminidir. Gerçek kullanımı her zaman Active Speech ile ölçeriz.",
  faqTitle: "Fiyatlandırma SSS",
  faqSubtitle: "Sık sorulan sorular, yanıtlandı.",
  howUsageWorks: "Kullanım nasıl çalışır",
  howUsageWorksBody:
    "Active Speech, yapay zekanın yayında gerçekten konuştuğu süredir. Dashboard, ayarlarınızı talk ratio'nuza göre tahmini yayın saatlerine dönüştürür. Yerleşik sağlayıcıları kullanıyorsanız, RoxStreamAI sağlayıcı maliyetlerini planınızın kotasına kadar karşılar. BYOK kullanıyorsanız, sağlayıcıya doğrudan ödeme yaparsınız ve RoxStreamAI kullanımı izler.",
  saveBadge: "%{0} tasarruf edin",
  enterpriseCustomLimits: "Özel limitler ve onboarding",
  enterpriseInvoicing: "Faturalama ve tedarik desteği",
  enterpriseCompliance: "Güvenlik ve uyumluluk incelemesi",
  enterpriseSla: "SLA seçenekleri",
  characterCount: "{0} karakter",
  concurrentStreamCount: "{0} eş zamanlı yayın",
  linkedAccountCount: "{0} bağlı hesap",
  includedSpeechHours: "{0}s Active Speech dahil (OpenAI)",
  streamEstimate: "≈ {0}s yayın, %{1} talk ratio ile",
  desktopApp: "Desktop companion uygulaması (yerel entegrasyonlar)",
  tiktokIntegrations: "TikTok Live + OBS WebSocket entegrasyonları",
  byokSupport: "Uyumlu sağlayıcılar için BYOK desteği",
  featureLabel: "Özellik",
  usageGroup: "Kullanım",
  limitsGroup: "Limitler",
  automationGroup: "Otomasyon",
  brandingGroup: "Branding",
  activeSpeechIncluded: "Active Speech dahil (OpenAI)",
  estimatedStreamHoursAtRatio:
    "Tahmini yayın saatleri (talk ratio'ya göre)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Karakterler",
  concurrentStreams: "Eş zamanlı yayınlar",
  linkedAccounts: "Bağlı hesaplar",
  scenes: "Sahneler",
  scheduler: "Zamanlayıcı",
  donoRules: "Bağış kuralları",
  streamScripts: "Yayın scriptleri",
  removeWatermark: "Filigranı kaldır",
  yes: "Evet",
  no: "Hayır",
  custom: "Özel",
  show: "Göster",
  hide: "Gizle",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Yayın sürenizin ne kadarının aktif konuşma olduğunu seçin.",
  howWeEstimate: "Nasıl tahmin ediyoruz",
  current: "Mevcut",
  talkRatioTip:
    "İpucu: %20, sohbet ağırlıklı yayınlar için iyi bir başlangıç noktasıdır.",
  faqActiveSpeechQ: "Active Speech nedir?",
  faqActiveSpeechA:
    "Active Speech, yapay zekanın yayında gerçekten konuştuğu süredir. Sessizlik ve boşta bekleme sayılmaz.",
  faqByokQ:
    "Dahil edilen sağlayıcılar ile BYOK arasındaki fark nedir?",
  faqByokA:
    "Dahil edilen sağlayıcılar, planınızın Active Speech kotasına kadar karşılanır. BYOK ile kendi anahtarlarınızı kullanır ve sağlayıcıya doğrudan ödeme yaparsınız; RoxStreamAI limitleriniz için Active Speech'i izlemeye devam eder.",
  faqEstimateQ: "Neden tahmini yayın saatleri gösteriyorsunuz?",
  faqEstimateA:
    "Yayın saatleri, yayınınızın ne kadar konuşma ağırlıklı olduğuna bağlıdır. Talk ratio kaydırıcısı, Active Speech'i gerçekçi bir yayın saati tahminine dönüştürmenize yardımcı olur.",
  faqChangePlanQ: "Daha sonra plan değiştirebilir miyim?",
  faqChangePlanA:
    "Evet. İstediğiniz zaman yükseltme yapabilirsiniz. Düşürmeler bir sonraki faturalama döneminde geçerli olur.",
  faqYearlyQ: "Yıllık faturalandırma sunuyor musunuz?",
  faqYearlyA:
    "Evet. Yıllık faturalandırma, aylığa kıyasla %{0}'e kadar tasarruf sağlar.",
  faqHigherLimitsQ: "Daha yüksek limitler veya faturalama mı gerekiyor?",
  faqHigherLimitsA:
    "Özel limitler, onboarding ve faturalama desteği için Enterprise'ı seçin.",
};

const uk: PricingText = {
  ...en,
  monthly: "Щомісячно",
  yearly: "Щорічно",
  billedYearlySave: "Щорічна оплата. Заощаджуйте до {0}%.",
  contactSales: "Зв'язатися з відділом продажів",
  perMonth: "/ міс",
  billedYearly: "щорічна оплата",
  subscribe: "Підписатися",
  redirecting: "Переспрямування…",
  checkoutFailed: "Помилка оплати",
  trialBadge: "7-денний пробний період",
  trialNote:
    "7-денний пробний період включено. Окремого пробного тарифу немає.",
  estimatedStreamHours: "Орієнтовні години стрімів",
  includesActiveSpeech: "Включає {0}г Active Speech (OpenAI)",
  whatsIncluded: "Що включено",
  activeSpeechLabel: "Що вважається Active Speech",
  activeSpeechDescription:
    "Active Speech — це час, коли AI справді говорить. Тиша та очікування не враховуються.",
  comparePlans: "Порівняти тарифи",
  comparePlansSubtitle:
    "Години стрімів — це оцінка. Ми завжди тарифікуємо реальне використання за Active Speech.",
  faqTitle: "FAQ щодо тарифів",
  faqSubtitle: "Поширені запитання з відповідями.",
  howUsageWorks: "Як працює тарифікація",
  howUsageWorksBody:
    "Active Speech — це час, коли AI справді говорить у стрімі. Dashboard переводить ваші налаштування в орієнтовні години стрімів на основі talk ratio. Якщо ви використовуєте вбудованих провайдерів, RoxStreamAI покриває витрати в межах квоти тарифу. Якщо ви використовуєте BYOK, ви сплачуєте провайдеру напряму, а RoxStreamAI відстежує Active Speech для лімітів.",
  saveBadge: "Заощаджуйте {0}%",
  enterpriseCustomLimits: "Індивідуальні ліміти та онбординг",
  enterpriseInvoicing: "Інвойсинг і підтримка закупівель",
  enterpriseCompliance: "Перевірка безпеки та compliance",
  enterpriseSla: "Опції SLA",
  characterCount: "{0} персонаж(ів)",
  concurrentStreamCount: "{0} одночасний(х) стрім(ів)",
  linkedAccountCount: "{0} підключений(х) акаунт(ів)",
  includedSpeechHours: "Включає {0}г Active Speech (OpenAI)",
  streamEstimate: "≈ {0}г стріму при {1}% talk ratio",
  desktopApp: "Desktop companion додаток (локальні інтеграції)",
  tiktokIntegrations: "Інтеграції TikTok Live + OBS WebSocket",
  byokSupport: "BYOK підтримка для сумісних провайдерів",
  featureLabel: "Параметр",
  usageGroup: "Використання",
  limitsGroup: "Ліміти",
  automationGroup: "Автоматизація",
  brandingGroup: "Брендинг",
  activeSpeechIncluded: "Active Speech включено (OpenAI)",
  estimatedStreamHoursAtRatio:
    "Орієнтовні години стрімів (за talk ratio)",
  byokElevenLabs: "BYOK (ElevenLabs)",
  characters: "Персонажі",
  concurrentStreams: "Одночасні стріми",
  linkedAccounts: "Підключені акаунти",
  scenes: "Сцени",
  scheduler: "Планувальник",
  donoRules: "Правила донатів",
  streamScripts: "Скрипти стріму",
  removeWatermark: "Прибрати водяний знак",
  yes: "Так",
  no: "Ні",
  custom: "За запитом",
  show: "Показати",
  hide: "Сховати",
  talkRatio: "Talk ratio",
  talkRatioDescription:
    "Яка частина стріму — це активне мовлення.",
  howWeEstimate: "Як ми оцінюємо",
  current: "Поточний",
  talkRatioTip:
    "Порада: 20% — гарна відправна точка для розмовних стрімів.",
  faqActiveSpeechQ: "Що таке Active Speech?",
  faqActiveSpeechA:
    "Active Speech — це час, коли AI справді говорить у стрімі. Тиша та простій не враховуються.",
  faqByokQ: "Чим відрізняються вбудовані провайдери та BYOK?",
  faqByokA:
    "Вбудовані провайдери покриваються в межах квоти Active Speech. У режимі BYOK ви використовуєте власні ключі та сплачуєте провайдеру напряму; RoxStreamAI при цьому відстежує Active Speech для ваших лімітів.",
  faqEstimateQ: "Чому ви показуєте орієнтовні години стрімів?",
  faqEstimateA:
    "Години стрімів залежать від того, наскільки «розмовний» ваш формат. Повзунок talk ratio допомагає перевести Active Speech у реалістичну оцінку годин стрімів.",
  faqChangePlanQ: "Чи можна змінити тариф пізніше?",
  faqChangePlanA:
    "Так. Апгрейд — будь-коли. Даунгрейд застосовується з наступного періоду.",
  faqYearlyQ: "Чи є щорічна оплата?",
  faqYearlyA:
    "Так. Щорічна оплата заощаджує до {0}% порівняно зі щомісячною.",
  faqHigherLimitsQ: "Потрібні вищі ліміти або інвойсинг?",
  faqHigherLimitsA:
    "Оберіть Enterprise: індивідуальні ліміти, онбординг та підтримка інвойсингу.",
};

const pricingTexts: Record<Locale, PricingText> = {
  en,
  cs,
  de,
  es,
  fr,
  it,
  pl,
  pt,
  ru,
  sk,
  tr,
  uk,
};

export function getPricingText(locale: Locale): PricingText {
  return pricingTexts[locale] ?? en;
}
