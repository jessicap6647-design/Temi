import { ExternalLink, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import profileImg from "@assets/WhatsApp Image 2025-11-11 at 15.20.06_c5571da4_1762900030094.jpg";

interface WebsiteLink {
  url: string;
  name: string;
  previewImage?: string;
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
      { url: "https://wiven-128.webflow.io/", name: "Wiven Studio", previewImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop" },
      { url: "https://www.arianajordan.com/", name: "Ariana Jordan", previewImage: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop" },
      { url: "https://www.mattporteous.co.uk/", name: "Matt Porteous", previewImage: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?w=400&h=300&fit=crop" },
      { url: "https://www.jenniferperkins.co/", name: "Jennifer Perkins", previewImage: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?w=400&h=300&fit=crop" },
      { url: "https://www.larajade.com/", name: "Lara Jade", previewImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop" },
      { url: "https://www.sanzlena.com/", name: "Sanz Lena", previewImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop" }
    ]
  },
  {
    id: "roofing",
    number: "02",
    title: "Roofing & Contractors",
    description: "Roofing sites must build trust and convert visitors. These examples show professional designs with strong calls-to-action and credibility.",
    links: [
      { url: "https://www.bradyroofing.com/", name: "Brady Roofing", previewImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
      { url: "https://newmanroofing.com/", name: "Newman Roofing", previewImage: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop" },
      { url: "https://voyagerexteriors.com/", name: "Voyager Exteriors", previewImage: "https://images.unsplash.com/photo-1581858696987-3b8e2c3e1e15?w=400&h=300&fit=crop" },
      { url: "https://www.goodroofingcompany.com/", name: "Good Roofing Company", previewImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop" },
      { url: "https://www.heritageroofing.com/portfolio", name: "Heritage Roofing", previewImage: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=400&h=300&fit=crop" },
      { url: "https://www.dandlroofing.com/", name: "D&L Roofing", previewImage: "https://images.unsplash.com/photo-1590841609987-4ac211afdde1?w=400&h=300&fit=crop" }
    ]
  },
  {
    id: "realestate",
    number: "03",
    title: "Real Estate",
    description: "Real estate sites balance aesthetics with functionality. These examples show intuitive property search and compelling agent branding.",
    links: [
      { url: "https://www.luxurypresence.com/best-real-estate-agent-websites/", name: "Luxury Presence", previewImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop" },
      { url: "https://jardineestates.co.uk/", name: "Jardine Estates", previewImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop" },
      { url: "https://janetmcafee.com/", name: "Janet McAfee", previewImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop" },
      { url: "http://llestates.co.uk/", name: "LL Estates", previewImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop" },
      { url: "https://propriodirect.com/en/", name: "Proprio Direct", previewImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop" }
    ]
  },
  {
    id: "coaching",
    number: "04",
    title: "Coaching & Personal Development",
    description: "Coaching websites inspire and connect. These examples showcase authentic storytelling and emotional engagement.",
    links: [
      { url: "https://prestonsmiles.com/", name: "Preston Smiles", previewImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop" },
      { url: "https://marieforleo.com/", name: "Marie Forleo", previewImage: "https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop" },
      { url: "https://lightpeakcoaching.com/", name: "Light Peak Coaching", previewImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop" }
    ]
  }
];

export default function Home() {
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out! I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <section id="about" className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6" data-testid="text-about-content">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-name">
                  I'm Temitope
                </p>
                
                <div className="space-y-4" data-testid="text-bio">
                  <p>
                    A passionate web designer and developer specializing in creating exceptional digital experiences across diverse industries. With expertise in photography portfolios, roofing & contractor websites, real estate platforms, and coaching/personal development sites, I help businesses establish powerful online presences that convert visitors into clients.
                  </p>
                  
                  <p>
                    My approach combines aesthetic appeal with functionality, ensuring each website not only looks stunning but delivers measurable results. I understand that every industry has unique needs from photographers requiring elegant galleries to roofing companies needing trust-building elements and coaches seeking emotional connections with their audience.
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
      </section>

      <section id="portfolio" className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4" data-testid="heading-portfolio">
              Portfolio Showcase
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-portfolio-subtitle">
              Explore outstanding web design across four key industries
            </p>
          </div>

          <div className="space-y-20">
            {nicheData.map((niche) => (
              <div key={niche.id} className="space-y-6" data-testid={`section-${niche.id}`}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl font-bold text-primary/20" data-testid={`text-number-${niche.id}`}>
                    {niche.number}
                  </span>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground" data-testid={`heading-${niche.id}`}>
                      {niche.title}
                    </h3>
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
                      <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer">
                        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                          {website.previewImage && (
                            <img
                              src={website.previewImage}
                              alt={website.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              data-testid={`img-preview-${niche.id}-${index}`}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                            <div className="flex items-center gap-2 text-white">
                              <ExternalLink className="w-5 h-5" />
                              <span className="text-sm font-medium">Visit Site</span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="text-lg font-semibold text-foreground mb-1" data-testid={`text-website-name-${niche.id}-${index}`}>
                            {website.name}
                          </h4>
                          <p className="text-sm text-muted-foreground truncate" data-testid={`text-website-url-${niche.id}-${index}`}>
                            {website.url}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4" data-testid="heading-signup">
                Get In Touch
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="text-signup-subtitle">
                Let's discuss your next web design project
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle data-testid="text-form-title">Send Me a Message</CardTitle>
                <CardDescription data-testid="text-form-description">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              data-testid="input-fullname"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1234567890"
                              data-testid="input-phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message / Inquiry</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project..."
                              className="min-h-32 resize-none"
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? "Sending..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4" data-testid="heading-contact">
                Contact Me
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="text-contact-subtitle">
                Get in touch for your next project
              </p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-primary" data-testid="icon-phone" />
                    Phone Numbers
                  </CardTitle>
                  <CardDescription>
                    Call me anytime during business hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href="tel:+2347014728002"
                    className="flex items-center gap-3 p-4 rounded-lg hover-elevate active-elevate-2 transition-all group"
                    data-testid="link-phone-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Primary</p>
                      <p className="text-lg font-semibold text-foreground" data-testid="text-phone-1">
                        +234 701 472 8002
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+2348057268719"
                    className="flex items-center gap-3 p-4 rounded-lg hover-elevate active-elevate-2 transition-all group"
                    data-testid="link-phone-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Secondary</p>
                      <p className="text-lg font-semibold text-foreground" data-testid="text-phone-2">
                        +234 805 726 8719
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-accent" data-testid="icon-email" />
                    Email Address
                  </CardTitle>
                  <CardDescription>
                    Send me an email for project inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:Musbautemitope163@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-lg hover-elevate active-elevate-2 transition-all group"
                    data-testid="link-email"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-lg font-semibold text-foreground break-all" data-testid="text-email">
                        Musbautemitope163@gmail.com
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground" data-testid="text-response-time">
                I typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
