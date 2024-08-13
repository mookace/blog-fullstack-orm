const { User, Skill, Posts } = require("../DB/models");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const authController = {};

authController.register = async (req, res) => {
  try {
    const newUser = req.body;
    console.log("seee newuser", newUser);
    const findUser = await User.findOne({ where: { email: newUser.email } });
    if (findUser) {
      return res.status(400).send({ message: "User Already Exist!" });
    } else {
      newUser.password = CryptoJS.AES.encrypt(
        newUser.password,
        process.env.CRYPTOJS_SECRETE_KEY
      ).toString();
      console.log("pass", newUser.password);
      const saveUser = await User.create(newUser);
      return res.status(201).send({
        status: "Success",
        data: saveUser,
        message: "New User Created Success",
      });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email: email } });
    if (!findUser) {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }
    const hassPass = CryptoJS.AES.decrypt(
      findUser.dataValues.password,
      process.env.CRYPTOJS_SECRETE_KEY
    );
    const originalPass = hassPass.toString(CryptoJS.enc.Utf8);
    if (originalPass === password) {
      const { password, ...others } = findUser.dataValues;
      const token = jwt.sign(
        {
          data: others,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send({ status: "Success", data: others, message: "Login Success" });
    } else {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
authController.logout = async (req, res) => {
  try {
    return res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ message: "User Logout Success" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports = authController;
