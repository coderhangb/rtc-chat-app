const Message = require("../models/Message.js");
const User = require("../models/User.js");
const cloudinary = require("../libs/cloudinary.js");

const getAllContact = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log(loggedInUserId);
    const filterUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password",
    ); // get all users except the one who loged in
    res.status(200).json(filterUser);
  } catch (error) {
    console.log("Error in getAllContact", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getChatPartner = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all message related to loggedInUser
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    // filter to get all chat partner's ids, remove duplicate and spread to array
    const chatPartnerIds = [
      ...new Set(
        messages.map((message) =>
          message.senderId.toString() === loggedInUserId.toString()
            ? message.receiverId.toString()
            : message.senderId.toString(),
        ),
      ),
    ];

    const chatPartner = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartner);
  } catch (error) {
    console.log("Error in getChatPartner", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessageByUserId", error);
    res.status(500).json({ message: "Server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllContact,
  getChatPartner,
  getMessageByUserId,
  sendMessage,
};
