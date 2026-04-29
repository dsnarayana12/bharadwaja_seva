import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  HeartHandshake,
  GraduationCap,
  Stethoscope,
  Users,
  Building2,
  Baby,
  Leaf,
  HandHeart,
  MapPin,
  Phone,
  Mail,
  User,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { recentPhotos } from "@/data/events";

export default function Home() {
  const [, setLocation] = useLocation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToGallery = () => {
    setLocation('/gallery');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <SiteHeader onNavigateHome={scrollTo} />

      <main className="flex-1">
        {/* HERO */}
        <section id="home" className="relative pt-32 pb-40 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-90 mix-blend-multiply z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src="/images/hero-bg.png" 
              alt="Community Service" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback pattern if image fails */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
          </div>
          
          <div className="container relative z-20 mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                Serving Humanity with Compassion and Purpose
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-8 font-medium drop-shadow-md">
                A charitable, non-profit organization based in Kakinada, Andhra Pradesh, dedicated to uplifting the underprivileged.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => scrollTo('donate')}
                  className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 h-auto font-bold uppercase tracking-wider rounded-none shadow-xl border-2 border-primary"
                >
                  Make a Contribution
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo('services')}
                  className="bg-transparent text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto font-bold uppercase tracking-wider rounded-none shadow-xl"
                >
                  Our Initiatives
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HIGHLIGHT NEWS TICKER */}
        <div className="bg-secondary text-white py-3 border-y border-white/20 shadow-inner overflow-hidden">
          <div className="container mx-auto px-4 flex items-center">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider whitespace-nowrap mr-4 shrink-0">Latest Update</span>
            <div className="overflow-hidden whitespace-nowrap w-full">
              <motion.p 
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="inline-block font-medium tracking-wide"
              >
                Upcoming Event: UGADI PURASKARALU 2025 — Join us in celebrating cultural excellence and community service.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-1 w-12 bg-primary"></div>
                  <h3 className="text-3xl font-serif font-bold uppercase tracking-wide">
                    <span className="text-foreground">About </span>
                    <span className="text-primary">Bharadwaja Seva Sangham</span>
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Based in Kakinada, Andhra Pradesh, Bharadwaja Seva Sangham is a charitable, non-profit organization with a deep-rooted commitment to social welfare. We believe that true spirituality is expressed through selfless service to humanity.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  For years, our organization has been dedicated to uplifting the underprivileged through comprehensive initiatives in education, healthcare, social welfare, and cultural enrichment. We operate without a profit motive, driven solely by the desire to bring light and hope into the lives of the marginalized.
                </p>
                <Button onClick={() => scrollTo('principles')} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none uppercase font-bold tracking-wider">
                  Read Our Guiding Principles
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-secondary transform translate-x-4 translate-y-4 -z-10"></div>
                <img 
                  src="/images/about-volunteers.png" 
                  alt="Volunteers helping" 
                  className="w-full h-auto shadow-xl border-4 border-white"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1593113514676-5927c3cc7083?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 bg-muted border-t border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif font-bold uppercase tracking-wide inline-block relative pb-4">
                <span className="text-foreground">What We </span>
                <span className="text-primary">Do</span>
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-primary"></span>
              </h3>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive initiatives are designed to address the most pressing needs of our society, ensuring holistic development for the underprivileged.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Feeding the Needy",
                  desc: "We provide nutritious meals to individuals and families struggling with hunger—open to all, without discrimination.",
                  icon: HandHeart
                },
                {
                  title: "Supporting Education",
                  desc: "From school fees to essential learning materials, we help economically weak students continue their education with dignity.",
                  icon: GraduationCap
                },
                {
                  title: "Medical Relief",
                  desc: "We organise medical camps, health check-ups, and awareness programs to ensure accessible healthcare for all.",
                  icon: Stethoscope
                },
                {
                  title: "Youth Empowerment",
                  desc: "Skill development and personality-building programs help young people gain confidence and become self-reliant.",
                  icon: Users
                },
                {
                  title: "Care for the Elderly",
                  desc: "We work toward establishing Old Age Homes and support systems for senior citizens and persons with disabilities.",
                  icon: Building2
                },
                {
                  title: "Women & Children",
                  desc: "We extend care, protection, and assistance to women and children in distress, regardless of background.",
                  icon: Baby
                },
                {
                  title: "Environmental Protection",
                  desc: "Our initiatives promote environmental awareness, biodiversity conservation, and sustainable living.",
                  icon: Leaf
                },
                {
                  title: "Community Services",
                  desc: "We maintain community halls at nominal rents and conduct programs that strengthen social harmony.",
                  icon: HeartHandshake
                }
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full rounded-none border-t-4 border-t-primary hover:shadow-xl transition-shadow bg-card hover:-translate-y-1 duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-primary">
                        <service.icon size={32} strokeWidth={1.5} />
                      </div>
                      <h4 className="font-bold text-lg mb-3 text-card-foreground">{service.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GLIMPSES OF OUR SEVA */}
        <section id="glimpses" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold uppercase tracking-wide inline-block relative pb-4">
                <span className="text-foreground">Glimpses of </span>
                <span className="text-primary">Our Seva</span>
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-secondary"></span>
              </h3>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Recent moments from our community service, scholarship distributions, Annadanam, and cultural programs across Kakinada.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              {recentPhotos.map((photo, i) => (
                <motion.button
                  key={photo.src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={goToGallery}
                  className="group relative aspect-[4/3] bg-muted overflow-hidden shadow-md hover:shadow-2xl transition-all border-2 border-transparent hover:border-secondary"
                  aria-label={`Open gallery — ${photo.eventTitle}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
                      {photo.dateLabel}
                    </p>
                    <p className="text-white text-xs md:text-sm font-semibold leading-tight line-clamp-2">
                      {photo.eventTitle}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={goToGallery}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase font-bold tracking-wider px-8 py-6 h-auto shadow-md"
              >
                View Full Gallery
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* GUIDING PRINCIPLES */}
        <section id="principles" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-2xl border-l-8 border-secondary">
              <div className="mb-8">
                <h3 className="text-3xl font-serif font-bold uppercase tracking-wide">
                  <span className="text-foreground">Our Guiding </span>
                  <span className="text-primary">Principles</span>
                </h3>
                <div className="h-1 w-24 bg-accent mt-4"></div>
              </div>
              
              <ul className="space-y-6">
                {[
                  "Equality and inclusiveness across all communities",
                  "Dedicated service without any profit motive",
                  "Upliftment of the poor and marginalized segments of society",
                  "Promotion of education, health, and cultural values",
                  "Unwavering commitment to public welfare and community harmony"
                ].map((principle, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 text-lg text-foreground font-medium"
                  >
                    <div className="mt-1 shrink-0 text-secondary">
                      <HeartHandshake size={24} />
                    </div>
                    {principle}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* DONATE / GET INVOLVED */}
        <section id="donate" className="py-20 bg-primary text-primary-foreground text-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h3 className="text-4xl font-serif font-bold mb-6 drop-shadow-md">Support Our Mission</h3>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Your contribution helps us continue our work in education, healthcare, and social welfare. Join hands with Bharadwaja Seva Sangham to make a lasting difference.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/10 text-white border-white/20 rounded-none backdrop-blur-sm">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                    <HeartHandshake className="text-accent" /> Volunteer With Us
                  </h4>
                  <p className="mb-6 opacity-90">Give your time and skills to support our various initiatives in Kakinada and surrounding areas.</p>
                  <Button variant="outline" className="border-white text-primary hover:bg-white hover:text-primary rounded-none uppercase font-bold tracking-wider w-full" onClick={() => scrollTo('contact')}>
                    Contact to Volunteer
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white text-foreground rounded-none shadow-xl border-t-4 border-accent">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-4 text-primary flex items-center justify-center gap-2">
                    <HandHeart /> Make a Donation
                  </h4>
                  <p className="mb-6 text-muted-foreground">Every contribution, big or small, helps us feed the hungry and educate the needy.</p>
                  <div className="bg-muted p-4 mb-6 text-left border-l-4 border-primary text-sm">
                    <p className="font-semibold text-foreground">Direct Bank Transfer</p>
                    <p className="text-muted-foreground mt-2">Please contact us for bank details and tax exemption certificates under section 80G.</p>
                  </div>
                  <Button className="bg-primary text-white hover:bg-primary/90 rounded-none uppercase font-bold tracking-wider w-full shadow-md" onClick={() => scrollTo('contact')}>
                    Contact for Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif font-bold uppercase tracking-wide inline-block relative pb-4">
                <span className="text-foreground">Get In </span>
                <span className="text-primary">Touch</span>
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-primary"></span>
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Registered Office</h4>
                    <p className="text-muted-foreground">
                      Bharadwaja Seva Sangam,<br />
                      Door No. 21-1-24, Jawahar Street,<br />
                      Salipeta (5th Floor), Kakinada District – 533003,<br />
                      Andhra Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-muted-foreground">+91 7989735152</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <a href="mailto:bsskkd.2024@gmail.com" className="text-primary hover:underline">
                      bsskkd.2024@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary shrink-0">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Secretary</h4>
                    <p className="text-muted-foreground">Manjulluri Visveswara Rao</p>
                  </div>
                </div>
              </div>

              <div className="h-[400px] border-4 border-white shadow-xl bg-muted">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15264.444257121708!2d82.23594195!3d16.95353195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a38286a117b8745%3A0xc485122ab65538e1!2sSalipeta%2C%20Kakinada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1714900000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onNavigateHome={scrollTo} onNavigateGallery={goToGallery} />
      <WhatsAppFAB />
    </div>
  );
}
