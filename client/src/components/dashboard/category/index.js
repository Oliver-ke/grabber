import React, { useState } from 'react';
import Modal from '../../common/Modal';
import CategoryContainer from './CategoryContainer';
import { getDiscount } from '../../../actions/discount';
import { connect } from 'react-redux';
import { Button } from 'antd';

const Index = ({ getDiscount }) => {
	const [ modalVisible, setModalVisible ] = useState(false);

	const showModal = () => {
		setModalVisible(true);
	};

	const modalClosed = () => {
		getDiscount();
		setModalVisible(false);
	};

	return (
		<div>
			<Button onClick={showModal} shape="round" icon="gold" size="large">
				Category
			</Button>
			<Modal
				showModal={modalVisible}
				modalClosed={modalClosed}
				Component={CategoryContainer}
				title="Add|Delete Category"
			/>
		</div>
	);
};

export default connect(null, { getDiscount })(Index);
