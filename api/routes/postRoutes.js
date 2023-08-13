const express = require("express");
const {
  createNewPost,
  getPosts,
  getPost,
  updatePost,
} = require("../controllers/postController");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "./uploads" });

// create post
router.post("/post", uploadMiddleware.single("file"), createNewPost);
// router.route("/create").post(uploadMiddleware.single("file"), createNewPost);

// Fetch All Posts
router.get("/post", getPosts);

// Fetch Single Post
router.get("/post/:id", getPost);

// Update post
router.put("/post", uploadMiddleware.single("file"), updatePost);

module.exports = router;
