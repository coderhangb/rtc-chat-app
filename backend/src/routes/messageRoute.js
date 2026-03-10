const { Router } = require("express");

const router = Router();

router.route("/send").get((req, res) => {
  res.send("Sended");
});

module.exports = router;
