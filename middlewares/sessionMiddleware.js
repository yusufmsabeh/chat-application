const Session = require("../models/session");
const User = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    if (!token)
      return res.status(401).json({
        status: "unauthorized",
        code: 401,
        message: "Not authorized, please try to login",
      });
    const session = await Session.findOne({
      where: {
        session_id: token,
      },
    });
    if (!session)
      return res.status(401).json({
        status: "unauthorized",
        code: 401,
        message: "Not authorized, please try to login",
      });
    const user = await User.findByPk(session.user_id);
    if (!user)
      return res.status(401).json({
        status: "unauthorized",
        code: 401,
        message: "Not authorized, please try to login",
      });
    req.user = user;
    return next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      code: "500",
      message: "Something went wrong",
    });
  }
};
