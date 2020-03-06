const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const composeCustomerMail = ({ email, name, lockOfferPrice, totalPrice }) => {
	const msg = {
		to: email,
		from: 'deals@nortify.com.ng',
		subject: 'Nortify Discounts',
		text: 'Nortify Discounts',
		html: `
			<div style="font-size: 40px line-height: 20px">
				<h3>Dear ${name},</h3>
				<p>
					Your payment of <span style="font-weight: bold">₦${lockOfferPrice}</span> was received and 
					the remaining balance is <span style="font-weight: bold">₦${totalPrice - lockOfferPrice}</span>. 
					The balance must be paid before completion of the project
				</p>
				<p>
				 To commence the portal setup right away, kindly fill the form using this link: 
				  <a href="http://signup.nortify.com.ng/Home/Register">Registration Link</a>
				</p>
				<p>
					Our project team will contact you to commence project once we received notification.
					<br />
					You can reach us on 08182556717 or 08090160500 (Whatsapp).
					<br />
					Welcome to the nortify family.
					<br />
					Best Regards
				</p>
				<p>
				  Abiola Oseni <br /> Founder, Nortify
				</p>
			</div>
		`
	};
	return msg;
};

const composeAdminMail = ({ adminEmail, name }) => {
	const msg = {
		to: adminEmail,
		from: 'deals@nortify.com.ng',
		subject: 'New Discount Locked!',
		text: 'Nortify Discounts',
		html: `
			<div style="font-size: 40px line-height: 20px">
					<h3>Dear Admin </h3>
					<p>
						${name} has secured a deal on Nortify Deal Drabber. 
						Please login to the backend for onward processing. 
						<br>
						Regards
						<br>
						Nortify DG.
					</p>
			</div>
		`
	};
	return msg;
};

const mail = async (msgContent) => {
	msgContent.adminEmail = 'kelechioliver96@gmail.com';
	const clientMail = composeCustomerMail(msgContent);
	const adminEmail = composeAdminMail(msgContent);
	try {
		const clientRes = await sgMail.send(clientMail);
		const adminRes = await sgMail.send(adminEmail);
		return { error: null, result: { ...clientRes, ...adminRes } };
	} catch (error) {
		console.log(error);
		return { error: error.message, result: null };
	}
};

module.exports = mail;
