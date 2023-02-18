const MESSAGE = require("./message.model.js");
const USER = require("./../user/user.model.js");

module.exports.sendMessage = async (req, res) => {
	const { message, userId } = req.body;
	// chekcing if user found or not
	const chkUser = await USER.findById(userId);
	if (!chkUser) return res.status(400).json({ message: "user not found" });
	await MESSAGE.insertMany({ message, userId });
	return res.json({ message: "success" });
};
