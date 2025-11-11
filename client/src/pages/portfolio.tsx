import { ExternalLink } from "lucide-react";
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

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4" data-testid="heading-portfolio">
            Portfolio Showcase
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-portfolio-subtitle">
            Explore outstanding web design across four key industries
          </p>
        </div>

        <div className="space-y-20">
          {nicheData.map((niche) => (
            <section key={niche.id} className="space-y-6" data-testid={`section-${niche.id}`}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-6xl font-bold text-primary/20" data-testid={`text-number-${niche.id}`}>
                  {niche.number}
                </span>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid={`heading-${niche.id}`}>
                    {niche.title}
                  </h2>
                  <p className="text-muted-foreground mt-2" data-testid={`text-description-${niche.id}`}>
                    {niche.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {niche.links.map((website, index) => (
                  <a
                    key={index}
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    data-testid={`link-website-${niche.id}-${index}`}
                  >
                    <Card className="h-64 relative overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                        <div className="flex flex-col items-center justify-center h-full p-6">
                          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ExternalLink className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground text-center mb-2" data-testid={`text-website-name-${niche.id}-${index}`}>
                            {website.name}
                          </h3>
                          <p className="text-sm text-muted-foreground text-center truncate w-full px-4" data-testid={`text-website-url-${niche.id}-${index}`}>
                            {website.url}
                          </p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </Card>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
