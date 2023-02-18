const ajv = require("./../../config/ajvInstance.js");

const sendMessageSchema = {
	type: "object",
	properties: {
		userId: {
			type: "string",
			minLength: 24,
			maxLength: 24,
		},
		// age allowed between 16 yrs to 60 yrs
		message: {
			type: "string",
			minLength: 1,
		},
	},
	required: ["userId", "message"],
	additionalProperties: false,
	errorMessage: {
		type: "should be an object",
		properties: {
			userId: 'invalid user id property "userId"',
			message: 'should be at least 1 character property "message"',
		},
		required: {
			userId: 'should a string property "userId"',
			message: 'should have a string property "message"',
		},
	},
};

module.exports = ajv.compile(sendMessageSchema);
