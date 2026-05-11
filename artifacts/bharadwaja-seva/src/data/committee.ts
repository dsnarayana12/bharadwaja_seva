export type LocalizedText = { en: string; te: string; hi: string };

export type CommitteeMember = {
  name: LocalizedText;
  role: LocalizedText;
};

export const officeBearers: CommitteeMember[] = [
  {
    name: { en: "Dr. I.V. Rao", te: "డా. ఐ.వి. రావు", hi: "डॉ. आई.वी. राव" },
    role: { en: "President", te: "అధ్యక్షుడు", hi: "अध्यक्ष" },
  },
  {
    name: { en: "M. Viswesara Rao", te: "ఎం. విశ్వేశ్వర రావు", hi: "एम. विश्वेश्वर राव" },
    role: { en: "Secretary", te: "కార్యదర్శి", hi: "सचिव" },
  },
  {
    name: { en: "R. Srinivasa Rao", te: "ఆర్. శ్రీనివాస రావు", hi: "आर. श्रीनिवास राव" },
    role: { en: "Treasurer", te: "కోశాధికారి", hi: "कोषाध्यक्ष" },
  },
];

export const executiveBody: CommitteeMember[] = [
  {
    name: { en: "Ayyagari Venkatesh", te: "అయ్యగారి వెంకటేష్", hi: "अय्यगारी वेंकटेश" },
    role: { en: "Vice-President", te: "ఉపాధ్యక్షుడు", hi: "उपाध्यक्ष" },
  },
  {
    name: { en: "V.S. Murali Rao", te: "వి.ఎస్. మురళి రావు", hi: "वी.एस. मुरली राव" },
    role: { en: "Joint Secretary", te: "సహాయ కార్యదర్శి", hi: "संयुक्त सचिव" },
  },
  {
    name: { en: "K.V.S. Sitaram", te: "కె.వి.ఎస్. సీతారాం", hi: "के.वी.एस. सीताराम" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు", hi: "कार्यकारिणी सदस्य" },
  },
  {
    name: { en: "Dr. Vadrevu Ravi", te: "డా. వాద్రేవు రవి", hi: "डॉ. वाद्रेवु रवि" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు", hi: "कार्यकारिणी सदस्य" },
  },
  {
    name: { en: "M. Venkata Sastry", te: "ఎం. వెంకట శాస్త్రి", hi: "एम. वेंकट शास्त्री" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు", hi: "कार्यकारिणी सदस्य" },
  },
  {
    name: { en: "Dantu Bhaskar Rao", te: "దంతు భాస్కర రావు", hi: "दंतु भास्कर राव" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు", hi: "कार्यकारिणी सदस्य" },
  },
];

const MEMBER_ROLE: LocalizedText = {
  en: "Member",
  te: "సభ్యుడు",
  hi: "सदस्य",
};

const memberNames: string[] = [
  "M.B.R. Sarma",
  "Nittala V. Rama Rao",
  "Kandala Ravindranath",
  "M.G.S. Sagar",
  "K.V.N. Mitra",
  "G.V. Krishna Prakash",
  "Dr. Metta Venkatesh",
  "Metta Radha",
  "M.V. Narayana",
  "Chaganti Siddartha",
  "Chaganti Valli Devi",
  "Vuppuluri S. Sarma",
  "Vuppuluri Srirama Laxmi",
  "B.V. Kishore Kumar",
  "B. Srivani",
  "P.V. Raghava Rao",
  "Dr. N.S. Murthy",
  "Ch. Satyanarayana",
  "T.A. Ramamohan",
  "Dr. T.V. Balakrishna",
  "Dr. P.V. Nishanth",
  "Dr. P. Madhuri",
  "Capt. A. Mallikarjuna Rao",
  "V.S.R. Murthy",
  "Vaddadi Nagini",
  "M.S.V.K. Ramasundari",
  "V. Saisri",
  "A. Padmavathi",
  "Dr. Umamaheswara Sastry",
  "Dr. T. Vaijayanthi",
  "M.V.S.L. Prasuna",
  "R. Swathi",
  "B. Amruthavalli",
  "G. Bhaskar Rao",
  "Dr. M. Nageswara Rao",
  "I. Surya Varaha Nageswari",
  "I. Srinivasa V. Chalapathi",
  "P. Subrahmanyam",
  "Dr. Kiran Vadapalli",
  "Dr. S.V. Rao",
  "I. Santi Meera",
  "K.V.S.S.N. Someswara Sarma",
  "V. Viswanatham",
  "M. Srinivasa Rao",
  "Valluri Kameswari",
  "V. Bindusree",
  "P. Umamaheswara Rao",
  "P.V.V.S.P. Rammohana Rao",
  "B. Jaya Sankara Prasad",
  "Lion P.V. Subbarao",
  "Dr. P.V. Subbarao",
  "Dr. P. Vimaladevi",
  "Dr. C.V. Rao",
  "Y. Subrahmanyam",
  "G. Srinivasa Pavan Kumar",
];

export const members: CommitteeMember[] = memberNames.map((n) => ({
  name: { en: n, te: n, hi: n },
  role: MEMBER_ROLE,
}));
