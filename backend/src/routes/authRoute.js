const { Router } = require("express");
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const arcjetMiddleware = require("../middlewares/arcjetMiddleware.js");

const router = Router();

router.use(arcjetMiddleware);

router.route("/signup").post(authController.signupPost);

router.route("/login").post(authController.loginPost);

router.route("/logout").post(authController.logoutPost);

router
  .route("/update-profile")
  .put(authMiddleware, authController.updateProfile);

router.route("/check").get(authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
