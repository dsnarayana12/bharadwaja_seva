import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  HeartHandshake,
  GraduationCap,
  Stethoscope,
  Users,
  Building2,
  Baby,
  Leaf,
  HandHeart,
  MapPin,
  Phone,
  Mail,
  User,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { recentPhotos, localized } from "@/data/events";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";
import aboutShlokaImage from "@assets/WhatsApp_Image_2026-04-30_at_12.25.40_PM_1777533717040.jpeg";

interface ServiceCard {
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: typeof HandHeart;
}

const SERVICES: ServiceCard[] = [
  { titleKey: "service.feeding.title", descKey: "service.feeding.desc", icon: HandHeart },
  { titleKey: "service.education.title", descKey: "service.education.desc", icon: GraduationCap },
  { titleKey: "service.medical.title", descKey: "service.medical.desc", icon: Stethoscope },
  { titleKey: "service.youth.title", descKey: "service.youth.desc", icon: Users },
  { titleKey: "service.elderly.title", descKey: "service.elderly.desc", icon: Building2 },
  { titleKey: "service.women.title", descKey: "service.women.desc", icon: Baby },
  { titleKey: "service.environment.title", descKey: "service.environment.desc", icon: Leaf },
  { titleKey: "service.community.title", descKey: "service.community.desc", icon: HeartHandshake },
];

const PRINCIPLE_KEYS: TranslationKey[] = [
  "principles.1",
  "principles.2",
  "principles.3",
  "principles.4",
  "principles.5",
];

const PENDING_SCROLL_KEY = "bss-pending-scroll";

