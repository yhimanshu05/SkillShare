const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagestorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "SkillShare",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "SkillShareVideos",
    resource_type: "video", 
    allowed_formats: ["mp4", "mov", "avi"],
  },
});

module.exports = {
  cloudinary,
  imagestorage,
  videoStorage,
};
