const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
module.exports.verifyEmail = async (email) => {
	const trnasport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS,
		},
	});
	const token = jwt.sign({ email }, process.env.JWT_SECRET);
	await trnasport.sendMail({
		from: `"no-reply verify" <${process.env.NODEMAILER_USER}}>`, // sender address
		to: email, // list of receivers
		subject: "VERIFY EMAIL", // Subject line
		text: "please verify your email in able to use the app functionalities, thanks for your understanding", // plain text body
		html: `
        <div style="background:violet; padding:20px">
            <a href="http://localhost:8080/users/verify/${token}">Verify email</a>
        </div>
        `, // html body
	});
};
