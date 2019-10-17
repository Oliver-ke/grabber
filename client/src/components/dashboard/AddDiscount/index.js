import React, { useState } from 'react';
import Modal from '../../common/Modal';
import AddDiscountForm from './AddDiscountForm';
import { Button } from 'antd';

const AddDiscountContainer = () => {
	const [ modalVisible, setModalVisible ] = useState(false);

	const showModal = () => {
		setModalVisible(true);
	};
	const modalClosed = () => {
		setModalVisible(false);
	};
	return (
		<div>
			<Button onClick={showModal} type="primary" shape="round" icon="plus" size="large">
				Add Discount Offer
			</Button>
			<Modal
				showModal={modalVisible}
				modalClosed={modalClosed}
				Component={AddDiscountForm}
				title="Add new Deal"
			/>
		</div>
	);
};

export default AddDiscountContainer;
