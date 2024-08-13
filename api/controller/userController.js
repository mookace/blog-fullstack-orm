const { User } = require("../DB/models");
const { Skill } = require("../DB/models");
const userController = {};

userController.register = async (req, res) => {
  try {
    const newUser = req.body;
    const saveUser = await User.create(newUser);
    return res.status(201).send({
      status: "success",
      data: saveUser,
      message: "User created success",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

userController.addSkill = async (req, res) => {
  try {
    const newSkill = req.body;
    console.log("newskill", newSkill);
    const saveSkill = await Skill.create(newSkill);
    return res.status(201).send({
      status: "success",
      data: saveSkill,
      message: "Skill created success",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

userController.show = async (req, res) => {
  try {
    const allData = await User.findAll({
      include: [{ model: Skill, as: "skill" }],
    });
    return res.status(201).send({
      status: "success",
      data: allData,
      message: "Get All Users",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports = userController;
