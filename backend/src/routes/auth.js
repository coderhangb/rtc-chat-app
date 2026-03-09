const { Router } = require("express");

const router = Router();

router.route("/signup").get((req, res) => {
  res.send("Sign Up");
});

router.route("/login").get((req, res) => {
  res.send("Login");
});

router.route("/logout").get((req, res) => {
  res.send("Log Out");
});

module.exports = router;
