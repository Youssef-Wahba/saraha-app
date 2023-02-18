const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USER = require("./user.model.js");
const MESSAGE = require("../message/message.model.js");
const { verifyEmail } = require("../../emails/user.email.js");
const { off } = require("./user.model.js");

module.exports.register = async (req, res) => {
	const { username, age, email, password } = req.body;
	const chkUser = await USER.findOne({ email });
	// checking if user found or not
	if (chkUser) {
		if (chkUser.username === username)
			return res.status(400).json({ message: "username already exists" });
		else return res.status(400).json({ message: "email already exists" });
	}
	// hashing password
	bcrypt.hash(
		password,
		Number(process.env.BCRYPT_SALT_ROUNDS),
		async (err, hashedPassword) => {
			await USER.insertMany({
				username,
				age,
				email,
				password: hashedPassword,
			});
			verifyEmail(email);
			return res.status(200).json({ message: "success" });
		}
	);
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	const chkUser = await USER.findOne({ email });
	// checking if user found or not
	if (!chkUser) return res.status(400).json({ message: "email doesn't exist" });
	// comparing recieved password with hashed password in database
	const match = await bcrypt.compare(password, chkUser.password);
	if (!match) return res.status(400).json({ message: "incorrect password" });
	if (!chkUser.isVerified)
		return res.status(400).json({ message: "email not verified" });
	// initilaizing token
	const token = jwt.sign(
		{
			user_id: chkUser._id,
			username: chkUser.username,
			age: chkUser.age,
			email: chkUser.email,
		},
		process.env.JWT_SECRET
	);
	return res.status(200).json({ message: "success", token });
};

module.exports.getUserMessages = async (req, res) => {
	const userId = req.id;
	const messages = await MESSAGE.find(
		{ userId },
		{ userId: 0, _id: 0, __v: 0, updatedAt: 0 }
	);
	if (messages.length < 1)
		return res.status(404).json({ message: "no messages found" });
	return res.status(200).json({ message: "success", messages });
};

module.exports.verifyUserEmail = async (req, res) => {
	const { token } = req.params;
	jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
		if (err) return res.status(400).json({ message: "error in token", err });
		const { email } = decode;
		await USER.findOneAndUpdate({ email }, { isVerified: true });
		return res.status({ message: "success" });
	});
	jwt.decode(token, (err, decoded) => {
		if (err) return res.status(400).json({ message: "error in deod" });
	});
	res.json({ messsage: "verified" });
};
