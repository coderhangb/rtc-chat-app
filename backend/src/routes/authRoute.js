const { Router } = require("express");
const authController = require("../controllers/authController.js");

const router = Router();

router.route("/signup").post(authController.signupPost);

router.route("/login").post(authController.loginPost);

router.route("/logout").post(authController.logoutPost);

module.exports = router;
