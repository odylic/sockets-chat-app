const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

app.get('/app', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

http.listen(4000, function () {
  console.log("listening on Port 4000");
});
