const ajv = require("./../../config/ajvInstance.js");

const userRegisterSchema = {
	type: "object",
	properties: {
		username: {
			type: "string",
			// username is 8-20 characters long, no _ or . at the beginning or end, a-z A-Z 0-9 . _ are only allowed
			pattern: "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$",
		},
		// age allowed between 16 yrs to 60 yrs
		age: {
			type: "integer",
			minimum: 16,
			maximum: 60,
		},
		email: {
			type: "string",
			format: "email",
		},
		password: {
			type: "string",
			pattern:
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$",
		},
		repassword: {
			const: {
				$data: "1/password",
			},
		},
	},
	required: ["username", "age", "email", "password", "repassword"],
	additionalProperties: false,
	errorMessage: {
		type: "should be an object",
		properties: {
			username: 'should match required pattern property "username"',
			age: 'should be between 16 and 60 years property "age"',
			email: 'invalid email property "email"',
			password:
				'should be minimum 8 characters with letters (uppercase and lowercase), numbers and special characters property "password"',
			repassword: 'should match with password property "repassword"',
		},
		required: {
			username: 'should a string property "username"',
			age: 'should have an integer property "age"',
			email: 'should have a string property "email"',
			password: 'should have a string property "password"',
			repassword: 'should have a string property "repassword"',
		},
	},
};

const userLoginSchema = {
	type: "object",
	properties: {
		email: {
			type: "string",
			format: "email",
		},
		password: {
			type: "string",
			pattern:
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$",
		},
	},
	required: ["email", "password"],
	additionalProperties: false,
	errorMessage: {
		type: "should be an object",
		properties: {
			email: 'invalid email property "email"',
			password:
				'should be minimum 8 characters with letters (uppercase and lowercase), numbers and special characters property "password"',
		},
		required: {
			email: 'should have a string property "email"',
			password: 'should have a string property "password"',
		},
	},
};

module.exports.userRegisterValidate = ajv.compile(userRegisterSchema);
module.exports.userLoginValidate = ajv.compile(userLoginSchema);
