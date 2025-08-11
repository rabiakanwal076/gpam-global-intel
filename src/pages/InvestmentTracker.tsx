import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useStockQuotes } from "@/hooks/use-stocks";
import { Trash2, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

 type Position = { id: string; symbol: string; quantity: number; buyPrice: number };

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
  const { data: quotes = [] } = useStockQuotes(symbols, { enabled: symbols.length > 0 });

  const onAdd = () => {
    if (!symbol || !quantity || !buyPrice) return;
    setPositions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), symbol: symbol.toUpperCase(), quantity: Number(quantity), buyPrice: Number(buyPrice) },
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Helmet>
        <title>Investment Tracker | GPAM</title>
        <meta name="description" content="Track your stock positions with live quotes and P/L." />
        <link rel="canonical" href="/investments" />
      </Helmet>

      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Portfolio Positions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Input placeholder="Symbol (e.g., AAPL)" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            <Input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <Input placeholder="Buy Price" type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
            <Button onClick={onAdd} className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" />Add</Button>
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
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.quantity}</TableCell>
                    <TableCell>${r.buyPrice.toFixed(2)}</TableCell>
                    <TableCell>${r.price.toFixed(2)}</TableCell>
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
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No positions yet. Add your first above.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end text-sm">
            <div className="px-3 py-2 rounded bg-muted">Cost: ${totals.cost.toFixed(2)}</div>
            <div className="px-3 py-2 rounded bg-muted">Value: ${totals.value.toFixed(2)}</div>
            <div className={`px-3 py-2 rounded ${totals.pnl >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
              P/L: ${totals.pnl.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
