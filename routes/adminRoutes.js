const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

// Admin Dashboard – See unapproved courses
router.get("/admin/dashboard", isLoggedIn, isAdmin, async (req, res) => {
  const courses = await Course.find({ isApproved: false });
  res.render("admin/dashboard", { courses });
});

// Approve Course
router.post("/admin/approve/:id", isLoggedIn, isAdmin, async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.redirect("/admin/dashboard");
});

// Delete Course
router.post("/admin/delete/:id", isLoggedIn, isAdmin, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.redirect("/admin/dashboard");
});

module.exports = router;
