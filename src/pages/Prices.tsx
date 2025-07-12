import { useState, useEffect } from "react";
import { PriceCard } from "@/components/ui/price-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bitcoin, 
  DollarSign, 
  Shield, 
  Fuel, 
  TrendingUp,
  Download,
  RefreshCw,
  Activity
} from "lucide-react";
import { SimpleChart } from "@/components/ui/simple-chart";

// Sample price data
const cryptoData = [
  { title: "Bitcoin", value: "$67,234", change: 1234.56, changePercent: 1.87, icon: <Bitcoin className="h-4 w-4" /> },
  { title: "Ethereum", value: "$3,456", change: -45.23, changePercent: -1.29, icon: <Activity className="h-4 w-4" /> },
  { title: "BNB", value: "$567.89", change: 12.45, changePercent: 2.24, icon: <Activity className="h-4 w-4" /> },
  { title: "Solana", value: "$123.45", change: 8.76, changePercent: 7.63, icon: <Activity className="h-4 w-4" /> }
];

const commoditiesData = [
  { title: "Gold", value: "$2,047.80", change: -12.30, changePercent: -0.60, icon: <Shield className="h-4 w-4" /> },
  { title: "Silver", value: "$24.56", change: 0.45, changePercent: 1.87, icon: <Shield className="h-4 w-4" /> },
  { title: "Crude Oil", value: "$85.42", change: 2.15, changePercent: 2.58, icon: <Fuel className="h-4 w-4" /> },
  { title: "Natural Gas", value: "$3.45", change: -0.12, changePercent: -3.36, icon: <Fuel className="h-4 w-4" /> }
];

const forexData = [
  { title: "EUR/USD", value: "1.0876", change: -0.0023, changePercent: -0.21, icon: <DollarSign className="h-4 w-4" /> },
  { title: "GBP/USD", value: "1.2645", change: 0.0034, changePercent: 0.27, icon: <DollarSign className="h-4 w-4" /> },
  { title: "USD/JPY", value: "149.82", change: 0.45, changePercent: 0.30, icon: <DollarSign className="h-4 w-4" /> },
  { title: "USD/CNY", value: "7.2345", change: -0.0123, changePercent: -0.17, icon: <DollarSign className="h-4 w-4" /> }
];

// Sample chart data
const chartData = [
  { time: '09:00', btc: 65000, eth: 3200, gold: 2040 },
  { time: '12:00', btc: 66500, eth: 3350, gold: 2045 },
  { time: '15:00', btc: 67200, eth: 3420, gold: 2048 },
  { time: '18:00', btc: 67234, eth: 3456, gold: 2047 },
];

export function Prices() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Real-Time Market Prices</h1>
              <p className="text-muted-foreground">
                Live global market data from crypto, commodities, and forex markets
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Price Overview Charts */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-foreground">Price Trends</h2>
          <Card className="financial-card">
            <CardHeader>
              <CardTitle>24-Hour Price Movement</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleChart 
                data={chartData} 
                dataKey="btc" 
                type="line" 
                height={320}
                stroke="hsl(var(--primary))"
              />
            </CardContent>
          </Card>
        </section>

        {/* Price Categories */}
        <Tabs defaultValue="crypto" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
          </TabsList>

          <TabsContent value="crypto" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Cryptocurrency Prices</h3>
              <Badge className="bg-primary/10 text-primary">Live Data</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cryptoData.map((crypto, index) => (
                <PriceCard
                  key={index}
                  title={crypto.title}
                  value={crypto.value}
                  change={crypto.change}
                  changePercent={crypto.changePercent}
                  icon={crypto.icon}
                  loading={loading}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commodities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Commodities & Metals</h3>
              <Badge className="bg-accent/10 text-accent">Market Hours</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commoditiesData.map((commodity, index) => (
                <PriceCard
                  key={index}
                  title={commodity.title}
                  value={commodity.value}
                  change={commodity.change}
                  changePercent={commodity.changePercent}
                  icon={commodity.icon}
                  loading={loading}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forex" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Foreign Exchange</h3>
              <Badge className="bg-success/10 text-success">24/7 Trading</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {forexData.map((forex, index) => (
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

        {/* Market Performance */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Market Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle>Top Gainers (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Solana", change: "+7.63%", value: "$123.45" },
                    { name: "Crude Oil", change: "+2.58%", value: "$85.42" },
                    { name: "Silver", change: "+1.87%", value: "$24.56" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <div className="text-right">
                        <div className="text-success font-bold">{item.change}</div>
                        <div className="text-sm text-muted-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader>
                <CardTitle>Top Losers (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Natural Gas", change: "-3.36%", value: "$3.45" },
                    { name: "Ethereum", change: "-1.29%", value: "$3,456" },
                    { name: "Gold", change: "-0.60%", value: "$2,047.80" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-danger/5 rounded-lg">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <div className="text-right">
                        <div className="text-danger font-bold">{item.change}</div>
                        <div className="text-sm text-muted-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}