import React from 'react';

const priceItem = ({ tag, amount }) => {
	return (
		<div className="discount-item">
			<p className="discount-item-text">
				{tag} <span style={{ color: 'green' }}>{amount}</span>
			</p>
		</div>
	);
};

export default priceItem;
