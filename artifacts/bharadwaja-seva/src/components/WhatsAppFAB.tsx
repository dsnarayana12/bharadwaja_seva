import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function WhatsAppFAB() {
  const { t } = useLanguage();
  return (
    <a
      href="https://wa.me/919848122294"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300"
      aria-label={t("whatsapp.aria")}
    >
      <MessageCircle size={32} />
    </a>
  );
}
