import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceCard } from "@/components/ui/price-card";
import { StatCard } from "@/components/ui/stat-card";
import { SimpleChart } from "@/components/ui/simple-chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Globe, Activity, Fuel, Landmark, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useTopMovers } from "@/hooks/use-stocks";
import { useCommodities, useForexPairs, useIndices } from "@/hooks/use-market";
import { Helmet } from "react-helmet-async";
import { 
  useEconomicCalendar, 
  useEarningsCalendar, 
  useIPOCalendar, 
  useInsiderTrading, 
  useSenateTrading,
  useMarketNews,
  useSectorPerformance
} from "@/hooks/use-market-data";

const mockMarketData = [
  { name: 'Mon', value: 42800 },
  { name: 'Tue', value: 43200 },
  { name: 'Wed', value: 43100 },
  { name: 'Thu', value: 43450 },
  { name: 'Fri', value: 43250 },
];

// Stock market groups by region
const asianMarkets = ["^N225", "^HSI", "000001.SS", "^KS11", "^TWII"];
const europeanMarkets = ["^FTSE", "^GDAXI", "^FCHI", "^STOXX50E", "^AEX"];
const americanMarkets = ["^GSPC", "^DJI", "^IXIC", "^GSPTSE", "^BVSP"];

export function Dashboard() {
  const navigate = useNavigate();
  const { data: commList = [], isLoading: loadingComm } = useCommodities();
  const { data: fxList = [], isLoading: loadingFx } = useForexPairs(["EURUSD", "GBPUSD", "USDJPY"]);
  const { data: indicesList = [], isLoading: loadingIndices } = useIndices();
  const { data: gainers = [], isLoading: loadingGainers } = useTopMovers('gainers');
  const { data: losers = [], isLoading: loadingLosers } = useTopMovers('losers');
  const { data: actives = [], isLoading: loadingActives } = useTopMovers('actives');
  const { data: economicEvents = [], isLoading: loadingEconomic } = useEconomicCalendar();
  const { data: earningsEvents = [], isLoading: loadingEarnings } = useEarningsCalendar();
  const { data: ipoEvents = [], isLoading: loadingIPO } = useIPOCalendar();
  const { data: insiderTrades = [], isLoading: loadingInsider } = useInsiderTrading();
  const { data: senateTrades = [], isLoading: loadingSenate } = useSenateTrading();
  const { data: marketNews = [], isLoading: loadingNews } = useMarketNews();
  const { data: sectorPerf = [], isLoading: loadingSectors } = useSectorPerformance();

  const handleStockClick = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Global Policy & Analytics Monitor | Live Market Data & Financial Insights</title>
        <meta name="description" content="Real-time financial intelligence platform tracking global markets, stock sentiment, economic policies, and investment flows with live data from 85+ countries." />
        <link rel="canonical" href="https://gpam.site/" />
        <meta property="og:title" content="GPAM.site - Global Policy & Analytics Monitor" />
        <meta property="og:description" content="Track live market data, stock prices, and global economic policies in real-time" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95"></div>
        <div className="relative text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <Badge className="bg-white/10 text-white border-white/20 mb-4 animate-fade-in">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
              Live Market Data
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight animate-slide-up">
              GPAM<span className="text-accent-light">.site</span>
            </h1>
            <p className="text-xl md:text-2xl mb-2 opacity-90 font-light">
              Global Policy & Analytics Monitor
            </p>
            <p className="text-base opacity-80 max-w-2xl mx-auto mb-6">
              Real-time financial intelligence platform monitoring global markets, economic policies, and investment flows
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/prices">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover-scale">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Live Prices
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard title="Markets" value="150+" icon={<TrendingUp className="h-4 w-4" />} />
          <StatCard title="Countries" value="85+" icon={<Globe className="h-4 w-4" />} />
          <StatCard title="Updates" value="24/7" icon={<Activity className="h-4 w-4" />} />
          <StatCard title="Assets" value="1000+" icon={<Landmark className="h-4 w-4" />} />
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12 space-y-12">
        {/* Global Market Snapshot */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Global Market Snapshot</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Prices */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Commodities</CardTitle>
                  <Badge className="bg-success/10 text-success border-success/20">Live</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {(loadingComm ? Array.from({ length: 3 }) : commList.slice(0, 3)).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded bg-muted/30 border border-border/20">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{loadingComm ? '—' : (item?.name || '—')}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{loadingComm ? '—' : `$${(item?.price ?? 0).toFixed(2)}`}</p>
                        <p className={`text-xs ${(item?.changesPercentage ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                          {loadingComm ? '—' : `${(item?.changesPercentage ?? 0) >= 0 ? '+' : ''}${(item?.changesPercentage ?? 0).toFixed(2)}%`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forex */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Forex Market Data</CardTitle>
                  <Badge className="bg-success/10 text-success border-success/20">Live</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {(loadingFx ? Array.from({ length: 3 }) : fxList.slice(0, 3)).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded bg-muted/30 border border-border/20">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{loadingFx ? '—' : (item?.symbol || '—')}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{loadingFx ? '—' : (item?.price ?? 0).toFixed(4)}</p>
                        <p className={`text-xs ${(item?.changesPercentage ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                          {loadingFx ? '—' : `${(item?.changesPercentage ?? 0) >= 0 ? '+' : ''}${(item?.changesPercentage ?? 0).toFixed(2)}%`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Index Market Data */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Index Market Data</CardTitle>
                  <Badge className="bg-success/10 text-success border-success/20">Live</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {(loadingIndices ? Array.from({ length: 3 }) : indicesList.slice(0, 3)).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded bg-muted/30 border border-border/20">
                      <div>
                        <p className="font-medium">{loadingIndices ? '—' : (item?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingIndices ? 'Loading...' : (item?.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{loadingIndices ? '—' : (item?.price ?? 0).toFixed(2)}</p>
                        <p className={`text-xs ${(item?.changesPercentage ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                          {loadingIndices ? '—' : `${(item?.changesPercentage ?? 0) >= 0 ? '+' : ''}${(item?.changesPercentage ?? 0).toFixed(2)}%`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sector Performance */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Sector Performance</CardTitle>
                  <Badge className="bg-success/10 text-success border-success/20">Live</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {(loadingSectors ? Array.from({ length: 3 }) : sectorPerf.slice(0, 3)).map((item: any, idx: number) => {
                    const change = parseFloat(item?.changesPercentage?.replace('%', '') || '0');
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 rounded bg-muted/30 border border-border/20">
                        <span className="font-medium">{loadingSectors ? '—' : (item?.sector || '—')}</span>
                        <p className={`text-sm font-semibold ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                          {loadingSectors ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market Performance */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Market Performance</h2>
          <Card className="financial-card hover-lift">
            <CardContent className="pt-6">
              <SimpleChart data={mockMarketData} dataKey="value" height={300} />
            </CardContent>
          </Card>
        </section>

        {/* Top Movers, Gainers, Losers */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Stock Market Movers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Gainers */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingGainers ? Array.from({ length: 5 }) : gainers.slice(0, 5)).map((item: any, idx: number) => (
                    <div 
                      key={idx} 
                      onClick={() => !loadingGainers && item?.symbol && handleStockClick(item.symbol)}
                      className="clickable-row flex items-center justify-between p-2 rounded bg-success/5 border border-success/10"
                    >
                      <div>
                        <p className="text-sm font-semibold">{loadingGainers ? '—' : (item?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingGainers ? 'Loading…' : (item?.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{loadingGainers ? '—' : `$${(item?.price ?? 0).toFixed(2)}`}</p>
                        <p className="text-xs text-success">{loadingGainers ? '—' : `+${(item?.changesPercentage ?? 0).toFixed(2)}%`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Losers */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-danger" />
                  Top Losers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingLosers ? Array.from({ length: 5 }) : losers.slice(0, 5)).map((item: any, idx: number) => (
                    <div 
                      key={idx}
                      onClick={() => !loadingLosers && item?.symbol && handleStockClick(item.symbol)}
                      className="clickable-row flex items-center justify-between p-2 rounded bg-danger/5 border border-danger/10"
                    >
                      <div>
                        <p className="text-sm font-semibold">{loadingLosers ? '—' : (item?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingLosers ? 'Loading…' : (item?.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{loadingLosers ? '—' : `$${(item?.price ?? 0).toFixed(2)}`}</p>
                        <p className="text-xs text-danger">{loadingLosers ? '—' : `${(item?.changesPercentage ?? 0).toFixed(2)}%`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Most Active */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Most Active
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingActives ? Array.from({ length: 5 }) : actives.slice(0, 5)).map((item: any, idx: number) => (
                    <div 
                      key={idx}
                      onClick={() => !loadingActives && item?.symbol && handleStockClick(item.symbol)}
                      className="clickable-row flex items-center justify-between p-2 rounded bg-primary/5 border border-primary/10"
                    >
                      <div>
                        <p className="text-sm font-semibold">{loadingActives ? '—' : (item?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingActives ? 'Loading…' : (item?.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{loadingActives ? '—' : `$${(item?.price ?? 0).toFixed(2)}`}</p>
                        <p className="text-xs text-primary">{loadingActives ? '—' : `Vol: ${(item?.volume || 0).toLocaleString()}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market Calendar */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Market Calendar</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Economic Calendar */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg">Economic Data</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingEconomic ? Array.from({ length: 5 }) : economicEvents.slice(0, 5)).map((event: any, idx: number) => (
                    <div key={idx} className="p-2 rounded bg-muted/20 border border-border/10">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold">{loadingEconomic ? '—' : (event?.event || '—')}</p>
                        <Badge variant="outline" className="text-xs">{loadingEconomic ? '—' : (event?.country || '—')}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{loadingEconomic ? 'Loading...' : (event?.date ? new Date(event.date).toLocaleDateString() : 'N/A')}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Earnings Calendar */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg">Earnings Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingEarnings ? Array.from({ length: 5 }) : earningsEvents.slice(0, 5)).map((event: any, idx: number) => (
                    <div key={idx} className="clickable-row p-2 rounded bg-muted/20 border border-border/10" onClick={() => !loadingEarnings && event?.symbol && handleStockClick(event.symbol)}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold">{loadingEarnings ? '—' : (event?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingEarnings ? '—' : (event?.time || '—')}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{loadingEarnings ? 'Loading...' : (event?.date ? new Date(event.date).toLocaleDateString() : 'N/A')}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* IPO Calendar */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg">IPO Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingIPO ? Array.from({ length: 5 }) : ipoEvents.slice(0, 5)).map((event: any, idx: number) => (
                    <div key={idx} className="p-2 rounded bg-muted/20 border border-border/10">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold">{loadingIPO ? '—' : (event?.symbol || '—')}</p>
                        <Badge variant="outline" className="text-xs">{loadingIPO ? '—' : (event?.exchange || '—')}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{loadingIPO ? 'Loading...' : (event?.company || '—')}</p>
                      <p className="text-xs text-muted-foreground">{loadingIPO ? '—' : (event?.date ? new Date(event.date).toLocaleDateString() : 'N/A')}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trading Activity */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Insider & Congressional Trading</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insider Trading */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg">Insider Trading</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingInsider ? Array.from({ length: 5 }) : insiderTrades.slice(0, 5)).map((trade: any, idx: number) => (
                    <div key={idx} className="clickable-row p-3 rounded bg-muted/20 border border-border/10" onClick={() => !loadingInsider && trade?.symbol && handleStockClick(trade.symbol)}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold">{loadingInsider ? '—' : (trade?.symbol || '—')}</p>
                        <Badge variant={trade?.transactionType?.includes('Sale') ? 'destructive' : 'default'} className="text-xs">
                          {loadingInsider ? '—' : (trade?.transactionType || 'N/A')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{loadingInsider ? 'Loading...' : (trade?.reportingName || 'Unknown')}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs">{loadingInsider ? '—' : `${(trade?.securitiesTransacted ?? 0).toLocaleString()} shares`}</p>
                        <p className="text-xs">{loadingInsider ? '—' : `$${(trade?.price ?? 0).toFixed(2)}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Senate Trading */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="text-lg">Congressional Trading</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingSenate ? Array.from({ length: 5 }) : senateTrades.slice(0, 5)).map((trade: any, idx: number) => (
                    <div key={idx} className="clickable-row p-3 rounded bg-muted/20 border border-border/10" onClick={() => !loadingSenate && trade?.symbol && handleStockClick(trade.symbol)}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold">{loadingSenate ? '—' : (trade?.symbol || '—')}</p>
                        <Badge variant={trade?.type?.includes('sale') ? 'destructive' : 'default'} className="text-xs">
                          {loadingSenate ? '—' : (trade?.type || 'N/A')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{loadingSenate ? 'Loading...' : (trade?.senator || 'Unknown')}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs">{loadingSenate ? '—' : (trade?.amount || 'N/A')}</p>
                        <p className="text-xs text-muted-foreground">{loadingSenate ? '—' : (trade?.transactionDate ? new Date(trade.transactionDate).toLocaleDateString() : 'N/A')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market News */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Market News</h2>
          <Card className="financial-card hover-lift">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(loadingNews ? Array.from({ length: 6 }) : marketNews.slice(0, 6)).map((news: any, idx: number) => (
                  <a 
                    key={idx} 
                    href={loadingNews ? '#' : (news?.url || '#')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="clickable-row p-4 rounded bg-muted/20 border border-border/10 block"
                  >
                    <div className="flex gap-3">
                      {news?.image && (
                        <img src={news.image} alt="" className="w-20 h-20 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1 line-clamp-2">{loadingNews ? 'Loading...' : (news?.title || 'No title')}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{loadingNews ? '—' : (news?.site || '—')}</span>
                          <span>{loadingNews ? '—' : (news?.publishedDate ? new Date(news.publishedDate).toLocaleDateString() : '—')}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Start Tracking Markets Today</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Access real-time data, advanced analytics, and comprehensive market insights all in one platform
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/prices">
              <Button size="lg" className="hover-scale">
                Explore Markets <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/calculators">
              <Button size="lg" variant="outline" className="hover-scale">
                Financial Tools
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
