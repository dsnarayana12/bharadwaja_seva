import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Utensils,
  GraduationCap,
  HeartPulse,
  Users,
  HandHeart,
  Sprout,
  HandHelping,
  MoreHorizontal,
  ImageIcon,
} from "lucide-react";
import { useListEvents } from "@workspace/api-client-react";
import { localized, type ServiceCategory } from "@/data/events";
import { apiEventToEventGroup, apiEventCategoryRaw } from "@/lib/dataAdapters";
import { Lightbox, type LightboxPhoto } from "@/components/Lightbox";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

type CategoryKey = ServiceCategory | "other";

const CATEGORY_I18N_KEY: Record<CategoryKey, string> = {
  feeding: "service.feeding.title",
  education: "service.education.title",
  medical: "service.medical.title",
  youth: "service.youth.title",
  elderly: "service.elderly.title",
  women: "service.women.title",
  environment: "service.environment.title",
  community: "service.community.title",
  other: "gallery.filter.other",
};

const CATEGORY_ICON: Record<CategoryKey, typeof Utensils> = {
  feeding: Utensils,
  education: GraduationCap,
  medical: HeartPulse,
  youth: Users,
  elderly: HandHeart,
  women: HandHelping,
  environment: Sprout,
  community: HandHelping,
  other: MoreHorizontal,
};

const CATEGORY_KEYS = Object.keys(CATEGORY_I18N_KEY) as CategoryKey[];

