module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert('LockedDeals', [
			{
				id: 33331,
				email: 'schmg@gmail.com',
				phone: '08124358890',
				school: 'Holy cross international',
				totalPrice: 340000,
				lockOfferPrice: 32000,
				paymentMethod: 'online',
				dealId: '22221',
				createdAt: '2019-06-08 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			},
			{
				id: 33332,
				email: 'kalig@gmail.com',
				phone: '08101967324',
				school: 'Oscars school of science',
				totalPrice: 560000,
				lockOfferPrice: 3000,
				paymentMethod: 'online',
				dealId: '22222',
				createdAt: '2019-06-08 009:10:38.181+01',
				updatedAt: '2019-06-08 009:10:38.181+01'
			}
		]),
	down: queryInterface => queryInterface.bulkDelete('LockedDeals', null, {})
};
