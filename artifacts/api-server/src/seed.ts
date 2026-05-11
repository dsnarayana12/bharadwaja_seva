import { sql } from "drizzle-orm";
import {
  db,
  galleryEventsTable,
  committeeMembersTable,
} from "@workspace/db";
import { logger } from "./lib/logger";

interface SeedEvent {
  titleEn: string;
  titleTe: string;
  titleHi: string;
  descriptionEn: string;
  descriptionTe: string;
  descriptionHi: string;
  eventDate: string;
  category: string;
  photoUrls: string[];
}

interface SeedMember {
  nameEn: string;
  nameTe: string;
  nameHi: string;
  roleEn: string;
  roleTe: string;
  roleHi: string;
  groupKey: string;
}

const SEED_EVENTS: SeedEvent[] = [
  {
    titleEn: "Ugadi Puraskaralu 2026",
    titleTe: "ఉగాది పురస్కారాలు 2026",
    titleHi: "उगादि पुरस्कारलु 2026",
    descriptionEn:
      "Honoring distinguished women achievers across diverse fields with the Ugadi Puraskaralu 2026 awards. Chief Guest: Dr. K.V.S.G. Murali Krishna garu, Professor of Civil (Environmental) Engineering and former Vice Chancellor, JNTUK Kakinada.",
    descriptionTe:
      "ఉగాది పురస్కారాలు 2026 ద్వారా వివిధ రంగాలలో ప్రతిభ కనబరిచిన ప్రముఖ మహిళలను సన్మానించడం. ముఖ్య అతిథి: డాక్టర్ కె.వి.ఎస్.జి. మురళీ కృష్ణ గారు, సివిల్ (ఎన్విరాన్‌మెంటల్) ఇంజనీరింగ్ ప్రొఫెసర్ మరియు మాజీ ఉపకులపతి, JNTUK కాకినాడ.",
    descriptionHi:
      "उगादि पुरस्कारलु 2026 के माध्यम से विभिन्न क्षेत्रों में उल्लेखनीय कार्य करने वाली प्रतिष्ठित महिलाओं को सम्मानित करना। मुख्य अतिथि: डॉ. के.वी.एस.जी. मुरली कृष्णा गारू, सिविल (पर्यावरण) इंजीनियरिंग के प्रोफेसर एवं पूर्व कुलपति, JNTUK काकीनाडा।",
    eventDate: "2026-03-19",
    category: "women",
    photoUrls: [
      "/gallery/ugadi-puraskaralu-2026/photo-2.jpg",
      "/gallery/ugadi-puraskaralu-2026/photo-1.jpg",
    ],
  },
  {
    titleEn: "Classical Dance Performance",
    titleTe: "శాస్త్రీయ నృత్య ప్రదర్శన",
    titleHi: "शास्त्रीय नृत्य प्रदर्शन",
    descriptionEn:
      "Renowned classical dancer Smt. Nadiya garu, who graced the Ugadi 2026 cultural celebrations with a Bharatanatyam performance.",
    descriptionTe:
      "ఉగాది 2026 సాంస్కృతిక వేడుకలను భరతనాట్య ప్రదర్శనతో అలంకరించిన ప్రముఖ శాస్త్రీయ నృత్య కళాకారిణి శ్రీమతి నదియ గారు.",
    descriptionHi:
      "उगादि 2026 के सांस्कृतिक उत्सव में भरतनाट्यम प्रस्तुति से शोभा बढ़ाने वाली प्रसिद्ध शास्त्रीय नर्तकी श्रीमती नदिया गारू।",
    eventDate: "2026-03-15",
    category: "community",
    photoUrls: ["/gallery/cultural-performer-mar-2026/photo-1.jpg"],
  },
  {
    titleEn: "Ugadi Puraskaralu 2025",
    titleTe: "ఉగాది పురస్కారాలు 2025",
    titleHi: "उगादि पुरस्कारलु 2025",
    descriptionEn:
      "Ugadi Puraskaralu 2025 awards ceremony on Sri Vishvavasu Nama Samvatsara Ugadi. Chief Guest: Pujyulu Brahmasri Chaganti Koteswara Rao garu, Andhra Pradesh's Advisor on Student Ethics, Spirituality and Welfare, alongside Sangham elders and dignitaries on stage.",
    descriptionTe:
      "శ్రీ విశ్వావసు నామ సంవత్సర ఉగాది శుభాకాంక్షలతో నిర్వహించిన ఉగాది పురస్కారాలు 2025 పురస్కార ప్రదానోత్సవం. ముఖ్య అతిథి: పూజ్యులు బ్రహ్మశ్రీ చాగంటి కోటేశ్వర రావు గారు, ఆంధ్రప్రదేశ్ విద్యార్థి నైతికత, ఆధ్యాత్మికత మరియు సంక్షేమ సలహాదారు, వేదికపై సంఘం పెద్దలు మరియు ప్రముఖులతో కలిసి.",
    descriptionHi:
      "श्री विश्वावसु नाम संवत्सर उगादि पर आयोजित उगादि पुरस्कारलु 2025 पुरस्कार समारोह। मुख्य अतिथि: पूज्य ब्रह्मश्री चागंटि कोटेश्वर राव गारू, आंध्र प्रदेश के छात्र नैतिकता, आध्यात्मिकता एवं कल्याण सलाहकार, मंच पर संघम के वरिष्ठों एवं गणमान्य व्यक्तियों के साथ।",
    eventDate: "2025-03-30",
    category: "women",
    photoUrls: [
      "/gallery/ugadi-puraskaralu-2025/photo-2.jpg",
      "/gallery/ugadi-puraskaralu-2025/photo-1.jpg",
    ],
  },
  {
    titleEn: "Scholarships for Engineering Students",
    titleTe: "ఇంజనీరింగ్ విద్యార్థులకు ఉపకార వేతనాలు",
    titleHi: "इंजीनियरिंग छात्रों को छात्रवृत्ति",
    descriptionEn:
      "Annual scholarships distributed to meritorious engineering and intermediate students from economically weaker backgrounds, in memory of Smt. Lakshmi Prasanna garu.",
    descriptionTe:
      "శ్రీమతి లక్ష్మీ ప్రసన్న గారి జ్ఞాపకార్థం, ఆర్థికంగా బలహీన నేపథ్యాల నుండి ప్రతిభావంతులైన ఇంజనీరింగ్ మరియు ఇంటర్మీడియట్ విద్యార్థులకు అందజేసిన వార్షిక ఉపకార వేతనాలు.",
    descriptionHi:
      "श्रीमती लक्ष्मी प्रसन्ना गारू की स्मृति में, आर्थिक रूप से कमज़ोर पृष्ठभूमि के मेधावी इंजीनियरिंग एवं इंटरमीडिएट छात्रों को प्रदान की गई वार्षिक छात्रवृत्ति।",
    eventDate: "2025-11-22",
    category: "education",
    photoUrls: ["/gallery/scholarships-nov-2025/photo-1.jpg"],
  },
  {
    titleEn: "Karthika Masam Annadanam",
    titleTe: "కార్తీక మాస అన్నదానం",
    titleHi: "कार्तिक मास अन्नदानम",
    descriptionEn:
      "Devotional Annadanam (community meal service) organized at four major temples during the auspicious Karthika Masam, with members and devotees serving meals to all.",
    descriptionTe:
      "పవిత్ర కార్తీక మాసంలో నాలుగు ప్రముఖ దేవాలయాలలో నిర్వహించిన భక్తి అన్నదానం, సంఘం సభ్యులు మరియు భక్తులు అందరికీ భోజనం వడ్డించారు.",
    descriptionHi:
      "पवित्र कार्तिक मास के दौरान चार प्रमुख मंदिरों में आयोजित भक्ति अन्नदानम (सामुदायिक भोजन सेवा), जिसमें संघम सदस्यों एवं भक्तों ने सभी को भोजन परोसा।",
    eventDate: "2025-11-19",
    category: "feeding",
    photoUrls: ["/gallery/annadanam-nov-2025/photo-1.jpg"],
  },
  {
    titleEn: "Prize Money for Class 10 Toppers",
    titleTe: "10వ తరగతి ఉత్తీర్ణులకు బహుమతి",
    titleHi: "10वीं कक्षा के टॉपर्स को पुरस्कार राशि",
    descriptionEn:
      "Distribution of prize money to meritorious Class 10 students of academic year 2024-25. Chief Guest: Brahmasri Chaganti Koteswara Rao garu, AP's Advisor on Student Ethics.",
    descriptionTe:
      "2024-25 విద్యా సంవత్సరానికి ప్రతిభావంతులైన 10వ తరగతి విద్యార్థులకు బహుమతి సొమ్ము పంపిణీ. ముఖ్య అతిథి: బ్రహ్మశ్రీ చాగంటి కోటేశ్వర రావు గారు, AP విద్యార్థి నీతుల సలహాదారు.",
    descriptionHi:
      "शैक्षणिक वर्ष 2024-25 के मेधावी 10वीं कक्षा के छात्रों को पुरस्कार राशि का वितरण। मुख्य अतिथि: ब्रह्मश्री चागंटि कोटेश्वर राव गारू, AP के छात्र नैतिकता सलाहकार।",
    eventDate: "2025-07-20",
    category: "education",
    photoUrls: ["/gallery/meritorious-students-jul-2025/photo-1.jpg"],
  },
  {
    titleEn: "Bharadwaja Chalivendram Inauguration",
    titleTe: "భరద్వాజ చలివేంద్రం ప్రారంభోత్సవం",
    titleHi: "भरद्वाज चलिवेंद्रम् उद्घाटन",
    descriptionEn:
      "Inauguration of the Bharadwaja Chalivendram (free drinking water station) at Ramaraopeta Subbayya Hotel Junction, Kakinada — providing cool drinking water and buttermilk to the community for 45 days during summer.",
    descriptionTe:
      "కాకినాడ రామారావుపేట సుబ్బయ్య హోటల్ జంక్షన్ వద్ద భరద్వాజ చలివేంద్రం (ఉచిత తాగునీటి కేంద్రం) ప్రారంభోత్సవం — వేసవిలో 45 రోజుల పాటు సమాజానికి చల్లని తాగునీరు మరియు మజ్జిగ అందజేస్తుంది.",
    descriptionHi:
      "काकीनाडा रामाराओपेटा सुब्बय्या होटल जंक्शन पर भरद्वाज चलिवेंद्रम् (मुफ़्त पेयजल केंद्र) का उद्घाटन — गर्मियों में 45 दिनों तक समुदाय को ठंडा पेयजल एवं छाछ उपलब्ध कराता है।",
    eventDate: "2025-04-15",
    category: "feeding",
    photoUrls: ["/gallery/chalivendram-apr-2025/photo-1.jpg"],
  },
];

