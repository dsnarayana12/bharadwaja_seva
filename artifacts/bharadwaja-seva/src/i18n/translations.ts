export type Language = "en" | "te";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    "brand.name": "Bharadwaja Seva Sangham",
    "brand.tagline": "Serving Humanity",

    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "What We Do",
    "nav.gallery": "Gallery",
    "nav.values": "Values",
    "nav.contact": "Contact",
    "nav.donate": "Contribute Now",
    "nav.lang.label": "Language",
    "nav.lang.english": "EN",
    "nav.lang.telugu": "తె",

    "hero.title": "Serving Humanity with Compassion and Purpose",
    "hero.subtitle":
      "A charitable, non-profit organization based in Kakinada, Andhra Pradesh, dedicated to uplifting the underprivileged.",
    "hero.cta.contribute": "Make a Contribution",
    "hero.cta.initiatives": "Our Initiatives",

    "ticker.label": "Latest Update",
    "ticker.text":
      "Upcoming Event: UGADI PURASKARALU 2025 — Join us in celebrating cultural excellence and community service.",

    "about.title.a": "About ",
    "about.title.b": "Bharadwaja Seva Sangham",
    "about.p1":
      "Based in Kakinada, Andhra Pradesh, Bharadwaja Seva Sangham is a charitable, non-profit organization with a deep-rooted commitment to social welfare. We believe that true spirituality is expressed through selfless service to humanity.",
    "about.p2":
      "For years, our organization has been dedicated to uplifting the underprivileged through comprehensive initiatives in education, healthcare, social welfare, and cultural enrichment. We operate without a profit motive, driven solely by the desire to bring light and hope into the lives of the marginalized.",
    "about.cta": "Read Our Guiding Principles",

    "services.title.a": "What We ",
    "services.title.b": "Do",
    "services.intro":
      "Our comprehensive initiatives are designed to address the most pressing needs of our society, ensuring holistic development for the underprivileged.",

    "service.feeding.title": "Feeding the Needy",
    "service.feeding.desc":
      "We provide nutritious meals to individuals and families struggling with hunger—open to all, without discrimination.",
    "service.education.title": "Supporting Education",
    "service.education.desc":
      "From school fees to essential learning materials, we help economically weak students continue their education with dignity.",
    "service.medical.title": "Medical Relief",
    "service.medical.desc":
      "We organise medical camps, health check-ups, and awareness programs to ensure accessible healthcare for all.",
    "service.youth.title": "Youth Empowerment",
    "service.youth.desc":
      "Skill development and personality-building programs help young people gain confidence and become self-reliant.",
    "service.elderly.title": "Care for the Elderly",
    "service.elderly.desc":
      "We work toward establishing Old Age Homes and support systems for senior citizens and persons with disabilities.",
    "service.women.title": "Women & Children",
    "service.women.desc":
      "We extend care, protection, and assistance to women and children in distress, regardless of background.",
    "service.environment.title": "Environmental Protection",
    "service.environment.desc":
      "Our initiatives promote environmental awareness, biodiversity conservation, and sustainable living.",
    "service.community.title": "Community Services",
    "service.community.desc":
      "We maintain community halls at nominal rents and conduct programs that strengthen social harmony.",

    "glimpses.title.a": "Glimpses of ",
    "glimpses.title.b": "Our Seva",
    "glimpses.intro":
      "Recent moments from our community service, scholarship distributions, Annadanam, and cultural programs across Kakinada.",
    "glimpses.viewFull": "View Full Gallery",
    "glimpses.openAria": "Open gallery",

    "principles.title.a": "Our Guiding ",
    "principles.title.b": "Principles",
    "principles.1": "Equality and inclusiveness across all communities",
    "principles.2": "Dedicated service without any profit motive",
    "principles.3": "Upliftment of the poor and marginalized segments of society",
    "principles.4": "Promotion of education, health, and cultural values",
    "principles.5": "Unwavering commitment to public welfare and community harmony",

    "donate.title": "Support Our Mission",
    "donate.intro":
      "Your contribution helps us continue our work in education, healthcare, and social welfare. Join hands with Bharadwaja Seva Sangham to make a lasting difference.",
    "donate.volunteer.title": "Volunteer With Us",
    "donate.volunteer.desc":
      "Give your time and skills to support our various initiatives in Kakinada and surrounding areas.",
    "donate.volunteer.cta": "Contact to Volunteer",
    "donate.give.title": "Make a Donation",
    "donate.give.desc":
      "Every contribution, big or small, helps us feed the hungry and educate the needy.",
    "donate.give.bankTitle": "Direct Bank Transfer",
    "donate.give.bankNote":
      "Please contact us for bank details and tax exemption certificates under section 80G.",
    "donate.give.cta": "Contact for Details",

    "contact.title.a": "Get In ",
    "contact.title.b": "Touch",
    "contact.office.title": "Registered Office",
    "contact.office.body":
      "Bharadwaja Seva Sangam,\nDoor No. 21-1-24, Jawahar Street,\nSalipeta (5th Floor), Kakinada District – 533003,\nAndhra Pradesh, India",
    "contact.phone.title": "Phone",
    "contact.email.title": "Email",
    "contact.secretary.title": "Secretary",
    "contact.secretary.name": "Manjulluri Visveswara Rao",

    "footer.intro":
      "Serving Humanity with Compassion and Purpose. A charitable trust dedicated to the upliftment of society.",
    "footer.quickLinks": "Quick Links",
    "footer.link.initiatives": "Our Initiatives",
    "footer.link.donate": "Donate / Contribute",
    "footer.link.contact": "Contact Information",
    "footer.mission.title": "Our Mission",
    "footer.mission.1": "Equality and inclusiveness",
    "footer.mission.2": "Service without profit motive",
    "footer.mission.3": "Upliftment of the marginalized",
    "footer.mission.4": "Promotion of education & health",
    "footer.copyright": "All Rights Reserved.",
    "footer.location": "Kakinada, Andhra Pradesh, India",

    "gallery.hero.title": "Glimpses of Our Seva",
    "gallery.hero.subtitle":
      "A visual record of the events, programs, and community service organized by Bharadwaja Seva Sangham, Kakinada.",
    "gallery.cta.title": "Want to Be Part of the Next Event?",
    "gallery.cta.desc":
      "Volunteer with us, contribute, or simply join our next Annadanam, scholarship, or cultural program.",
    "gallery.cta.button": "Get Involved",

    "lightbox.close": "Close",
    "lightbox.next": "Next image",
    "lightbox.prev": "Previous image",
    "lightbox.dialog": "Photo viewer",
    "whatsapp.aria": "Contact on WhatsApp",
    "contact.mapTitle": "Office Location Map",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
  },
  te: {
    "brand.name": "భరద్వాజ సేవా సంఘం",
    "brand.tagline": "మానవ సేవే మాధవ సేవ",

    "nav.home": "ముఖపత్రం",
    "nav.about": "మా గురించి",
    "nav.services": "మా సేవలు",
    "nav.gallery": "చిత్రమాలిక",
    "nav.values": "విలువలు",
    "nav.contact": "సంప్రదించండి",
    "nav.donate": "తోడ్పడండి",
    "nav.lang.label": "భాష",
    "nav.lang.english": "EN",
    "nav.lang.telugu": "తె",

    "hero.title": "కరుణతో, లక్ష్యంతో మానవ సేవ",
    "hero.subtitle":
      "ఆంధ్రప్రదేశ్‌లోని కాకినాడ కేంద్రంగా, నిరుపేదల అభ్యున్నతి కోసం పనిచేస్తున్న లాభాపేక్ష లేని ధార్మిక సంస్థ.",
    "hero.cta.contribute": "విరాళం అందించండి",
    "hero.cta.initiatives": "మా కార్యక్రమాలు",

    "ticker.label": "తాజా సమాచారం",
    "ticker.text":
      "రాబోయే కార్యక్రమం: ఉగాది పురస్కారాలు 2025 — సాంస్కృతిక ప్రతిభ మరియు సామాజిక సేవను మాతో కలిసి జరుపుకోండి.",

    "about.title.a": "గురించి ",
    "about.title.b": "భరద్వాజ సేవా సంఘం",
    "about.p1":
      "ఆంధ్రప్రదేశ్‌లోని కాకినాడ కేంద్రంగా ఉన్న భరద్వాజ సేవా సంఘం, సామాజిక సంక్షేమం పట్ల లోతైన నిబద్ధత కలిగిన లాభాపేక్ష లేని ధార్మిక సంస్థ. నిజమైన ఆధ్యాత్మికత నిస్వార్థ మానవ సేవ ద్వారానే ప్రకటితమవుతుందని మేము విశ్వసిస్తాము.",
    "about.p2":
      "విద్య, వైద్యం, సామాజిక సంక్షేమం మరియు సాంస్కృతిక వికాసం వంటి విస్తృత కార్యక్రమాల ద్వారా నిరుపేదల అభ్యున్నతి కోసం మా సంస్థ చాలా ఏళ్లుగా అంకితభావంతో పనిచేస్తోంది. లాభాపేక్ష లేకుండా, వెనుకబడిన వర్గాల జీవితాలలో వెలుగు మరియు ఆశలు నింపాలనే లక్ష్యంతో మాత్రమే మేము పని చేస్తున్నాము.",
    "about.cta": "మా మార్గదర్శక సూత్రాలు చదవండి",

    "services.title.a": "మా ",
    "services.title.b": "సేవలు",
    "services.intro":
      "మా సమగ్ర కార్యక్రమాలు సమాజంలోని అత్యంత ఆవశ్యకమైన అవసరాలను తీర్చడానికి, నిరుపేదల సర్వతోముఖ అభివృద్ధిని నిర్ధారించడానికి రూపొందించబడ్డాయి.",

    "service.feeding.title": "ఆకలి తీర్చడం",
    "service.feeding.desc":
      "ఆకలితో బాధపడే వ్యక్తులకు మరియు కుటుంబాలకు పౌష్టిక భోజనాన్ని అందిస్తాము—కులమతాలతో సంబంధం లేకుండా అందరికీ అందుబాటులో.",
    "service.education.title": "విద్యా సహకారం",
    "service.education.desc":
      "పాఠశాల ఫీజుల నుండి అవసరమైన చదువు సామగ్రి వరకు, ఆర్థికంగా బలహీన విద్యార్థులు గౌరవంగా చదువు కొనసాగించడానికి మేము సహాయం చేస్తాము.",
    "service.medical.title": "వైద్య సహాయం",
    "service.medical.desc":
      "అందరికీ ఆరోగ్య సంరక్షణ అందుబాటులో ఉండేలా వైద్య శిబిరాలు, ఆరోగ్య పరీక్షలు మరియు అవగాహన కార్యక్రమాలు నిర్వహిస్తాము.",
    "service.youth.title": "యువతా సాధికారత",
    "service.youth.desc":
      "నైపుణ్య అభివృద్ధి మరియు వ్యక్తిత్వ నిర్మాణ కార్యక్రమాలు యువతలో ఆత్మవిశ్వాసాన్ని పెంచి స్వావలంబన సాధించడంలో సహాయపడతాయి.",
    "service.elderly.title": "వృద్ధుల సంరక్షణ",
    "service.elderly.desc":
      "వృద్ధాశ్రమాల స్థాపన, వృద్ధులకు మరియు దివ్యాంగులకు మద్దతు వ్యవస్థల ఏర్పాటు దిశగా మేము కృషి చేస్తున్నాము.",
    "service.women.title": "మహిళలు మరియు బాలలు",
    "service.women.desc":
      "ఇబ్బందుల్లో ఉన్న మహిళలకు మరియు బాలలకు—వారి నేపథ్యంతో సంబంధం లేకుండా—సంరక్షణ, రక్షణ మరియు సహాయం అందిస్తాము.",
    "service.environment.title": "పర్యావరణ పరిరక్షణ",
    "service.environment.desc":
      "మా కార్యక్రమాలు పర్యావరణ అవగాహన, జీవవైవిధ్య పరిరక్షణ మరియు సుస్థిర జీవనాన్ని ప్రోత్సహిస్తాయి.",
    "service.community.title": "సామాజిక సేవలు",
    "service.community.desc":
      "నామమాత్రపు అద్దెకు సామాజిక భవనాలు నిర్వహిస్తూ, సామాజిక సామరస్యాన్ని బలోపేతం చేసే కార్యక్రమాలు నిర్వహిస్తాము.",

    "glimpses.title.a": "మా సేవా ",
    "glimpses.title.b": "దృశ్యాలు",
    "glimpses.intro":
      "కాకినాడ అంతటా మా సామాజిక సేవ, ఉపకార వేతనాల పంపిణీ, అన్నదానం మరియు సాంస్కృతిక కార్యక్రమాల ఇటీవలి ఘట్టాలు.",
    "glimpses.viewFull": "పూర్తి చిత్రమాలిక చూడండి",
    "glimpses.openAria": "చిత్రమాలిక తెరవండి",

    "principles.title.a": "మా మార్గదర్శక ",
    "principles.title.b": "సూత్రాలు",
    "principles.1": "అన్ని వర్గాల పట్ల సమానత్వం మరియు సమగ్రత",
    "principles.2": "లాభాపేక్ష లేని అంకిత సేవ",
    "principles.3": "పేద, వెనుకబడిన వర్గాల అభ్యున్నతి",
    "principles.4": "విద్య, ఆరోగ్యం మరియు సాంస్కృతిక విలువల ప్రోత్సాహం",
    "principles.5": "ప్రజా సంక్షేమం మరియు సామాజిక సామరస్యం పట్ల అచంచల నిబద్ధత",

    "donate.title": "మా లక్ష్యానికి మద్దతు ఇవ్వండి",
    "donate.intro":
      "మీ విరాళం విద్య, వైద్యం మరియు సామాజిక సంక్షేమ రంగాలలో మా పనిని కొనసాగించడానికి సహాయపడుతుంది. శాశ్వత మార్పు తీసుకురావడానికి భరద్వాజ సేవా సంఘంతో చేయి కలపండి.",
    "donate.volunteer.title": "స్వచ్ఛందంగా మాతో చేరండి",
    "donate.volunteer.desc":
      "కాకినాడ మరియు చుట్టుపక్కల ప్రాంతాలలో మా వివిధ కార్యక్రమాలకు మద్దతుగా మీ సమయాన్ని, నైపుణ్యాలను అందించండి.",
    "donate.volunteer.cta": "స్వచ్ఛంద సేవకు సంప్రదించండి",
    "donate.give.title": "విరాళం అందించండి",
    "donate.give.desc":
      "చిన్న అయినా, పెద్ద అయినా, ప్రతి విరాళం ఆకలితో ఉన్నవారికి ఆహారం, నిరుపేదలకు విద్య అందించడానికి సహాయపడుతుంది.",
    "donate.give.bankTitle": "నేరుగా బ్యాంకు బదిలీ",
    "donate.give.bankNote":
      "బ్యాంకు వివరాలు మరియు సెక్షన్ 80G కింద పన్ను మినహాయింపు పత్రాల కోసం దయచేసి మమ్మల్ని సంప్రదించండి.",
    "donate.give.cta": "వివరాల కోసం సంప్రదించండి",

    "contact.title.a": "మమ్మల్ని ",
    "contact.title.b": "సంప్రదించండి",
    "contact.office.title": "నమోదిత కార్యాలయం",
    "contact.office.body":
      "భరద్వాజ సేవా సంఘం,\nడోర్ నం. 21-1-24, జవహర్ స్ట్రీట్,\nసాలిపేట (5వ అంతస్తు), కాకినాడ జిల్లా – 533003,\nఆంధ్రప్రదేశ్, భారతదేశం",
    "contact.phone.title": "ఫోన్",
    "contact.email.title": "ఇమెయిల్",
    "contact.secretary.title": "కార్యదర్శి",
    "contact.secretary.name": "మంజులూరి విశ్వేశ్వర రావు",

    "footer.intro":
      "కరుణతో, లక్ష్యంతో మానవ సేవ. సమాజ అభ్యున్నతికి అంకితమైన ధార్మిక సంస్థ.",
    "footer.quickLinks": "ముఖ్య లింకులు",
    "footer.link.initiatives": "మా కార్యక్రమాలు",
    "footer.link.donate": "విరాళం / తోడ్పడండి",
    "footer.link.contact": "సంప్రదింపు వివరాలు",
    "footer.mission.title": "మా లక్ష్యం",
    "footer.mission.1": "సమానత్వం మరియు సమగ్రత",
    "footer.mission.2": "లాభాపేక్ష లేని సేవ",
    "footer.mission.3": "నిరుపేదల అభ్యున్నతి",
    "footer.mission.4": "విద్య మరియు ఆరోగ్య ప్రోత్సాహం",
    "footer.copyright": "సర్వ హక్కులూ సంరక్షితం.",
    "footer.location": "కాకినాడ, ఆంధ్రప్రదేశ్, భారతదేశం",

    "gallery.hero.title": "మా సేవా దృశ్యాలు",
    "gallery.hero.subtitle":
      "భరద్వాజ సేవా సంఘం, కాకినాడ నిర్వహించిన కార్యక్రమాలు, పరిపాటలు మరియు సామాజిక సేవ యొక్క దృశ్య నివేదిక.",
    "gallery.cta.title": "తదుపరి కార్యక్రమంలో పాల్గొనాలనుకుంటున్నారా?",
    "gallery.cta.desc":
      "మాతో స్వచ్ఛందంగా చేరండి, విరాళం ఇవ్వండి, లేదా మా తదుపరి అన్నదానం, ఉపకార వేతన లేదా సాంస్కృతిక కార్యక్రమంలో పాల్గొనండి.",
    "gallery.cta.button": "భాగస్వామ్యం పంచుకోండి",

    "lightbox.close": "మూసివేయండి",
    "lightbox.next": "తదుపరి చిత్రం",
    "lightbox.prev": "మునుపటి చిత్రం",
    "lightbox.dialog": "ఫోటో వ్యూయర్",
    "whatsapp.aria": "వాట్సాప్‌లో సంప్రదించండి",
    "contact.mapTitle": "కార్యాలయ ప్రదేశ పటం",
    "nav.openMenu": "మెనూ తెరువు",
    "nav.closeMenu": "మెనూ మూసివేయండి",
  },
} as const;
