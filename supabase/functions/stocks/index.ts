// Supabase Edge Function: stocks
// Provides quotes, intraday series, top movers, and search using FMP or Alpha Vantage
import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    // Return empty array for 403/401 (forbidden/premium feature) errors
    if (res.status === 403 || res.status === 401) {
      console.log(`Premium feature not available: ${url}`);
      return [];
    }
    throw new Error(`Request failed: ${res.status} ${url}`);
  }
  return await res.json();
}

// Mock data generators for when APIs don't provide free data
function getMockTopMovers(type: string) {
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 178.52, change: 2.34, changesPercentage: 1.33, volume: 52000000 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 4.12, changesPercentage: 1.10, volume: 28000000 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 139.47, change: -1.23, changesPercentage: -0.87, volume: 25000000 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 151.94, change: 3.45, changesPercentage: 2.32, volume: 48000000 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 242.84, change: -5.67, changesPercentage: -2.28, volume: 95000000 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 495.22, change: 8.91, changesPercentage: 1.83, volume: 42000000 },
    { symbol: "META", name: "Meta Platforms", price: 327.45, change: -2.34, changesPercentage: -0.71, volume: 18000000 },
  ];
  
  if (type === "gainers") return stocks.filter(s => s.change > 0).slice(0, 10);
  if (type === "losers") return stocks.filter(s => s.change < 0).slice(0, 10);
  return stocks.sort((a, b) => b.volume - a.volume).slice(0, 10); // actives
}

function getMockCommodities() {
  return [
    { symbol: "GCUSD", name: "Gold", price: 2035.40, change: 12.30, changesPercentage: 0.61 },
    { symbol: "CLUSD", name: "Crude Oil", price: 78.32, change: -0.85, changesPercentage: -1.07 },
    { symbol: "NGUSD", name: "Natural Gas", price: 2.89, change: 0.12, changesPercentage: 4.33 },
    { symbol: "SIUSD", name: "Silver", price: 24.18, change: 0.42, changesPercentage: 1.77 },
  ];
}

function getMockForex() {
  return [
    { symbol: "EURUSD", price: 1.0847, change: 0.0012, changesPercentage: 0.11 },
    { symbol: "GBPUSD", price: 1.2634, change: -0.0023, changesPercentage: -0.18 },
    { symbol: "USDJPY", price: 149.82, change: 0.45, changesPercentage: 0.30 },
  ];
}

function getMockIndices() {
  return [
    { symbol: "^GSPC", name: "S&P 500", price: 4567.18, change: 23.45, changesPercentage: 0.52 },
    { symbol: "^DJI", name: "Dow Jones", price: 35418.85, change: 125.33, changesPercentage: 0.35 },
    { symbol: "^IXIC", name: "NASDAQ", price: 14257.40, change: 87.50, changesPercentage: 0.62 },
  ];
}

function getMockSectorPerformance() {
  return [
    { sector: "Technology", changesPercentage: "1.24%" },
    { sector: "Healthcare", changesPercentage: "0.87%" },
    { sector: "Financial", changesPercentage: "0.45%" },
    { sector: "Energy", changesPercentage: "-0.32%" },
    { sector: "Consumer", changesPercentage: "0.98%" },
  ];
}

function getMockEconomicCalendar() {
  return [
    { event: "FOMC Meeting", country: "US", date: new Date().toISOString(), actual: "", estimate: "", previous: "" },
    { event: "GDP Growth Rate", country: "US", date: new Date(Date.now() + 86400000).toISOString(), actual: "2.8%", estimate: "2.5%", previous: "2.1%" },
    { event: "Unemployment Rate", country: "US", date: new Date(Date.now() + 172800000).toISOString(), actual: "", estimate: "3.7%", previous: "3.8%" },
  ];
}

function getMockEarningsCalendar() {
  return [
    { symbol: "MSBB", date: "24/11/2025", eps: 2.45, epsEstimated: 2.38, time: "bmo", revenue: 52.8, revenueEstimated: 51.2 },
    { symbol: "CENT", date: "24/11/2025", eps: 1.23, epsEstimated: 1.18, time: "amc", revenue: 8.5, revenueEstimated: 8.2 },
    { symbol: "PNST", date: "25/11/2025", eps: 0.87, epsEstimated: 0.82, time: "bmo", revenue: 12.3, revenueEstimated: 11.9 },
  ];
}

function getMockIPOCalendar() {
  return [
    { symbol: "NEWCO", name: "NewCo Technologies", date: "2025-11-28", priceRange: "$18-$20", shares: "10M" },
    { symbol: "STARTUP", name: "StartUp Inc.", date: "2025-11-29", priceRange: "$15-$17", shares: "8M" },
  ];
}

