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
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${url}`);
  return await res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const action = body?.action as string | undefined;

    const FMP_KEY = Deno.env.get("FMP_API_KEY");
    const AV_KEY = Deno.env.get("ALPHA_VANTAGE_API_KEY");

    const fmpBase = "https://financialmodelingprep.com/api/v3";

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
        return json(data);
      }
      return json({ error: "FMP_API_KEY required for top movers" }, 400);
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
      if (!FMP_KEY) {
        return json({ error: "FMP_API_KEY required for commodities" }, 400);
      }
      const url = `${fmpBase}/quotes/commodity?apikey=${FMP_KEY}`;
      const data = await fetchJson(url);
      return json(Array.isArray(data) ? data : []);
    }

    if (action === "forex") {
      const pairs: string[] = body?.pairs ?? [];
      if (!FMP_KEY) {
        return json({ error: "FMP_API_KEY required for forex" }, 400);
      }
      if (pairs.length > 0) {
        const list = pairs.join(",");
        const url = `${fmpBase}/quote/${encodeURIComponent(list)}?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        return json(data);
      } else {
        const url = `${fmpBase}/fx?apikey=${FMP_KEY}`;
        const data = await fetchJson(url);
        return json(Array.isArray(data) ? data : []);
      }
    }

    if (action === "indices") {
      if (!FMP_KEY) {
        return json({ error: "FMP_API_KEY required for indices" }, 400);
      }
      const url = `${fmpBase}/quotes/index?apikey=${FMP_KEY}`;
      const data = await fetchJson(url);
      return json(Array.isArray(data) ? data : []);
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message || "Unexpected error" }, 500);
  }
});
