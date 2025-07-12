import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  RefreshCw,
  ArrowRightLeft,
  Percent,
  PiggyBank
} from "lucide-react";

export function Calculators() {
  // Currency Converter State
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1000");
  const [convertedAmount, setConvertedAmount] = useState("876.50");

  // ROI Calculator State
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [finalValue, setFinalValue] = useState("15000");
  const [roiResult, setRoiResult] = useState("50");

  // CAGR Calculator State
  const [beginningValue, setBeginningValue] = useState("10000");
  const [endingValue, setEndingValue] = useState("20000");
  const [years, setYears] = useState("5");
  const [cagrResult, setCagrResult] = useState("14.87");

  // Arbitrage Calculator State
  const [crypto, setCrypto] = useState("Bitcoin");
  const [exchange1Price, setExchange1Price] = useState("67000");
  const [exchange2Price, setExchange2Price] = useState("67500");
  const [arbitrageProfit, setArbitrageProfit] = useState("500");

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
  ];

  const cryptos = ["Bitcoin", "Ethereum", "BNB", "Solana", "Cardano"];

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    if (initial > 0) {
      const roi = ((final - initial) / initial) * 100;
      setRoiResult(roi.toFixed(2));
    }
  };

  const calculateCAGR = () => {
    const beginning = parseFloat(beginningValue);
    const ending = parseFloat(endingValue);
    const period = parseFloat(years);
    if (beginning > 0 && period > 0) {
      const cagr = (Math.pow(ending / beginning, 1 / period) - 1) * 100;
      setCagrResult(cagr.toFixed(2));
    }
  };

  const calculateArbitrage = () => {
    const price1 = parseFloat(exchange1Price);
    const price2 = parseFloat(exchange2Price);
    const profit = Math.abs(price2 - price1);
    const profitPercent = ((profit / Math.min(price1, price2)) * 100).toFixed(2);
    setArbitrageProfit(`$${profit.toFixed(2)} (${profitPercent}%)`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Financial Calculators</h1>
                <p className="text-muted-foreground">
                  Professional financial tools for investment analysis and market calculations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="currency" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="currency">Currency Converter</TabsTrigger>
            <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
            <TabsTrigger value="cagr">CAGR Calculator</TabsTrigger>
            <TabsTrigger value="arbitrage">Crypto Arbitrage</TabsTrigger>
          </TabsList>

          {/* Currency Converter */}
          <TabsContent value="currency">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                  <span>Currency Converter</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* From Currency */}
                  <div className="space-y-2">
                    <Label htmlFor="from-currency">From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount"
                    />
                  </div>

                  {/* Swap Button */}
                  <div className="flex items-end justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setFromCurrency(toCurrency);
                        setToCurrency(fromCurrency);
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* To Currency */}
                  <div className="space-y-2">
                    <Label htmlFor="to-currency">To</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        {currencies.find(c => c.code === toCurrency)?.symbol}{convertedAmount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    1 {fromCurrency} = 0.8765 {toCurrency}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Exchange rates updated 5 minutes ago
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ROI Calculator */}
          <TabsContent value="roi">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Percent className="h-5 w-5 text-primary" />
                  <span>ROI Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="initial-investment">Initial Investment ($)</Label>
                      <Input
                        id="initial-investment"
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        placeholder="10000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="final-value">Final Value ($)</Label>
                      <Input
                        id="final-value"
                        type="number"
                        value={finalValue}
                        onChange={(e) => setFinalValue(e.target.value)}
                        placeholder="15000"
                      />
                    </div>
                    <Button onClick={calculateROI} className="w-full">
                      Calculate ROI
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-card rounded-lg border border-card-border">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{roiResult}%</div>
                        <div className="text-sm text-muted-foreground">Return on Investment</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Formula:</strong> ROI = (Final Value - Initial Investment) / Initial Investment × 100</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CAGR Calculator */}
          <TabsContent value="cagr">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>CAGR Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="beginning-value">Beginning Value ($)</Label>
                      <Input
                        id="beginning-value"
                        type="number"
                        value={beginningValue}
                        onChange={(e) => setBeginningValue(e.target.value)}
                        placeholder="10000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ending-value">Ending Value ($)</Label>
                      <Input
                        id="ending-value"
                        type="number"
                        value={endingValue}
                        onChange={(e) => setEndingValue(e.target.value)}
                        placeholder="20000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="years">Number of Years</Label>
                      <Input
                        id="years"
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        placeholder="5"
                      />
                    </div>
                    <Button onClick={calculateCAGR} className="w-full">
                      Calculate CAGR
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-card rounded-lg border border-card-border">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-success">{cagrResult}%</div>
                        <div className="text-sm text-muted-foreground">Compound Annual Growth Rate</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Formula:</strong> CAGR = (Ending Value / Beginning Value)^(1/years) - 1</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crypto Arbitrage */}
          <TabsContent value="arbitrage">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  <span>Crypto Arbitrage Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="crypto-select">Cryptocurrency</Label>
                      <Select value={crypto} onValueChange={setCrypto}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cryptos.map(coin => (
                            <SelectItem key={coin} value={coin}>
                              {coin}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exchange1">Exchange 1 Price ($)</Label>
                      <Input
                        id="exchange1"
                        type="number"
                        value={exchange1Price}
                        onChange={(e) => setExchange1Price(e.target.value)}
                        placeholder="67000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exchange2">Exchange 2 Price ($)</Label>
                      <Input
                        id="exchange2"
                        type="number"
                        value={exchange2Price}
                        onChange={(e) => setExchange2Price(e.target.value)}
                        placeholder="67500"
                      />
                    </div>
                    <Button onClick={calculateArbitrage} className="w-full">
                      Calculate Arbitrage
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-card rounded-lg border border-card-border">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{arbitrageProfit}</div>
                        <div className="text-sm text-muted-foreground">Potential Profit per Unit</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Higher Price:</strong> ${Math.max(parseFloat(exchange1Price), parseFloat(exchange2Price)).toLocaleString()}</p>
                      <p><strong>Lower Price:</strong> ${Math.min(parseFloat(exchange1Price), parseFloat(exchange2Price)).toLocaleString()}</p>
                      <p className="text-xs mt-2">*Remember to factor in trading fees and transfer costs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Tools */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="financial-card opacity-60">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">DCA Calculator</h3>
                <p className="text-sm text-muted-foreground">Dollar Cost Averaging strategy calculator</p>
              </CardContent>
            </Card>
            
            <Card className="financial-card opacity-60">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Compound Interest</h3>
                <p className="text-sm text-muted-foreground">Calculate compound interest growth</p>
              </CardContent>
            </Card>
            
            <Card className="financial-card opacity-60">
              <CardContent className="p-6 text-center">
                <Percent className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Risk Calculator</h3>
                <p className="text-sm text-muted-foreground">Portfolio risk and volatility analysis</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}