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

app.use(cors({ credentials: true, origin: "https://udit-blog.vercel.app/" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/users", userRoutes);
app.use("/api", postRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
