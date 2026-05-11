import type { Language } from "@/i18n/translations";

export interface EventPhoto {
  src: string;
  alt: string;
}

export interface LocalizedString {
  en: string;
  te: string;
  hi: string;
}

export type ServiceCategory =
  | "feeding"
  | "education"
  | "medical"
  | "youth"
  | "elderly"
  | "women"
  | "environment"
  | "community";

export interface EventGroup {
  id: string;
  title: LocalizedString;
  date: string;
  dateLabel: LocalizedString;
  caption: LocalizedString;
  photos: EventPhoto[];
  categories: ServiceCategory[];
}

const BASE = `${import.meta.env.BASE_URL}gallery`;

export const events: EventGroup[] = [
  {
    id: "ugadi-puraskaralu-2026",
    title: {
      en: "Ugadi Puraskaralu 2026",
      te: "ఉగాది పురస్కారాలు 2026",
      hi: "उगादि पुरस्कारलु 2026",
    },
    date: "2026-03-19",
    dateLabel: {
      en: "March 2026",
      te: "మార్చి 2026",
      hi: "मार्च 2026",
    },
    caption: {
      en: "Honoring distinguished women achievers across diverse fields with the Ugadi Puraskaralu 2026 awards. Chief Guest: Dr. K.V.S.G. Murali Krishna garu, Professor of Civil (Environmental) Engineering and former Vice Chancellor, JNTUK Kakinada.",
      te: "ఉగాది పురస్కారాలు 2026 ద్వారా వివిధ రంగాలలో ప్రతిభ కనబరిచిన ప్రముఖ మహిళలను సన్మానించడం. ముఖ్య అతిథి: డాక్టర్ కె.వి.ఎస్.జి. మురళీ కృష్ణ గారు, సివిల్ (ఎన్విరాన్‌మెంటల్) ఇంజనీరింగ్ ప్రొఫెసర్ మరియు మాజీ ఉపకులపతి, JNTUK కాకినాడ.",
      hi: "उगादि पुरस्कारलु 2026 के माध्यम से विभिन्न क्षेत्रों में उल्लेखनीय कार्य करने वाली प्रतिष्ठित महिलाओं को सम्मानित करना। मुख्य अतिथि: डॉ. के.वी.एस.जी. मुरली कृष्णा गारू, सिविल (पर्यावरण) इंजीनियरिंग के प्रोफेसर एवं पूर्व कुलपति, JNTUK काकीनाडा।",
    },
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
    categories: ["women", "community"],
  },
  {
    id: "cultural-performer-mar-2026",
    title: {
      en: "Classical Dance Performance",
      te: "శాస్త్రీయ నృత్య ప్రదర్శన",
      hi: "शास्त्रीय नृत्य प्रदर्शन",
    },
    date: "2026-03-15",
    dateLabel: {
      en: "March 2026",
      te: "మార్చి 2026",
      hi: "मार्च 2026",
    },
    caption: {
      en: "Renowned classical dancer Smt. Nadiya garu, who graced the Ugadi 2026 cultural celebrations with a Bharatanatyam performance.",
      te: "ఉగాది 2026 సాంస్కృతిక వేడుకలను భరతనాట్య ప్రదర్శనతో అలంకరించిన ప్రముఖ శాస్త్రీయ నృత్య కళాకారిణి శ్రీమతి నదియ గారు.",
      hi: "उगादि 2026 के सांस्कृतिक उत्सव में भरतनाट्यम प्रस्तुति से शोभा बढ़ाने वाली प्रसिद्ध शास्त्रीय नर्तकी श्रीमती नदिया गारू।",
    },
    photos: [
      {
        src: `${BASE}/cultural-performer-mar-2026/photo-1.jpg`,
        alt: "Classical Bharatanatyam dancer in traditional costume",
      },
    ],
    categories: ["community"],
  },
  {
    id: "ugadi-puraskaralu-2025",
    title: {
      en: "Ugadi Puraskaralu 2025",
      te: "ఉగాది పురస్కారాలు 2025",
      hi: "उगादि पुरस्कारलु 2025",
    },
    date: "2025-03-30",
    dateLabel: {
      en: "March 2025",
      te: "మార్చి 2025",
      hi: "मार्च 2025",
    },
    caption: {
      en: "Ugadi Puraskaralu 2025 awards ceremony on Sri Vishvavasu Nama Samvatsara Ugadi. Chief Guest: Pujyulu Brahmasri Chaganti Koteswara Rao garu, Andhra Pradesh's Advisor on Student Ethics, Spirituality and Welfare, alongside Sangham elders and dignitaries on stage.",
      te: "శ్రీ విశ్వావసు నామ సంవత్సర ఉగాది శుభాకాంక్షలతో నిర్వహించిన ఉగాది పురస్కారాలు 2025 పురస్కార ప్రదానోత్సవం. ముఖ్య అతిథి: పూజ్యులు బ్రహ్మశ్రీ చాగంటి కోటేశ్వర రావు గారు, ఆంధ్రప్రదేశ్ విద్యార్థి నైతికత, ఆధ్యాత్మికత మరియు సంక్షేమ సలహాదారు, వేదికపై సంఘం పెద్దలు మరియు ప్రముఖులతో కలిసి.",
      hi: "श्री विश्वावसु नाम संवत्सर उगादि पर आयोजित उगादि पुरस्कारलु 2025 पुरस्कार समारोह। मुख्य अतिथि: पूज्य ब्रह्मश्री चागंटि कोटेश्वर राव गारू, आंध्र प्रदेश के छात्र नैतिकता, आध्यात्मिकता एवं कल्याण सलाहकार, मंच पर संघम के वरिष्ठों एवं गणमान्य व्यक्तियों के साथ।",
    },
    photos: [
      {
        src: `${BASE}/ugadi-puraskaralu-2025/photo-2.jpg`,
        alt: "Ugadi Puraskaralu 2025 ceremony on stage with chief guest Brahmasri Chaganti Koteswara Rao garu and Sangham dignitaries",
      },
      {
        src: `${BASE}/ugadi-puraskaralu-2025/photo-1.jpg`,
        alt: "Ornate Telugu invitation card for the Ugadi Puraskaralu 2025 awards ceremony",
      },
    ],
    categories: ["women", "community"],
  },
  {
    id: "scholarships-nov-2025",
    title: {
      en: "Scholarships for Engineering Students",
      te: "ఇంజనీరింగ్ విద్యార్థులకు ఉపకార వేతనాలు",
      hi: "इंजीनियरिंग छात्रों को छात्रवृत्ति",
    },
    date: "2025-11-22",
    dateLabel: {
      en: "November 2025",
      te: "నవంబర్ 2025",
      hi: "नवंबर 2025",
    },
    caption: {
      en: "Annual scholarships distributed to meritorious engineering and intermediate students from economically weaker backgrounds, in memory of Smt. Lakshmi Prasanna garu.",
      te: "శ్రీమతి లక్ష్మీ ప్రసన్న గారి జ్ఞాపకార్థం, ఆర్థికంగా బలహీన నేపథ్యాల నుండి ప్రతిభావంతులైన ఇంజనీరింగ్ మరియు ఇంటర్మీడియట్ విద్యార్థులకు అందజేసిన వార్షిక ఉపకార వేతనాలు.",
      hi: "श्रीमती लक्ष्मी प्रसन्ना गारू की स्मृति में, आर्थिक रूप से कमज़ोर पृष्ठभूमि के मेधावी इंजीनियरिंग एवं इंटरमीडिएट छात्रों को प्रदान की गई वार्षिक छात्रवृत्ति।",
    },
    photos: [
      {
        src: `${BASE}/scholarships-nov-2025/photo-1.jpg`,
        alt: "Scholarship distribution ceremony to engineering and intermediate students",
      },
    ],
    categories: ["education", "youth"],
  },
  {
    id: "annadanam-nov-2025",
    title: {
      en: "Karthika Masam Annadanam",
      te: "కార్తీక మాస అన్నదానం",
      hi: "कार्तिक मास अन्नदानम",
    },
    date: "2025-11-19",
    dateLabel: {
      en: "November 2025",
      te: "నవంబర్ 2025",
      hi: "नवंबर 2025",
    },
    caption: {
      en: "Devotional Annadanam (community meal service) organized at four major temples during the auspicious Karthika Masam, with members and devotees serving meals to all.",
      te: "పవిత్ర కార్తీక మాసంలో నాలుగు ప్రముఖ దేవాలయాలలో నిర్వహించిన భక్తి అన్నదానం, సంఘం సభ్యులు మరియు భక్తులు అందరికీ భోజనం వడ్డించారు.",
      hi: "पवित्र कार्तिक मास के दौरान चार प्रमुख मंदिरों में आयोजित भक्ति अन्नदानम (सामुदायिक भोजन सेवा), जिसमें संघम सदस्यों एवं भक्तों ने सभी को भोजन परोसा।",
    },
    photos: [
      {
        src: `${BASE}/annadanam-nov-2025/photo-1.jpg`,
        alt: "Karthika Masam Annadanam community meal service at temple",
      },
    ],
    categories: ["feeding", "community"],
  },
  {
    id: "meritorious-students-jul-2025",
    title: {
      en: "Prize Money for Class 10 Toppers",
      te: "10వ తరగతి ఉత్తీర్ణులకు బహుమతి",
      hi: "10वीं कक्षा के टॉपर्स को पुरस्कार राशि",
    },
    date: "2025-07-20",
    dateLabel: {
      en: "July 2025",
      te: "జులై 2025",
      hi: "जुलाई 2025",
    },
    caption: {
      en: "Distribution of prize money to meritorious Class 10 students of academic year 2024-25. Chief Guest: Brahmasri Chaganti Koteswara Rao garu, AP's Advisor on Student Ethics.",
      te: "2024-25 విద్యా సంవత్సరానికి ప్రతిభావంతులైన 10వ తరగతి విద్యార్థులకు బహుమతి సొమ్ము పంపిణీ. ముఖ్య అతిథి: బ్రహ్మశ్రీ చాగంటి కోటేశ్వర రావు గారు, AP విద్యార్థి నీతుల సలహాదారు.",
      hi: "शैक्षणिक वर्ष 2024-25 के मेधावी 10वीं कक्षा के छात्रों को पुरस्कार राशि का वितरण। मुख्य अतिथि: ब्रह्मश्री चागंटि कोटेश्वर राव गारू, AP के छात्र नैतिकता सलाहकार।",
    },
    photos: [
      {
        src: `${BASE}/meritorious-students-jul-2025/photo-1.jpg`,
        alt: "Invitation to prize money distribution for meritorious Class 10 students",
      },
    ],
    categories: ["education", "youth"],
  },
  {
    id: "chalivendram-apr-2025",
    title: {
      en: "Bharadwaja Chalivendram Inauguration",
      te: "భరద్వాజ చలివేంద్రం ప్రారంభోత్సవం",
      hi: "भरद्वाज चलिवेंद्रम् उद्घाटन",
    },
    date: "2025-04-15",
    dateLabel: {
      en: "April 2025",
      te: "ఏప్రిల్ 2025",
      hi: "अप्रैल 2025",
    },
    caption: {
      en: "Inauguration of the Bharadwaja Chalivendram (free drinking water station) at Ramaraopeta Subbayya Hotel Junction, Kakinada — providing cool drinking water and buttermilk to the community for 45 days during summer.",
      te: "కాకినాడ రామారావుపేట సుబ్బయ్య హోటల్ జంక్షన్ వద్ద భరద్వాజ చలివేంద్రం (ఉచిత తాగునీటి కేంద్రం) ప్రారంభోత్సవం — వేసవిలో 45 రోజుల పాటు సమాజానికి చల్లని తాగునీరు మరియు మజ్జిగ అందజేస్తుంది.",
      hi: "काकीनाडा रामाराओपेटा सुब्बय्या होटल जंक्शन पर भरद्वाज चलिवेंद्रम् (मुफ़्त पेयजल केंद्र) का उद्घाटन — गर्मियों में 45 दिनों तक समुदाय को ठंडा पेयजल एवं छाछ उपलब्ध कराता है।",
    },
    photos: [
      {
        src: `${BASE}/chalivendram-apr-2025/photo-1.jpg`,
        alt: "Bharadwaja Chalivendram inauguration with Sangham members and local community",
      },
    ],
    categories: ["feeding", "community", "environment"],
  },
];

export interface RecentPhoto {
  src: string;
  alt: string;
  eventId: string;
  eventTitle: LocalizedString;
  dateLabel: LocalizedString;
  categories: ServiceCategory[];
}

const eventsByDateDesc = [...events].sort((a, b) => b.date.localeCompare(a.date));

export const allPhotos: RecentPhoto[] = eventsByDateDesc.flatMap((e) =>
  e.photos.map((p) => ({
    src: p.src,
    alt: p.alt,
    eventId: e.id,
    eventTitle: e.title,
    dateLabel: e.dateLabel,
    categories: e.categories,
  }))
);

export const recentPhotos: RecentPhoto[] = allPhotos.slice(0, 4);

export function photosForCategory(cat: ServiceCategory): RecentPhoto[] {
  return allPhotos.filter((p) => p.categories.includes(cat));
}

export function localized(value: LocalizedString, lang: Language): string {
  return value[lang] ?? value.en;
}
