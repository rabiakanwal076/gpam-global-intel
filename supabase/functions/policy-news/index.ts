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

    const { action } = await req.json();
    
    console.log('Policy news action:', action);

    if (action === 'general_news') {
      // Fetch general market and policy news
      const newsUrl = `https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=20&apikey=${FMP_API_KEY}`;
      const newsRes = await fetch(newsUrl);
      
      if (!newsRes.ok) {
        console.error('Failed to fetch news:', newsRes.status);
        // Return empty array for 403 (premium feature) instead of error
        if (newsRes.status === 403) {
          console.log('Premium news feature not available with free tier API');
          return json([]);
        }
        return json({ error: 'Failed to fetch news' }, 500);
      }

      const news = await newsRes.json();
      
      // Filter for policy-related news
      const policyKeywords = ['policy', 'regulation', 'federal', 'government', 'fed', 'central bank', 'interest rate', 'fiscal', 'monetary', 'tax', 'tariff'];
      
      const policyNews = news.content.map((article: any) => {
        const text = `${article.title} ${article.content}`.toLowerCase();
        const isPolicyRelated = policyKeywords.some(keyword => text.includes(keyword));
        
        // Determine impact level
        let impact = 'Low';
        if (text.includes('federal reserve') || text.includes('interest rate') || text.includes('central bank')) {
          impact = 'High';
        } else if (text.includes('regulation') || text.includes('fiscal') || text.includes('monetary')) {
          impact = 'Medium';
        }
        
        return {
          title: article.title,
          content: article.content.substring(0, 200) + '...',
          publishedDate: article.date,
          link: article.link,
          image: article.image,
          isPolicyRelated,
          impact,
          country: 'USA' // Default, could be enhanced with NLP
        };
      }).filter((article: any) => article.isPolicyRelated);
      
      return json(policyNews);
    }

    if (action === 'economic_calendar') {
      // Fetch economic calendar events
      const today = new Date().toISOString().split('T')[0];
      const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const calendarUrl = `https://financialmodelingprep.com/api/v3/economic_calendar?from=${today}&to=${futureDate}&apikey=${FMP_API_KEY}`;
      const calendarRes = await fetch(calendarUrl);
      
      if (!calendarRes.ok) {
        console.error('Failed to fetch calendar:', calendarRes.status);
        return json({ error: 'Failed to fetch economic calendar' }, 500);
      }

      const events = await calendarRes.json();
      
      return json(events.slice(0, 20).map((event: any) => ({
        date: event.date,
        country: event.country,
        event: event.event,
        impact: event.impact || 'Medium',
        actual: event.actual,
        estimate: event.estimate,
        previous: event.previous,
        currency: event.currency
      })));
    }

    return json({ error: 'Invalid action' }, 400);

  } catch (error) {
    console.error('Policy news function error:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});