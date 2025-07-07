const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  thumbnail: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

  isApproved: {
    type: Boolean,
    default: false,
  },

  image: {
  type: String,
  required: true,
  },

  videoUrl: {
  type: String,
  required: true,
},
});


module.exports = mongoose.model("Course", courseSchema);

