const { Router } = require("express");
const { postSignup, postLogin, postLogout } = require("../controllers/auth");
const authenticationMiddleware = require("../middlewares/sessionMiddleware");
const router = new Router();
router.post("/signup", postSignup);
router.post("/login", postLogin);
router.use(authenticationMiddleware);
router.post("/logout", postLogout);

module.exports = router;
