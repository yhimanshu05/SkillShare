const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const multer = require("multer");
const { imageStorage, videoStorage } = require("../utils/cloudinary");
const { isLoggedIn } = require("../middlewares/auth");

const uploadImage = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });

const uploadBoth = multer().fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

const handleUploads = (req, res, next) => {
  uploadBoth(req, res, async function (err) {
    if (err) return res.send("Upload error: " + err.message);

    try {
      const imageUpload = await uploadImage.single("image")(req, res, () => {});
      const videoUpload = await uploadVideo.single("video")(req, res, () => {});

      next();
    } catch (e) {
      return res.send("Upload failed: " + e.message);
    }
  });
};

const fullUpload = [
  uploadImage.single("image"),
  uploadVideo.single("video"),
];

// Form to create course
router.get("/courses/new", isLoggedIn, (req, res) => {
  res.render("courses/new");
});

//for handling course creation
router.post("/courses/create", isLoggedIn, ...fullUpload, async (req, res) => {
  const { title, description, category } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      category,
      image: req.files?.image?.[0]?.path || req.file?.path,
      videoUrl: req.files?.video?.[0]?.path || req.file?.path,
      createdBy: req.session.userId,
      isApproved: false,
    });

    await newCourse.save();
    res.redirect("/courses");
  } catch (err) {
    console.error(err);
    res.send("Error saving course: " + err.message);
  }
});

// Show approved courses
router.get("/courses", async (req, res) => {
  const courses = await Course.find({ isApproved: true });
  res.render("courses/index", { courses });
});

// Show single course
router.get("/courses/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("courses/show", { course });
});

module.exports = router;
