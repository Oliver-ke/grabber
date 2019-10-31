import React from 'react';

const priceItem = ({ tag, amount, stricked }) => {
	const formatPrice = (price) => {
		const regex = /\B(?=(\d{3})+(?!\d))/g;
		return price.toString().replace(regex, ',');
	};
	return (
		<div className="discount-item">
			<p className="discount-item-text">
				{tag}{' '}
				<span className={stricked ? 'cross' : ''} style={{ color: '#28324B', fontWeight: 'bolder' }}>
					{formatPrice(amount)}
				</span>
			</p>
		</div>
	);
};

export default priceItem;

// note: remember to work on stricked item
