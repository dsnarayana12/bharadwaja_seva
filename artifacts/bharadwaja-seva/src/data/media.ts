import mediaUgadi2026 from "@assets/image_1777534279278.png";

export interface Bilingual {
  en: string;
  te: string;
}

export interface MediaItem {
  id: string;
  src: string;
  title: Bilingual;
  source: Bilingual;
  dateLabel: Bilingual;
}

export const mediaCoverage: MediaItem[] = [
  {
    id: "ugadi-puraskaralu-2026-news",
    src: mediaUgadi2026,
    title: {
      en: "Ugadi Puraskaralu for Distinguished Women",
      te: "మహిళా శిరోమణులకు ఉగాది పురస్కారాలు",
    },
    source: {
      en: "Kakinada News Express",
      te: "కాకినాడ న్యూస్ ఎక్స్‌ప్రెస్",
    },
    dateLabel: {
      en: "March 2026",
      te: "మార్చి 2026",
    },
  },
];
