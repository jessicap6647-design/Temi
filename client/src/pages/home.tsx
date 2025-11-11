import { useState, useEffect } from "react";
import { ArrowDown, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import realEstateImg from "@assets/image_1762822583683.png";
import photographyImg from "@assets/image_1762825388196.png";
import roofingImg from "@assets/image_1762822890008.png";
import coachingImg from "@assets/image_1762823092485.png";
import cameraImg from "@assets/image_1762822782576.png";

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

const heroImages: Record<string, string> = {
  photography: photographyImg,
  roofing: roofingImg,
  realestate: realEstateImg,
  coaching: coachingImg,
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("photography");

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
          scrolled ? "bg-[#0a1e3f]/95 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-[#0a1e3f]/80 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold text-white hover-elevate px-4 py-2 rounded-lg transition-all"
              data-testid="button-logo"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Website Showcase
            </button>

            <div className="hidden md:flex items-center gap-2">
              {nicheData.map((niche) => (
                <Button
                  key={niche.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(niche.id)}
                  data-testid={`button-nav-${niche.id}`}
                  className={`text-sm font-semibold transition-all ${
                    activeSection === niche.id 
                      ? "bg-primary text-white" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {niche.title}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1e3f]/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-4 py-4 space-y-2">
              {nicheData.map((niche) => (
                <Button
                  key={niche.id}
                  variant="ghost"
                  onClick={() => scrollToSection(niche.id)}
                  data-testid={`button-nav-mobile-${niche.id}`}
                  className={`w-full justify-start text-sm font-semibold rounded-lg ${
                    activeSection === niche.id 
                      ? "bg-primary text-white" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {niche.title}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#0a2463] via-[#1e3a8a] to-[#0f2557]">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-tr from-accent/25 to-primary/30 rounded-full blur-3xl opacity-40"></div>
        
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent/20 rounded-lg rotate-45 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-primary/20 rounded-lg -rotate-12 blur-lg"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left">
              <div className="inline-block mb-2">
                <span className="text-xs font-bold tracking-widest text-accent uppercase">
                  Portfolio Showcase
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Learn. Grow.
                <br />
                <span className="text-white">Build your career.</span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl leading-relaxed font-medium">
                Discover exceptional website designs across four business niches. Each example showcases
                masterful layouts, engaging user experiences, and professional execution.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-6">
                <Button
                  size="lg"
                  onClick={() => scrollToSection(nicheData[0].id)}
                  data-testid="button-explore"
                  className="text-base px-10 py-6 gap-2 bg-primary hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 transition-all font-bold text-white rounded-md"
                >
                  Explore Showcase
                  <ArrowDown className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-12 lg:mt-0" data-testid="hero-cards-container">
              <div className="relative lg:h-[450px]">
                <div className="flex lg:hidden gap-4 justify-center flex-wrap">
                  <div 
                    className="w-40 h-40 group cursor-pointer animate-fade-slide-up opacity-0"
                    data-testid="card-hero-photography-mobile"
                  >
                    <div className="relative w-full h-full rounded-xl overflow-visible backdrop-blur-md bg-white/10 border-[3px] border-white/40 shadow-2xl shadow-primary/30 transition-all duration-300 active:scale-95">
                      <img 
                        src={cameraImg} 
                        alt="Photography" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/90 via-[#0a2463]/40 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Photography
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="w-40 h-40 group cursor-pointer animate-fade-slide-up opacity-0 animation-delay-200"
                    data-testid="card-hero-realestate-mobile"
                  >
                    <div className="relative w-full h-full rounded-xl overflow-visible backdrop-blur-md bg-white/10 border-[3px] border-white/40 shadow-2xl shadow-accent/30 transition-all duration-300 active:scale-95">
                      <img 
                        src={realEstateImg} 
                        alt="Real Estate" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/90 via-[#0a2463]/40 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Real Estate
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="w-40 h-40 group cursor-pointer animate-fade-slide-up opacity-0 animation-delay-400"
                    data-testid="card-hero-roofing-mobile"
                  >
                    <div className="relative w-full h-full rounded-xl overflow-visible backdrop-blur-md bg-white/10 border-[3px] border-white/40 shadow-2xl shadow-primary/30 transition-all duration-300 active:scale-95">
                      <img 
                        src={roofingImg} 
                        alt="Roofing" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/90 via-[#0a2463]/40 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Roofing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div 
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-56 h-56 group cursor-pointer animate-fade-slide-up-float opacity-0"
                    data-testid="card-hero-photography"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-visible backdrop-blur-md bg-white/15 border-[4px] border-white/50 shadow-[0_20px_60px_-15px] shadow-primary/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-primary/60 hover:shadow-[0_25px_70px_-15px] hover:border-white/70 hover:scale-110 hover:rotate-2">
                      <img 
                        src={cameraImg} 
                        alt="Photography" 
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/95 via-[#0a2463]/50 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <p className="text-base font-black tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Photography
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="absolute top-16 left-0 w-52 h-52 group cursor-pointer animate-fade-slide-up-float-delayed-delay-200 opacity-0"
                    data-testid="card-hero-realestate"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-visible backdrop-blur-md bg-white/15 border-[4px] border-white/50 shadow-[0_20px_60px_-15px] shadow-accent/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-accent/60 hover:shadow-[0_25px_70px_-15px] hover:border-white/70 hover:scale-110 hover:-rotate-2">
                      <img 
                        src={realEstateImg} 
                        alt="Real Estate" 
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/95 via-[#0a2463]/50 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <p className="text-base font-black tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Real Estate
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="absolute top-16 right-0 w-52 h-52 group cursor-pointer animate-fade-slide-up-float-delay-400 opacity-0"
                    data-testid="card-hero-roofing"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-visible backdrop-blur-md bg-white/15 border-[4px] border-white/50 shadow-[0_20px_60px_-15px] shadow-primary/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-primary/60 hover:shadow-[0_25px_70px_-15px] hover:border-white/70 hover:scale-110 hover:rotate-2">
                      <img 
                        src={roofingImg} 
                        alt="Roofing" 
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/95 via-[#0a2463]/50 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <p className="text-base font-black tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Roofing
                        </p>
                      </div>
                    </div>
                  </div>

                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none animate-pulse-glow" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ zIndex: -1 }}
                  >
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.6)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0.9)', stopOpacity: 1 }} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <path
                      d="M 240 192 Q 220 280, 240 380"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3.5"
                      opacity="0.95"
                      filter="url(#glow)"
                      data-testid="curve-photography"
                    />
                    
                    <path
                      d="M 104 272 Q 140 320, 220 380"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3.5"
                      opacity="0.95"
                      filter="url(#glow)"
                      data-testid="curve-realestate"
                    />
                    
                    <path
                      d="M 376 272 Q 340 320, 260 380"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3.5"
                      opacity="0.95"
                      filter="url(#glow)"
                      data-testid="curve-roofing"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <button
            onClick={() => scrollToSection(nicheData[0].id)}
            className="text-white/70 hover:text-white transition-colors p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
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
            className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-50/30 dark:from-background dark:to-blue-950/20"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-primary" data-testid={`text-section-number-${niche.id}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {niche.number}
                  </span>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground" data-testid={`heading-${niche.id}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {niche.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl font-medium leading-relaxed" data-testid={`text-description-${niche.id}`}>
                  {niche.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {niche.links.map((link, linkIndex) => (
                  <Card
                    key={linkIndex}
                    className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-border hover:border-primary/40 bg-card"
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
                          <h3 className="text-base font-bold text-foreground mb-2 truncate group-hover:text-primary transition-colors" data-testid={`text-name-${niche.id}-${linkIndex}`}>
                            {link.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate" data-testid={`text-url-${niche.id}-${linkIndex}`}>
                            {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                          </p>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
                          <ExternalLink className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
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

      <footer className="relative bg-gradient-to-br from-[#0a2463] via-[#1e3a8a] to-[#0f2557] border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-black text-white" data-testid="text-footer-title" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Website Showcase
            </h3>
            <p className="text-base text-blue-100/80 max-w-2xl mx-auto font-medium leading-relaxed" data-testid="text-footer-description">
              A curated collection of exceptional website designs across Photography, Roofing & Contractors,
              Real Estate, and Coaching industries. Explore these examples for inspiration and best practices.
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-blue-100/60 font-medium" data-testid="text-footer-copyright">
                {new Date().getFullYear()} Website Showcase. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
