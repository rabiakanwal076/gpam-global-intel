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
  PiggyBank,
  Shield,
  Target
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

  // DCA Calculator State
  const [dcaInvestment, setDcaInvestment] = useState("500");
  const [dcaFrequency, setDcaFrequency] = useState("monthly");
  const [dcaPeriod, setDcaPeriod] = useState("12");
  const [dcaExpectedReturn, setDcaExpectedReturn] = useState("10");
  const [dcaResult, setDcaResult] = useState({ total: 6000, invested: 6000, gain: 329.70 });

  // Compound Interest State
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [compoundYears, setCompoundYears] = useState("10");
  const [compoundFrequency, setCompoundFrequency] = useState("12");
  const [compoundResult, setCompoundResult] = useState({ final: 20096.61, interest: 10096.61 });

  // Risk Calculator State
  const [portfolioValue, setPortfolioValue] = useState("100000");
  const [riskPercent, setRiskPercent] = useState("2");
  const [stopLoss, setStopLoss] = useState("5");
  const [riskResult, setRiskResult] = useState({ riskAmount: 2000, positionSize: 40000 });

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

  const calculateDCA = () => {
    const investment = parseFloat(dcaInvestment);
    const periods = parseInt(dcaPeriod);
    const returnRate = parseFloat(dcaExpectedReturn) / 100;
    
    let total = 0;
    const periodsPerYear = dcaFrequency === "weekly" ? 52 : dcaFrequency === "monthly" ? 12 : 4;
    const periodRate = returnRate / periodsPerYear;
    
    for (let i = 0; i < periods; i++) {
      total = (total + investment) * (1 + periodRate);
    }
    
    const invested = investment * periods;
    setDcaResult({ total: parseFloat(total.toFixed(2)), invested, gain: parseFloat((total - invested).toFixed(2)) });
  };

  const calculateCompound = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(compoundFrequency);
    const t = parseFloat(compoundYears);
    
    const finalAmount = p * Math.pow((1 + r/n), n*t);
    const interest = finalAmount - p;
    setCompoundResult({ final: parseFloat(finalAmount.toFixed(2)), interest: parseFloat(interest.toFixed(2)) });
  };

  const calculateRisk = () => {
    const portfolio = parseFloat(portfolioValue);
    const risk = parseFloat(riskPercent) / 100;
    const stop = parseFloat(stopLoss) / 100;
    
    const riskAmount = portfolio * risk;
    const positionSize = riskAmount / stop;
    setRiskResult({ riskAmount: parseFloat(riskAmount.toFixed(2)), positionSize: parseFloat(positionSize.toFixed(2)) });
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 gap-1">
            <TabsTrigger value="currency">Currency</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
            <TabsTrigger value="cagr">CAGR</TabsTrigger>
            <TabsTrigger value="arbitrage">Arbitrage</TabsTrigger>
            <TabsTrigger value="dca">DCA</TabsTrigger>
            <TabsTrigger value="compound">Compound</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
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
                  <div className="space-y-2">
                    <Label>From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                  </div>
                  <div className="flex items-end justify-center">
                    <Button variant="outline" size="icon" onClick={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>To</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
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
                  <p className="text-sm text-muted-foreground">1 {fromCurrency} = 0.8765 {toCurrency}</p>
                  <p className="text-xs text-muted-foreground mt-1">Exchange rates updated 5 minutes ago</p>
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
                      <Label>Initial Investment ($)</Label>
                      <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Final Value ($)</Label>
                      <Input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} />
                    </div>
                    <Button onClick={calculateROI} className="w-full">Calculate ROI</Button>
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
                      <Label>Beginning Value ($)</Label>
                      <Input type="number" value={beginningValue} onChange={(e) => setBeginningValue(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Ending Value ($)</Label>
                      <Input type="number" value={endingValue} onChange={(e) => setEndingValue(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Number of Years</Label>
                      <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} />
                    </div>
                    <Button onClick={calculateCAGR} className="w-full">Calculate CAGR</Button>
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
                      <Label>Cryptocurrency</Label>
                      <Select value={crypto} onValueChange={setCrypto}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {cryptos.map(coin => <SelectItem key={coin} value={coin}>{coin}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Exchange 1 Price ($)</Label>
                      <Input type="number" value={exchange1Price} onChange={(e) => setExchange1Price(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Exchange 2 Price ($)</Label>
                      <Input type="number" value={exchange2Price} onChange={(e) => setExchange2Price(e.target.value)} />
                    </div>
                    <Button onClick={calculateArbitrage} className="w-full">Calculate Arbitrage</Button>
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

          {/* DCA Calculator */}
          <TabsContent value="dca">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Dollar Cost Averaging Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Investment Amount ($)</Label>
                      <Input type="number" value={dcaInvestment} onChange={(e) => setDcaInvestment(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select value={dcaFrequency} onValueChange={setDcaFrequency}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Number of Periods</Label>
                      <Input type="number" value={dcaPeriod} onChange={(e) => setDcaPeriod(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Expected Annual Return (%)</Label>
                      <Input type="number" value={dcaExpectedReturn} onChange={(e) => setDcaExpectedReturn(e.target.value)} />
                    </div>
                    <Button onClick={calculateDCA} className="w-full">Calculate DCA</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-card rounded-lg border border-card-border">
                      <div className="text-center space-y-4">
                        <div>
                          <div className="text-3xl font-bold text-primary">${dcaResult.total.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Total Value</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div>
                            <div className="text-lg font-semibold">${dcaResult.invested.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Total Invested</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-success">+${dcaResult.gain.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Estimated Gain</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>DCA helps reduce the impact of volatility by spreading purchases over time.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compound Interest */}
          <TabsContent value="compound">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Compound Interest Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Principal Amount ($)</Label>
                      <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Annual Interest Rate (%)</Label>
                      <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Time (Years)</Label>
                      <Input type="number" value={compoundYears} onChange={(e) => setCompoundYears(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Compound Frequency</Label>
                      <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Annually</SelectItem>
                          <SelectItem value="4">Quarterly</SelectItem>
                          <SelectItem value="12">Monthly</SelectItem>
                          <SelectItem value="365">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateCompound} className="w-full">Calculate</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-card rounded-lg border border-card-border">
                      <div className="text-center space-y-4">
                        <div>
                          <div className="text-3xl font-bold text-success">${compoundResult.final.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Final Amount</div>
                        </div>
                        <div className="pt-4 border-t border-border">
                          <div className="text-lg font-semibold text-primary">+${compoundResult.interest.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Total Interest Earned</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Formula:</strong> A = P(1 + r/n)^(nt)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Calculator */}
          <TabsContent value="risk">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Position Size & Risk Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Portfolio Value ($)</Label>
                      <Input type="number" value={portfolioValue} onChange={(e) => setPortfolioValue(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Risk per Trade (%)</Label>
                      <Input type="number" value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Stop Loss (%)</Label>
                      <Input type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
                    </div>
                    <Button onClick={calculateRisk} className="w-full">Calculate Position Size</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-card rounded-lg border border-card-border">
                      <div className="text-center space-y-4">
                        <div>
                          <div className="text-3xl font-bold text-primary">${riskResult.positionSize.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Recommended Position Size</div>
                        </div>
                        <div className="pt-4 border-t border-border">
                          <div className="text-lg font-semibold text-danger">${riskResult.riskAmount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Maximum Risk Amount</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Risk Management Rule:</strong> Never risk more than 1-2% of your portfolio on a single trade.</p>
                      <p><strong>Formula:</strong> Position Size = Risk Amount / Stop Loss %</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Tips */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Financial Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="financial-card">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Set Clear Goals</h3>
                <p className="text-sm text-muted-foreground">Define your investment objectives and time horizon before making financial decisions.</p>
              </CardContent>
            </Card>
            <Card className="financial-card">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-success mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Manage Risk</h3>
                <p className="text-sm text-muted-foreground">Never invest more than you can afford to lose. Diversification is key to risk management.</p>
              </CardContent>
            </Card>
            <Card className="financial-card">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Stay Consistent</h3>
                <p className="text-sm text-muted-foreground">Regular investing through DCA can help reduce the impact of market volatility over time.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
