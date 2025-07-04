const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER FORM
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// LOGIN FORM
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// REGISTER USER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res.redirect("/dashboard");
  } catch (err) {
    res.send("Registration error: " + err.message);
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const match = await user.comparePassword(password);
    if (!match) return res.send("Incorrect password");

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res.redirect("/dashboard");
  } catch (err) {
    res.send("Login error: " + err.message);
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
