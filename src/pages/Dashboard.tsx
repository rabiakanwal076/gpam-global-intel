import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceCard } from "@/components/ui/price-card";
import { StatCard } from "@/components/ui/stat-card";
import { SimpleChart } from "@/components/ui/simple-chart";
import { TrendingUp, Globe, DollarSign, Activity, AlertTriangle, Newspaper, MapPin, Briefcase, BarChart3, TrendingDown, Plus, ArrowRight, Bitcoin, Fuel, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTopMovers, useSymbolSearch, useIntraday } from "@/hooks/use-stocks";
import { useState } from "react";

// Sample market data
const mockMarketData = [
  { name: 'Mon', btc: 42800, gold: 2040, oil: 73 },
  { name: 'Tue', btc: 43200, gold: 2045, oil: 74 },
  { name: 'Wed', btc: 43100, gold: 2038, oil: 72 },
  { name: 'Thu', btc: 43450, gold: 2050, oil: 75 },
  { name: 'Fri', btc: 43250, gold: 2045, oil: 74 },
];

// Fetch real market data (placeholder for future API integration)
const fetchMarketData = async () => {
  // This will be replaced with real API calls (CoinGecko, etc.)
  return {
    bitcoin: { price: 43250, change: 2.4 },
    gold: { price: 2045, change: -0.8 },
    oil: { price: 74.50, change: 1.2 },
    usdeur: { price: 1.0875, change: 0.3 }
  };
};

