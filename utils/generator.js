const getRandomNum = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateCode = () => {
	const dateArray = new Date().toLocaleDateString().split('/');
	// removing the preceeding two digits on year
	dateArray[2] = dateArray[2].slice(2);
	const code = `${getRandomNum(10, 90)}${dateArray.join('')}`;
	return code;
};

module.exports = {
	getRandomNum,
	generateCode,
};
