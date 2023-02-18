const { Schema, model } = require("mongoose");
// user model with enabled timestamping
const userSchema = Schema(
	{
		username: String,
		age: String,
		email: String,
		password: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("user", userSchema);