export const Dashboard = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['market-data'],
    queryFn: fetchMarketData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  const { data: gainers = [], isLoading: loadingGainers } = useTopMovers('gainers');
  const { data: losers = [], isLoading: loadingLosers } = useTopMovers('losers');
  const [query, setQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const { data: searchResults = [] } = useSymbolSearch(query);
  const { data: intraday = [] } = useIntraday(selectedSymbol, '5min');

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
        <div className="relative text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm">Live Market Data</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
              🌀 <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">GPAM</span>.site
            </h1>
            <p className="text-xl md:text-3xl mb-4 opacity-90 font-light">
              Global Policy & Analytics Monitor
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Real-time financial intelligence platform monitoring global markets, economic policies, and investment flows across 85+ countries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prices">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View Live Prices
                </Button>
              </Link>
              <Link to="/calculators">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Financial Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard 
            title="Markets Tracked" 
            value="150+" 
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard 
            title="Countries" 
            value="85+" 
            icon={<Globe className="h-4 w-4" />}
          />
          <StatCard 
            title="Active Policies" 
            value="1,200+" 
            icon={<Newspaper className="h-4 w-4" />}
          />
          <StatCard 
            title="Daily Updates" 
            value="24/7" 
            icon={<Activity className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Column - Market Overview */}
          <div className="xl:col-span-3 space-y-8">
            {/* Real-Time Prices with Enhanced Design */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader className="financial-card-header pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      Global Market Snapshot
                    </CardTitle>
                    <CardDescription className="mt-2">Live prices and market movements • Updated every 30s</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <PriceCard 
                    title="Bitcoin" 
                    value="$43,250" 
                    change={2.4}
                    changePercent={2.4}
                    icon={<Bitcoin className="h-4 w-4" />}
                    loading={isLoading}
                  />
                  <PriceCard 
                    title="Gold" 
                    value="$2,045/oz" 
                    change={-0.8}
                    changePercent={-0.8}
                    icon={<Landmark className="h-4 w-4" />}
                    loading={isLoading}
                  />
                  <PriceCard 
                    title="Crude Oil" 
                    value="$74.50/bbl" 
                    change={1.2}
                    changePercent={1.2}
                    icon={<Fuel className="h-4 w-4" />}
                    loading={isLoading}
                  />
                  <PriceCard 
                    title="USD/EUR" 
                    value="1.0875" 
                    change={0.3}
                    changePercent={0.3}
                    icon={<DollarSign className="h-4 w-4" />}
                    loading={isLoading}
                  />
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <Link to="/prices">
                    <Button variant="outline" className="w-full sm:w-auto">
                      View All Markets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Policy Updates */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader className="financial-card-header">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Newspaper className="h-6 w-6 text-accent" />
                      </div>
                      Latest Policy Updates
                    </CardTitle>
                    <CardDescription className="mt-2">AI-summarized economic policy changes with market impact analysis</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative pl-6 pb-6 border-l-2 border-primary/30 last:border-l-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Fed Signals Rate Cut Pause</h4>
                      <Badge variant="destructive" className="text-xs">High Impact</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      US Federal Reserve indicates potential pause in rate cuts amid persistent inflation concerns and strong labor market data
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        United States
                      </span>
                      <span className="text-muted-foreground">2 hours ago</span>
                      <span className="bg-danger/10 text-danger px-2 py-1 rounded">Markets: -1.2%</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-6 pb-6 border-l-2 border-success/30 last:border-l-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-success rounded-full border-4 border-background"></div>
                  <div className="bg-gradient-to-r from-success/5 to-transparent p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">China Announces Green Investment Fund</h4>
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success">Medium Impact</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      $50B fund aimed at renewable energy and climate tech investments, targeting carbon neutrality goals by 2060
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        China
                      </span>
                      <span className="text-muted-foreground">4 hours ago</span>
                      <span className="bg-success/10 text-success px-2 py-1 rounded">Clean Energy: +3.4%</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-warning rounded-full border-4 border-background"></div>
                  <div className="bg-gradient-to-r from-warning/5 to-transparent p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">EU Digital Services Act Implementation</h4>
                      <Badge variant="secondary" className="text-xs bg-warning/10 text-warning">Low Impact</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      New regulations for digital platforms take effect, impacting major tech companies operating in Europe
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        European Union
                      </span>
                      <span className="text-muted-foreground">6 hours ago</span>
                      <span className="bg-warning/10 text-warning px-2 py-1 rounded">Tech Stocks: -0.5%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link to="/policies">
                    <Button variant="outline" className="w-full sm:w-auto">
                      View All Policy Updates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Market Trend Chart */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-success" />
                  </div>
                  Market Performance Trends
                </CardTitle>
                <CardDescription>7-day performance overview across major asset classes</CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleChart data={mockMarketData} dataKey="btc" />
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Best Performer</p>
                    <p className="font-semibold text-success">Bitcoin +2.4%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Worst Performer</p>
                    <p className="font-semibold text-danger">Gold -0.8%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Most Volatile</p>
                    <p className="font-semibold text-warning">Crude Oil ±3.2%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Trading Volume</p>
                    <p className="font-semibold text-primary">$2.1T</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stocks — Top Movers */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  Stocks — Top Movers
                </CardTitle>
                <CardDescription>Live stock market gainers and losers (1m refresh)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Top Gainers</h4>
                    <div className="space-y-3">
                      {(loadingGainers ? Array.from({ length: 5 }) : gainers.slice(0, 5)).map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/10">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{loadingGainers ? '—' : item.symbol}</p>
                            <p className="text-xs text-muted-foreground">{loadingGainers ? 'Loading…' : (item.name || '')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{loadingGainers ? '—' : `$${(item.price ?? 0).toFixed(2)}`}</p>
                            <p className="text-xs text-success">{loadingGainers ? '—' : `${(item.changesPercentage ?? 0).toFixed(2)}%`}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Top Losers</h4>
                    <div className="space-y-3">
                      {(loadingLosers ? Array.from({ length: 5 }) : losers.slice(0, 5)).map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-danger/5 border border-danger/10">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{loadingLosers ? '—' : item.symbol}</p>
                            <p className="text-xs text-muted-foreground">{loadingLosers ? 'Loading…' : (item.name || '')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{loadingLosers ? '—' : `$${(item.price ?? 0).toFixed(2)}`}</p>
                            <p className="text-xs text-danger">{loadingLosers ? '—' : `${(item.changesPercentage ?? 0).toFixed(2)}%`}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Right Column */}
          <div className="space-y-6">
            {/* Stock Lookup */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="text-lg">Stock Lookup</CardTitle>
                <CardDescription>Search symbols and view intraday trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search symbols (e.g., AAPL, MSFT, TSLA)..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label="Search stock symbols"
                    />
                    {query && searchResults.length > 0 && (
                      <div className="mt-2 border rounded-lg bg-card shadow-financial divide-y max-h-60 overflow-auto">
                        {searchResults.slice(0, 6).map((r: any, i: number) => (
                          <button
                            key={`${r.symbol}-${i}`}
                            className="w-full text-left px-3 py-2 hover:bg-muted/50"
                            onClick={() => { setSelectedSymbol(r.symbol); setQuery(''); }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{r.symbol}</span>
                              <span className="text-xs text-muted-foreground">{r.region || ''}</span>
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{r.name}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Selected:</span>
                      <Badge variant="outline" className="text-xs">{selectedSymbol}</Badge>
                    </div>
                    <div className="h-40">
                      <SimpleChart data={intraday} dataKey="close" type="line" height={160} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Navigation */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Jump to key features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/prices">
                  <Button className="w-full justify-start hover:bg-primary/5" variant="ghost">
                    <TrendingUp className="h-4 w-4 mr-3 text-primary" />
                    <span>Live Market Prices</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
                <Link to="/policies">
                  <Button className="w-full justify-start hover:bg-accent/5" variant="ghost">
                    <Globe className="h-4 w-4 mr-3 text-accent" />
                    <span>Policy Dashboard</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
                <Link to="/calculators">
                  <Button className="w-full justify-start hover:bg-success/5" variant="ghost">
                    <BarChart3 className="h-4 w-4 mr-3 text-success" />
                    <span>Financial Calculators</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
                <Link to="/impact">
                  <Button className="w-full justify-start hover:bg-warning/5" variant="ghost">
                    <Activity className="h-4 w-4 mr-3 text-warning" />
                    <span>Impact Analysis</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enhanced Market Alerts */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Market Alerts
                </CardTitle>
                <CardDescription>Real-time market notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative p-4 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">High Volatility Alert</p>
                      <p className="text-xs text-muted-foreground mt-1">Crypto markets showing increased volatility (±5% in 24h)</p>
                      <p className="text-xs text-warning mt-2">Active • 15 min ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-4 bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Investment Opportunity</p>
                      <p className="text-xs text-muted-foreground mt-1">Gold showing strong support at $2,040 level</p>
                      <p className="text-xs text-success mt-2">Triggered • 1 hour ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Policy Update</p>
                      <p className="text-xs text-muted-foreground mt-1">New trade policies announced - monitoring impact</p>
                      <p className="text-xs text-primary mt-2">Monitoring • 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Top Countries */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="text-lg">Top Monitored Countries</CardTitle>
                <CardDescription>Most active policy regions this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/country/usa">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-smooth group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-primary to-primary-dark rounded-sm"></div>
                      <div>
                        <span className="text-sm font-medium">United States</span>
                        <p className="text-xs text-muted-foreground">Federal Reserve, Trade Policy</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success">+12</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </Link>
                
                <Link to="/country/china">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-smooth group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-danger to-warning rounded-sm"></div>
                      <div>
                        <span className="text-sm font-medium">China</span>
                        <p className="text-xs text-muted-foreground">Green Investment, Tech Regulation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success">+8</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </Link>
                
                <Link to="/country/eu">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-smooth group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-accent to-accent-light rounded-sm"></div>
                      <div>
                        <span className="text-sm font-medium">European Union</span>
                        <p className="text-xs text-muted-foreground">Digital Services, Climate Policy</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success">+6</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Featured Insights */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="text-lg">Featured Insights</CardTitle>
                <CardDescription>AI-generated market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Weekly Market Outlook</h4>
                    <p className="text-xs text-muted-foreground">Central bank decisions expected to drive volatility across asset classes...</p>
                    <Link to="/blog">
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-xs">
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};