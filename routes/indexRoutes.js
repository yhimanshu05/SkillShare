const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.render("home", { title: "Welcome to SkillShare!" });
});

module.exports = router;

router.get("/dashboard", (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  res.render("dashboard");
});
