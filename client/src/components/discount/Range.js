import React, { useState, useEffect } from 'react';
import CardWithSelect from '../common/CardWithSelect';
import { connect } from 'react-redux';
import { setSelection } from '../../actions/userDiscount';

const Range = ({ setSelection, selection, discounts }) => {
	const [ checkedItem, setCheckedItem ] = useState('');

	const isChecked = (id, value) => {
		//fire store
		setCheckedItem(id);
		setSelection(value);
	};

	useEffect(
		() => {
			if (selection.range) {
				setCheckedItem(selection.range.id);
			}
		},
		[ selection.range ]
	);
	const { category } = selection;

	//const filteredDiscounts = getRanges();
	const filteredDiscounts = discounts.filter((discount) => discount.category === category.alias);

	return filteredDiscounts.map((item) => (
		<CardWithSelect
			isChecked={isChecked}
			id={item.id}
			key={item.id}
			checked={checkedItem === item.id ? true : false}
			content={{ name: 'range', value: [ item.minRange, item.maxRange ] }}
		/>
	));
};
const mapStateToProps = (state) => ({
	selection: state.userDiscount.usersSelection,
	discounts: state.discount.discounts
});

export default connect(mapStateToProps, { setSelection })(Range);
