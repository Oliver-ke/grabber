module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert('Categories', [
			{
				id: 44441,
				name: 'School Accounting',
				features: 'finance, payments, money',
				createdAt: '2019-06-07 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			},
			{
				id: 44442,
				name: 'Grade Coverage',
				features: 'Academics, student records',
				createdAt: '2019-06-05 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			}
		]),
	down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
