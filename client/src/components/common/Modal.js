import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
const CustomModal = ({ showModal, modalClosed, title, Component }) => {
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
				title={title}
				visible={modalVisible}
				destroyOnClose={true}
				onCancel={handleCancel}
				footer={null}
			>
				<Component closeModal={closeModal} cancel={handleCancel} />
			</Modal>
		</div>
	);
};

export default CustomModal;
