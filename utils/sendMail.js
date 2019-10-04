const sgMail = require('@sendgrid/mail');

const mail = async msgContent => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: msgContent.email,
		from: 'deals@nortify.com.ng',
		subject: 'Discount Payment Detail',
		text: 'Pay with the following details',
		html: `<div>
    <h3>Bank: GTB</h3>
    <h3>Account: 0045442903</h3>
    <h3>Account Name: John Doe</h3>
    <h3>Amount: ₦${msgContent.amount}</h3>
    </div>`
	};
	try {
		const res = await sgMail.send(msg);
		return { error: null, result: res };
	} catch (error) {
		console.log(error.response.body.errors);
		return { error: error.message, result: null };
	}
};

module.exports = mail;
