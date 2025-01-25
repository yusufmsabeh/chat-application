const { Router } = require("express");
const {
  postPrivateMessage,
  getPrivateMessage,
  postGroupMessage,
  getGroupMessage,
} = require("../controllers/message");
const authenticationMiddleware = require("../middlewares/sessionMiddleware");
const postPrivateMessageSchema = require("../validation/post-private-message-validator");
const postGroupMessageSchema = require("../validation/post-group-message-validator");
const { checkSchema } = require("express-validator");
const router = new Router();
router.use(authenticationMiddleware);
router.post(
  "/privateMessage",
  checkSchema(postPrivateMessageSchema),
  postPrivateMessage,
);
router.get("/privateMessage", getPrivateMessage);
router.post(
  "/groupMessage",
  checkSchema(postGroupMessageSchema),
  postGroupMessage,
);
router.get("/groupMessage", getGroupMessage);

module.exports = router;
