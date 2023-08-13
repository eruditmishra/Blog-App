const express = require("express");
const {
  registerUser,
  loginUser,
  profile,
  logout,
} = require("../controllers/userController");
const router = express.Router();

// POST request to register the user
router.post("/register", registerUser);

// POST request to login the user
router.post("/login", loginUser);

// Profile route to access the profile
router.get("/profile", profile);

// logout
router.post("/logout", logout);

module.exports = router;
