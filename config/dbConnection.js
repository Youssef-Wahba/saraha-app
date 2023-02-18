const { connect, set } = require("mongoose");

module.exports = () => {
	try {
		// connect to mongodb
		set("strictQuery", false);
		connect(process.env.MONGODB_CONNECTION_STRING, () => {
			console.log("DB connected :)");
		});
	} catch (err) {
		// if error in connection
		console.log(`DB connection error : ${err}`);
	}
};