function toCategoryKey(raw: string): CategoryKey {
  return (CATEGORY_KEYS as string[]).includes(raw) ? (raw as CategoryKey) : "other";
}

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const { lang, t } = useLanguage();
  const { data: apiEvents = [] } = useListEvents();

  useEffect(() => {
    const stored = sessionStorage.getItem("bss-gallery-category");
    if (stored && (CATEGORY_KEYS as string[]).includes(stored)) {
      setCategory(stored as CategoryKey);
      sessionStorage.removeItem("bss-gallery-category");
    }
  }, []);

  const allEvents = useMemo(
    () =>
      [...apiEvents]
        .sort((a, b) => b.eventDate.localeCompare(a.eventDate))
        .map((e) => ({
          group: apiEventToEventGroup(e),
          rawCategory: toCategoryKey(apiEventCategoryRaw(e)),
        })),
    [apiEvents],
  );

  const filteredEvents = useMemo(
    () => (category ? allEvents.filter((e) => e.rawCategory === category) : allEvents),
    [category, allEvents],
  );

  const lightboxPhotos: LightboxPhoto[] = useMemo(
    () =>
      filteredEvents.flatMap(({ group: event }) =>
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
    for (const { group: event } of filteredEvents) {
      if (event.id === eventId) return cursor + photoIdx;
      cursor += event.photos.length;
    }
    return 0;
  };

  // Stats for the hero strip
  const stats = useMemo(() => {
    const totalPhotos = allEvents.reduce((sum, e) => sum + e.group.photos.length, 0);
    const years = new Set(allEvents.map((e) => e.group.date.slice(0, 4)));
    return {
      events: allEvents.length,
      photos: totalPhotos,
      years: years.size,
    };
  }, [allEvents]);

  // Category counts (only categories present in data)
  const categoryCounts = useMemo(() => {
    const counts = new Map<CategoryKey, number>();
    for (const e of allEvents) {
      counts.set(e.rawCategory, (counts.get(e.rawCategory) ?? 0) + 1);
    }
    return counts;
  }, [allEvents]);

  const visibleCategories = useMemo(
    () => CATEGORY_KEYS.filter((k) => (categoryCounts.get(k) ?? 0) > 0),
    [categoryCounts],
  );

  // Group filtered events by year for section dividers
  const eventsByYear = useMemo(() => {
    const groups: Array<{ year: string; items: typeof filteredEvents }> = [];
    for (const ev of filteredEvents) {
      const year = ev.group.date.slice(0, 4);
      const last = groups[groups.length - 1];
      if (last && last.year === year) {
        last.items.push(ev);
      } else {
        groups.push({ year, items: [ev] });
      }
    }
    return groups;
  }, [filteredEvents]);

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
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/85 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-6 flex justify-start">
              <button
                type="button"
                onClick={() => navigateHome("home")}
                className="relative z-20 inline-flex items-center gap-1.5 rounded bg-white/10 hover:bg-white/20 px-3 py-1.5 text-white text-sm font-semibold uppercase tracking-wider backdrop-blur-sm cursor-pointer"
                aria-label={t("members.back")}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t("members.back")}</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
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

              {/* Stats strip */}
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { value: stats.events, label: t("gallery.stats.events") },
                  { value: stats.photos, label: t("gallery.stats.photos") },
                  { value: stats.years, label: t("gallery.stats.years") },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg py-4 px-2"
                  >
                    <div className="font-serif text-3xl md:text-4xl font-bold text-secondary">
                      {s.value}
                    </div>
                    <div className="text-xs md:text-sm uppercase tracking-widest text-white/80 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {category && (
                <div className="mt-6 flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white">
                    <span>{t("gallery.showing")}: {t(CATEGORY_I18N_KEY[category] as TranslationKey)}</span>
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

        {/* CATEGORY FILTER BAR */}
        <section
          className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          aria-label="Filter events by category"
        >
          <div className="container mx-auto px-4 py-4">
            <div
              role="group"
              aria-label="Event category filters"
              className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center"
            >
              <button
                type="button"
                onClick={() => setCategory(null)}
                aria-pressed={category === null}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold uppercase tracking-wider transition-all ${
                  category === null
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {t("gallery.filter.all")}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    category === null
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {allEvents.length}
                </span>
              </button>
              {visibleCategories.map((key) => {
                const Icon = CATEGORY_ICON[key];
                const isActive = category === key;
                const label = t(CATEGORY_I18N_KEY[key] as TranslationKey);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(isActive ? null : key)}
                    aria-pressed={isActive}
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split(" ")[0]}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {categoryCounts.get(key) ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* EVENTS LIST */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {filteredEvents.length === 0 && (
              <div className="text-center bg-muted border-2 border-dashed border-border p-10 rounded-lg">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">
                  {t("gallery.empty")}
                </p>
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className="text-primary font-bold uppercase tracking-wider text-sm hover:underline"
                >
                  {t("gallery.showAll")}
                </button>
              </div>
            )}

            {eventsByYear.map(({ year, items }) => (
              <div key={year} className="mb-16 last:mb-0">
                {/* Year divider */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-border"></div>
                  <div className="font-serif text-2xl md:text-3xl font-bold text-primary px-4 py-1 bg-secondary/15 rounded-full border-2 border-secondary/30">
                    {year}
                  </div>
                  <div className="h-px flex-1 bg-border"></div>
                </div>

                <div className="space-y-12">
                  {items.map(({ group: event, rawCategory }, idx) => {
                    const Icon = CATEGORY_ICON[rawCategory];
                    const hasPhotos = event.photos.length > 0;
                    return (
                      <motion.article
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.3) }}
                        className="bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        {/* Header */}
                        <div className="p-6 md:p-7 border-b border-border bg-gradient-to-r from-card to-muted/40">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-bold bg-primary/10 px-2.5 py-1 rounded-full">
                                  <Calendar className="w-3 h-3" />
                                  {localized(event.dateLabel, lang)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCategory(rawCategory)}
                                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold bg-secondary/15 hover:bg-secondary/25 text-secondary-foreground/80 px-2.5 py-1 rounded-full border border-secondary/30 transition-colors cursor-pointer"
                                  title={t(CATEGORY_I18N_KEY[rawCategory] as TranslationKey)}
                                >
                                  <Icon className="w-3 h-3" />
                                  {t(CATEGORY_I18N_KEY[rawCategory] as TranslationKey)}
                                </button>
                                {hasPhotos && (
                                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold bg-accent/15 text-accent-foreground/80 px-2.5 py-1 rounded-full border border-accent/30">
                                    <Camera className="w-3 h-3" />
                                    {event.photos.length}{" "}
                                    {event.photos.length === 1
                                      ? t("gallery.photoCount.one")
                                      : t("gallery.photoCount.many")}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight">
                                {localized(event.title, lang)}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mt-4 text-sm md:text-base">
                            {localized(event.caption, lang)}
                          </p>
                        </div>

                        {/* Photos or placeholder */}
                        {hasPhotos ? (
                          <div className="p-4 md:p-5 bg-muted/30">
                            <div
                              className={`grid gap-3 ${
                                event.photos.length === 1
                                  ? "grid-cols-1 md:grid-cols-2"
                                  : "grid-cols-2 md:grid-cols-3"
                              }`}
                            >
                              {event.photos.map((photo, photoIdx) => (
                                <button
                                  key={photo.src}
                                  onClick={() => setActiveIndex(photoIndexFor(event.id, photoIdx))}
                                  className="group relative aspect-[4/3] bg-muted overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-border hover:ring-2 hover:ring-secondary"
                                  aria-label={photo.alt}
                                >
                                  <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="px-6 md:px-7 py-5 bg-muted/40 flex items-center gap-3 text-muted-foreground">
                            <ImageIcon className="w-5 h-5 shrink-0" />
                            <span className="text-sm italic">
                              {t("gallery.noPhotos")}
                            </span>
                          </div>
                        )}
                      </motion.article>
                    );
                  })}
                </div>
              </div>
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
