import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStockQuotes } from "@/hooks/use-stocks";
import { Trash2, Plus, TrendingUp, TrendingDown, Wallet, PieChart, BarChart3, Target, DollarSign, Activity } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SimpleChart } from "@/components/ui/simple-chart";

type Position = { id: string; symbol: string; quantity: number; buyPrice: number; buyDate?: string };

const performanceData = [
  { time: 'Jan', value: 10000 },
  { time: 'Feb', value: 10500 },
  { time: 'Mar', value: 10200 },
  { time: 'Apr', value: 11200 },
  { time: 'May', value: 11800 },
  { time: 'Jun', value: 12500 },
];

export function InvestmentTracker() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [positions, setPositions] = useState<Position[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("gpam_positions") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("gpam_positions", JSON.stringify(positions));
  }, [positions]);

  const symbols = useMemo(() => positions.map((p) => p.symbol.toUpperCase()), [positions]);
  const { data: quotes = [] } = useStockQuotes(symbols, { enabled: symbols.length > 0, realtime: true });

  const onAdd = () => {
    if (!symbol || !quantity || !buyPrice) return;
    setPositions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), symbol: symbol.toUpperCase(), quantity: Number(quantity), buyPrice: Number(buyPrice), buyDate: new Date().toISOString() },
    ]);
    setSymbol("");
    setQuantity("");
    setBuyPrice("");
  };

  const remove = (id: string) => setPositions((prev) => prev.filter((p) => p.id !== id));

  const rows = positions.map((p) => {
    const q = quotes.find((x) => x.symbol.toUpperCase() === p.symbol.toUpperCase());
    const price = q?.price ?? 0;
    const value = price * p.quantity;
    const cost = p.buyPrice * p.quantity;
    const pnl = value - cost;
    const pnlPct = cost ? (pnl / cost) * 100 : 0;
    return { ...p, price, value, cost, pnl, pnlPct, name: q?.name || p.symbol };
  });

  const totals = rows.reduce(
    (acc, r) => {
      acc.cost += r.cost;
      acc.value += r.value;
      acc.pnl += r.pnl;
      return acc;
    },
    { cost: 0, value: 0, pnl: 0 }
  );

  const totalPnlPct = totals.cost > 0 ? (totals.pnl / totals.cost) * 100 : 0;
  const topPerformer = rows.length > 0 ? rows.reduce((best, r) => r.pnlPct > best.pnlPct ? r : best, rows[0]) : null;
  const worstPerformer = rows.length > 0 ? rows.reduce((worst, r) => r.pnlPct < worst.pnlPct ? r : worst, rows[0]) : null;

  // Portfolio allocation
  const allocation = rows.map(r => ({
    name: r.symbol,
    value: r.value,
    percentage: totals.value > 0 ? (r.value / totals.value) * 100 : 0
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Investment Tracker | GPAM</title>
        <meta name="description" content="Track your stock positions with live quotes and P/L." />
        <link rel="canonical" href="/investments" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Investment Tracker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your portfolio performance with real-time quotes and analytics
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Portfolio Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-foreground">${totals.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Cost basis: ${totals.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total P/L</p>
                  <p className={`text-2xl font-bold ${totals.pnl >= 0 ? "text-success" : "text-danger"}`}>
                    {totals.pnl >= 0 ? "+" : ""}${Math.abs(totals.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                {totals.pnl >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-success/50" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-danger/50" />
                )}
              </div>
              <p className={`text-xs mt-2 ${totalPnlPct >= 0 ? "text-success" : "text-danger"}`}>
                {totalPnlPct >= 0 ? "+" : ""}{totalPnlPct.toFixed(2)}% overall return
              </p>
            </CardContent>
          </Card>
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Positions</p>
                  <p className="text-2xl font-bold text-foreground">{positions.length}</p>
                </div>
                <PieChart className="h-8 w-8 text-accent/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Active holdings</p>
            </CardContent>
          </Card>
          <Card className="financial-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Performer</p>
                  <p className="text-2xl font-bold text-success">{topPerformer?.symbol || "—"}</p>
                </div>
                <Target className="h-8 w-8 text-success/50" />
              </div>
              <p className="text-xs text-success mt-2">
                {topPerformer ? `+${topPerformer.pnlPct.toFixed(2)}%` : "No positions"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="positions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Portfolio Positions
                  <Badge className="bg-success/10 text-success border-success/20 ml-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse mr-1.5"></div>
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <Input placeholder="Symbol (e.g., AAPL)" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
                  <Input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  <Input placeholder="Buy Price" type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
                  <Button onClick={onAdd} className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" />Add Position</Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Buy Price</TableHead>
                        <TableHead>Live Price</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>P/L</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{r.symbol}</p>
                              <p className="text-xs text-muted-foreground">{r.name}</p>
                            </div>
                          </TableCell>
                          <TableCell>{r.quantity}</TableCell>
                          <TableCell>${r.buyPrice.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className="animate-pulse">${r.price.toFixed(2)}</span>
                          </TableCell>
                          <TableCell>${r.value.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={r.pnl >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}>
                              {r.pnl >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              ${Math.abs(r.pnl).toFixed(2)} ({r.pnlPct.toFixed(2)}%)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => remove(r.id)} aria-label={`Remove ${r.symbol}`}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {rows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                            No positions yet. Add your first position above.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end text-sm">
                  <div className="px-4 py-2 rounded bg-muted">Cost: ${totals.cost.toFixed(2)}</div>
                  <div className="px-4 py-2 rounded bg-muted">Value: ${totals.value.toFixed(2)}</div>
                  <div className={`px-4 py-2 rounded font-semibold ${totals.pnl >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                    P/L: {totals.pnl >= 0 ? "+" : ""}${totals.pnl.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart data={performanceData} dataKey="value" type="line" height={300} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="financial-card">
                <CardHeader>
                  <CardTitle className="text-lg">Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rows.filter(r => r.pnl > 0).sort((a, b) => b.pnlPct - a.pnlPct).slice(0, 5).map((r, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/10">
                        <div>
                          <p className="font-semibold">{r.symbol}</p>
                          <p className="text-xs text-muted-foreground">{r.name}</p>
                        </div>
                        <Badge className="bg-success/10 text-success">+{r.pnlPct.toFixed(2)}%</Badge>
                      </div>
                    ))}
                    {rows.filter(r => r.pnl > 0).length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No profitable positions</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="financial-card">
                <CardHeader>
                  <CardTitle className="text-lg">Underperformers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rows.filter(r => r.pnl < 0).sort((a, b) => a.pnlPct - b.pnlPct).slice(0, 5).map((r, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-danger/5 border border-danger/10">
                        <div>
                          <p className="font-semibold">{r.symbol}</p>
                          <p className="text-xs text-muted-foreground">{r.name}</p>
                        </div>
                        <Badge className="bg-danger/10 text-danger">{r.pnlPct.toFixed(2)}%</Badge>
                      </div>
                    ))}
                    {rows.filter(r => r.pnl < 0).length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No losing positions</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Portfolio Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {allocation.length > 0 ? (
                  <div className="space-y-4">
                    {allocation.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">
                            ${item.value.toFixed(2)} ({item.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-primary"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Add positions to see allocation breakdown</p>
                )}
              </CardContent>
            </Card>

            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="text-lg">Diversification Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="font-semibold text-foreground mb-1">Sector Diversification</p>
                    <p className="text-sm text-muted-foreground">Consider spreading investments across multiple sectors to reduce risk.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <p className="font-semibold text-foreground mb-1">Position Sizing</p>
                    <p className="text-sm text-muted-foreground">No single position should exceed 20% of your total portfolio.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                    <p className="font-semibold text-foreground mb-1">Regular Rebalancing</p>
                    <p className="text-sm text-muted-foreground">Review and rebalance your portfolio quarterly to maintain target allocations.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
