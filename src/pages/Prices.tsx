import { useState, useEffect } from "react";
import { PriceCard } from "@/components/ui/price-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  Shield, 
  Fuel, 
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Activity,
  Search,
  Filter,
  BarChart3,
  Globe,
  Landmark
} from "lucide-react";
import { SimpleChart } from "@/components/ui/simple-chart";
import { useCommodities, useForexPairs, useIndices } from "@/hooks/use-market";
import { useTopMovers } from "@/hooks/use-stocks";
import { useSectorPerformance } from "@/hooks/use-market-data";

// Sample chart data for multiple timeframes
const chartData = {
  '1D': [
    { time: '9:00', price: 43000 },
    { time: '11:00', price: 43150 },
    { time: '13:00', price: 43080 },
    { time: '15:00', price: 43250 },
    { time: '17:00', price: 43180 },
  ],
  '7D': [
    { time: 'Mon', price: 42800 },
    { time: 'Tue', price: 43200 },
    { time: 'Wed', price: 43100 },
    { time: 'Thu', price: 43450 },
    { time: 'Fri', price: 43250 },
  ],
  '30D': [
    { time: 'W1', price: 41000 },
    { time: 'W2', price: 42500 },
    { time: 'W3', price: 43200 },
    { time: 'W4', price: 43250 },
  ]
};

