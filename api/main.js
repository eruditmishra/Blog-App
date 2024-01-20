const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/dbConnection");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

connectDB();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://udit-blog.vercel.app");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/users", userRoutes);
app.use("/api", postRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
