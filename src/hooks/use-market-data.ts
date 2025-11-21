import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type EconomicEvent = {
  event: string;
  date: string;
  country: string;
  actual?: number;
  estimate?: number;
  previous?: number;
  impact?: string;
};

export type EarningsEvent = {
  symbol: string;
  date: string;
  eps?: number;
  epsEstimated?: number;
  time?: string;
  revenue?: number;
  revenueEstimated?: number;
};

export type IPOEvent = {
  symbol: string;
  company: string;
  date: string;
  exchange?: string;
  actions?: string;
  shares?: number;
  priceRange?: string;
};

export type InsiderTrade = {
  symbol: string;
  filingDate: string;
  transactionDate: string;
  reportingName: string;
  typeOfOwner: string;
  transactionType: string;
  securitiesTransacted: number;
  price: number;
  securitiesOwned: number;
};

export type SenateTrade = {
  symbol: string;
  disclosureDate: string;
  transactionDate: string;
  senator: string;
  type: string;
  amount: string;
};

export type MarketNews = {
  symbol: string;
  publishedDate: string;
  title: string;
  image?: string;
  site: string;
  text: string;
  url: string;
};

export type SectorPerformance = {
  sector: string;
  changesPercentage: string;
};

export function useEconomicCalendar() {
  return useQuery({
    queryKey: ["economic_calendar"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async (): Promise<EconomicEvent[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "economic_calendar" },
      });
      if (error) throw error;
      return data as EconomicEvent[];
    },
  });
}

export function useEarningsCalendar() {
  return useQuery({
    queryKey: ["earnings_calendar"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async (): Promise<EarningsEvent[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "earnings_calendar" },
      });
      if (error) throw error;
      return data as EarningsEvent[];
    },
  });
}

export function useIPOCalendar() {
  return useQuery({
    queryKey: ["ipo_calendar"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async (): Promise<IPOEvent[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "ipo_calendar" },
      });
      if (error) throw error;
      return data as IPOEvent[];
    },
  });
}

export function useInsiderTrading() {
  return useQuery({
    queryKey: ["insider_trading"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async (): Promise<InsiderTrade[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "insider_trading" },
      });
      if (error) throw error;
      return data as InsiderTrade[];
    },
  });
}

export function useSenateTrading() {
  return useQuery({
    queryKey: ["senate_trading"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async (): Promise<SenateTrade[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "senate_trading" },
      });
      if (error) throw error;
      return data as SenateTrade[];
    },
  });
}

export function useMarketNews() {
  return useQuery({
    queryKey: ["market_news"],
    refetchInterval: 5 * 60 * 1000,
    queryFn: async (): Promise<MarketNews[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "market_news" },
      });
      if (error) throw error;
      return data as MarketNews[];
    },
  });
}

export function useSectorPerformance() {
  return useQuery({
    queryKey: ["sector_performance"],
    refetchInterval: 60 * 1000,
    queryFn: async (): Promise<SectorPerformance[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "sector_performance" },
      });
      if (error) throw error;
      return data as SectorPerformance[];
    },
  });
}
