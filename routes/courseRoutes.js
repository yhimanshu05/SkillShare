const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Middleware: protect routes
function isLoggedIn(req, res, next) {
  if (!req.session.userId) return res.redirect("/login");
  next();
}

// Show all courses (only approved ones)
router.get("/courses", async (req, res) => {
  const courses = await Course.find({ isApproved: true });
  res.render("courses/index", { courses });
});

// Show form to create course
router.get("/courses/new", isLoggedIn, (req, res) => {
  res.render("courses/new");
});

// Handle course creation
router.post("/courses", isLoggedIn, async (req, res) => {
  const { title, description, category } = req.body;
  await Course.create({
    title,
    description,
    category,
    createdBy: req.session.userId,
    isApproved: false, // admin will approve
  });
  res.redirect("/courses");
});

// Show single course (optional for now)
router.get("/courses/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("courses/show", { course });
});

module.exports = router;
