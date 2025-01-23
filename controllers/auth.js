const User = require("../models/user");
const bcrypt = require("bcrypt");
const postSignupSchema = require("../validation/post-signup-validator");
const {
  getOrCreateSession,
  deleteSession,
} = require("../services/sessions_management");
const { validationResult, matchedData } = require("express-validator");
exports.postSignup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({
        status: "error",
        code: 400,
        message: errorMessages,
      });
    }
    const { name, email, password } = matchedData(req);
    const isExists =
      (await User.findOne({
        where: {
          email: email,
        },
      })) != null;
    if (isExists)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User already exists with that email",
      });
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name: name,
      password: hashedPassword,
      email: email,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      message: "User successfully created",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Something went wrong",
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({
        status: "error",
        code: 400,
        message: errorMessages,
      });
    }
    const { email, password } = matchedData(req);
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user)
      return res.status(401).json({
        status: "unauthorized",
        code: 401,
        message: "invalid email or password",
      });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({
        status: "unauthorized",
        code: 401,
        message: "invalid email or password",
      });
    const token = await getOrCreateSession(user.ID);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "User successfully logged in",
      data: {
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Something went wrong",
    });
  }
};

exports.postLogout = async (req, res) => {
  try {
    const userId = req.user.ID;
    await deleteSession(userId);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User successfully logged out",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Something went wrong",
    });
  }
};