const OFFICE_BEARERS: Array<[string, string, string, string, string, string]> = [
  ["Dr. I.V. Rao", "డా. ఐ.వి. రావు", "डॉ. आई.वी. राव", "President", "అధ్యక్షుడు", "अध्यक्ष"],
  ["M. Viswesara Rao", "ఎం. విశ్వేశ్వర రావు", "एम. विश्वेश्वर राव", "Secretary", "కార్యదర్శి", "सचिव"],
  ["R. Srinivasa Rao", "ఆర్. శ్రీనివాస రావు", "आर. श्रीनिवास राव", "Treasurer", "కోశాధికారి", "कोषाध्यक्ष"],
];

const EXECUTIVE_BODY: Array<[string, string, string, string, string, string]> = [
  ["Ayyagari Venkatesh", "అయ్యగారి వెంకటేష్", "अय्यगारी वेंकटेश", "Vice-President", "ఉపాధ్యక్షుడు", "उपाध्यक्ष"],
  ["V.S. Murali Rao", "వి.ఎస్. మురళి రావు", "वी.एस. मुरली राव", "Joint Secretary", "సహాయ కార్యదర్శి", "संयुक्त सचिव"],
  ["K.V.S. Sitaram", "కె.వి.ఎస్. సీతారాం", "के.वी.एस. सीताराम", "E.C. Member", "కార్యవర్గ సభ్యుడు", "कार्यकारिणी सदस्य"],
  ["Dr. Vadrevu Ravi", "డా. వాద్రేవు రవి", "डॉ. वाद्रेवु रवि", "E.C. Member", "కార్యవర్గ సభ్యుడు", "कार्यकारिणी सदस्य"],
  ["M. Venkata Sastry", "ఎం. వెంకట శాస్త్రి", "एम. वेंकट शास्त्री", "E.C. Member", "కార్యవర్గ సభ్యుడు", "कार्यकारिणी सदस्य"],
  ["Dantu Bhaskar Rao", "దంతు భాస్కర రావు", "दंतु भास्कर राव", "E.C. Member", "కార్యవర్గ సభ్యుడు", "कार्यकारिणी सदस्य"],
];

