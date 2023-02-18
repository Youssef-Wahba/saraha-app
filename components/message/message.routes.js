const { Router } = require("express");
const { sendMessage } = require("./message.services");
const SendMessageValid = require("./../../middlewares/validateMessage.js");

const router = Router();
// message routes applying middlewares
router.post("/", SendMessageValid, sendMessage);

module.exports = router;
