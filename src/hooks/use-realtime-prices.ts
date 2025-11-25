import { useEffect, useRef, useState } from "react";

export type RealtimePrice = {
  symbol: string;
  price: number;
  change: number;
  changesPercentage: number;
  timestamp: number;
};

export function useRealtimePrices(symbols: string[], enabled = true) {
  const [prices, setPrices] = useState<Record<string, RealtimePrice>>({});
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!enabled || symbols.length === 0) return;

    const projectId = "vaempwcvcvuwqldfknvg";
    const wsUrl = `wss://${projectId}.supabase.co/functions/v1/realtime-prices`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      
      // Subscribe to symbols
      ws.send(JSON.stringify({
        type: "subscribe",
        symbols: symbols
      }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === "price_update" && Array.isArray(message.data)) {
          const updatedPrices: Record<string, RealtimePrice> = {};
          message.data.forEach((price: RealtimePrice) => {
            updatedPrices[price.symbol] = price;
          });
          setPrices(prev => ({ ...prev, ...updatedPrices }));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [symbols.join(","), enabled]);

  return { prices, isConnected };
}
