import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleChart } from "@/components/ui/simple-chart";
import { useStockQuotes, useIntraday } from "@/hooks/use-stocks";
import { ArrowLeft, TrendingUp, TrendingDown, Activity, BarChart3, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const { data: quotes = [] } = useStockQuotes(symbol ? [symbol] : []);
  const { data: intraday = [] } = useIntraday(symbol || "", "5min");
  const stock = quotes[0];

  if (!symbol || !stock) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Helmet>
          <title>Stock Not Found | GPAM.site</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Stock Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Unable to find data for this stock symbol.
            </p>
            <Link to="/prices">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Markets
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPositive = (stock.change ?? 0) >= 0;
  const chartData = intraday.map((d) => ({
    time: new Date(d.time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    price: d.close,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{stock.symbol} - {stock.name} Stock Price | Live Market Data | GPAM.site</title>
        <meta name="description" content={`Real-time ${stock.symbol} stock price, charts, and market data. Current price: $${stock.price.toFixed(2)} with ${stock.changesPercentage?.toFixed(2)}% change.`} />
        <link rel="canonical" href={`/stock/${symbol}`} />
      </Helmet>

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Link to="/prices">
            <Button variant="ghost" size="sm" className="mb-4 hover-scale">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Markets
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{stock.symbol}</h1>
                <Badge variant={isPositive ? "default" : "destructive"} className="text-sm">
                  {isPositive ? "+" : ""}{stock.changesPercentage?.toFixed(2)}%
                </Badge>
              </div>
              <p className="text-muted-foreground">{stock.name}</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-4xl font-bold text-foreground mb-1">
                ${stock.price.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 ${isPositive ? "text-success" : "text-danger"}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="font-medium">
                  {isPositive ? "+" : ""}{stock.change?.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <Card className="financial-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Intraday Chart (5min)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {chartData.length > 0 ? (
                  <SimpleChart data={chartData} dataKey="price" height={400} stroke="hsl(var(--primary))" />
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No chart data available</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card className="financial-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-accent" />
                  Key Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <span className="font-semibold text-foreground">${stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Change</span>
                  <span className={`font-semibold ${isPositive ? "text-success" : "text-danger"}`}>
                    {isPositive ? "+" : ""}{stock.change?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Change %</span>
                  <span className={`font-semibold ${isPositive ? "text-success" : "text-danger"}`}>
                    {isPositive ? "+" : ""}{stock.changesPercentage?.toFixed(2)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="financial-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-warning" />
                  Market Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Symbol</span>
                  <span className="font-medium text-foreground">{stock.symbol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-success/10 text-success">Market Open</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <Card className="financial-card hover-lift mt-6">
          <CardHeader>
            <CardTitle>About {stock.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Real-time market data for {stock.symbol}. Track live stock prices, intraday charts, and key statistics.
              This page updates automatically with the latest market information.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
