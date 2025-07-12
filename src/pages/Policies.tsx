import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Newspaper, 
  Search, 
  Filter, 
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Globe,
  AlertTriangle
} from "lucide-react";

interface PolicyUpdate {
  id: number;
  country: string;
  flag: string;
  title: string;
  summary: string;
  impact: 'Bullish' | 'Bearish' | 'Neutral';
  category: string;
  timestamp: string;
  source: string;
}

const samplePolicies: PolicyUpdate[] = [
  {
    id: 1,
    country: "United States",
    flag: "🇺🇸",
    title: "Federal Reserve maintains interest rates at 5.25-5.50%",
    summary: "The Federal Open Market Committee voted to keep the federal funds rate unchanged, citing continued progress on inflation while monitoring labor market conditions.",
    impact: "Neutral",
    category: "Monetary Policy",
    timestamp: "2 hours ago",
    source: "Federal Reserve"
  },
  {
    id: 2,
    country: "European Union",
    flag: "🇪🇺",
    title: "European Parliament approves comprehensive crypto regulation framework",
    summary: "MiCA (Markets in Crypto-Assets) regulation officially approved, establishing clear guidelines for cryptocurrency operations across EU member states.",
    impact: "Bullish",
    category: "Cryptocurrency",
    timestamp: "4 hours ago",
    source: "European Parliament"
  },
  {
    id: 3,
    country: "Japan",
    flag: "🇯🇵",
    title: "Bank of Japan maintains ultra-low interest rate policy",
    summary: "BOJ keeps short-term interest rates at -0.1% and continues bond purchasing program to support economic recovery amid global uncertainties.",
    impact: "Bearish",
    category: "Monetary Policy",
    timestamp: "6 hours ago",
    source: "Bank of Japan"
  },
  {
    id: 4,
    country: "China",
    flag: "🇨🇳",
    title: "China announces new infrastructure investment package",
    summary: "Beijing unveils $500 billion infrastructure spending plan focusing on renewable energy, high-speed rail, and digital infrastructure development.",
    impact: "Bullish",
    category: "Fiscal Policy",
    timestamp: "8 hours ago",
    source: "State Council"
  },
  {
    id: 5,
    country: "United Kingdom",
    flag: "🇬🇧",
    title: "UK Treasury introduces new digital asset taxation framework",
    summary: "HM Treasury publishes detailed guidance on cryptocurrency taxation, including clear rules for DeFi activities and NFT transactions.",
    impact: "Neutral",
    category: "Taxation",
    timestamp: "12 hours ago",
    source: "HM Treasury"
  },
  {
    id: 6,
    country: "India",
    flag: "🇮🇳",
    title: "Reserve Bank of India cuts repo rate by 0.25%",
    summary: "RBI reduces the benchmark repo rate to 6.25% to stimulate economic growth while maintaining inflation targeting within acceptable range.",
    impact: "Bullish",
    category: "Monetary Policy",
    timestamp: "1 day ago",
    source: "Reserve Bank of India"
  }
];

export function Policies() {
  const [policies, setPolicies] = useState<PolicyUpdate[]>(samplePolicies);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'Bullish':
        return <TrendingUp className="h-4 w-4" />;
      case 'Bearish':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Bullish':
        return "border-success text-success bg-success/10";
      case 'Bearish':
        return "border-danger text-danger bg-danger/10";
      default:
        return "border-muted-foreground text-muted-foreground bg-muted/10";
    }
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "all" || policy.country === selectedCountry;
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
    
    return matchesSearch && matchesCountry && matchesCategory;
  });

  const countries = Array.from(new Set(policies.map(p => p.country)));
  const categories = Array.from(new Set(policies.map(p => p.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="financial-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Global Economic Policy Feed</h1>
                <p className="text-muted-foreground">
                  AI-powered summaries of economic policies from around the world
                </p>
              </div>
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="financial-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Updates</p>
                  <p className="text-2xl font-bold text-foreground">{policies.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="financial-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Bullish Policies</p>
                  <p className="text-2xl font-bold text-foreground">
                    {policies.filter(p => p.impact === 'Bullish').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="financial-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-danger" />
                <div>
                  <p className="text-sm text-muted-foreground">Bearish Policies</p>
                  <p className="text-2xl font-bold text-foreground">
                    {policies.filter(p => p.impact === 'Bearish').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="financial-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policy Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Policy Updates ({filteredPolicies.length})
            </h2>
            <Badge variant="outline" className="text-xs">
              AI-Generated Summaries
            </Badge>
          </div>
          
          {filteredPolicies.length === 0 ? (
            <Card className="financial-card">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No policies found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search filters to see more results.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPolicies.map((policy) => (
                <Card key={policy.id} className="financial-card hover:shadow-financial">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{policy.flag}</span>
                          <div>
                            <h3 className="font-semibold text-foreground">{policy.country}</h3>
                            <p className="text-sm text-muted-foreground">{policy.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {policy.category}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getImpactColor(policy.impact)}`}
                          >
                            <span className="mr-1">{getImpactIcon(policy.impact)}</span>
                            {policy.impact}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h4 className="font-medium text-foreground mb-2">{policy.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {policy.summary}
                        </p>
                      </div>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-card-border">
                        <span className="text-xs text-muted-foreground">
                          Source: {policy.source}
                        </span>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}