import { useState, useEffect } from "react";
import { PriceCard } from "@/components/ui/price-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Bitcoin, 
  DollarSign, 
  Shield, 
  Fuel, 
  TrendingUp,
  Download,
  RefreshCw,
  Activity,
  Search,
  Filter,
  BarChart3,
  Eye,
  Star,
  ArrowUpDown
} from "lucide-react";
import { SimpleChart } from "@/components/ui/simple-chart";

// Enhanced sample price data with more realistic values
const cryptoData = [
  { title: "Bitcoin", value: "$43,250", change: 1234.56, changePercent: 2.87, marketCap: "$847B", volume: "$28.5B", icon: <Bitcoin className="h-4 w-4" /> },
  { title: "Ethereum", value: "$2,456", change: -45.23, changePercent: -1.81, marketCap: "$295B", volume: "$15.2B", icon: <Activity className="h-4 w-4" /> },
  { title: "BNB", value: "$234.89", change: 12.45, changePercent: 5.60, marketCap: "$35.8B", volume: "$2.1B", icon: <Activity className="h-4 w-4" /> },
  { title: "Solana", value: "$98.45", change: 8.76, changePercent: 9.78, marketCap: "$42.1B", volume: "$3.8B", icon: <Activity className="h-4 w-4" /> },
  { title: "Cardano", value: "$0.52", change: 0.03, changePercent: 6.12, marketCap: "$18.2B", volume: "$890M", icon: <Activity className="h-4 w-4" /> },
  { title: "Avalanche", value: "$36.78", change: -2.14, changePercent: -5.50, marketCap: "$14.5B", volume: "$1.2B", icon: <Activity className="h-4 w-4" /> }
];

const commoditiesData = [
  { title: "Gold", value: "$2,047.80", change: -12.30, changePercent: -0.60, unit: "per oz", icon: <Shield className="h-4 w-4" /> },
  { title: "Silver", value: "$24.56", change: 0.45, changePercent: 1.87, unit: "per oz", icon: <Shield className="h-4 w-4" /> },
  { title: "Crude Oil", value: "$74.42", change: 2.15, changePercent: 2.98, unit: "per barrel", icon: <Fuel className="h-4 w-4" /> },
  { title: "Natural Gas", value: "$2.85", change: -0.12, changePercent: -4.05, unit: "per MMBtu", icon: <Fuel className="h-4 w-4" /> },
  { title: "Copper", value: "$8,450", change: 125, changePercent: 1.50, unit: "per ton", icon: <Shield className="h-4 w-4" /> },
  { title: "Platinum", value: "$920.50", change: -8.20, changePercent: -0.88, unit: "per oz", icon: <Shield className="h-4 w-4" /> }
];

const forexData = [
  { title: "EUR/USD", value: "1.0876", change: -0.0023, changePercent: -0.21, icon: <DollarSign className="h-4 w-4" /> },
  { title: "GBP/USD", value: "1.2645", change: 0.0034, changePercent: 0.27, icon: <DollarSign className="h-4 w-4" /> },
  { title: "USD/JPY", value: "149.82", change: 0.45, changePercent: 0.30, icon: <DollarSign className="h-4 w-4" /> },
  { title: "USD/CNY", value: "7.2345", change: -0.0123, changePercent: -0.17, icon: <DollarSign className="h-4 w-4" /> },
  { title: "AUD/USD", value: "0.6543", change: 0.0087, changePercent: 1.35, icon: <DollarSign className="h-4 w-4" /> },
  { title: "USD/CAD", value: "1.3567", change: -0.0098, changePercent: -0.72, icon: <DollarSign className="h-4 w-4" /> }
];

