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
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg font-bold text-foreground hover-elevate px-4 py-2 rounded-md transition-colors"
              data-testid="button-logo"
            >
              Website Showcase
            </button>

            <div className="hidden md:flex items-center gap-1">
              {nicheData.map((niche) => (
                <Button
                  key={niche.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(niche.id)}
                  data-testid={`button-nav-${niche.id}`}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === niche.id ? "text-primary" : ""
                  }`}
                >
                  {niche.title}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="px-4 py-4 space-y-2">
              {nicheData.map((niche) => (
                <Button
                  key={niche.id}
                  variant="ghost"
                  onClick={() => scrollToSection(niche.id)}
                  data-testid={`button-nav-mobile-${niche.id}`}
                  className={`w-full justify-start text-sm font-medium ${
                    activeSection === niche.id ? "text-primary" : ""
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              Inspiring Website
              <span className="block text-primary mt-2">Design Examples</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover exceptional website designs across four business niches. Each example showcases
              masterful layouts, engaging user experiences, and professional execution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection(nicheData[0].id)}
                data-testid="button-explore"
                className="text-base px-8 gap-2"
              >
                Explore Showcase
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection(nicheData[0].id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
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
              <div className="mb-12 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-primary" data-testid={`text-section-number-${niche.id}`}>
                    {niche.number}
                  </span>
                  <div className="h-px flex-1 bg-border"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground" data-testid={`heading-${niche.id}`}>
                  {niche.title}
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl" data-testid={`text-description-${niche.id}`}>
                  {niche.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {niche.links.map((link, linkIndex) => (
                  <Card
                    key={linkIndex}
                    className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    data-testid={`card-website-${niche.id}-${linkIndex}`}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 space-y-4"
                      data-testid={`link-website-${niche.id}-${linkIndex}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-foreground mb-2 truncate" data-testid={`text-name-${niche.id}-${linkIndex}`}>
                            {link.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate" data-testid={`text-url-${niche.id}-${linkIndex}`}>
                            {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                          </p>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ExternalLink className="h-5 w-5 text-primary" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <span>Visit Site</span>
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="bg-card border-t border-card-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground" data-testid="text-footer-title">
              Website Showcase
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto" data-testid="text-footer-description">
              A curated collection of exceptional website designs across Photography, Roofing & Contractors,
              Real Estate, and Coaching industries. Explore these examples for inspiration and best practices.
            </p>
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
                {new Date().getFullYear()} Website Showcase. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
