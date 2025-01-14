const { Router } = require("express");
const {
  postPrivateMessage,
  getPrivateMessage,
  postGroupMessage,
  getGroupMessage,
} = require("../controllers/message");
const authenticationMiddleware = require("../middlewares/sessionMiddleware");
const router = new Router();
router.use(authenticationMiddleware);
router.post("/privateMessage", postPrivateMessage);
router.get("/privateMessage", getPrivateMessage);
router.post("/groupMessage", postGroupMessage);
router.get("/groupMessage", getGroupMessage);

module.exports = router;
