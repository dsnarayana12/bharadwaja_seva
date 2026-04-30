export type CommitteeMember = {
  name: { en: string; te: string };
  role: { en: string; te: string };
};

export const officeBearers: CommitteeMember[] = [
  {
    name: { en: "Dr. I.V. Rao", te: "డా. ఐ.వి. రావు" },
    role: { en: "President", te: "అధ్యక్షుడు" },
  },
  {
    name: { en: "M. Viswesara Rao", te: "ఎం. విశ్వేశ్వర రావు" },
    role: { en: "Secretary", te: "కార్యదర్శి" },
  },
  {
    name: { en: "R. Srinivasa Rao", te: "ఆర్. శ్రీనివాస రావు" },
    role: { en: "Treasurer", te: "కోశాధికారి" },
  },
];

export const executiveBody: CommitteeMember[] = [
  {
    name: { en: "Ayyagari Venkatesh", te: "అయ్యగారి వెంకటేష్" },
    role: { en: "Vice-President", te: "ఉపాధ్యక్షుడు" },
  },
  {
    name: { en: "V.S. Murali Rao", te: "వి.ఎస్. మురళి రావు" },
    role: { en: "Joint Secretary", te: "సహాయ కార్యదర్శి" },
  },
  {
    name: { en: "Dantu Bhaskar Rao", te: "దంతు భాస్కర రావు" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు" },
  },
  {
    name: { en: "K.V.S. Sitaram", te: "కె.వి.ఎస్. సీతారాం" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు" },
  },
  {
    name: { en: "Dr. Vadrevu Ravi", te: "డా. వాద్రేవు రవి" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు" },
  },
  {
    name: { en: "M. Venkata Sastry", te: "ఎం. వెంకట శాస్త్రి" },
    role: { en: "E.C. Member", te: "కార్యవర్గ సభ్యుడు" },
  },
];
