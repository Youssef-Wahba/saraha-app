const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	// getting token from header
	const token = req.get("token");
	if (!token) return res.json({ message: "token missing" });
	// verifying token
	jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
		if (err) return res.json({ message: "error in token", err });
		//extracting user if from decoded token and set id in request
		const { user_id } = decode;
		req.id = user_id;
		next();
	});
};
