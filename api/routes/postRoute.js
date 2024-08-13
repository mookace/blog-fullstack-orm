const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/getpost", postController.getAllPosts);
router.get("/getpost/:id", postController.getPost);
router.post("/addpost", postController.addPost);
router.delete("/deletepost/:id", postController.deletePost);
router.post("/updatepost/:id", postController.updatePost);

module.exports = router;
