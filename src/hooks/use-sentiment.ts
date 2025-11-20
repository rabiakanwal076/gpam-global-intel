import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SentimentData = {
  symbol: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  score: number;
  bullishCount: number;
  bearishCount: number;
  neutralCount: number;
  totalArticles: number;
  recentNews: Array<{
    title: string;
    publishedDate: string;
    site: string;
  }>;
};

export function useStockSentiment(symbols: string[], options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["sentiment", symbols],
    enabled: (options?.enabled ?? true) && symbols.length > 0,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    queryFn: async (): Promise<SentimentData[]> => {
      const { data, error } = await supabase.functions.invoke("sentiment", {
        body: { symbols },
      });
      if (error) throw error;
      return data as SentimentData[];
    },
  });
}