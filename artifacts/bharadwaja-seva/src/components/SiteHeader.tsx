import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { useLanguage } from "@/i18n/LanguageProvider";

const LOGO_SRC =
  "https://img1.wsimg.com/isteam/ip/210338f7-f5fb-4633-b166-d0068dd8981c/baradwaja%20logo.jpg/:/rs=h:200,cg:true,m/qt=q:95";

interface SiteHeaderProps {
  onNavigateHome: (sectionId: string) => void;
}

export function SiteHeader({ onNavigateHome }: SiteHeaderProps) {
  const [location, setLocation] = useLocation();
  const { t } = useLanguage();
  const onGallery = location === "/gallery";

  const goToGallery = () => {
    if (!onGallery) {
      setLocation("/gallery");
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-primary text-primary-foreground border-b-4 border-accent">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigateHome("home")}
          className="flex items-center gap-2 sm:gap-3 text-left min-w-0"
        >
          <div className="bg-white p-1 rounded shrink-0">
            <img
              src={LOGO_SRC}
              alt={t("brand.name")}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-[11px] sm:text-base md:text-xl leading-tight tracking-wide uppercase">
              {t("brand.name")}
            </h1>
            <p className="hidden md:block text-xs text-primary-foreground/80 font-medium tracking-wider">
              {t("brand.tagline")}
            </p>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm">
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

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageToggle />
          <Button
            onClick={() => onNavigateHome("donate")}
            className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-bold uppercase tracking-wider px-4 sm:px-6 rounded-none shadow-sm text-xs sm:text-sm"
          >
            {t("nav.donate")}
          </Button>
          <MobileMenu onNavigateHome={onNavigateHome} />
        </div>
      </div>
    </header>
  );
}
