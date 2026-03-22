const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
require("dotenv").config();

const socketAuthMiddleware = require("../middlewares/socketAuthMiddleware");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
});

// apply auth middleware to all connection
io.use(socketAuthMiddleware);

// store online user
const userSocketMap = {}; // {userId: [socketId1, socketId2, ...]}

io.on("connection", (socket) => {
  console.log("User connected", socket.user.fullName);

  const userId = socket.userId;

  if (!userSocketMap[userId]) {
    userSocketMap[userId] = [];
  }
  userSocketMap[userId].push(socket.id);

  // emit event userOnline to FE
  io.emit("userOnline", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.user.fullName);

    userSocketMap[userId] = userSocketMap[userId].filter(
      (id) => id !== socket.id,
    );

    if (userSocketMap[userId].length === 0) {
      delete userSocketMap[userId];
    }

    io.emit("userOnline", Object.keys(userSocketMap));
  });
});

module.exports = {
  app,
  server,
  io,
};
