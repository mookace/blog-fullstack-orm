const express = require("express");
const router = express.Router();

const authRoutes = require("../routes/authRoute");
router.use("/auth", authRoutes);

const postRoutes = require("../routes/postRoute");
router.use("/post", postRoutes);

const userRoutes = require("../routes/userRoute");
router.use("/user", userRoutes);

module.exports = router;
