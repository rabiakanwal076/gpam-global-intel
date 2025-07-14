import { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Calendar, Filter, TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';

// Mock policy data
const mockPolicies = [
  {
    id: 1,
    title: "Federal Reserve Announces Interest Rate Decision",
    country: "United States",
    flag: "🇺🇸",
    category: "Monetary Policy",
    impact: "high",
    date: "2024-01-15",
    summary: "Fed maintains rates at 5.25-5.50% citing inflation concerns and economic stability. Markets react positively to dovish stance.",
    source: "Federal Reserve",
    tags: ["Interest Rates", "Inflation", "USD"]
  },
  {
    id: 2,
    title: "European Central Bank Digital Currency Initiative",
    country: "European Union",
    flag: "🇪🇺",
    category: "Digital Currency",
    impact: "medium",
    date: "2024-01-14",
    summary: "ECB accelerates digital euro development with pilot programs across member states. Banking sector shows mixed reactions.",
    source: "European Central Bank",
    tags: ["CBDC", "Digital Euro", "Banking"]
  },
  {
    id: 3,
    title: "China Announces New Cryptocurrency Regulations",
    country: "China",
    flag: "🇨🇳",
    category: "Crypto Regulation",
    impact: "high",
    date: "2024-01-13",
    summary: "Stricter compliance requirements for crypto exchanges. Bitcoin and major altcoins see immediate price volatility.",
    source: "People's Bank of China",
    tags: ["Crypto", "Regulation", "Bitcoin"]
  },
  {
    id: 4,
    title: "UK Introduces New Corporate Tax Framework",
    country: "United Kingdom",
    flag: "🇬🇧",
    category: "Tax Policy",
    impact: "medium",
    date: "2024-01-12",
    summary: "New tax incentives for green energy investments. FTSE 100 renewable energy stocks surge following announcement.",
    source: "HM Treasury",
    tags: ["Tax", "Green Energy", "FTSE"]
  },
  {
    id: 5,
    title: "Japan's Central Bank Maintains Ultra-Low Rates",
    country: "Japan",
    flag: "🇯🇵",
    category: "Monetary Policy",
    impact: "low",
    date: "2024-01-11",
    summary: "Bank of Japan keeps negative interest rate policy unchanged. Yen weakens against major currencies.",
    source: "Bank of Japan",
    tags: ["Interest Rates", "JPY", "Currency"]
  }
];

const impactColors = {
  high: "bg-danger/10 text-danger border-danger/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20"
};

const impactIcons = {
  high: AlertTriangle,
  medium: Info,
  low: TrendingUp
};

export function Policies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || policy.country === selectedCountry;
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    const matchesImpact = selectedImpact === 'all' || policy.impact === selectedImpact;
    
    return matchesSearch && matchesCountry && matchesCategory && matchesImpact;
  });

  const countries = [...new Set(mockPolicies.map(p => p.country))];
  const categories = [...new Set(mockPolicies.map(p => p.category))];

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Global Policy Intelligence
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time analysis of economic policies and their market impact across major economies
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
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
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
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
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Impact Level</label>
                <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Impact Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="low">Low Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policy Feed */}
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="high-impact">High Impact</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest" className="space-y-4">
            <div className="grid gap-4">
              {filteredPolicies.map((policy) => {
                const ImpactIcon = impactIcons[policy.impact];
                return (
                  <Card key={policy.id} className="hover:shadow-lg transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{policy.flag}</span>
                              <div>
                                <h3 className="font-semibold text-lg">{policy.title}</h3>
                                <p className="text-sm text-muted-foreground">{policy.country} • {policy.source}</p>
                              </div>
                            </div>
                            <Badge className={impactColors[policy.impact]} variant="outline">
                              <ImpactIcon className="h-3 w-3 mr-1" />
                              {policy.impact.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {policy.summary}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">{policy.category}</Badge>
                            {policy.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex lg:flex-col items-center lg:items-end gap-2 lg:text-right">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(policy.date).toLocaleDateString()}
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="high-impact" className="space-y-4">
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-danger mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Impact Policies</h3>
              <p className="text-muted-foreground">
                Showing policies with significant market impact potential
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-4">
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trending Policies</h3>
              <p className="text-muted-foreground">
                Most discussed policies in financial markets
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                Deep insights and correlations powered by artificial intelligence
              </p>
            </div>
          </TabsContent>
        </Tabs>
    </main>
  );
}