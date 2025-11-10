import { useState, useEffect } from "react";
import { ArrowDown, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WebsiteLink {
  url: string;
  name: string;
}

interface NicheSection {
  id: string;
  number: string;
  title: string;
  description: string;
  links: WebsiteLink[];
}

const nicheData: NicheSection[] = [
  {
    id: "photography",
    number: "01",
    title: "Photography Websites",
    description: "Photography portfolios need stunning visuals and elegant galleries. These examples showcase photographers who've mastered clean layouts and seamless user experiences.",
    links: [
      { url: "https://wiven-128.webflow.io/", name: "Wiven Studio" },
      { url: "https://www.arianajordan.com/", name: "Ariana Jordan" },
      { url: "https://www.mattporteous.co.uk/", name: "Matt Porteous" },
      { url: "https://www.jenniferperkins.co/", name: "Jennifer Perkins" },
      { url: "https://www.larajade.com/", name: "Lara Jade" },
      { url: "https://www.sanzlena.com/", name: "Sanz Lena" }
    ]
  },
  {
    id: "roofing",
    number: "02",
    title: "Roofing & Contractors",
    description: "Roofing sites must build trust and convert visitors. These examples show professional designs with strong calls-to-action and credibility.",
    links: [
      { url: "https://www.bradyroofing.com/", name: "Brady Roofing" },
      { url: "https://newmanroofing.com/", name: "Newman Roofing" },
      { url: "https://voyagerexteriors.com/", name: "Voyager Exteriors" },
      { url: "https://www.goodroofingcompany.com/", name: "Good Roofing Company" },
      { url: "https://www.heritageroofing.com/portfolio", name: "Heritage Roofing" },
      { url: "https://www.dandlroofing.com/", name: "D&L Roofing" }
    ]
  },
  {
    id: "realestate",
    number: "03",
    title: "Real Estate",
    description: "Real estate sites balance aesthetics with functionality. These examples show intuitive property search and compelling agent branding.",
    links: [
      { url: "https://www.luxurypresence.com/best-real-estate-agent-websites/", name: "Luxury Presence" },
      { url: "https://jardineestates.co.uk/", name: "Jardine Estates" },
      { url: "https://janetmcafee.com/", name: "Janet McAfee" },
      { url: "http://llestates.co.uk/", name: "LL Estates" },
      { url: "https://propriodirect.com/en/", name: "Proprio Direct" }
    ]
  },
  {
    id: "coaching",
    number: "04",
    title: "Coaching & Personal Development",
    description: "Coaching websites inspire and connect. These examples showcase authentic storytelling and emotional engagement.",
    links: [
      { url: "https://prestonsmiles.com/", name: "Preston Smiles" },
      { url: "https://marieforleo.com/", name: "Marie Forleo" },
      { url: "https://lightpeakcoaching.com/", name: "Light Peak Coaching" }
    ]
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -60% 0px" }
    );

    nicheData.forEach((niche) => {
      const element = document.getElementById(niche.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        data-testid="link-skip-to-content"
      >
        Skip to content
      </a>
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b-2 border-primary/20 shadow-lg shadow-primary/5" : "bg-gradient-to-b from-background/95 via-background/80 to-transparent backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover-elevate px-4 py-2 rounded-lg transition-all"
              data-testid="button-logo"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Website Showcase
            </button>

            <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-full px-2 py-2 backdrop-blur-sm border border-border/50">
              {nicheData.map((niche) => (
                <Button
                  key={niche.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(niche.id)}
                  data-testid={`button-nav-${niche.id}`}
                  className={`text-sm font-semibold transition-all rounded-full ${
                    activeSection === niche.id 
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md" 
                      : "hover:text-primary"
                  }`}
                >
                  {niche.title}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden border-2 border-primary/30 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b-2 border-primary/20">
            <div className="px-4 py-4 space-y-2">
              {nicheData.map((niche) => (
                <Button
                  key={niche.id}
                  variant="ghost"
                  onClick={() => scrollToSection(niche.id)}
                  data-testid={`button-nav-mobile-${niche.id}`}
                  className={`w-full justify-start text-sm font-semibold rounded-lg ${
                    activeSection === niche.id 
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" 
                      : "hover:text-primary"
                  }`}
                >
                  {niche.title}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.08) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="space-y-8">
            <div className="inline-block mb-4">
              <span className="px-6 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/30 text-sm font-bold text-primary backdrop-blur-sm">
                Portfolio Showcase
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Inspiring Website
              </span>
              <span className="block mt-3 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Design Examples
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Discover exceptional website designs across four business niches. Each example showcases
              masterful layouts, engaging user experiences, and professional execution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                size="lg"
                onClick={() => scrollToSection(nicheData[0].id)}
                data-testid="button-explore"
                className="text-base px-10 py-6 gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/25 transition-all font-bold text-lg rounded-full"
              >
                Explore Showcase
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection(nicheData[0].id)}
            className="text-primary hover:text-accent transition-colors p-3 rounded-full bg-background/50 backdrop-blur-sm border border-primary/20"
            data-testid="button-scroll-indicator"
            aria-label="Scroll to content"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </section>

      <main id="main-content">
        {nicheData.map((niche, index) => (
          <section
            key={niche.id}
            id={niche.id}
            className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${
              index % 2 === 0 ? "bg-background" : "bg-muted/30"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-16 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid={`text-section-number-${niche.id}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {niche.number}
                  </span>
                  <div className="h-1 flex-1 bg-gradient-to-r from-primary/40 via-accent/20 to-transparent rounded-full"></div>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" data-testid={`heading-${niche.id}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {niche.title}
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl font-medium leading-relaxed" data-testid={`text-description-${niche.id}`}>
                  {niche.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {niche.links.map((link, linkIndex) => (
                  <Card
                    key={linkIndex}
                    className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 border-2 hover:border-primary/30"
                    data-testid={`card-website-${niche.id}-${linkIndex}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 space-y-4 relative z-10"
                      data-testid={`link-website-${niche.id}-${linkIndex}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-foreground mb-2 truncate group-hover:text-primary transition-colors" data-testid={`text-name-${niche.id}-${linkIndex}`}>
                            {link.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate" data-testid={`text-url-${niche.id}-${linkIndex}`}>
                            {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                          </p>
                        </div>
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary group-hover:to-accent transition-all group-hover:scale-110">
                          <ExternalLink className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        <span>Visit Site</span>
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform text-primary" />
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="relative bg-gradient-to-br from-card via-background to-card border-t-2 border-primary/20 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" data-testid="text-footer-title" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Website Showcase
            </h3>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed" data-testid="text-footer-description">
              A curated collection of exceptional website designs across Photography, Roofing & Contractors,
              Real Estate, and Coaching industries. Explore these examples for inspiration and best practices.
            </p>
            <div className="pt-6 border-t-2 border-primary/10">
              <p className="text-sm text-muted-foreground font-medium" data-testid="text-footer-copyright">
                {new Date().getFullYear()} Website Showcase. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
