import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/signup", label: "Sign Up" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer" data-testid="link-logo">
              Temitope
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant={location === link.href ? "default" : "ghost"}
                className="toggle-elevate"
                data-active={location === link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                <Link href={link.href}>{link.label}</Link>
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
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2" data-testid="container-mobile-menu">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                onClick={() => setMobileMenuOpen(false)}
                variant={location === link.href ? "default" : "ghost"}
                className="w-full justify-start"
                data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
