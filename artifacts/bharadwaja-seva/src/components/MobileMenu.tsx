import { useState } from "react";
import { useLocation } from "wouter";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useContributeDialog } from "@/components/ContributeDialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

interface MobileMenuProps {
  onNavigateHome: (sectionId: string) => void;
}

interface NavItem {
  labelKey: TranslationKey;
  sectionId: string;
  isGallery?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.home", sectionId: "home" },
  { labelKey: "nav.about", sectionId: "about" },
  { labelKey: "nav.services", sectionId: "services" },
  { labelKey: "nav.gallery", sectionId: "", isGallery: true },
  { labelKey: "nav.values", sectionId: "principles" },
  { labelKey: "nav.contact", sectionId: "contact" },
];

export function MobileMenu({ onNavigateHome }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t } = useLanguage();
  const { open: openContribute } = useContributeDialog();
  const onGallery = location === "/gallery";

  const handleClick = (item: NavItem) => {
    setOpen(false);
    window.setTimeout(() => {
      if (item.isGallery) {
        if (!onGallery) {
          setLocation("/gallery");
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      } else {
        onNavigateHome(item.sectionId);
      }
    }, 250);
  };

  const handleDonate = () => {
    setOpen(false);
    window.setTimeout(() => {
      openContribute();
    }, 250);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t("nav.openMenu")}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-primary-foreground hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] max-w-sm bg-primary text-primary-foreground border-l-0 p-0 flex flex-col"
      >
        <SheetTitle className="sr-only">{t("brand.name")}</SheetTitle>
        <SheetDescription className="sr-only">
          {t("nav.openMenu")}
        </SheetDescription>
        <div className="flex items-center px-5 h-16 border-b border-white/10">
          <span className="font-serif font-bold text-lg uppercase tracking-wide">
            {t("brand.name")}
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive = item.isGallery && onGallery;
              return (
                <li key={item.labelKey}>
                  <button
                    type="button"
                    onClick={() => handleClick(item)}
                    className={`w-full text-left px-6 py-4 text-base font-semibold uppercase tracking-wider border-b border-white/10 hover:bg-white/10 transition-colors ${
                      isActive ? "text-accent" : ""
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-5 border-t border-white/10">
          <button
            type="button"
            onClick={handleDonate}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold uppercase tracking-wider px-6 py-3 rounded-none shadow-sm text-sm transition-colors"
          >
            {t("nav.donate")}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
