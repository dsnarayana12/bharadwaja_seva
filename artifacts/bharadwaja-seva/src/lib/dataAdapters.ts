import type { GalleryEvent, CommitteeMember as ApiCommitteeMember } from "@workspace/api-client-react";
import type { LocalizedString, ServiceCategory, EventGroup, EventPhoto, RecentPhoto } from "@/data/events";
import type { CommitteeMember, LocalizedText } from "@/data/committee";
import type { Language } from "@/i18n/translations";

export type ApiEvent = GalleryEvent;
export type ApiMember = ApiCommitteeMember;

function trio(en: string, te: string, hi: string): LocalizedString {
  return {
    en,
    te: te && te.trim() !== "" ? te : en,
    hi: hi && hi.trim() !== "" ? hi : en,
  };
}

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_TE = [
  "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్",
  "జులై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్",
];
const MONTHS_HI = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

function dateLabelFromIso(iso: string): LocalizedString {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return { en: iso, te: iso, hi: iso };
  const monthIdx = Math.max(0, Math.min(11, parseInt(m[2], 10) - 1));
  const year = m[1];
  const day = String(parseInt(m[3], 10));
  return {
    en: `${MONTHS_EN[monthIdx]} ${day}, ${year}`,
    te: `${day} ${MONTHS_TE[monthIdx]} ${year}`,
    hi: `${day} ${MONTHS_HI[monthIdx]} ${year}`,
  };
}

const VALID_CATS: ServiceCategory[] = [
  "feeding", "education", "medical", "youth", "elderly", "women", "environment", "community",
];

export function apiEventToEventGroup(e: ApiEvent): EventGroup {
  const id = String(e.id);
  const title = trio(e.titleEn, e.titleTe, e.titleHi);
  const cat = (VALID_CATS as string[]).includes(e.category) ? (e.category as ServiceCategory) : "community";
  const photos: EventPhoto[] = (e.photoUrls ?? []).map((src: string, i: number) => ({
    src,
    alt: `${e.titleEn} — photo ${i + 1}`,
  }));
  return {
    id,
    title,
    date: e.eventDate,
    dateLabel: dateLabelFromIso(e.eventDate),
    caption: trio(e.descriptionEn, e.descriptionTe, e.descriptionHi),
    photos,
    categories: [cat],
  };
}

export function apiEventCategoryRaw(e: ApiEvent): string {
  return e.category;
}

export function apiMemberToCommittee(m: ApiMember): CommitteeMember {
  return {
    name: trio(m.nameEn, m.nameTe, m.nameHi) as LocalizedText,
    role: trio(m.roleEn, m.roleTe, m.roleHi) as LocalizedText,
  };
}

export function recentPhotosFromEvents(events: ApiEvent[], limit = 4): RecentPhoto[] {
  const sorted = [...events].sort((a, b) => b.eventDate.localeCompare(a.eventDate));
  const out: RecentPhoto[] = [];
  for (const e of sorted) {
    const group = apiEventToEventGroup(e);
    for (const p of group.photos) {
      out.push({
        src: p.src,
        alt: p.alt,
        eventId: group.id,
        eventTitle: group.title,
        dateLabel: group.dateLabel,
        categories: group.categories,
      });
      if (out.length >= limit) return out;
    }
  }
  return out;
}

export function localizedFallback(value: LocalizedString | LocalizedText, lang: Language): string {
  return value[lang] || value.en;
}
