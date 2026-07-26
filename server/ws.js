const WebSocket = require("ws");

function createWebSocketServer(port = 3000) {
  const wss = new WebSocket.Server({ port });

  wss.on("connection", (ws) => {

    ws.on("message", (msg) => {
      // posílá všem klientům
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    });

  });

  return wss;
}

module.exports = createWebSocketServer;