import React, { useState, useEffect } from 'react';
import CardWithSelect from '../common/CardWithSelect';
import { connect } from 'react-redux';
import { setSelection } from '../../actions/userDiscount';
import { getCategories } from '../../actions/category';
import { Icon } from 'antd';

const Categories = ({ setSelection, selection, stateCategory, getCategories }) => {
	const [ checkedItem, setCheckedItem ] = useState('');
	const { categories } = stateCategory;

	const isChecked = (id, value) => {
		setCheckedItem(id);
		setSelection(value);
	};
	// const makeFeatures = (features) => {
	// 	return features.split(',').map((value, index) => (
	// 		<p key={index}>
	// 			<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> {value}
	// 		</p>
	// 	));
	// };
	useEffect(
		() => {
			if (selection.category) {
				setCheckedItem(selection.category.id);
			}
			getCategories();
		},
		[ getCategories, selection.category ]
	);
	return (
		<div className="item-container">
			{categories.map((category) => (
				<CardWithSelect
					key={category.id}
					isChecked={isChecked}
					id={category.id}
					checked={checkedItem === category.id ? true : false}
					content={{ name: 'category', value: `${category.name}` }}
				>
					<p>
						<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> {category.features}
					</p>
				</CardWithSelect>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	selection: state.userDiscount.usersSelection,
	stateCategory: state.category
});

export default connect(mapStateToProps, { setSelection, getCategories })(Categories);
