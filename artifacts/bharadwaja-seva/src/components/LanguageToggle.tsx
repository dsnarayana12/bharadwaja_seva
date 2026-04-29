import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("nav.lang.label")}
      className="inline-flex items-center bg-white/10 border border-white/30 rounded-sm overflow-hidden text-xs font-bold tracking-wider"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "en"
            ? "bg-accent text-accent-foreground"
            : "text-primary-foreground hover:bg-white/15"
        }`}
      >
        {t("nav.lang.english")}
      </button>
      <button
        type="button"
        onClick={() => setLang("te")}
        aria-pressed={lang === "te"}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "te"
            ? "bg-accent text-accent-foreground"
            : "text-primary-foreground hover:bg-white/15"
        }`}
      >
        {t("nav.lang.telugu")}
      </button>
    </div>
  );
}
