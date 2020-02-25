import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import {handlePayment} from '../../actions/paymentActions'

import LockDiscountForm from './LockDiscountForm';
const EditDisCountModal = ({ showModal, modalClosed, payment, history }) => {
	const [ modalVisible, setModalVisible ] = useState(showModal);
	useEffect(
		() => {
			setModalVisible(showModal);
		},
		[ showModal, payment ]
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

const mapStateToProps = state => ({
	payment: state.payment
})
export default connect(mapStateToProps, { handlePayment })(withRouter(EditDisCountModal));

