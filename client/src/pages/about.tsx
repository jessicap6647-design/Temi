import profileImg from "@assets/WhatsApp Image 2025-11-11 at 15.20.06_c5571da4_1762900030094.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-d grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6" data-testid="text-about-content">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6" data-testid="heading-about-me">
              ABOUT ME
            </h1>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p className="text-xl font-semibold text-foreground" data-testid="text-name">
                Name: Temitope
              </p>
              
              <div className="space-y-4" data-testid="text-bio">
                <p>
                  I'm Temitope, a passionate web designer and developer specializing in creating exceptional digital experiences across diverse industries. With expertise in photography portfolios, roofing & contractor websites, real estate platforms, and coaching/personal development sites, I help businesses establish powerful online presences that convert visitors into clients.
                </p>
                
                <p>
                  My approach combines aesthetic appeal with functionality, ensuring each website not only looks stunning but delivers measurable results. I understand that every industry has unique needs—from photographers requiring elegant galleries to roofing companies needing trust-building elements and coaches seeking emotional connections with their audience.
                </p>
                
                <p>
                  Through this portfolio, you'll discover carefully curated examples of outstanding web design across four key niches, showcasing what's possible when creativity meets strategic thinking.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end" data-testid="container-profile-image">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20 animate-pulse-glow"></div>
              <img
                src={profileImg}
                alt="Temitope - Web Designer and Developer"
                className="relative rounded-full w-80 h-80 md:w-96 md:h-96 object-cover border-4 border-primary/20 shadow-2xl"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
