const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
});
const users = {};
io.on("connection", (client) => {
  client.on("username", (username) => {
    const user = {
      name: username,
      id: client.id,
    };
  });
  client.on("send", (message) => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[client.id],
    });
  });
  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", client.id);
  });
});

server.listen(4000);

const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const PORT = 3000;
app.use(express.static(__dirname + "/public"));

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Hello from test endpoint" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server this time" });
});

app.get("/app", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Listening on ${PORT} 🚀`);
});
