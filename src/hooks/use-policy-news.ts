import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PolicyNews = {
  title: string;
  content: string;
  publishedDate: string;
  link: string;
  image?: string;
  isPolicyRelated: boolean;
  impact: 'High' | 'Medium' | 'Low';
  country: string;
};

export type EconomicEvent = {
  date: string;
  country: string;
  event: string;
  impact: string;
  actual?: number;
  estimate?: number;
  previous?: number;
  currency?: string;
};

export function usePolicyNews(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["policy-news", "general"],
    enabled: options?.enabled ?? true,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    queryFn: async (): Promise<PolicyNews[]> => {
      const { data, error } = await supabase.functions.invoke("policy-news", {
        body: { action: "general_news" },
      });
      if (error) throw error;
      return data as PolicyNews[];
    },
  });
}

export function useEconomicCalendar(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["policy-news", "calendar"],
    enabled: options?.enabled ?? true,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    queryFn: async (): Promise<EconomicEvent[]> => {
      const { data, error } = await supabase.functions.invoke("policy-news", {
        body: { action: "economic_calendar" },
      });
      if (error) throw error;
      return data as EconomicEvent[];
    },
  });
}