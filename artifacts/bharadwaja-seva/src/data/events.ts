export interface EventPhoto {
  src: string;
  alt: string;
}

export interface EventGroup {
  id: string;
  title: string;
  date: string;
  dateLabel: string;
  caption: string;
  photos: EventPhoto[];
}

const BASE = `${import.meta.env.BASE_URL}gallery`;

export const events: EventGroup[] = [
  {
    id: "ugadi-puraskaralu-2026",
    title: "Ugadi Puraskaralu 2026",
    date: "2026-03-19",
    dateLabel: "March 2026",
    caption:
      "Honoring distinguished women achievers across diverse fields with the Ugadi Puraskaralu 2026 awards. Chief Guest: Dr. K.V.S.G. Murali Krishna garu, Professor of Civil (Environmental) Engineering and former Vice Chancellor, JNTUK Kakinada.",
    photos: [
      {
        src: `${BASE}/ugadi-puraskaralu-2026/photo-2.jpg`,
        alt: "Ugadi Puraskaralu 2026 event banner with chief guest and award recipients",
      },
      {
        src: `${BASE}/ugadi-puraskaralu-2026/photo-1.jpg`,
        alt: "Press announcement of Ugadi Puraskaralu 2026 by Sangham leadership",
      },
    ],
  },
  {
    id: "cultural-performer-mar-2026",
    title: "Classical Dance Performance",
    date: "2026-03-15",
    dateLabel: "March 2026",
    caption:
      "Renowned classical dancer Smt. Nadiya garu, who graced the Ugadi 2026 cultural celebrations with a Bharatanatyam performance.",
    photos: [
      {
        src: `${BASE}/cultural-performer-mar-2026/photo-1.jpg`,
        alt: "Classical Bharatanatyam dancer in traditional costume",
      },
    ],
  },
  {
    id: "scholarships-nov-2025",
    title: "Scholarships for Engineering Students",
    date: "2025-11-22",
    dateLabel: "November 2025",
    caption:
      "Annual scholarships distributed to meritorious engineering and intermediate students from economically weaker backgrounds, in memory of Smt. Lakshmi Prasanna garu.",
    photos: [
      {
        src: `${BASE}/scholarships-nov-2025/photo-1.jpg`,
        alt: "Scholarship distribution ceremony to engineering and intermediate students",
      },
    ],
  },
  {
    id: "annadanam-nov-2025",
    title: "Karthika Masam Annadanam",
    date: "2025-11-19",
    dateLabel: "November 2025",
    caption:
      "Devotional Annadanam (community meal service) organized at four major temples during the auspicious Karthika Masam, with members and devotees serving meals to all.",
    photos: [
      {
        src: `${BASE}/annadanam-nov-2025/photo-1.jpg`,
        alt: "Karthika Masam Annadanam community meal service at temple",
      },
    ],
  },
  {
    id: "meritorious-students-jul-2025",
    title: "Prize Money for Class 10 Toppers",
    date: "2025-07-20",
    dateLabel: "July 2025",
    caption:
      "Distribution of prize money to meritorious Class 10 students of academic year 2024-25. Chief Guest: Brahmasri Chaganti Koteswara Rao garu, AP's Advisor on Student Ethics.",
    photos: [
      {
        src: `${BASE}/meritorious-students-jul-2025/photo-1.jpg`,
        alt: "Invitation to prize money distribution for meritorious Class 10 students",
      },
    ],
  },
  {
    id: "chalivendram-apr-2025",
    title: "Bharadwaja Chalivendram Inauguration",
    date: "2025-04-15",
    dateLabel: "April 2025",
    caption:
      "Inauguration of the Bharadwaja Chalivendram (free drinking water station) at Ramaraopeta Subbayya Hotel Junction, Kakinada — providing cool drinking water and buttermilk to the community for 45 days during summer.",
    photos: [
      {
        src: `${BASE}/chalivendram-apr-2025/photo-1.jpg`,
        alt: "Bharadwaja Chalivendram inauguration with Sangham members and local community",
      },
    ],
  },
];

const eventsByDateDesc = [...events].sort((a, b) => b.date.localeCompare(a.date));

export const allPhotos = eventsByDateDesc.flatMap((e) =>
  e.photos.map((p) => ({ ...p, eventId: e.id, eventTitle: e.title, dateLabel: e.dateLabel }))
);

export const recentPhotos = allPhotos.slice(0, 4);
