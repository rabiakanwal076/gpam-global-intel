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
import { useCommodities, useForexPairs } from "@/hooks/use-market";
import { Helmet } from "react-helmet-async";

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
  const { data: fxList = [], isLoading: loadingFx } = useForexPairs(["EURUSD"]);
  const { data: gainers = [], isLoading: loadingGainers } = useTopMovers('gainers');
  const { data: losers = [], isLoading: loadingLosers } = useTopMovers('losers');
  const { data: actives = [], isLoading: loadingActives } = useTopMovers('actives');

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
          <Card className="financial-card hover-lift">
            <CardHeader className="financial-card-header">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Live Prices</CardTitle>
                <Badge className="bg-success/10 text-success border-success/20">Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <PriceCard 
                  title="Gold" 
                  value={`$${((commList.find(x => x.name?.includes("Gold"))?.price ?? 2045).toFixed(2))}`} 
                  change={Number(commList.find(x => x.name?.includes("Gold"))?.changesPercentage ?? -0.8)}
                  changePercent={Number(commList.find(x => x.name?.includes("Gold"))?.changesPercentage ?? -0.8)}
                  icon={<Landmark className="h-4 w-4" />}
                  loading={loadingComm}
                />
                <PriceCard 
                  title="Crude Oil" 
                  value={`$${((commList.find(x => x.name?.includes("Crude"))?.price ?? 74.5).toFixed(2))}`} 
                  change={Number(commList.find(x => x.name?.includes("Crude"))?.changesPercentage ?? 1.2)}
                  changePercent={Number(commList.find(x => x.name?.includes("Crude"))?.changesPercentage ?? 1.2)}
                  icon={<Fuel className="h-4 w-4" />}
                  loading={loadingComm}
                />
                <PriceCard 
                  title="EUR/USD" 
                  value={(fxList.find(x => x.symbol === 'EURUSD')?.price ?? 1.0875).toFixed(4)} 
                  change={Number(fxList.find(x => x.symbol === 'EURUSD')?.changesPercentage ?? 0.3)}
                  changePercent={Number(fxList.find(x => x.symbol === 'EURUSD')?.changesPercentage ?? 0.3)}
                  icon={<Globe className="h-4 w-4" />}
                  loading={loadingFx}
                />
              </div>
              <Link to="/prices">
                <Button variant="outline" size="sm" className="w-full hover-scale">
                  View All Markets <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
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
                      onClick={() => !loadingGainers && handleStockClick(item.symbol)}
                      className="clickable-row flex items-center justify-between p-2 rounded bg-success/5 border border-success/10"
                    >
                      <div>
                        <p className="text-sm font-semibold">{loadingGainers ? '—' : item.symbol}</p>
                        <p className="text-xs text-muted-foreground">{loadingGainers ? 'Loading…' : (item.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{loadingGainers ? '—' : `$${item.price?.toFixed(2)}`}</p>
                        <p className="text-xs text-success">{loadingGainers ? '—' : `+${item.changesPercentage?.toFixed(2)}%`}</p>
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
                      onClick={() => !loadingLosers && handleStockClick(item.symbol)}
                      className="clickable-row flex items-center justify-between p-2 rounded bg-danger/5 border border-danger/10"
                    >
                      <div>
                        <p className="text-sm font-semibold">{loadingLosers ? '—' : item.symbol}</p>
                        <p className="text-xs text-muted-foreground">{loadingLosers ? 'Loading…' : (item.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{loadingLosers ? '—' : `$${item.price?.toFixed(2)}`}</p>
                        <p className="text-xs text-danger">{loadingLosers ? '—' : `${item.changesPercentage?.toFixed(2)}%`}</p>
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
                      onClick={() => !loadingActives && handleStockClick(item.symbol)}
                      className="clickable-row flex items-center justify-between p-2 rounded bg-primary/5 border border-primary/10"
                    >
                      <div>
                        <p className="text-sm font-semibold">{loadingActives ? '—' : item.symbol}</p>
                        <p className="text-xs text-muted-foreground">{loadingActives ? 'Loading…' : (item.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{loadingActives ? '—' : `$${item.price?.toFixed(2)}`}</p>
                        <p className="text-xs text-primary">{loadingActives ? '—' : `Vol: ${(item.volume || 0).toLocaleString()}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
