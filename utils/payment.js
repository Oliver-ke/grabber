const axios = require('axios');
/**
 * Get access token using the following procedure
 * base64Encode(apiKey + ":" + secret)
 */
const getAccessToken = async () => {
	const url = 'https://sandbox.monnify.com/api/v1/auth/login';
	const key = `${process.env.MONIFY_API_KEY}:${process.env.MONIFY_SECRET_KEY}`;
	const keyEncode = Buffer.from(key).toString('base64');
	const loginConfig = {
		headers: {
			Authorization: `Basic ${keyEncode}`
		}
	};
	try {
		const res = await axios.post(url, {}, loginConfig);
		return res.data.responseBody.accessToken;
	} catch (error) {
		return 'Error';
	}
};

// monify payment verification
const verifyMonifyPayment = async (paymentRef) => {
	const accessToken = await getAccessToken();
	const monifyConfig = {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	};
	try {
		const endpoint = `https://sandbox.monnify.com/api/v2/transactions/${paymentRef}`;
		const res = await axios.get(endpoint, monifyConfig);
		return res.data;
	} catch (error) {
		return 'Error';
	}
};

module.exports = {
	getAccessToken,
	verifyMonifyPayment
};
