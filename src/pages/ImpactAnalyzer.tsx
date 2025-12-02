import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleChart } from "@/components/ui/simple-chart";
import { Lightbulb, LineChart, Brain, AlertTriangle, TrendingUp, TrendingDown, Globe, Zap, Target, Activity } from "lucide-react";
import { Helmet } from "react-helmet-async";

const policyImpactData = [
  { time: 'Jan', value: 100, policy: 95 },
  { time: 'Feb', value: 102, policy: 98 },
  { time: 'Mar', value: 98, policy: 105 },
  { time: 'Apr', value: 105, policy: 110 },
  { time: 'May', value: 108, policy: 108 },
  { time: 'Jun', value: 112, policy: 115 },
];

const historicalImpacts = [
  { event: "Fed Rate Hike 0.25%", date: "2024-12-15", market: "S&P 500", impact: -1.2, recovery: "3 days" },
  { event: "ECB QE Announcement", date: "2024-11-20", market: "Euro Stoxx", impact: +2.8, recovery: "N/A" },
  { event: "China Stimulus Package", date: "2024-10-10", market: "HSI", impact: +4.5, recovery: "N/A" },
  { event: "UK Budget Release", date: "2024-09-25", market: "FTSE 100", impact: -0.8, recovery: "2 days" },
  { event: "Japan YCC Adjustment", date: "2024-08-30", market: "Nikkei", impact: -2.1, recovery: "5 days" },
];

const correlations = [
  { policy: "Interest Rate Changes", asset: "Government Bonds", correlation: -0.87, strength: "Very Strong" },
  { policy: "Quantitative Easing", asset: "Equity Markets", correlation: 0.72, strength: "Strong" },
  { policy: "Trade Tariffs", asset: "Emerging Markets", correlation: -0.65, strength: "Moderate" },
  { policy: "Fiscal Stimulus", asset: "Consumer Discretionary", correlation: 0.58, strength: "Moderate" },
  { policy: "Currency Intervention", asset: "Forex Pairs", correlation: 0.81, strength: "Strong" },
];

const aiSignals = [
  { id: 1, title: "Rate Sensitivity Alert", description: "Technology sector showing elevated sensitivity to Fed guidance. Consider hedging growth positions.", confidence: 85, type: "warning" },
  { id: 2, title: "Policy Correlation Detected", description: "Strong positive correlation between infrastructure spending proposals and industrial stocks.", confidence: 78, type: "opportunity" },
  { id: 3, title: "Geopolitical Risk Signal", description: "Energy sector volatility increasing with Middle East policy developments.", confidence: 72, type: "risk" },
  { id: 4, title: "Currency Impact Pattern", description: "EUR/USD showing predictable response pattern to ECB communications.", confidence: 81, type: "insight" },
];

const sectors = [
  { name: "Technology", sensitivity: "High", currentRisk: 72, trend: "increasing" },
  { name: "Healthcare", sensitivity: "Medium", currentRisk: 45, trend: "stable" },
  { name: "Financials", sensitivity: "High", currentRisk: 68, trend: "increasing" },
  { name: "Energy", sensitivity: "Very High", currentRisk: 85, trend: "volatile" },
  { name: "Consumer Staples", sensitivity: "Low", currentRisk: 28, trend: "decreasing" },
];

export function ImpactAnalyzer() {
  const [selectedPolicy, setSelectedPolicy] = useState("monetary");
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Policy Impact Analyzer | GPAM</title>
        <meta name="description" content="Analyze how policy changes correlate with market movements." />
        <link rel="canonical" href="/impact" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Policy Impact Analyzer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understand how economic policies affect markets with AI-powered correlation analysis
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Policy Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monetary">Monetary Policy</SelectItem>
              <SelectItem value="fiscal">Fiscal Policy</SelectItem>
              <SelectItem value="trade">Trade Policy</SelectItem>
              <SelectItem value="regulatory">Regulatory</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Impact Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Policy Events</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <Globe className="h-8 w-8 text-primary/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Market Impact</p>
                  <p className="text-2xl font-bold text-foreground">±1.8%</p>
                </div>
                <Activity className="h-8 w-8 text-warning/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Per policy event</p>
            </CardContent>
          </Card>
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Signals</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <Zap className="h-8 w-8 text-accent/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Active alerts</p>
            </CardContent>
          </Card>
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Correlation Accuracy</p>
                  <p className="text-2xl font-bold text-success">87%</p>
                </div>
                <Target className="h-8 w-8 text-success/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis */}
        <Tabs defaultValue="correlation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="correlation">Correlation</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="signals">AI Signals</TabsTrigger>
          </TabsList>

          <TabsContent value="correlation" className="space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Policy vs Market Movement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart data={policyImpactData} dataKey="value" type="line" height={300} />
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader>
                <CardTitle>Policy-Asset Correlations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {correlations.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-semibold text-foreground">{item.policy}</p>
                        <p className="text-sm text-muted-foreground">→ {item.asset}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={item.correlation > 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}>
                          {item.correlation > 0 ? "+" : ""}{item.correlation.toFixed(2)}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{item.strength}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle>Historical Policy Impact Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicalImpacts.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground">{item.event}</p>
                          <Badge variant="outline">{item.market}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {item.impact > 0 ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-danger" />
                          )}
                          <span className={item.impact > 0 ? "text-success font-bold" : "text-danger font-bold"}>
                            {item.impact > 0 ? "+" : ""}{item.impact}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Recovery: {item.recovery}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle>Sector Policy Sensitivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectors.map((sector, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground">{sector.name}</p>
                          <p className="text-sm text-muted-foreground">Sensitivity: {sector.sensitivity}</p>
                        </div>
                        <Badge className={
                          sector.trend === "increasing" ? "bg-danger/10 text-danger" :
                          sector.trend === "decreasing" ? "bg-success/10 text-success" :
                          "bg-warning/10 text-warning"
                        }>
                          {sector.trend}
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            sector.currentRisk > 70 ? "bg-danger" :
                            sector.currentRisk > 40 ? "bg-warning" :
                            "bg-success"
                          }`}
                          style={{ width: `${sector.currentRisk}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Current Risk: {sector.currentRisk}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-accent" />
                  AI-Generated Signals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiSignals.map((signal) => (
                    <div key={signal.id} className={`p-4 rounded-lg border ${
                      signal.type === "warning" ? "bg-warning/5 border-warning/20" :
                      signal.type === "opportunity" ? "bg-success/5 border-success/20" :
                      signal.type === "risk" ? "bg-danger/5 border-danger/20" :
                      "bg-primary/5 border-primary/20"
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className={`h-4 w-4 ${
                          signal.type === "warning" ? "text-warning" :
                          signal.type === "opportunity" ? "text-success" :
                          signal.type === "risk" ? "text-danger" :
                          "text-primary"
                        }`} />
                        <span className="font-semibold text-foreground">{signal.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{signal.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Confidence: {signal.confidence}%</Badge>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Insights are experimental and not investment advice.</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
