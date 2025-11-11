import { Phone, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4" data-testid="heading-contact">
              Contact Me
            </h1>
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
    </div>
  );
}
