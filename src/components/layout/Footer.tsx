import { Link } from "react-router-dom";
import { Globe, TrendingUp, Mail, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="h-8 w-8 text-primary" />
                <TrendingUp className="h-4 w-4 text-accent absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">GPAM.site</span>
                <span className="text-xs text-muted-foreground">Global Policy & Analytics Monitor</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Real-time financial intelligence platform tracking global markets, policies, and investment flows.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <div className="space-y-2">
              <Link to="/prices" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Market Prices
              </Link>
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Policy Feed
              </Link>
              <Link to="/investments" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Investment Tracker
              </Link>
              <Link to="/calculators" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Financial Tools
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <div className="space-y-2">
              <Link to="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                AI Insights
              </Link>
              <Link to="/alerts" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Market Alerts
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 GPAM.site. All rights reserved. Financial data for informational purposes only.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}