function getMockInsiderTrading() {
  return [
    { symbol: "AAPL", name: "Timothy Cook", transactionType: "S - Sale", shares: 50000, price: 178.50, value: 8925000, filingDate: "2025-11-23" },
    { symbol: "MSFT", name: "Satya Nadella", transactionType: "S - Sale", shares: 25000, price: 378.90, value: 9472500, filingDate: "2025-11-22" },
    { symbol: "GOOGL", name: "Sundar Pichai", transactionType: "P - Purchase", shares: 10000, price: 139.47, value: 1394700, filingDate: "2025-11-21" },
  ];
}

function getMockMarketNews() {
  return [
    { 
      headline: "Tech Stocks Rally on Strong Earnings", 
      summary: "Major technology companies posted better-than-expected quarterly results, driving market gains.",
      url: "https://marketwatch.com/news/tech-rally",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
      datetime: Date.now() / 1000 - 3600,
      source: "MarketWatch"
    },
    { 
      headline: "Federal Reserve Signals Rate Stability", 
      summary: "Fed officials indicate rates may remain steady through year-end amid economic uncertainty.",
      url: "https://marketwatch.com/news/fed-rates",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
      datetime: Date.now() / 1000 - 7200,
      source: "Bloomberg"
    },
    { 
      headline: "Oil Prices Decline on Supply Concerns", 
      summary: "Crude oil futures dropped as global supply concerns ease following OPEC+ production talks.",
      url: "https://marketwatch.com/news/oil-prices",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop",
      datetime: Date.now() / 1000 - 10800,
      source: "Reuters"
    },
    { 
      headline: "Retail Sales Show Surprising Strength", 
      summary: "Consumer spending remains robust heading into holiday season, exceeding analyst forecasts.",
      url: "https://marketwatch.com/news/retail-sales",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      datetime: Date.now() / 1000 - 14400,
      source: "CNBC"
    },
    { 
      headline: "Emerging Markets Attract Investment", 
      summary: "Investors pivot to emerging market equities amid developed market volatility.",
      url: "https://marketwatch.com/news/emerging-markets",
      image: "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=400&h=300&fit=crop",
      datetime: Date.now() / 1000 - 18000,
      source: "Financial Times"
    },
    { 
      headline: "Green Energy Stocks Surge", 
      summary: "Renewable energy companies see massive gains following new government incentives.",
      url: "https://marketwatch.com/news/green-energy",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      datetime: Date.now() / 1000 - 21600,
      source: "MarketWatch"
    },
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const action = body?.action as string | undefined;

    const FMP_KEY = Deno.env.get("FMP_API_KEY");
    const AV_KEY = Deno.env.get("ALPHA_VANTAGE_API_KEY");
    const FINNHUB_KEY = Deno.env.get("FINNHUB_API_KEY");

    const fmpBase = "https://financialmodelingprep.com/api/v3";
    const finnhubBase = "https://finnhub.io/api/v1";

    if (action === "quotes") {
      const symbols: string[] = body?.symbols ?? [];
      if (!symbols.length) return json([]);

      if (FMP_KEY) {
        const list = symbols.join(",");
        const url = `${fmpBase}/quote/${encodeURIComponent(list)}?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        return json(data);
      }

      if (AV_KEY) {
        const results = await Promise.all(
          symbols.map(async (sym) => {
            const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(sym)}&apikey=${AV_KEY}`;
            const d = await fetchJson(url);
            const q = d?.["Global Quote"] ?? {};
            return {
              symbol: sym,
              price: Number(q["05. price"]) || 0,
              change: Number(q["09. change"]) || 0,
              changesPercentage: Number(String(q["10. change percent"] || "0").replace("%", "")) || 0,
            };
          })
        );
        return json(results);
      }

      return json({ error: "Missing API key (FMP_API_KEY or ALPHA_VANTAGE_API_KEY)" }, 400);
    }

    if (action === "intraday") {
      const symbol: string = body?.symbol;
      const interval: string = body?.interval || "5min"; // FMP supports 1min,5min,15min,30min,1hour
      if (!symbol) return json({ error: "symbol is required" }, 400);

      if (FMP_KEY) {
        const url = `${fmpBase}/historical-chart/${interval}/${encodeURIComponent(symbol)}?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        const series = Array.isArray(data)
          ? data.map((p: any) => ({ time: p.date, close: Number(p.close) || 0 })).reverse()
          : [];
        return json(series);
      }

      if (AV_KEY) {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodeURIComponent(symbol)}&interval=${interval}&outputsize=compact&datatype=json&apikey=${AV_KEY}`;
        const d = await fetchJson(url);
        const key = Object.keys(d).find((k) => k.startsWith("Time Series"));
        const raw = key ? d[key] : {};
        const series = Object.entries(raw).map(([t, v]: [string, any]) => ({ time: t, close: Number(v["4. close"]) || 0 }));
        series.sort((a, b) => a.time.localeCompare(b.time));
        return json(series);
      }

      return json({ error: "Missing API key (FMP_API_KEY or ALPHA_VANTAGE_API_KEY)" }, 400);
    }

    if (action === "top_movers") {
      const type = (body?.type || "gainers").toLowerCase(); // gainers | losers | actives
      if (FMP_KEY) {
        const endpoint = type === "losers" ? "losers" : type === "actives" ? "actives" : "gainers";
        const url = `${fmpBase}/stock_market/${endpoint}?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data);
        }
      }
      
      // Return mock data when APIs don't provide free data
      return json(getMockTopMovers(type));
    }

    if (action === "search") {
      const q: string = body?.q || "";
      if (!q) return json([]);

      if (FMP_KEY) {
        const url = `${fmpBase}/search?query=${encodeURIComponent(q)}&limit=10&apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        return json(data);
      }

      if (AV_KEY) {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(q)}&apikey=${AV_KEY}`;
        const d = await fetchJson(url);
        const results = (d?.bestMatches ?? []).map((m: any) => ({
          symbol: m["1. symbol"],
          name: m["2. name"],
          region: m["4. region"],
        }));
        return json(results);
      }

      return json({ error: "Missing API key (FMP_API_KEY or ALPHA_VANTAGE_API_KEY)" }, 400);
    }

    if (action === "crypto_quotes") {
      const symbols: string[] = body?.symbols ?? [];
      if (!FMP_KEY) {
        return json({ error: "FMP_API_KEY required for crypto data" }, 400);
      }
      if (symbols.length > 0) {
        const list = symbols.join(",");
        const url = `${fmpBase}/quote/${encodeURIComponent(list)}?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        return json(data);
      } else {
        const url = `${fmpBase}/quotes/crypto?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        return json(Array.isArray(data) ? data : []);
      }
    }

    if (action === "commodities") {
      if (FMP_KEY) {
        const url = `${fmpBase}/quotes/commodity?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data);
        }
      }
      
      return json(getMockCommodities());
    }

    if (action === "forex") {
      const pairs: string[] = body?.pairs ?? [];
      if (FMP_KEY) {
        if (pairs.length > 0) {
          const list = pairs.join(",");
          const url = `${fmpBase}/quote/${encodeURIComponent(list)}?apikey=${FMP_KEY}`;
          const data = await fetchJson(url);
          if (Array.isArray(data) && data.length > 0) {
            return json(data);
          }
        } else {
          const url = `${fmpBase}/fx?apikey=${FMP_KEY}`;
          const data = await fetchJson(url);
          if (Array.isArray(data) && data.length > 0) {
            return json(data);
          }
        }
      }
      
      if (FINNHUB_KEY && pairs.length > 0) {
        const results = await Promise.all(
          pairs.map(async (pair) => {
            try {
              const url = `${finnhubBase}/forex/rates?base=${pair.substring(0, 3)}&token=${FINNHUB_KEY}`;
              const data = await fetchJson(url);
              return {
                symbol: pair,
                price: data?.quote?.[pair.substring(3, 6)] || 0,
                change: 0,
                changesPercentage: 0,
              };
            } catch (e) {
              return null;
            }
          })
        );
        const validResults = results.filter(r => r !== null);
        if (validResults.length > 0) return json(validResults);
      }
      
      return json(getMockForex());
    }

    if (action === "indices") {
      if (FMP_KEY) {
        const url = `${fmpBase}/quotes/index?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data);
        }
      }
      
      return json(getMockIndices());
    }

    if (action === "economic_calendar") {
      if (FMP_KEY) {
        const url = `${fmpBase}/economic_calendar?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data.slice(0, 10));
        }
      }
      
      if (FINNHUB_KEY) {
        const url = `${finnhubBase}/calendar/economic?token=${FINNHUB_KEY}`;
        const data = await fetchJson(url);
        const events = data?.economicCalendar || [];
        if (Array.isArray(events) && events.length > 0) {
          return json(events.slice(0, 10));
        }
      }
      
      return json(getMockEconomicCalendar());
    }

    if (action === "earnings_calendar") {
      if (FMP_KEY) {
        const url = `${fmpBase}/earning_calendar?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data.slice(0, 10));
        }
      }
      
      if (FINNHUB_KEY) {
        const today = new Date().toISOString().split('T')[0];
        const url = `${finnhubBase}/calendar/earnings?from=${today}&to=${today}&token=${FINNHUB_KEY}`;
        const data = await fetchJson(url);
        const earnings = data?.earningsCalendar || [];
        if (Array.isArray(earnings) && earnings.length > 0) {
          return json(earnings.slice(0, 10));
        }
      }
      
      return json(getMockEarningsCalendar());
    }

    if (action === "ipo_calendar") {
      if (FMP_KEY) {
        const url = `${fmpBase}/ipo_calendar?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data.slice(0, 10));
        }
      }
      
      if (FINNHUB_KEY) {
        const today = new Date().toISOString().split('T')[0];
        const url = `${finnhubBase}/calendar/ipo?from=${today}&to=${today}&token=${FINNHUB_KEY}`;
        const data = await fetchJson(url);
        const ipos = data?.ipoCalendar || [];
        if (Array.isArray(ipos) && ipos.length > 0) {
          return json(ipos.slice(0, 10));
        }
      }
      
      return json(getMockIPOCalendar());
    }

    if (action === "insider_trading") {
      if (FMP_KEY) {
        const url = `${fmpBase}/insider-trading?page=0&apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data.slice(0, 10));
        }
      }
      
      if (FINNHUB_KEY) {
        const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
        const results = [];
        
        for (const symbol of symbols) {
          try {
            const url = `${finnhubBase}/stock/insider-transactions?symbol=${symbol}&token=${FINNHUB_KEY}`;
            const data = await fetchJson(url);
            if (data?.data && Array.isArray(data.data)) {
              results.push(...data.data.slice(0, 2));
            }
          } catch (e) {
            console.error(`Failed to fetch insider trading for ${symbol}:`, e);
          }
        }
        
        if (results.length > 0) {
          return json(results.slice(0, 10));
        }
      }
      
      return json(getMockInsiderTrading());
    }

    if (action === "senate_trading") {
      if (FMP_KEY) {
        const url = `${fmpBase}/senate-trading?page=0&apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data.slice(0, 10));
        }
      }
      
      // Finnhub doesn't have senate trading data
      return json([]);
    }

    if (action === "company_profile") {
      const symbol: string = body?.symbol;
      if (!symbol) return json({ error: "symbol is required" }, 400);
      if (!FMP_KEY) {
        return json({ error: "FMP_API_KEY required for company profile" }, 400);
      }
      const url = `${fmpBase}/profile/${encodeURIComponent(symbol)}?apikey=${FMP_KEY}`;
      const data = await fetchJson(url);
      return json(Array.isArray(data) && data.length > 0 ? data[0] : {});
    }

    if (action === "analyst_estimates") {
      const symbol: string = body?.symbol;
      if (!symbol) return json({ error: "symbol is required" }, 400);
      if (!FMP_KEY) {
        return json({ error: "FMP_API_KEY required for analyst estimates" }, 400);
      }
      const url = `${fmpBase}/analyst-estimates/${encodeURIComponent(symbol)}?apikey=${FMP_KEY}`;
      const data = await fetchJson(url);
      return json(Array.isArray(data) ? data.slice(0, 4) : []);
    }

    if (action === "price_target") {
      const symbol: string = body?.symbol;
      if (!symbol) return json({ error: "symbol is required" }, 400);
      if (!FMP_KEY) {
        return json({ error: "FMP_API_KEY required for price target" }, 400);
      }
      const url = `${fmpBase}/price-target?symbol=${encodeURIComponent(symbol)}&apikey=${FMP_KEY}`;
      const data = await fetchJson(url);
      return json(Array.isArray(data) ? data.slice(0, 5) : []);
    }

    if (action === "market_news") {
      if (FMP_KEY) {
        const url = `${fmpBase}/stock_news?page=0&apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data.slice(0, 10));
        }
      }
      
      if (FINNHUB_KEY) {
        const url = `${finnhubBase}/news?category=general&token=${FINNHUB_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data.slice(0, 10));
        }
      }
      
      return json(getMockMarketNews());
    }

    if (action === "sector_performance") {
      if (FMP_KEY) {
        const url = `${fmpBase}/sector-performance?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        if (Array.isArray(data) && data.length > 0) {
          return json(data);
        }
      }
      
      return json(getMockSectorPerformance());
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message || "Unexpected error" }, 500);
  }
});
