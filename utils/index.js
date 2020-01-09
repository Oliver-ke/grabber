const { getRandomNum, generateCode } = require('./generator');
const generateToken = require('./generateToken');
const sendMail = require('./sendMail');
const payment = require('./payment');
module.exports = {
	generateToken,
	sendMail,
	payment,
	getRandomNum,
	generateCode,
};
