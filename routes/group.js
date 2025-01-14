const { Router } = require("express");
const { postGroup, postJoinGroup } = require("../controllers/group");
const authenticationMiddleware = require("../middlewares/sessionMiddleware");
const router = new Router();
router.use(authenticationMiddleware);
router.post("/", postGroup);
router.post("/join", postJoinGroup);
module.exports = router;
