const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://localhost:3000' }))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'https://localhost:3000' });

io.on("connection", (socket) => {
    console.log("connected");
});

httpServer.listen(5000);