const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const isLocal = app.settings.env === 'local';
const URL = isLocal ? 'https://localhost:3000' : "https://draw-io-arghya.vercel.app";
app.use(cors({ origin: URL }))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });

io.on("connection", (socket) => {
    console.log("server connected");

    socket.on('beginPath', (arg) => {
        socket.broadcast.emit('beginPath', arg)
    });

    socket.on('drawLine', (arg) => {
        socket.broadcast.emit('drawLine', arg)
    });

    socket.on('changeConfig', (arg) => {
        socket.broadcast.emit('changeConfig', arg)
    });

    socket.on('changeActiveItem', (arg) => {
        socket.broadcast.emit('changeActiveItem', arg)
    });
});

httpServer.listen(5001);