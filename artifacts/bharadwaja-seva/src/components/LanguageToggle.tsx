import { useLanguage } from "@/i18n/LanguageProvider";
import type { Language, TranslationKey } from "@/i18n/translations";

const OPTIONS: { code: Language; labelKey: TranslationKey }[] = [
  { code: "en", labelKey: "nav.lang.english" },
  { code: "te", labelKey: "nav.lang.telugu" },
  { code: "hi", labelKey: "nav.lang.hindi" },
];

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("nav.lang.label")}
      className="inline-flex items-center bg-white/10 border border-white/30 rounded-sm overflow-hidden text-xs font-bold tracking-wider"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLang(opt.code)}
          aria-pressed={lang === opt.code}
          className={`px-2.5 py-1.5 transition-colors ${
            lang === opt.code
              ? "bg-accent text-accent-foreground"
              : "text-primary-foreground hover:bg-white/15"
          }`}
        >
          {t(opt.labelKey)}
        </button>
      ))}
    </div>
  );
}
