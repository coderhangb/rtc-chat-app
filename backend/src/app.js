const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const { app, server } = require("./libs/socket.js");
const authRoutes = require("./routes/authRoute.js");
const messageRoutes = require("./routes/messageRoute.js");
const connectDB = require("./libs/db.js");

const PORT = process.env.PORT || 3000;

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/public", express.static("src/public"));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
