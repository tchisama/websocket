const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit("receive", data);
        socket.emit("receive", data);
    })
})

server.listen(3001, () => {
    console.log("Server running on port 3001");
});