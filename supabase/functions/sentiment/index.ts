import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (data: unknown, status = 200) => new Response(
  JSON.stringify(data),
  { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FMP_API_KEY = Deno.env.get('FMP_API_KEY');
    if (!FMP_API_KEY) {
      return json({ error: 'FMP_API_KEY not configured' }, 500);
    }

    const { symbols } = await req.json();
    
    if (!symbols || !Array.isArray(symbols)) {
      return json({ error: 'Invalid symbols parameter' }, 400);
    }

    console.log('Fetching sentiment for:', symbols);

    // Fetch news sentiment for each symbol
    const sentimentPromises = symbols.map(async (symbol: string) => {
      try {
        const newsUrl = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${symbol}&limit=50&apikey=${FMP_API_KEY}`;
        const newsRes = await fetch(newsUrl);
        
        if (!newsRes.ok) {
          console.error(`Failed to fetch news for ${symbol}:`, newsRes.status);
          return null;
        }

        const news = await newsRes.json();
        
        // Calculate sentiment score based on news
        let bullishCount = 0;
        let bearishCount = 0;
        let neutralCount = 0;

        news.forEach((article: any) => {
          const text = `${article.title} ${article.text}`.toLowerCase();
          
          // Simple sentiment analysis based on keywords
          const bullishWords = ['growth', 'profit', 'gain', 'surge', 'rally', 'bullish', 'upgrade', 'positive', 'strong', 'beat'];
          const bearishWords = ['loss', 'decline', 'fall', 'drop', 'bearish', 'downgrade', 'negative', 'weak', 'miss', 'concern'];
          
          const bullishScore = bullishWords.filter(word => text.includes(word)).length;
          const bearishScore = bearishWords.filter(word => text.includes(word)).length;
          
          if (bullishScore > bearishScore) bullishCount++;
          else if (bearishScore > bullishScore) bearishCount++;
          else neutralCount++;
        });

        const totalArticles = news.length || 1;
        const sentimentScore = ((bullishCount - bearishCount) / totalArticles) * 100;
        
        return {
          symbol,
          sentiment: sentimentScore > 15 ? 'Bullish' : sentimentScore < -15 ? 'Bearish' : 'Neutral',
          score: Math.round(sentimentScore),
          bullishCount,
          bearishCount,
          neutralCount,
          totalArticles,
          recentNews: news.slice(0, 3).map((article: any) => ({
            title: article.title,
            publishedDate: article.publishedDate,
            site: article.site
          }))
        };
      } catch (error) {
        console.error(`Error processing sentiment for ${symbol}:`, error);
        return null;
      }
    });

    const sentiments = (await Promise.all(sentimentPromises)).filter(Boolean);
    
    console.log('Sentiment results:', sentiments);
    return json(sentiments);

  } catch (error) {
    console.error('Sentiment function error:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});