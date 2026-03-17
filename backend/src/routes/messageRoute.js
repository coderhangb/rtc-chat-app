const { Router } = require("express");
const messageController = require("../controllers/messageController.js");
const arcjetMiddleware = require("../middlewares/arcjetMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = Router();

router.use(arcjetMiddleware, authMiddleware);

router.route("/contact").get(messageController.getAllContact);

router.route("/chat").get(messageController.getChatPartner);

router.route("/:id").get(messageController.getMessageByUserId);

router.route("/send/:id").post(messageController.sendMessage);

module.exports = router;
