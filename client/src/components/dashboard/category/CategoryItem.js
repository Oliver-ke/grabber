import React from 'react';

const CategoryItem = ({ category, deleteHandler }) => {
	const { name, features, id } = category;
	return (
		<div className="category-item">
			<div>
				<p>{name}</p>
				<small>{features}</small>
			</div>
			<div>
				<a href="#!" onClick={() => deleteHandler(id)} style={{ color: 'red' }}>
					Delete
				</a>
			</div>
		</div>
	);
};

export default CategoryItem;
