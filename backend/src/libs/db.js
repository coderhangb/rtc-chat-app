const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "rtc-chat-app",
    });
    console.log("MongoDB Connected: ", db.connection.host);
  } catch (error) {
    console.error("Fail to connect to MongoDB: ", error);
  }
};

module.exports = connectDB;
