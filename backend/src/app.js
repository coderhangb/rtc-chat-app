const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoute.js");
const messageRoutes = require("./routes/messageRoute.js");
const connectDB = require("./libs/db.js");

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
