import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ photos, index, onClose, onNext, onPrev }: LightboxProps) {
  const { t } = useLanguage();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    // Save the trigger and move focus into the lightbox.
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      // Restore focus to the trigger element on close.
      previouslyFocusedRef.current?.focus?.();
    };
  }, [onClose, onNext, onPrev]);

  // Preload the neighbours so arrow navigation feels instant.
  useEffect(() => {
    const preload = (i: number) => {
      const p = photos[i];
      if (p) {
        const img = new Image();
        img.src = p.src;
      }
    };
    preload((index + 1) % photos.length);
    preload((index - 1 + photos.length) % photos.length);
  }, [index, photos]);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={t("lightbox.dialog")}
      >
        <button
          ref={closeBtnRef}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 text-white hover:text-accent transition-colors p-2 rounded-full bg-black/50 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={t("lightbox.close")}
        >
          <X size={28} />
        </button>

        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-2 md:left-6 z-10 text-white hover:text-accent transition-colors p-2 rounded-full bg-black/50 hover:bg-black/70"
              aria-label={t("lightbox.prev")}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 md:right-6 z-10 text-white hover:text-accent transition-colors p-2 rounded-full bg-black/50 hover:bg-black/70"
              aria-label={t("lightbox.next")}
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        <motion.div
          key={photo.src}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-w-full max-h-[80vh] object-contain shadow-2xl"
          />
          {photo.caption && (
            <p className="text-white/90 text-sm md:text-base text-center mt-4 max-w-3xl px-4">
              {photo.caption}
            </p>
          )}
          {photos.length > 1 && (
            <p className="text-white/60 text-xs mt-2">
              {index + 1} / {photos.length}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
