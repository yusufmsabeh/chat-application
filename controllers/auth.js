const User = require("../models/user");
const bcrypt = require("bcrypt");

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
