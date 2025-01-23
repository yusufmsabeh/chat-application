const { Router } = require("express");
const { postSignup, postLogin, postLogout } = require("../controllers/auth");
const authenticationMiddleware = require("../middlewares/sessionMiddleware");
const { checkSchema } = require("express-validator");
const postSignupSchema = require("../validation/post-signup-validator");
const postLoginSchema = require("../validation/post-login-validator");
const router = new Router();
router.post("/signup", checkSchema(postSignupSchema), postSignup);
router.post("/login", checkSchema(postLoginSchema), postLogin);
router.use(authenticationMiddleware);
router.post("/logout", postLogout);

module.exports = router;
