import React from 'react';
import { Card } from 'antd';

const CustomCard = (props) => {
	return (
		<Card title={props.title || null} className="category-card">
			{props.children}
		</Card>
	);
};

export default CustomCard;
