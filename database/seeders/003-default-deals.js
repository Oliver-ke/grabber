module.exports = {
	up: (queryInterface) =>
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
				code: '112019',
				expiryDate: '2019-11-08 009:10:38.181+01',
				categoryId: 44442,
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
				categoryId: 44441,
				fixed: true,
				code: '102019',
				expiryDate: '2019-10-08 009:10:38.181+01',
				createdAt: '2019-06-08 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			}
		]),
	down: (queryInterface) => queryInterface.bulkDelete('Deals', null, {})
};
