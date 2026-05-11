import { motion } from "framer-motion";
import { Crown, User } from "lucide-react";
import type { CommitteeMember } from "@/data/committee";
import type { Language } from "@/i18n/translations";

export function CommitteeCard({
  member,
  lang,
  index,
  featured = false,
}: {
  member: CommitteeMember;
  lang: Language;
  index: number;
  featured?: boolean;
}) {
  const Icon = featured ? Crown : User;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index, 12) * 0.04 }}
      className={`group bg-white shadow-md hover:shadow-xl transition-all border-l-4 ${
        featured ? "border-secondary" : "border-primary"
      } p-5 flex items-start gap-4`}
    >
      <div
        className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
          featured
            ? "bg-secondary/10 text-secondary"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-serif font-bold text-base md:text-lg text-foreground leading-tight">
          {member.name[lang]}
        </p>
        <p
          className={`mt-1 text-xs md:text-sm uppercase tracking-wider font-bold ${
            featured ? "text-secondary" : "text-primary"
          }`}
        >
          {member.role[lang]}
        </p>
      </div>
    </motion.div>
  );
}
