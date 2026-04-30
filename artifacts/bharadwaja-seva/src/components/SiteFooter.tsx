import { useContributeDialog } from "@/components/ContributeDialog";
import { useLanguage } from "@/i18n/LanguageProvider";

const LOGO_SRC =
  "https://img1.wsimg.com/isteam/ip/210338f7-f5fb-4633-b166-d0068dd8981c/baradwaja%20logo.jpg/:/rs=h:200,cg:true,m/qt=q:95";

interface SiteFooterProps {
  onNavigateHome: (sectionId: string) => void;
  onNavigateGallery: () => void;
}

export function SiteFooter({ onNavigateHome, onNavigateGallery }: SiteFooterProps) {
  const { t } = useLanguage();
  const { open: openContribute } = useContributeDialog();

  return (
    <footer className="bg-[#1c2e22] text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6 bg-white p-2 inline-block rounded">
              <img src={LOGO_SRC} alt={t("brand.name")} className="h-10 w-auto" />
            </div>
            <h4 className="text-xl font-serif font-bold mb-2 uppercase tracking-wider text-accent">
              {t("brand.name")}
            </h4>
            <p className="text-xs font-semibold tracking-wider uppercase text-accent/90 mb-4">
              Regd.No.350/2024
            </p>
            <p className="text-gray-400 mb-6">{t("footer.intro")}</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider border-b border-gray-700 pb-2">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button
                  onClick={() => onNavigateHome("home")}
                  className="hover:text-accent transition-colors"
                >
                  {t("nav.home")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome("about")}
                  className="hover:text-accent transition-colors"
                >
                  {t("nav.about")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome("services")}
                  className="hover:text-accent transition-colors"
                >
                  {t("footer.link.initiatives")}
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateGallery}
                  className="hover:text-accent transition-colors"
                >
                  {t("nav.gallery")}
                </button>
              </li>
              <li>
                <button
                  onClick={openContribute}
                  className="hover:text-accent transition-colors"
                >
                  {t("footer.link.donate")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome("contact")}
                  className="hover:text-accent transition-colors"
                >
                  {t("footer.link.contact")}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider border-b border-gray-700 pb-2">
              {t("footer.mission.title")}
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• {t("footer.mission.1")}</li>
              <li>• {t("footer.mission.2")}</li>
              <li>• {t("footer.mission.3")}</li>
              <li>• {t("footer.mission.4")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} {t("brand.name")} — {t("footer.copyright")}
          </p>
          <p className="mt-2 md:mt-0">{t("footer.location")}</p>
        </div>
      </div>
    </footer>
  );
}
