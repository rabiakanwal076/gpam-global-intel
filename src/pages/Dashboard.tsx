import { useState, useEffect } from "react";
import { PriceCard } from "@/components/ui/price-card";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bitcoin, 
  DollarSign, 
  TrendingUp, 
  Globe, 
  Newspaper, 
  Building,
  Fuel,
  Shield,
  Activity,
  MapPin
} from "lucide-react";

// Sample data - in real app this would come from APIs
const sampleMarketData = [
  {
    title: "Bitcoin",
    value: "$67,234",
    change: 1234.56,
    changePercent: 1.87,
    subtitle: "24h high: $68,500",
    icon: <Bitcoin className="h-4 w-4" />
  },
  {
    title: "Gold",
    value: "$2,047.80",
    change: -12.30,
    changePercent: -0.60,
    subtitle: "Troy ounce",
    icon: <Shield className="h-4 w-4" />
  },
  {
    title: "Crude Oil",
    value: "$85.42",
    change: 2.15,
    changePercent: 2.58,
    subtitle: "WTI per barrel",
    icon: <Fuel className="h-4 w-4" />
  },
  {
    title: "EUR/USD",
    value: "1.0876",
    change: -0.0023,
    changePercent: -0.21,
    subtitle: "European Central Bank",
    icon: <DollarSign className="h-4 w-4" />
  }
];

const samplePolicyUpdates = [
  {
    id: 1,
    country: "🇺🇸 USA",
    title: "Federal Reserve holds interest rates at 5.25-5.50%",
    impact: "Neutral",
    time: "2 hours ago"
  },
  {
    id: 2,
    country: "🇪🇺 EU",
    title: "European Parliament approves new crypto regulation framework",
    impact: "Bullish",
    time: "4 hours ago"
  },
  {
    id: 3,
    country: "🇯🇵 Japan",
    title: "Bank of Japan maintains ultra-low interest rate policy",
    impact: "Bearish",
    time: "6 hours ago"
  }
];

const sampleInvestments = [
  { company: "Tesla", amount: "$1.5B", type: "Bitcoin Treasury", change: "+12%" },
  { company: "MicroStrategy", amount: "$5.9B", type: "Bitcoin Holdings", change: "+8%" },
  { company: "BlackRock", amount: "$4.2B", type: "Spot Bitcoin ETF", change: "+15%" }
];

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Live Market Data</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Global Policy & Analytics Monitor
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time financial intelligence platform tracking global markets, economic policies, 
              and investment flows. Get AI-powered insights for informed decision making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-white">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Live Markets
              </Button>
              <Button size="lg" variant="outline">
                <Globe className="mr-2 h-5 w-5" />
                Explore Countries
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Market Overview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Market Overview</h2>
            <Badge variant="outline" className="text-xs">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleMarketData.map((item, index) => (
              <PriceCard
                key={index}
                title={item.title}
                value={item.value}
                change={item.change}
                changePercent={item.changePercent}
                subtitle={item.subtitle}
                icon={item.icon}
                loading={loading}
              />
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Global Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Active Markets"
              value="195"
              subtitle="Countries monitored"
              icon={<Globe className="h-4 w-4" />}
              loading={loading}
            />
            <StatCard
              title="Policy Updates"
              value="42"
              subtitle="Today"
              icon={<Newspaper className="h-4 w-4" />}
              trend={{ value: 12, label: "This week" }}
              loading={loading}
            />
            <StatCard
              title="Investment Flows"
              value="$12.4B"
              subtitle="Weekly volume"
              icon={<Building className="h-4 w-4" />}
              trend={{ value: 8.5, label: "% increase" }}
              loading={loading}
            />
          </div>
        </section>

        {/* Latest Policy Updates */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Latest Policy Updates</h2>
            <Button variant="outline">View All Policies</Button>
          </div>
          
          <Card className="financial-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Newspaper className="h-5 w-5 text-primary" />
                <span>Global Economic Policy Feed</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {samplePolicyUpdates.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{policy.country}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          policy.impact === 'Bullish' ? 'border-success text-success' :
                          policy.impact === 'Bearish' ? 'border-danger text-danger' :
                          'border-muted-foreground text-muted-foreground'
                        }`}
                      >
                        {policy.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{policy.title}</p>
                    <p className="text-xs text-muted-foreground">{policy.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Investment Tracker */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Investment Tracker</h2>
            <Button variant="outline">View All Investments</Button>
          </div>
          
          <Card className="financial-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary" />
                <span>Corporate Treasury Holdings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleInvestments.map((investment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-card-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{investment.company}</p>
                      <p className="text-sm text-muted-foreground">{investment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{investment.amount}</p>
                      <p className="text-sm text-success">{investment.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* World Map Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Global Market Map</h2>
          <Card className="financial-card">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">Interactive World Map</h3>
                <p className="text-muted-foreground">
                  Click on any country to view detailed financial data, policy updates, and market analysis.
                </p>
                <Button className="gradient-primary text-white">
                  Launch Map View
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}