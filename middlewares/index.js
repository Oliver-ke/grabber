const validate = require('./validate');
const isTokenValid = require('./authenticate');
const checkQuery = require('./checkQuery');
module.exports = {
	validate,
	isTokenValid,
	checkQuery
};
