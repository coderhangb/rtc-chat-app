const User = require("../models/User.js");
const { createToken } = require("../libs/utils.js");
const sendWelcomeEmail = require("../emails/emailHandlers.js");

function handleError(error) {
  console.log(error.message);
  let err = {
    fullName: "",
    email: "",
    password: "",
  };

  // duplicate error code
  if (error.code === 11000) {
    err.email =
      "This email is already registered. Please log in or use a different email.";
    return err;
  }

  // validation error
  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      err[properties.path] = properties.message;
    });
  }

  return err;
}

async function signupPost(req, res) {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.create({ fullName, email, password });
    res.cookie("jwt", createToken(user._id), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      secure: true,
    });

    await sendWelcomeEmail(email, fullName, process.env.CLIENT_URL);

    res.status(201).json({ user: user._id });
  } catch (error) {
    const err = handleError(error);
    res.status(400).json(err);
  }
}

module.exports = {
  signupPost,
};
