module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert('Users', [
			{
				id: 11111,
				fullName: 'Donald John',
				email: 'donald@gmail.com',
				password: 'password',
				createdAt: '2019-06-08 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			}
		]),
	down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
