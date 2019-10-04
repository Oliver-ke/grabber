module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert('Deals', [
			{
				id: 22221,
				price: 1234.8,
				minRange: 1,
				maxRange: 10,
				discount: 10,
				implementationCost: 3000,
				implementationDiscount: 30,
				createdBy: 11111,
				fixed: false,
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
				implementationCost: 4000,
				implementationDiscount: 20,
				createdBy: 11111,
				category: 'schoolAccounting',
				fixed: true,
				createdAt: '2019-06-08 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			}
		]),
	down: queryInterface => queryInterface.bulkDelete('Deals', null, {})
};
