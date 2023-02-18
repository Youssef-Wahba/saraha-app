const express = require("express");
const { config } = require("dotenv");
const connectDB = require("./config/dbConnection.js");
const userRouter = require("./components/user/user.routes.js");
const messageRouter = require("./components/message/message.routes.js");

config(); // for .env file configurations
connectDB(); // connect to database on specific port

const app = express();
const port = process.env.PORT;

app.use(express.json());
// app routes
app.use("/users", userRouter);
app.use("/messages", messageRouter);
// for any undefined route
app.use("*", (req, res) => {
	res.status(400).json({ message: "invalid route" });
});

app.listen(port, () => {
	console.log(`listening to port ${port} .. . ..`);
});
