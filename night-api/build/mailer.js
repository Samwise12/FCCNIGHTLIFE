'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sendConfirmationEmail = sendConfirmationEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var from = '"nightApp" <info@nightApp.com>';

/*function setup() {
	return nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
  	port: process.env.EMAIL_PORT,
  	auth: {
    	user: process.env.EMAIL_USER,
    	pass: process.env.EMAIL_PASS
		},
		tls: {
			rejectUnauthorized: false
		}
	})
}*/
function setup() {
	return _nodemailer2.default.createTransport({
		service: 'gmail',
		secure: false,
		port: 25,
		auth: {
			user: 'nodejstest123@gmail.com',
			pass: process.env.NODEMAILER_PASS
		},
		tls: {
			rejectUnauthorized: false
		}
	});
}

function sendConfirmationEmail(user) {
	var transporter = setup();
	var email = {
		from: from,
		to: user.email,
		subject: "Welcome to my FCCCoordination App",
		text: '\n\t\tWelcome to Nightapp. Please, confirm your email by clicking the link.\n\n\t\t' + user.generateConfirmationUrl() + '\n\t\t'
	};

	transporter.sendMail(email, function (err, res) {
		if (err) return console.log('Error:', err);
		console.log('Email Sent');
		console.log(res);
	});
}

function sendResetPasswordEmail(user) {
	var transporter = setup();
	var email = {
		from: from,
		to: user.email,
		subject: "Reset Password",
		text: '\n\t\tTo reset password follow this link\n\n\t\t' + user.generateResetPasswordLink() + '\n\t\t'
	};

	transporter.sendMail(email, function (err, res) {
		if (err) return console.log('Error:', err);
		console.log('Email Sent');
		console.log(res);
	});
}