const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth.js");
const messageRoutes = require("./routes/message.js");

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
