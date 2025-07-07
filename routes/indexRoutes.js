const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.render("home", { title: "Welcome to SkillShare!" });
});

module.exports = router;

// router.get("/dashboard", (req, res) => {
//   if (!req.session.userId) return res.redirect("/login");
//   res.render("dashboard");
// });

router.get("/dashboard", (req, res) => {
  if (!req.session.userId) return res.redirect("/login");

  if (req.session.isAdmin) {
    return res.redirect("/admin/dashboard");
  }

  res.render("dashboard");
});
