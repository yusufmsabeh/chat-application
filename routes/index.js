const authRouter = require("./auth");
const chatRouter = require("./message");
const groupRouter = require("./group");

module.exports = (app) => {
  app.use("/auth", authRouter);
  app.use("/chatting", chatRouter);
  app.use("/group", groupRouter);
};
