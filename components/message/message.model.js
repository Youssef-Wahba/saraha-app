const { Schema, SchemaTypes, model } = require("mongoose");
// message model
const messageSchema = Schema(
	{
		message: String,
		userId: SchemaTypes.ObjectId,
	},
	{
		timestamps: true,
	}
);

module.exports = model("message", messageSchema);
