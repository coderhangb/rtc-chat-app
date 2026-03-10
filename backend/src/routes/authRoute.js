const { Router } = require("express");
const authController = require("../controllers/authController.js");

const router = Router();

router.route("/signup").post(authController.signupPost);

router.route("/login").get((req, res) => {
  res.send("Login");
});

router.route("/logout").get((req, res) => {
  res.send("Log Out");
});

module.exports = router;
