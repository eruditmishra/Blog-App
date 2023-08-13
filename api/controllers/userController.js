const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Register New User
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  // check if all the required values are present or not
  if (!userName || !password) {
    // All the required values are not present
    res.status(400);
    throw new Error("All fields must be filled");
  }
  //   Check if the user already exists
  const userExists = await User.findOne({ userName });
  if (userExists) {
    // user already exists
    res.status(400);
    throw new Error("User already exists");
  }

  //   Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      userName,
      password: hashedPassword,
    });
    console.log("User created Successfully");
    res.status(200).json({
      _id: user.id,
      userName: user.userName,
    });
  } catch (error) {
    console.log(`Error while creating the document ${error}`);
    throw new Error("User Data is not valid");
  }
  res.json({ message: "Register the user" });
});

// @desc login the user
// @route POST api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  //   Check if all the mandatory values are present or not
  if (!userName || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ userName });
  // If no such username found in database then return error response with status code of 'Not Found
  // if (!user) {
  //   res.status(400);
  //   throw new Error("Invalid credentials");
  // }
  //   compare the entered password with the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    // the entered password is correct -> user logged in ->  send the data into payload
    const payload = {
      user: {
        userName: user.userName,
        id: user._id,
      },
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
    });
    // res.status(200).json({ accessToken });
    res.cookie("token", accessToken).status(200).json({
      id: user._id,
      userName,
    });
  } else {
    res.status(400);
    throw new Error("Invalid  password");
  }
});

// @desc profile
// @route GET /api/users/profile
// @access private
const profile = asyncHandler(async (req, res) => {
  console.log("cookies", req.headers["cookie"]);
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, info) => {
      if (err) {
        // Handle the JWT verification error properly
        console.log("Error during JWT verification:", err.message);
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      // JWT verification successful, continue processing
      res.json(info);
    });
  } catch (error) {
    console.log("Error during verifying cookie", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc logout
// @route POST /api/users/logout
// @access private
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token").json("ok");
  // res.cookie("token", "").json("ok");
});

module.exports = { registerUser, loginUser, profile, logout };
