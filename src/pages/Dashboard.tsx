import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceCard } from "@/components/ui/price-card";
import { StatCard } from "@/components/ui/stat-card";
import { SimpleChart } from "@/components/ui/simple-chart";
import { TrendingUp, Globe, DollarSign, Activity, AlertTriangle, Newspaper, MapPin, Briefcase, BarChart3, TrendingDown, Plus, ArrowRight, Fuel, Landmark, Search, TrendingUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useTopMovers, useSymbolSearch, useIntraday } from "@/hooks/use-stocks";
import { useState } from "react";
import { useCommodities, useForexPairs } from "@/hooks/use-market";
import { useStockSentiment } from "@/hooks/use-sentiment";
import { usePolicyNews } from "@/hooks/use-policy-news";
import { Helmet } from "react-helmet-async";

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
  
  const { data: commList = [], isLoading: loadingComm } = useCommodities();
  const { data: fxList = [], isLoading: loadingFx } = useForexPairs(["EURUSD"]);
  const { data: gainers = [], isLoading: loadingGainers } = useTopMovers('gainers');
  const { data: losers = [], isLoading: loadingLosers } = useTopMovers('losers');
  const [query, setQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const { data: searchResults = [] } = useSymbolSearch(query);
  const { data: intraday = [] } = useIntraday(selectedSymbol, '5min');
  const { data: sentiment } = useStockSentiment(["AAPL", "TSLA", "NVDA", "MSFT", "GOOGL"]);
  const { data: policyNews, isLoading: newsLoading } = usePolicyNews();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Global Policy & Analytics Monitor | Live Market Data & Policy Insights</title>
        <meta name="description" content="Real-time financial intelligence platform tracking global markets, stocks sentiment, economic policies, and investment flows with live data." />
        <link rel="canonical" href="/" />
      </Helmet>
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
                <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">GPAM</span>.site
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <PriceCard 
                    title="Gold" 
                    value={`$${(((commList.find(x => (x.name||"").includes("Gold"))?.price) ?? 2045).toLocaleString(undefined, { maximumFractionDigits: 2 }))}/oz`} 
                    change={Number(commList.find(x => (x.name||"").includes("Gold"))?.changesPercentage ?? -0.8)}
                    changePercent={Number(commList.find(x => (x.name||"").includes("Gold"))?.changesPercentage ?? -0.8)}
                    icon={<Landmark className="h-4 w-4" />}
                    loading={loadingComm}
                  />
                  <PriceCard 
                    title="Crude Oil" 
                    value={`$${(((commList.find(x => (x.name||"").includes("Crude Oil"))?.price) ?? 74.5).toLocaleString(undefined, { maximumFractionDigits: 2 }))}/bbl`} 
                    change={Number(commList.find(x => (x.name||"").includes("Crude Oil"))?.changesPercentage ?? 1.2)}
                    changePercent={Number(commList.find(x => (x.name||"").includes("Crude Oil"))?.changesPercentage ?? 1.2)}
                    icon={<Fuel className="h-4 w-4" />}
                    loading={loadingComm}
                  />
                  <PriceCard 
                    title="EUR/USD" 
                    value={`${(fxList.find(x => x.symbol === 'EURUSD')?.price ?? 1.0875).toFixed(4)}`} 
                    change={Number(fxList.find(x => x.symbol === 'EURUSD')?.changesPercentage ?? 0.3)}
                    changePercent={Number(fxList.find(x => x.symbol === 'EURUSD')?.changesPercentage ?? 0.3)}
                    icon={<DollarSign className="h-4 w-4" />}
                    loading={loadingFx}
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

            {/* Latest Policy Updates - Live Data */}
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
                    <CardDescription className="mt-2">Live economic policy news with market impact analysis</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Live Data
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {newsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="relative pl-6 pb-6 border-l-2 border-muted">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-muted rounded-full border-4 border-background"></div>
                        <div className="bg-muted/50 p-4 rounded-lg animate-pulse">
                          <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-12 bg-muted rounded w-full mb-3"></div>
                          <div className="flex gap-2">
                            <div className="h-4 bg-muted rounded w-20"></div>
                            <div className="h-4 bg-muted rounded w-16"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : policyNews && policyNews.length > 0 ? (
                  policyNews.slice(0, 3).map((update, idx) => (
                    <div key={idx} className={`relative pl-6 pb-6 border-l-2 ${
                      update.impact === 'High' ? 'border-primary/30' : 
                      update.impact === 'Medium' ? 'border-success/30' : 'border-warning/30'
                    } last:border-l-0`}>
                      <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-4 border-background ${
                        update.impact === 'High' ? 'bg-primary' : 
                        update.impact === 'Medium' ? 'bg-success' : 'bg-warning'
                      }`}></div>
                      <div className={`bg-gradient-to-r p-4 rounded-lg ${
                        update.impact === 'High' ? 'from-primary/5 to-transparent' : 
                        update.impact === 'Medium' ? 'from-success/5 to-transparent' : 'from-warning/5 to-transparent'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{update.title}</h4>
                          <Badge 
                            variant={update.impact === 'High' ? 'destructive' : 'secondary'}
                            className={`text-xs ${
                              update.impact === 'Medium' ? 'bg-success/10 text-success' : 
                              update.impact === 'Low' ? 'bg-warning/10 text-warning' : ''
                            }`}
                          >
                            {update.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                          {update.content}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {update.country}
                          </span>
                          <span className="text-muted-foreground">
                            {new Date(update.publishedDate).toLocaleString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No policy updates available
                  </p>
                )}
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
            {/* Stock Sentiment Analysis - Live Data */}
            <Card className="financial-card border-0 shadow-financial">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUpIcon className="h-5 w-5 text-primary" />
                  Stock Sentiment Analysis
                </CardTitle>
                <CardDescription>Live news-based sentiment for major stocks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sentiment?.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/50"
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{stock.symbol}</div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            stock.sentiment === "Bullish" ? "default" :
                            stock.sentiment === "Bearish" ? "destructive" : "secondary"
                          }
                          className="text-xs"
                        >
                          {stock.sentiment}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {stock.totalArticles} articles
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        stock.score > 0 ? 'text-green-500' : stock.score < 0 ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        {stock.score > 0 ? '+' : ''}{stock.score}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stock.bullishCount}↑ {stock.bearishCount}↓
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    Loading sentiment data...
                  </div>
                )}
              </CardContent>
            </Card>

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