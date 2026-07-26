const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

console.log("Server starting...");

// WebSocket (Unity)
wss.on("connection", (ws) => {
    console.log("🟢 WebSocket připojen");

    ws.on("message", (msg) => {
        console.log("📨 Unity:", msg.toString());

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("🔴 WebSocket odpojen");
    });
});

// HTTP (Roblox)
app.post("/update", (req, res) => {

    console.log("=================================");
    console.log("📩 Přijata data z Robloxu");
    console.log(req.body);
    console.log("=================================");

    const json = JSON.stringify(req.body);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(json);
        }
    });

    res.sendStatus(200);
});

server.listen(process.env.PORT || 3000, () => {
    console.log("🚀 Server běží");
});
