const { Router } = require("express");
const { postSignup } = require("../controllers/auth");
const router = new Router();
router.post("/signup", postSignup);

module.exports = router;
