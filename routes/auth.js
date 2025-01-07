const { Router } = require("express");
const { postSignup, postLogin } = require("../controllers/auth");
const router = new Router();
router.post("/signup", postSignup);
router.post("/login", postLogin);

module.exports = router;
