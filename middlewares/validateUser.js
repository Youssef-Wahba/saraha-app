const {
	userRegisterValidate,
	userLoginValidate,
} = require("../components/user/user.valid.js");

module.exports.userRegisterValid = (req, res, next) => {
	// validating sent JSON schema
	const isValid = userRegisterValidate(req.body);
	if (!isValid) {
		const errors = userRegisterValidate.errors;
		// logic form more readable error messages without more details
		let finalErrors = [];
		errors.map((err) => {
			finalErrors.push(err.message);
		});
		return res.status(400).json(finalErrors);
	}
	next();
};

module.exports.userLoginValid = (req, res, next) => {
	// validating sent JSON schema
	const isValid = userLoginValidate(req.body);
	if (!isValid) {
		const errors = userLoginValidate.errors;
		// logic form more readable error messages without more details
		let finalErrors = [];
		errors.map((err) => {
			finalErrors.push(err.message);
		});
		return res.status(400).json(finalErrors);
	}
	next();
};