const MEMBER_NAMES = [
  "M.B.R. Sarma", "Nittala V. Rama Rao", "Kandala Ravindranath", "M.G.S. Sagar",
  "K.V.N. Mitra", "G.V. Krishna Prakash", "Dr. Metta Venkatesh", "Metta Radha",
  "M.V. Narayana", "Chaganti Siddartha", "Chaganti Valli Devi", "Vuppuluri S. Sarma",
  "Vuppuluri Srirama Laxmi", "B.V. Kishore Kumar", "B. Srivani", "P.V. Raghava Rao",
  "Dr. N.S. Murthy", "Ch. Satyanarayana", "T.A. Ramamohan", "Dr. T.V. Balakrishna",
  "Dr. P.V. Nishanth", "Dr. P. Madhuri", "Capt. A. Mallikarjuna Rao", "V.S.R. Murthy",
  "Vaddadi Nagini", "M.S.V.K. Ramasundari", "V. Saisri", "A. Padmavathi",
  "Dr. Umamaheswara Sastry", "Dr. T. Vaijayanthi", "M.V.S.L. Prasuna", "R. Swathi",
  "B. Amruthavalli", "G. Bhaskar Rao", "Dr. M. Nageswara Rao", "I. Surya Varaha Nageswari",
  "I. Srinivasa V. Chalapathi", "P. Subrahmanyam", "Dr. Kiran Vadapalli", "Dr. S.V. Rao",
  "I. Santi Meera", "K.V.S.S.N. Someswara Sarma", "V. Viswanatham", "M. Srinivasa Rao",
  "Valluri Kameswari", "V. Bindusree", "P. Umamaheswara Rao", "P.V.V.S.P. Rammohana Rao",
  "B. Jaya Sankara Prasad", "Lion P.V. Subbarao", "Dr. P.V. Subbarao", "Dr. P. Vimaladevi",
  "Dr. C.V. Rao", "Y. Subrahmanyam", "G. Srinivasa Pavan Kumar",
];