const stocksData = [
  { title: "S&P 500", value: "4,567.89", change: 23.45, changePercent: 0.52, icon: <BarChart3 className="h-4 w-4" /> },
  { title: "NASDAQ", value: "14,234.56", change: -45.23, changePercent: -0.32, icon: <BarChart3 className="h-4 w-4" /> },
  { title: "Dow Jones", value: "35,678.90", change: 156.78, changePercent: 0.44, icon: <BarChart3 className="h-4 w-4" /> },
  { title: "FTSE 100", value: "7,456.78", change: 34.56, changePercent: 0.47, icon: <BarChart3 className="h-4 w-4" /> },
  { title: "DAX", value: "15,890.45", change: -67.89, changePercent: -0.43, icon: <BarChart3 className="h-4 w-4" /> },
  { title: "Nikkei 225", value: "32,456.78", change: 123.45, changePercent: 0.38, icon: <BarChart3 className="h-4 w-4" /> }
];

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
  const [favorites, setFavorites] = useState<string[]>(['Bitcoin', 'Gold', 'EUR/USD']);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => setLoading(false), 1000);
  };

  const toggleFavorite = (asset: string) => {
    setFavorites(prev => 
      prev.includes(asset) 
        ? prev.filter(f => f !== asset)
        : [...prev, asset]
    );
  };

  const filteredData = (data: any[]) => {
    return data.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const exportToCSV = () => {
    // Placeholder for CSV export functionality
    console.log('Exporting to CSV...');
  };

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
                Live global market data from crypto, commodities, forex, and stock markets
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
                <span>Bitcoin Price Movement</span>
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
        <Tabs defaultValue="crypto" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="stocks">Stock Indices</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
          </TabsList>

          {/* Cryptocurrency */}
          <TabsContent value="crypto" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Cryptocurrency Prices</h3>
              <Badge className="bg-primary/10 text-primary">Live Data</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredData(cryptoData).map((crypto, index) => (
                <div key={index} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 h-8 w-8 p-0"
                    onClick={() => toggleFavorite(crypto.title)}
                  >
                    <Star className={`h-4 w-4 ${favorites.includes(crypto.title) ? 'fill-current text-warning' : 'text-muted-foreground'}`} />
                  </Button>
                  <PriceCard
                    title={crypto.title}
                    value={crypto.value}
                    change={crypto.change}
                    changePercent={crypto.changePercent}
                    icon={crypto.icon}
                    subtitle={`Vol: ${crypto.volume}`}
                    loading={loading}
                    
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Stock Indices */}
          <TabsContent value="stocks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Stock Market Indices</h3>
              <Badge className="bg-accent/10 text-accent">Market Hours</Badge>
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
                  loading={loading}
                />
              ))}
            </div>
          </TabsContent>

          {/* Commodities */}
          <TabsContent value="commodities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Commodities & Metals</h3>
              <Badge className="bg-warning/10 text-warning">Spot Prices</Badge>
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
                  subtitle={commodity.unit}
                  loading={loading}
                />
              ))}
            </div>
          </TabsContent>

          {/* Forex */}
          <TabsContent value="forex" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Foreign Exchange</h3>
              <Badge className="bg-success/10 text-success">24/7 Trading</Badge>
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
                  loading={loading}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Market Performance Summary */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Market Performance Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Gainers */}
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Top Gainers (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Solana", symbol: "SOL", change: "+9.78%", value: "$98.45" },
                    { name: "Cardano", symbol: "ADA", change: "+6.12%", value: "$0.52" },
                    { name: "BNB", symbol: "BNB", change: "+5.60%", value: "$234.89" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-success/5 rounded-lg hover:bg-success/10 transition-colors">
                      <div>
                        <span className="font-medium text-foreground">{item.name}</span>
                        <p className="text-sm text-muted-foreground">{item.symbol}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-success font-bold">{item.change}</div>
                        <div className="text-sm text-muted-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Losers */}
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-danger" />
                  Top Losers (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Avalanche", symbol: "AVAX", change: "-5.50%", value: "$36.78" },
                    { name: "Natural Gas", symbol: "NG", change: "-4.05%", value: "$2.85" },
                    { name: "Ethereum", symbol: "ETH", change: "-1.81%", value: "$2,456" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-danger/5 rounded-lg hover:bg-danger/10 transition-colors">
                      <div>
                        <span className="font-medium text-foreground">{item.name}</span>
                        <p className="text-sm text-muted-foreground">{item.symbol}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-danger font-bold">{item.change}</div>
                        <div className="text-sm text-muted-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Market Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm text-muted-foreground">Total Market Cap</span>
                    <span className="font-semibold text-foreground">$1.7T</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm text-muted-foreground">24h Volume</span>
                    <span className="font-semibold text-foreground">$89.5B</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm text-muted-foreground">Bitcoin Dominance</span>
                    <span className="font-semibold text-foreground">49.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm text-muted-foreground">Fear & Greed Index</span>
                    <span className="font-semibold text-warning">64 (Greed)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}