export function Prices() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  // Live data hooks with realtime enabled
  const { data: commoditiesList = [], isLoading: loadingCommodities } = useCommodities({ realtime: true });
  const { data: forexList = [], isLoading: loadingForex } = useForexPairs(["EURUSD", "GBPUSD", "USDJPY"], { realtime: true });
  const { data: indicesList = [], isLoading: loadingIndices } = useIndices({ realtime: true });
  const { data: gainers = [], isLoading: loadingGainers } = useTopMovers('gainers', { realtime: true });
  const { data: losers = [], isLoading: loadingLosers } = useTopMovers('losers', { realtime: true });
  const { data: actives = [], isLoading: loadingActives } = useTopMovers('actives', { realtime: true });
  const { data: sectorPerf = [], isLoading: loadingSectors } = useSectorPerformance();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update lastUpdated when data changes
  useEffect(() => {
    if (!loadingCommodities && !loadingIndices && !loadingForex) {
      setLastUpdated(new Date());
    }
  }, [commoditiesList, indicesList, forexList]);

  const handleRefresh = () => {
    setLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => setLoading(false), 1000);
  };

  const filteredData = (data: any[]) => {
    return data.filter(item => 
      (item.title || item.name || item.symbol || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const exportToCSV = () => {
    console.log('Exporting to CSV...');
  };

  const commoditiesData = (commoditiesList || []).slice(0, 6).map((x) => ({
    title: x.name || x.symbol,
    value: `$${(x.price ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    change: Number(x.change ?? 0),
    changePercent: Number(x.changesPercentage ?? 0),
    icon: <Landmark className="h-4 w-4" />,
  }));

  const forexData = (forexList || []).map((x) => ({
    title: x.symbol?.replace("EURUSD", "EUR/USD").replace("GBPUSD", "GBP/USD").replace("USDJPY", "USD/JPY"),
    value: (x.price ?? 0).toFixed(4),
    change: Number(x.change ?? 0),
    changePercent: Number(x.changesPercentage ?? 0),
    icon: <DollarSign className="h-4 w-4" />,
  }));

  const stocksData = (indicesList || []).slice(0, 6).map((i) => ({
    title: i.name || i.symbol,
    value: (i.price ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    change: Number(i.change ?? 0),
    changePercent: Number(i.changesPercentage ?? 0),
    icon: <BarChart3 className="h-4 w-4" />,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Real-Time Market Prices</h1>
              </div>
              <p className="text-muted-foreground">
                Live global market data from stocks, commodities, and forex
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Market Overview Chart */}
        <section className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Market Overview</h2>
            <div className="flex gap-2">
              {Object.keys(chartData).map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
          <Card className="financial-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Market Index Movement</span>
                <Badge className="bg-success/10 text-success">+2.87%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleChart 
                data={chartData[selectedTimeframe as keyof typeof chartData]} 
                dataKey="price" 
                type="line" 
                height={320}
                stroke="hsl(var(--primary))"
              />
            </CardContent>
          </Card>
        </section>

        {/* Price Categories */}
        <Tabs defaultValue="stocks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stocks">Stock Indices</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
          </TabsList>


          {/* Stock Indices */}
          <TabsContent value="stocks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Stock Market Indices</h3>
              <Badge className="bg-success/10 text-success border-success/20">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse mr-1.5"></div>
                Live
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredData(stocksData).map((stock, index) => (
                <PriceCard
                  key={index}
                  title={stock.title}
                  value={stock.value}
                  change={stock.change}
                  changePercent={stock.changePercent}
                  icon={stock.icon}
                  loading={loading || loadingIndices}
                  isLive={true}
                />
              ))}
            </div>
          </TabsContent>

          {/* Commodities */}
          <TabsContent value="commodities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Commodities & Metals</h3>
              <Badge className="bg-success/10 text-success border-success/20">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse mr-1.5"></div>
                Live
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredData(commoditiesData).map((commodity, index) => (
                <PriceCard
                  key={index}
                  title={commodity.title}
                  value={commodity.value}
                  change={commodity.change}
                  changePercent={commodity.changePercent}
                  icon={commodity.icon}
                  loading={loading || loadingCommodities}
                  isLive={true}
                />
              ))}
            </div>
          </TabsContent>

          {/* Forex */}
          <TabsContent value="forex" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Foreign Exchange</h3>
              <Badge className="bg-success/10 text-success border-success/20">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse mr-1.5"></div>
                Live
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredData(forexData).map((forex, index) => (
                <PriceCard
                  key={index}
                  title={forex.title}
                  value={forex.value}
                  change={forex.change}
                  changePercent={forex.changePercent}
                  icon={forex.icon}
                  loading={loading || loadingForex}
                  isLive={true}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stock Market Movers */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">Stock Market Movers</h2>
            <Badge className="bg-success/10 text-success border-success/20">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse mr-1.5"></div>
              Live
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Gainers */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingGainers ? Array.from({ length: 5 }) : gainers.slice(0, 5)).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-success/5 border border-success/10 transition-all hover:bg-success/10">
                      <div>
                        <p className="text-sm font-semibold">{loadingGainers ? '—' : (item?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingGainers ? 'Loading…' : (item?.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold animate-pulse">{loadingGainers ? '—' : `$${(item?.price ?? 0).toFixed(2)}`}</p>
                        <p className="text-xs text-success animate-pulse">{loadingGainers ? '—' : `+${(item?.changesPercentage ?? 0).toFixed(2)}%`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Losers */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingDown className="h-5 w-5 text-danger" />
                  Top Losers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingLosers ? Array.from({ length: 5 }) : losers.slice(0, 5)).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-danger/5 border border-danger/10 transition-all hover:bg-danger/10">
                      <div>
                        <p className="text-sm font-semibold">{loadingLosers ? '—' : (item?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingLosers ? 'Loading…' : (item?.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold animate-pulse">{loadingLosers ? '—' : `$${(item?.price ?? 0).toFixed(2)}`}</p>
                        <p className="text-xs text-danger animate-pulse">{loadingLosers ? '—' : `${(item?.changesPercentage ?? 0).toFixed(2)}%`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Most Active */}
            <Card className="financial-card hover-lift">
              <CardHeader className="financial-card-header">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-primary" />
                  Most Active
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {(loadingActives ? Array.from({ length: 5 }) : actives.slice(0, 5)).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-primary/5 border border-primary/10 transition-all hover:bg-primary/10">
                      <div>
                        <p className="text-sm font-semibold">{loadingActives ? '—' : (item?.symbol || '—')}</p>
                        <p className="text-xs text-muted-foreground">{loadingActives ? 'Loading…' : (item?.name || '')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold animate-pulse">{loadingActives ? '—' : `$${(item?.price ?? 0).toFixed(2)}`}</p>
                        <p className={`text-xs animate-pulse ${(item?.changesPercentage ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                          {loadingActives ? '—' : `${(item?.changesPercentage ?? 0) >= 0 ? '+' : ''}${(item?.changesPercentage ?? 0).toFixed(2)}%`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sector Performance */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">Sector Performance</h2>
            <Badge className="bg-success/10 text-success border-success/20">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse mr-1.5"></div>
              Live
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {(loadingSectors ? Array.from({ length: 5 }) : sectorPerf).map((item: any, idx: number) => {
              const change = parseFloat(item?.changesPercentage?.replace('%', '') || '0');
              return (
                <Card key={idx} className="financial-card hover-lift">
                  <CardContent className="pt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">{loadingSectors ? '—' : (item?.sector || '—')}</p>
                    <p className={`text-2xl font-bold ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {loadingSectors ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Market Statistics */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground text-center">Market Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="financial-card">
              <CardContent className="pt-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Markets Tracked</p>
                <p className="text-2xl font-bold text-foreground">150+</p>
              </CardContent>
            </Card>
            <Card className="financial-card">
              <CardContent className="pt-6 text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-success" />
                <p className="text-sm text-muted-foreground">Update Frequency</p>
                <p className="text-2xl font-bold text-foreground">Real-time</p>
              </CardContent>
            </Card>
            <Card className="financial-card">
              <CardContent className="pt-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-warning" />
                <p className="text-sm text-muted-foreground">Assets</p>
                <p className="text-2xl font-bold text-foreground">1000+</p>
              </CardContent>
            </Card>
            <Card className="financial-card">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-sm text-muted-foreground">Data Points</p>
                <p className="text-2xl font-bold text-foreground">24/7</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}