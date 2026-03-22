const jwt = require("jsonwebtoken");
const User = require("../models/User");

const socketAuthMiddleware = (socket, next) => {
  // extract cookie from socket.io
  const token = socket.handshake.headers.cookie
    ?.split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1];

  if (!token) {
    console.log("Socket connection rejected: No token provided");
    return next(new Error("Unauthorized - No Token Provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (!decoded || err) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    try {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        console.log("Socket connection rejected: User not found");
        return next(new Error("User not found"));
      }

      socket.user = user;
      socket.userId = user._id.toString();

      console.log(
        `Socket authenticated for user ${user.fullName} (${user._id})`,
      );
      next();
    } catch (error) {
      console.log("Error in socket authentication", error);
      next(new Error("Unauthorized - Authentication fail"));
    }
  });
};

module.exports = socketAuthMiddleware;
