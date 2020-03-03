const sgMail = require('@sendgrid/mail');

const mail = async (msgContent) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const { email, lockOfferPrice, totalPrice } = msgContent;
	const msg = {
		to: email,
		from: 'deals@nortify.com.ng',
		subject: 'Discount Payment Detail',
		text: 'Payment Success',
		html: `<div>
		<h3>Call 08101967324, for further questions </h3>
    <h3>You paid: #${lockOfferPrice}</h3>
    <h3>You Balance: #${totalPrice - lockOfferPrice}</h3>
    </div>`
	};
	try {
		const res = await sgMail.send(msg);
		return { error: null, result: res };
	} catch (error) {
		console.log(error);
		return { error: error.message, result: null };
	}
};

module.exports = mail;
