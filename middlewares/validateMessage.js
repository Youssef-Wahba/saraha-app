const validateSendMessage = require("./../components/message/message.valid.js");

module.exports = (req, res, next) => {
	// validating sent JSON schema
	const isValid = validateSendMessage(req.body);
	if (!isValid) {
		const errors = validateSendMessage.errors;
		// logic form more readable error messages without more details
		let finalErrors = [];
		errors.map((err) => {
			finalErrors.push(err.message);
		});
		return res.status(400).json(finalErrors);
	}
	next();
};
