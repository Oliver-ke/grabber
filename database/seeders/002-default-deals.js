module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert('Deals', [
			{
				id: 11111,
				price: 1234.8,
				minRange: 1,
				maxRange: 10,
				discount: 10,
				disabled: false,
				createdBy: 11111,
				category: 'enterprise',
				createdAt: '2019-06-08 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			},
			{
				id: 22222,
				price: 1234.8,
				minRange: 1,
				maxRange: 10,
				discount: 10,
				createdBy: 11111,
				category: 'schoolAccounting',
				disabled: false,
				fixed: true,
				createdAt: '2019-06-08 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			}
		]),
	down: queryInterface => queryInterface.bulkDelete('Deals', null, {})
};
