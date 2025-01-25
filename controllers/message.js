const Message = require("../models/message");
const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");
exports.postPrivateMessage = async (req, res) => {
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
    const { content, receiver_id } = matchedData(req);
    const receiver = await User.findByPk(receiver_id);
    if (!receiver)
      return res.status(400).json({
        status: "error",
        code: "400",
        message: "there is no user with this ID",
      });
    const message = Message.create({
      content: content,
      receiver_id: receiver_id,
      sender_id: req.user.ID,
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "message sent successfully",
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

exports.getPrivateMessage = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id)
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "user_id not found",
      });
    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "There is no user with this ID",
      });
    const messages = await Message.findAll({
      where: {
        sender_id: req.user.ID,
        receiver_id: user_id,
      },
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Messages retrieved successfully",
      data: {
        messages: messages,
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

module.exports.postGroupMessage = async (req, res) => {
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
    const { content, group_id } = matchedData(req);
    const isJoined = await req.user.hasGroup(group_id);
    if (!isJoined)
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "There is no group with this ID",
      });
    await req.user.createMessage({
      content: content,
      group_id: group_id,
      receiver_id: null,
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Message sent successfully",
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

exports.getGroupMessage = async (req, res) => {
  try {
    const { group_id } = req.query;

    if (!group_id)
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "All fields required ( group_id) ",
      });
    const group = await req.user.getGroups({ where: { id: group_id } });
    if (!group)
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "There is no group with this ID",
      });

    const messages = await Message.findAll({
      where: {
        group_id: group_id,
      },
    });
    res.status(200).json({
      status: "success",
      code: 200,
      messages: "Messages retrieved successfully",
      data: {
        messages: messages,
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
