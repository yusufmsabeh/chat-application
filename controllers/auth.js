const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "All fields are required",
      });
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
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "All fields are required",
      });
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
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
        algorithm: "HS256",
      },
    );
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
