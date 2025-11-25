import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      
      if (message.type === "subscribe") {
        const symbols = message.symbols || [];
        console.log("Client subscribed to:", symbols);
        
        // Start sending price updates every 2 seconds
        const interval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            const updates = symbols.map((symbol: string) => ({
              symbol,
              price: Math.random() * 500 + 50,
              change: (Math.random() - 0.5) * 10,
              changesPercentage: (Math.random() - 0.5) * 5,
              timestamp: Date.now()
            }));
            
            socket.send(JSON.stringify({
              type: "price_update",
              data: updates
            }));
          } else {
            clearInterval(interval);
          }
        }, 2000);

        // Store interval ID for cleanup
        (socket as any).updateInterval = interval;
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
    // Clean up interval
    if ((socket as any).updateInterval) {
      clearInterval((socket as any).updateInterval);
    }
  };

  return response;
});
