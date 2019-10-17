import React from 'react';
import { Checkbox } from 'antd';

const CardWithSelect = ({ content, isChecked, checked, id, children }) => {
	return (
		<div className="card-select-container">
			<div className="card-select">
				<div>
					{content.name === 'range' ? (
						<h3>
							{content.value[0]} <span style={{ color: 'green' }}>-</span> {content.value[1]}
						</h3>
					) : (
						<h3>{content.value}</h3>
					)}
					{children}
				</div>
				<div>
					<Checkbox
						checked={checked}
						onChange={() => isChecked(id, { [content.name]: { ...content, id } })}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardWithSelect;
