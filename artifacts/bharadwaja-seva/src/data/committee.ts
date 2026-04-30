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
