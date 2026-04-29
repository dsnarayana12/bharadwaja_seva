import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const LOGO_SRC =
  "https://img1.wsimg.com/isteam/ip/210338f7-f5fb-4633-b166-d0068dd8981c/baradwaja%20logo.jpg/:/rs=h:200,cg:true,m/qt=q:95";

interface SiteHeaderProps {
  onNavigateHome: (sectionId: string) => void;
}

export function SiteHeader({ onNavigateHome }: SiteHeaderProps) {
  const [location, setLocation] = useLocation();
  const onGallery = location === "/gallery";

  const goToGallery = () => {
    if (!onGallery) {
      setLocation("/gallery");
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-primary text-primary-foreground border-b-4 border-accent">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button
          onClick={() => onNavigateHome("home")}
          className="flex items-center gap-3 text-left"
        >
          <div className="bg-white p-1 rounded">
            <img
              src={LOGO_SRC}
              alt="Bharadwaja Seva Sangham Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="font-serif font-bold text-xl tracking-wide uppercase">
              Bharadwaja Seva Sangham
            </h1>
            <p className="text-xs text-primary-foreground/80 font-medium tracking-wider">
              Serving Humanity
            </p>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm">
          <button
            onClick={() => onNavigateHome("home")}
            className="hover:text-accent transition-colors uppercase tracking-wider"
          >
            Home
          </button>
          <button
            onClick={() => onNavigateHome("about")}
            className="hover:text-accent transition-colors uppercase tracking-wider"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigateHome("services")}
            className="hover:text-accent transition-colors uppercase tracking-wider"
          >
            What We Do
          </button>
          <button
            onClick={goToGallery}
            className={`hover:text-accent transition-colors uppercase tracking-wider ${
              onGallery ? "text-accent" : ""
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => onNavigateHome("principles")}
            className="hover:text-accent transition-colors uppercase tracking-wider"
          >
            Values
          </button>
          <button
            onClick={() => onNavigateHome("contact")}
            className="hover:text-accent transition-colors uppercase tracking-wider"
          >
            Contact
          </button>
        </nav>

        <Button
          onClick={() => onNavigateHome("donate")}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold uppercase tracking-wider px-6 rounded-none shadow-sm"
        >
          Donate Now
        </Button>
      </div>
    </header>
  );
}
