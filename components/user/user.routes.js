const { Router } = require("express");
const authUser = require("../../middlewares/authUser.js");
const {
	userRegisterValid,
	userLoginValid,
} = require("./../../middlewares/validateUser.js");
const {
	register,
	login,
	getUserMessages,
	verifyUserEmail,
} = require("./user.services.js");

const router = Router();
// all routes applying middlewares
router.post("/register", userRegisterValid, register);
router.post("/login", userLoginValid, login);
router.get("/messages", authUser, getUserMessages);
router.get("/verify/:token", verifyUserEmail);

module.exports = router;
