import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { useContributeDialog } from "@/components/ContributeDialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import LOGO_SRC from "@/assets/logo.png";

interface SiteHeaderProps {
  onNavigateHome: (sectionId: string) => void;
}

export function SiteHeader({ onNavigateHome }: SiteHeaderProps) {
  const [location, setLocation] = useLocation();
  const { t } = useLanguage();
  const { open: openContribute } = useContributeDialog();
  const onGallery = location === "/gallery";

  const goToGallery = () => {
    if (!onGallery) {
      setLocation("/gallery");
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <header className="relative w-full shadow-md bg-primary text-primary-foreground border-b-4 border-accent">
      <div className="container mx-auto px-4 py-2 sm:py-3 lg:py-0 flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => onNavigateHome("home")}
          className="min-w-0 flex items-center justify-center lg:justify-start gap-3 sm:gap-5 md:gap-6 lg:gap-4 text-left flex-1 lg:flex-none"
        >
          <div className="shrink-0 lg:py-2">
            <img
              src={LOGO_SRC}
              alt={t("brand.name")}
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-36 2xl:h-44 w-auto object-contain"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-base sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-tight tracking-wide uppercase lg:whitespace-nowrap">
              {t("brand.name")}
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-accent font-semibold tracking-wider mt-1 uppercase">
              Regd.No.350/2024
            </p>
          </div>
        </button>

        {/* Desktop nav + contribute (lg+), placed inline to the right of the brand */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-4 xl:gap-6">
          <nav className="flex items-center gap-3 xl:gap-5 font-semibold text-xs xl:text-sm whitespace-nowrap">
            <button
              onClick={() => onNavigateHome("home")}
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => onNavigateHome("about")}
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => onNavigateHome("services")}
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              {t("nav.services")}
            </button>
            <button
              onClick={goToGallery}
              className={`hover:text-accent transition-colors uppercase tracking-wider ${
                onGallery ? "text-accent" : ""
              }`}
            >
              {t("nav.gallery")}
            </button>
            <button
              onClick={() => onNavigateHome("principles")}
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              {t("nav.values")}
            </button>
            <button
              onClick={() => onNavigateHome("contact")}
              className="hover:text-accent transition-colors uppercase tracking-wider"
            >
              {t("nav.contact")}
            </button>
          </nav>
          <Button
            onClick={openContribute}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold uppercase tracking-wider px-6 rounded-none shadow-sm text-sm"
          >
            {t("nav.donate")}
          </Button>
        </div>

        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <MobileMenu onNavigateHome={onNavigateHome} />
        </div>
      </div>
    </header>
  );
}