function buildSeedMembers(): SeedMember[] {
  const out: SeedMember[] = [];
  OFFICE_BEARERS.forEach(([nameEn, nameTe, nameHi, roleEn, roleTe, roleHi]) => {
    out.push({ nameEn, nameTe, nameHi, roleEn, roleTe, roleHi, groupKey: "office_bearers" });
  });
  EXECUTIVE_BODY.forEach(([nameEn, nameTe, nameHi, roleEn, roleTe, roleHi]) => {
    out.push({ nameEn, nameTe, nameHi, roleEn, roleTe, roleHi, groupKey: "executive_body" });
  });
  MEMBER_NAMES.forEach((name) => {
    out.push({
      nameEn: name, nameTe: name, nameHi: name,
      roleEn: "Member", roleTe: "సభ్యుడు", roleHi: "सदस्य",
      groupKey: "members",
    });
  });
  return out;
}

export async function seedIfEmpty(): Promise<void> {
  try {
    const eventCount = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(galleryEventsTable);
    if ((eventCount[0]?.c ?? 0) === 0) {
      await db.insert(galleryEventsTable).values(SEED_EVENTS);
      logger.info({ count: SEED_EVENTS.length }, "Seeded gallery_events");
    }

    const memberCount = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(committeeMembersTable);
    if ((memberCount[0]?.c ?? 0) === 0) {
      const members = buildSeedMembers();
      await db.insert(committeeMembersTable).values(
        members.map((m, i) => ({ ...m, sortOrder: i })),
      );
      logger.info({ count: members.length }, "Seeded committee_members");
    }
  } catch (err) {
    logger.error({ err }, "Seed failed");
  }
}
