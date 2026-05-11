import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { CommitteeCard } from "@/components/CommitteeCard";
import { officeBearers, executiveBody, members } from "@/data/committee";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Members() {
  const [, setLocation] = useLocation();
  const { lang, t } = useLanguage();

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

        {/* MEMBERS LIST */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {officeBearers.map((m, i) => (
                <CommitteeCard key={`ob-${i}`} member={m} lang={lang} index={i} featured />
              ))}
              {executiveBody.map((m, i) => (
                <CommitteeCard
                  key={`eb-${i}`}
                  member={m}
                  lang={lang}
                  index={officeBearers.length + i}
                />
              ))}
              {members.map((m, i) => (
                <CommitteeCard
                  key={`m-${i}`}
                  member={m}
                  lang={lang}
                  index={officeBearers.length + executiveBody.length + i}
                />
              ))}
            </div>

            <div className="pt-8 flex justify-center">
              <Button
                onClick={() => navigateHome("home")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none uppercase font-bold tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("members.back")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onNavigateHome={navigateHome} onNavigateGallery={navigateGallery} />
      <WhatsAppFAB />
    </div>
  );
}