export default function Home() {
  const [, setLocation] = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    const target = sessionStorage.getItem(PENDING_SCROLL_KEY);
    if (!target) return;
    sessionStorage.removeItem(PENDING_SCROLL_KEY);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (target === "home") {
          window.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "auto" });
      });
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToGallery = () => {
    setLocation("/gallery");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <SiteHeader onNavigateHome={scrollTo} />

      <main className="flex-1">
        {/* HERO */}
        <section
          id="home"
          className="relative pt-32 pb-40 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-90 mix-blend-multiply z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src="/images/hero-bg.png"
              alt={t("hero.title")}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
          </div>

          <div className="container relative z-20 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {t("hero.title")}
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-8 font-medium drop-shadow-md">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollTo("donate")}
                  className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 h-auto font-bold uppercase tracking-wider rounded-none shadow-xl border-2 border-primary"
                >
                  {t("hero.cta.contribute")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("services")}
                  className="bg-transparent text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto font-bold uppercase tracking-wider rounded-none shadow-xl"
                >
                  {t("hero.cta.initiatives")}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HIGHLIGHT NEWS TICKER */}
        <div className="bg-secondary text-white py-3 border-y border-white/20 shadow-inner overflow-hidden">
          <div className="container mx-auto px-4 flex items-center">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider whitespace-nowrap mr-4 shrink-0">
              {t("ticker.label")}
            </span>
            <div className="overflow-hidden whitespace-nowrap w-full">
              <motion.p
                key={lang}
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="inline-block font-medium tracking-wide"
              >
                {t("ticker.text")}
              </motion.p>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-1 w-12 bg-primary"></div>
                  <h3 className="text-3xl font-serif font-bold uppercase tracking-wide">
                    <span className="text-foreground">{t("about.title.a")}</span>
                    <span className="text-primary">{t("about.title.b")}</span>
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t("about.p1")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.p2")}
                </p>
                <Button
                  onClick={() => scrollTo("principles")}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white rounded-none uppercase font-bold tracking-wider"
                >
                  {t("about.cta")}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-secondary transform translate-x-4 translate-y-4 -z-10"></div>
                <img
                  src={aboutShlokaImage}
                  alt={t("about.title.b")}
                  className="w-full h-auto shadow-xl border-4 border-white bg-white"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 bg-muted border-t border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif font-bold uppercase tracking-wide inline-block relative pb-4">
                <span className="text-foreground">{t("services.title.a")}</span>
                <span className="text-primary">{t("services.title.b")}</span>
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-primary"></span>
              </h3>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("services.intro")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full rounded-none border-t-4 border-t-primary hover:shadow-xl transition-shadow bg-card hover:-translate-y-1 duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-primary">
                        <service.icon size={32} strokeWidth={1.5} />
                      </div>
                      <h4 className="font-bold text-lg mb-3 text-card-foreground">
                        {t(service.titleKey)}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(service.descKey)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GLIMPSES OF OUR SEVA */}
        <section id="glimpses" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold uppercase tracking-wide inline-block relative pb-4">
                <span className="text-foreground">{t("glimpses.title.a")}</span>
                <span className="text-primary">{t("glimpses.title.b")}</span>
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-secondary"></span>
              </h3>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("glimpses.intro")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              {recentPhotos.map((photo, i) => {
                const eventTitle = localized(photo.eventTitle, lang);
                const dateLabel = localized(photo.dateLabel, lang);
                return (
                  <motion.button
                    key={photo.src}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    onClick={goToGallery}
                    className="group relative aspect-[4/3] bg-muted overflow-hidden shadow-md hover:shadow-2xl transition-all border-2 border-transparent hover:border-secondary"
                    aria-label={`${t("glimpses.openAria")} — ${eventTitle}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-left">
                      <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
                        {dateLabel}
                      </p>
                      <p className="text-white text-xs md:text-sm font-semibold leading-tight line-clamp-2">
                        {eventTitle}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="text-center">
              <Button
                onClick={goToGallery}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase font-bold tracking-wider px-8 py-6 h-auto shadow-md"
              >
                {t("glimpses.viewFull")}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* GUIDING PRINCIPLES */}
        <section id="principles" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-2xl border-l-8 border-secondary">
              <div className="mb-8">
                <h3 className="text-3xl font-serif font-bold uppercase tracking-wide">
                  <span className="text-foreground">{t("principles.title.a")}</span>
                  <span className="text-primary">{t("principles.title.b")}</span>
                </h3>
                <div className="h-1 w-24 bg-accent mt-4"></div>
              </div>

              <ul className="space-y-6">
                {PRINCIPLE_KEYS.map((key, idx) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 text-lg text-foreground font-medium"
                  >
                    <div className="mt-1 shrink-0 text-secondary">
                      <HeartHandshake size={24} />
                    </div>
                    {t(key)}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* DONATE / GET INVOLVED */}
        <section id="donate" className="py-20 bg-primary text-primary-foreground text-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h3 className="text-4xl font-serif font-bold mb-6 drop-shadow-md">
              {t("donate.title")}
            </h3>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">{t("donate.intro")}</p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/10 text-white border-white/20 rounded-none backdrop-blur-sm">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                    <HeartHandshake className="text-accent" /> {t("donate.volunteer.title")}
                  </h4>
                  <p className="mb-6 opacity-90">{t("donate.volunteer.desc")}</p>
                  <Button
                    variant="outline"
                    className="border-white bg-transparent text-white hover:bg-white hover:text-primary rounded-none uppercase font-bold tracking-wider w-full"
                    onClick={() => scrollTo("contact")}
                  >
                    {t("donate.volunteer.cta")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white text-foreground rounded-none shadow-xl border-t-4 border-accent">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-4 text-primary flex items-center justify-center gap-2">
                    <HandHeart /> {t("donate.give.title")}
                  </h4>
                  <p className="mb-6 text-muted-foreground">{t("donate.give.desc")}</p>
                  <div className="bg-muted p-4 mb-6 text-left border-l-4 border-primary text-sm">
                    <p className="font-semibold text-foreground">{t("donate.give.bankTitle")}</p>
                    <p className="text-muted-foreground mt-2">{t("donate.give.bankNote")}</p>
                  </div>
                  <Button
                    className="bg-primary text-white hover:bg-primary/90 rounded-none uppercase font-bold tracking-wider w-full shadow-md"
                    onClick={() => scrollTo("contact")}
                  >
                    {t("donate.give.cta")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif font-bold uppercase tracking-wide inline-block relative pb-4">
                <span className="text-foreground">{t("contact.title.a")}</span>
                <span className="text-primary">{t("contact.title.b")}</span>
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-primary"></span>
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t("contact.office.title")}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t("contact.office.body")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t("contact.phone.title")}</h4>
                    <p className="text-muted-foreground">+91 7989735152</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t("contact.email.title")}</h4>
                    <a
                      href="mailto:bsskkd.2024@gmail.com"
                      className="text-primary hover:underline"
                    >
                      bsskkd.2024@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t("contact.secretary.title")}</h4>
                    <p className="text-muted-foreground">{t("contact.secretary.name")}</p>
                  </div>
                </div>
              </div>

              <div className="h-[400px] border-4 border-white shadow-xl bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15264.444257121708!2d82.23594195!3d16.95353195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a38286a117b8745%3A0xc485122ab65538e1!2sSalipeta%2C%20Kakinada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1714900000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("contact.mapTitle")}
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onNavigateHome={scrollTo} onNavigateGallery={goToGallery} />
      <WhatsAppFAB />
    </div>
  );
}
