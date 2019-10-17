import React, { useState, useEffect } from 'react';
import CardWithSelect from '../common/CardWithSelect';
import { connect } from 'react-redux';
import { setSelection } from '../../actions/userDiscount';
import { Icon } from 'antd';

const Categories = ({ setSelection, selection }) => {
	const [ checkedItem, setCheckedItem ] = useState('');

	const isChecked = (id, value) => {
		//fire store
		setCheckedItem(id);
		setSelection(value);
	};
	useEffect(
		() => {
			if (selection.category) {
				setCheckedItem(selection.category.id);
			}
		},
		[ selection.category ]
	);
	return (
		<div className="item-container">
			<CardWithSelect
				isChecked={isChecked}
				id={1}
				checked={checkedItem === 1 ? true : false}
				content={{ name: 'category', value: 'Nortify Enterprise', alias: 'enterprise' }}
			>
				<p>
					<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> All Features
				</p>
			</CardWithSelect>
			<CardWithSelect
				isChecked={isChecked}
				checked={checkedItem === 2 ? true : false}
				id={2}
				content={{ name: 'category', value: 'Nortify Accounting', alias: 'schoolAccounting' }}
			>
				<p>
					<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Human Resource Mgt (HRM)
				</p>
			</CardWithSelect>
			<CardWithSelect
				isChecked={isChecked}
				checked={checkedItem === 3 ? true : false}
				id={3}
				content={{ name: 'category', value: 'Nortify Grade Converge', alias: 'gradeCoverage' }}
			>
				<p>
					<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Academic Records
				</p>
			</CardWithSelect>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selection: state.userDiscount.usersSelection
});

export default connect(mapStateToProps, { setSelection })(Categories);
