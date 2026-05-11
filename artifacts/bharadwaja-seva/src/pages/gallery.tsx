import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { events, localized, type ServiceCategory } from "@/data/events";
import { Lightbox, type LightboxPhoto } from "@/components/Lightbox";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { useLanguage } from "@/i18n/LanguageProvider";

const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  feeding: "Feeding the Needy",
  education: "Supporting Education",
  medical: "Medical Relief",
  youth: "Youth Empowerment",
  elderly: "Care for the Elderly",
  women: "Women & Children",
  environment: "Environmental Protection",
  community: "Community Service",
};

const CATEGORY_KEYS = Object.keys(CATEGORY_LABEL) as ServiceCategory[];

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const stored = sessionStorage.getItem("bss-gallery-category");
    if (stored && (CATEGORY_KEYS as string[]).includes(stored)) {
      setCategory(stored as ServiceCategory);
      sessionStorage.removeItem("bss-gallery-category");
    }
  }, []);

  const filteredEvents = useMemo(
    () => (category ? events.filter((e) => e.categories.includes(category)) : events),
    [category],
  );

  const lightboxPhotos: LightboxPhoto[] = useMemo(
    () =>
      filteredEvents.flatMap((event) =>
        event.photos.map((p) => ({
          src: p.src,
          alt: p.alt,
          caption: `${localized(event.title, lang)} • ${localized(event.dateLabel, lang)}`,
        }))
      ),
    [lang, filteredEvents]
  );

  const photoIndexFor = (eventId: string, photoIdx: number) => {
    let cursor = 0;
    for (const event of filteredEvents) {
      if (event.id === eventId) return cursor + photoIdx;
      cursor += event.photos.length;
    }
    return 0;
  };

  const navigateHome = (sectionId: string) => {
    sessionStorage.setItem("bss-pending-scroll", sectionId || "home");
    setLocation("/");
  };

  const navigateGallery = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                {t("gallery.hero.title")}
              </h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                {t("gallery.hero.subtitle")}
              </p>
              {category && (
                <div className="mt-6 flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white">
                    <span>Showing: {CATEGORY_LABEL[category]}</span>
                    <button
                      type="button"
                      onClick={() => setCategory(null)}
                      className="ml-1 hover:text-accent font-bold text-base leading-none"
                      aria-label="Show all"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* EVENT GRIDS */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl space-y-16">
            {filteredEvents.length === 0 && (
              <div className="text-center bg-muted border-2 border-dashed border-border p-10">
                <p className="text-muted-foreground mb-4">
                  No photos available for this category yet. Please check back soon.
                </p>
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className="text-primary font-bold uppercase tracking-wider text-sm hover:underline"
                >
                  Show all events
                </button>
              </div>
            )}
            {filteredEvents.map((event, eventIdx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(eventIdx * 0.05, 0.3) }}
              >
                <div className="mb-6 flex items-end justify-between flex-wrap gap-2 border-b-2 border-secondary/40 pb-3">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-secondary font-bold mb-1">
                      {localized(event.dateLabel, lang)}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {localized(event.title, lang)}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                  {localized(event.caption, lang)}
                </p>
                <div
                  className={`grid gap-4 ${
                    event.photos.length === 1
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {event.photos.map((photo, idx) => (
                    <button
                      key={photo.src}
                      onClick={() => setActiveIndex(photoIndexFor(event.id, idx))}
                      className="group relative aspect-[4/3] bg-muted overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-secondary"
                      aria-label={photo.alt}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              {t("gallery.cta.title")}
            </h3>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8">
              {t("gallery.cta.desc")}
            </p>
            <button
              onClick={() => navigateHome("contact")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold uppercase tracking-wider px-8 py-3 rounded-none shadow-md transition-colors"
            >
              {t("gallery.cta.button")}
            </button>
          </div>
        </section>
      </main>

      <SiteFooter onNavigateHome={navigateHome} onNavigateGallery={navigateGallery} />
      <WhatsAppFAB />

      {activeIndex !== null && (
        <Lightbox
          photos={lightboxPhotos}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNext={() =>
            setActiveIndex((i) => (i === null ? null : (i + 1) % lightboxPhotos.length))
          }
          onPrev={() =>
            setActiveIndex((i) =>
              i === null ? null : (i - 1 + lightboxPhotos.length) % lightboxPhotos.length
            )
          }
        />
      )}
    </div>
  );
}
