const { User, Skill, Posts } = require("../DB/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const postController = {};

postController.addPost = async (req, res) => {
  try {
    console.log("body", req.body);

    const token = req.cookies.access_token;
    if (!token) return res.status(401).send({ message: "Token is not valid" });
    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).send({ message: "Token is not valid" });
      const newPost = req.body;
      const savePost = await Posts.create({
        ...newPost,
        userId: userInfo.data.id,
      });
      return res.status(201).send({
        status: "Success",
        data: savePost,
        message: "New Post Create Success",
      });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

postController.getAllPosts = async (req, res) => {
  try {
    const findCat = req.query.cat;
    if (findCat) {
      const allPost = await Posts.findAll({
        where: { cat: { [Op.iLike]: `%${findCat}%` } },
      });
      return res.status(200).send({
        status: "Success",
        data: allPost,
        message: "Get All Post Success",
      });
    }
    const allPost = await Posts.findAll({
      include: [{ model: User, as: "user" }],
    });
    return res.status(200).send({
      status: "Success",
      data: allPost,
      message: "Get All Post Success",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
postController.getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const singlePost = await Posts.findOne({
      where: { id: postId },
      include: [{ model: User, as: "user" }],
    });

    return res.status(200).send({
      status: "Success",
      data: singlePost,
      message: "Get Single Success",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
postController.updatePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send({ message: "Token is not valid" });
    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).send({ message: "Token is not valid" });
      const postId = req.params.id;
      const newPost = req.body;
      console.log("updatepost", newPost);
      const updateDate = new Date();
      const updatePost = await Posts.update(
        { ...newPost, updated_at: updateDate },
        { where: { id: postId } }
      );
      return res.status(201).send({
        status: "Success",
        data: updatePost,
        message: "Post Update Success",
      });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
postController.deletePost = (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send({ message: "Token is not valid" });
    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).send({ message: "Token is not valid" });
      const postId = req.params.id;
      const seePost = await Posts.findOne({ where: { id: postId } });
      if (userInfo.data.id != seePost.userId)
        return res
          .status(400)
          .send({ message: "You are not allow to do that" });
      const deletePost = await Posts.destroy({ where: { id: postId } });
      return res.status(200).send({
        status: "Success",
        data: deletePost,
        message: "Post Delete Success",
      });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports = postController;
