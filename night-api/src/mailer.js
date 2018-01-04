import nodemailer from 'nodemailer';

const from = '"nightApp" <info@nightApp.com>';

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
	return nodemailer.createTransport({
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
	})
}

export function sendConfirmationEmail(user) {
	const transporter = setup();
	const email = {
		from,
		to: user.email,
		subject: "Welcome to my FCCCoordination App",
		text: `
		Welcome to Nightapp. Please, confirm your email by clicking the link.

		${user.generateConfirmationUrl()}
		`
	}

	transporter.sendMail(email, (err, res) => {
		if(err) return console.log('Error:', err);		
		console.log('Email Sent');
		console.log(res);
	});
}

export function sendResetPasswordEmail(user) {
	const transporter = setup();
	const email = {
		from,
		to: user.email,
		subject: "Reset Password",
		text: `
		To reset password follow this link

		${user.generateResetPasswordLink()}
		`
	}

	transporter.sendMail(email, (err, res) => {
		if(err) return console.log('Error:', err);		
		console.log('Email Sent');
		console.log(res);
	});
}
