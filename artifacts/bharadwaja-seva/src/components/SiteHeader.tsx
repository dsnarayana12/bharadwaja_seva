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
      {/* Top row: centered logo + brand */}
      <div className="container mx-auto px-4 py-3 sm:py-4 relative">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <MobileMenu onNavigateHome={onNavigateHome} />
        </div>

        <button
          onClick={() => onNavigateHome("home")}
          className="mx-auto flex items-center justify-center gap-3 sm:gap-5 md:gap-6 text-left max-w-full"
        >
          <div className="flex flex-col items-center shrink-0">
            <div className="bg-white p-1.5 sm:p-2 rounded">
              <img
                src={LOGO_SRC}
                alt={t("brand.name")}
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-accent font-semibold tracking-wider mt-1 uppercase whitespace-nowrap">
              Regd.No.350/2024
            </p>
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-wide uppercase">
              {t("brand.name")}
            </h1>
            <p className="hidden md:block text-sm md:text-base text-primary-foreground/80 font-medium tracking-wider mt-1">
              {t("brand.tagline")}
            </p>
          </div>
        </button>
      </div>

      {/* Bottom row: nav (lg+) + contribute button */}
      <div className="hidden lg:block border-t border-white/10 bg-primary/95">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-6">
          <nav className="flex items-center gap-6 font-semibold text-sm">
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
            onClick={() => onNavigateHome("donate")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold uppercase tracking-wider px-6 rounded-none shadow-sm text-sm"
          >
            {t("nav.donate")}
          </Button>
        </div>
      </div>
    </header>
  );
}
