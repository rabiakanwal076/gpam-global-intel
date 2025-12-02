import { useState } from 'react';
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
    <div className="min-h-screen bg-background">
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
            <div className="grid gap-4">
              {filteredPolicies.filter(p => p.impact === 'high').map((policy) => {
                const ImpactIcon = impactIcons[policy.impact];
                return (
                  <Card key={policy.id} className="hover:shadow-lg transition-smooth border-danger/20">
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
                          <p className="text-muted-foreground leading-relaxed">{policy.summary}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">{policy.category}</Badge>
                            {policy.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex lg:flex-col items-center lg:items-end gap-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(policy.date).toLocaleDateString()}
                          </div>
                          <Button variant="outline" size="sm">Analyze Impact</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {filteredPolicies.filter(p => p.impact === 'high').length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-danger mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No High Impact Policies</h3>
                  <p className="text-muted-foreground">No high impact policies match your current filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="financial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Most Discussed Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Interest Rates", "Digital Currency", "Trade Policy", "Climate Regulation", "Tax Reform"].map((topic, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <span className="font-medium">{topic}</span>
                        <Badge variant="secondary">{Math.floor(Math.random() * 50 + 10)} mentions</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="financial-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-accent" />
                    Regional Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { region: "North America", flag: "🇺🇸", activity: "High" },
                      { region: "Europe", flag: "🇪🇺", activity: "Medium" },
                      { region: "Asia Pacific", flag: "🌏", activity: "High" },
                      { region: "Latin America", flag: "🌎", activity: "Low" },
                      { region: "Middle East", flag: "🌍", activity: "Medium" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.flag}</span>
                          <span className="font-medium">{item.region}</span>
                        </div>
                        <Badge className={
                          item.activity === "High" ? "bg-success/10 text-success" :
                          item.activity === "Medium" ? "bg-warning/10 text-warning" :
                          "bg-muted text-muted-foreground"
                        }>{item.activity}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="financial-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    AI Policy Correlation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { policy: "Fed Rate Decision", market: "S&P 500", correlation: 0.82, impact: "Strong inverse correlation with rate hikes" },
                      { policy: "ECB Digital Euro", market: "EUR/USD", correlation: 0.65, impact: "Moderate positive correlation during announcements" },
                      { policy: "China Crypto Rules", market: "Bitcoin", correlation: -0.78, impact: "Strong negative correlation with restrictive policies" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{item.policy} → {item.market}</span>
                          <Badge className={item.correlation > 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}>
                            r = {item.correlation > 0 ? "+" : ""}{item.correlation.toFixed(2)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="financial-card">
                <CardHeader>
                  <CardTitle className="text-lg">AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm font-medium text-foreground mb-1">Rate Sensitivity</p>
                      <p className="text-xs text-muted-foreground">Tech sector showing elevated sensitivity to Fed guidance.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                      <p className="text-sm font-medium text-foreground mb-1">Green Policy Trend</p>
                      <p className="text-xs text-muted-foreground">ESG-focused policies driving capital flows to renewables.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <p className="text-sm font-medium text-foreground mb-1">Geopolitical Risk</p>
                      <p className="text-xs text-muted-foreground">Trade tensions creating volatility in EM currencies.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}