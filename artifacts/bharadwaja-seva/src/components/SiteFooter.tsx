const LOGO_SRC =
  "https://img1.wsimg.com/isteam/ip/210338f7-f5fb-4633-b166-d0068dd8981c/baradwaja%20logo.jpg/:/rs=h:200,cg:true,m/qt=q:95";

interface SiteFooterProps {
  onNavigateHome: (sectionId: string) => void;
  onNavigateGallery: () => void;
}

export function SiteFooter({ onNavigateHome, onNavigateGallery }: SiteFooterProps) {
  return (
    <footer className="bg-[#1c2e22] text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6 bg-white p-2 inline-block rounded">
              <img src={LOGO_SRC} alt="Logo" className="h-10 w-auto" />
            </div>
            <h4 className="text-xl font-serif font-bold mb-4 uppercase tracking-wider text-accent">
              Bharadwaja Seva Sangham
            </h4>
            <p className="text-gray-400 mb-6">
              Serving Humanity with Compassion and Purpose. A charitable trust
              dedicated to the upliftment of society.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button onClick={() => onNavigateHome("home")} className="hover:text-accent transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateHome("about")} className="hover:text-accent transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateHome("services")} className="hover:text-accent transition-colors">
                  Our Initiatives
                </button>
              </li>
              <li>
                <button onClick={onNavigateGallery} className="hover:text-accent transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateHome("donate")} className="hover:text-accent transition-colors">
                  Donate / Contribute
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateHome("contact")} className="hover:text-accent transition-colors">
                  Contact Information
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider border-b border-gray-700 pb-2">
              Our Mission
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Equality and inclusiveness</li>
              <li>• Service without profit motive</li>
              <li>• Upliftment of the marginalized</li>
              <li>• Promotion of education &amp; health</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Bharadwaja Seva Sangham — All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Kakinada, Andhra Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
