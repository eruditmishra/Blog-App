const asyncHandler = require("express-async-handler");
const fs = require("fs");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

// @desc Create New Post
// @route POST /api/create
// @access private
const createNewPost = asyncHandler(async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  console.log("token------>", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
    console.log("Info============>", info);
    if (err) {
      // Handle the JWT verification error properly
      console.log("Error during JWT verification:", err.message);
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { title, summary, content } = req.body;
    console.log("info id", info.user.id);

    // Create Post
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.user.id,
    });
    // JWT verification successful, continue processing
    res.json(postDoc.author);
  });
});

// @desc Get all Posts from  DB
// @route GET /api/post
// @access public

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "-password", // Exclude sensitive information like password
      })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (error) {
    // Handle any error that might occur during data retrieval
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// @desc get single post from the db
// @route GET /api/post/:id
// @access public

const getPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate({
      path: "author",
      select: "-password", // Exclude sensitive information like password
    });
    res.json(postDoc);
  } catch (error) {
    // Handle any error that might occur during data retrieval
    res.status(500).json({ message: "Error fetching this post" });
  }
});

// @desc Update Post
// @route PUT /api/post/:id
// @access private

const updatePost = asyncHandler(async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      {},
      async (err, info) => {
        console.log("Info============>", info);
        const { id, title, summary, content } = req.body;
        if (err) {
          // Handle the JWT verification error properly
          console.log("Error during JWT verification:", err.message);
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        const postDoc = await Post.findById(id);
        const isAuthor =
          JSON.stringify(postDoc.author) === JSON.stringify(info.user.id);
        if (!isAuthor) {
          res.status(400).json("You are not authorized to edit this post");
        }
        // Update post properties
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        if (newPath) {
          postDoc.cover = newPath;
        }
        const updatedPost = await postDoc.save();

        res.json(updatedPost);
      }
    );
  } catch (error) {
    // Handle any error that might occur during data retrieval
    res.status(500).json({ message: "Error updating this post" });
  }
});

module.exports = { createNewPost, getPosts, getPost, updatePost };
