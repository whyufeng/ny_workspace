import { useState, useEffect } from "react";

const apiCall = {
  op: "subscribe",
  args: [
    {
      channel: "index-tickers",
      instId: "BTC-USDT",
    },
    {
      channel: "index-tickers",
      instId: "ETH-USDT",
    },
    {
      channel: "index-tickers",
      instId: "SOL-USDT",
    },
  ],
};

export function WebSocketResult(func) {
  const [socket, setSocket] = useState(null);
  let coin_data = {};

  useEffect(() => {
    const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");

    // Set up event listeners
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened.");

      // Subscribe to a specific channel or topic
      const subscriptionMessage = JSON.stringify(apiCall);
      ws.send(subscriptionMessage);
    });

    ws.addEventListener("message", (event) => {
      // Handle received messages
      const message = JSON.parse(event.data);
      if (message.data !== undefined) {
        coin_data[message.data[0].instId] = {
          price: message.data[0].idxPx,
          high24h: message.data[0].high24h,
          low24h: message.data[0].low24h,
        };
        func(coin_data);
      }
    });

    ws.addEventListener("close", (event) => {
      console.log(
        `WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`
      );
    });

    ws.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    // Save the WebSocket instance to state
    setSocket(ws);
  }, []);
}
