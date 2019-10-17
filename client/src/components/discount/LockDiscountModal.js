import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import LockDiscountForm from './LockDiscountForm';
const EditDisCountModal = ({ showModal, modalClosed }) => {
	const [ modalVisible, setModalVisible ] = useState(showModal);
	useEffect(
		() => {
			setModalVisible(showModal);
		},
		[ showModal ]
	);
	const closeModal = () => {
		setModalVisible(false);
		modalClosed();
	};
	const handleCancel = () => {
		setModalVisible(false);
		modalClosed();
	};
	return (
		<div>
			<Modal
				centered={true}
				title="Lock Discount Offer"
				visible={modalVisible}
				destroyOnClose={true}
				onCancel={handleCancel}
				footer={null}
			>
				<LockDiscountForm closeModal={closeModal} cancel={handleCancel} />
			</Modal>
		</div>
	);
};

export default EditDisCountModal;
