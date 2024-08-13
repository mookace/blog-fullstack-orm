const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const port = process.env.PORT || 8001;
const { sequelize } = require("./DB/models");
const userController = require("./controller/userController");
const allRouter = require("./routes/allRoutes");
require("dotenv").config();
const path = require("path");

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

const DBConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Routes
app.use("/api", allRouter);

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/uploads"));
  },
  filename: (req, file, cb) => {
    let filename = Date.now() + "--" + file.originalname;
    req.filename = filename;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 1 Mb
  },
});

app.post("/api/uploads", upload.single("img"), function (req, res) {
  const fileName = req.filename;
  res.status(200).send(fileName);
});

// test routes
app.post("/register", userController.register);
app.post("/addskill", userController.addSkill);
app.get("/show", userController.show);

app.listen(port, async () => {
  try {
    console.log("Connecting Database...");
    await DBConnect();
    console.log(`Server is running on port = ${port}`);
  } catch (error) {
    console.log("Error on Connecting to Server", error);
  }
});
