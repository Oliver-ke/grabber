const axios = require('axios');

// axios config
const config = {
	headers: {
		authorization: `Bearer ${process.env.PAY_KEY}`,
		'content-type': 'appication/json',
		'cache-control': 'no-cache'
	}
};

const initPayment = paymentDetails =>
	new Promise(async (resolve, reject) => {
		// Note amount must be in kobo *100;
		const { email, amount, phone } = paymentDetails;
		const uri = 'https://api.paystack.co/transaction/initialize';
		const payload = JSON.stringify({ email, amount, phone });
		try {
			const { data: { data } } = await axios.post(uri, payload, config);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});

const confirmPayment = reference =>
	new Promise(async (resolve, reject) => {
		const uri = `https://api.paystack.co/transaction/verify/${reference}`;
		try {
			const { data: { data } } = await axios.get(uri, config);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});

module.exports = {
	initPayment,
	confirmPayment
};
