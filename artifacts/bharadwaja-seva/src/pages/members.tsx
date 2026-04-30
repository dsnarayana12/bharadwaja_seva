import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Members() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const navigateHome = (sectionId: string) => {
    sessionStorage.setItem("bss-pending-scroll", sectionId || "home");
    setLocation("/");
  };

  const navigateGallery = () => {
    setLocation("/gallery");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <SiteHeader onNavigateHome={navigateHome} />

      <main className="flex-1">
        {/* PAGE HEADER */}
        <section className="relative py-16 md:py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15"></div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                {t("members.hero.title")}
              </h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                {t("members.hero.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* PLACEHOLDER CONTENT */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-muted border-2 border-dashed border-secondary/50 p-10 md:p-14 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t("members.empty.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t("members.empty.desc")}
              </p>
              <Button
                onClick={() => navigateHome("home")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none uppercase font-bold tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("members.back")}
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter onNavigateHome={navigateHome} onNavigateGallery={navigateGallery} />
      <WhatsAppFAB />
    </div>
  );
}
