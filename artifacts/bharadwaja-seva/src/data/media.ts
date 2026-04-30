import mediaUgadi2026 from "@assets/image_1777534279278.png";

export interface Trilingual {
  en: string;
  te: string;
  hi: string;
}

export interface MediaItem {
  id: string;
  src: string;
  title: Trilingual;
  source: Trilingual;
  dateLabel: Trilingual;
}

export const mediaCoverage: MediaItem[] = [
  {
    id: "ugadi-puraskaralu-2026-news",
    src: mediaUgadi2026,
    title: {
      en: "Ugadi Puraskaralu for Distinguished Women",
      te: "మహిళా శిరోమణులకు ఉగాది పురస్కారాలు",
      hi: "विशिष्ट महिलाओं को उगादि पुरस्कार",
    },
    source: {
      en: "Kakinada News Express",
      te: "కాకినాడ న్యూస్ ఎక్స్‌ప్రెస్",
      hi: "काकीनाडा न्यूज़ एक्सप्रेस",
    },
    dateLabel: {
      en: "March 2026",
      te: "మార్చి 2026",
      hi: "मार्च 2026",
    },
  },
];
