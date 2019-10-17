import React, { useEffect, useState } from 'react';
import { Row, Col, Result, Spin } from 'antd';
import NavBar from '../common/Navbar';
import { connect } from 'react-redux';
import { confirmPayment } from '../../actions/userDiscount';

const ConfirmPayment = ({ userDiscount, confirmPayment, location }) => {
	const [ paymentStatus, setPaymentStatus ] = useState('');
	const { confirmPayment: confirm } = userDiscount;
	const params = new URLSearchParams(location.search);
	const ref = params.get('reference');
	useEffect(
		() => {
			confirmPayment(ref);
			setPaymentStatus(confirm.status);
		},
		// eslint-disable-next-line
		[ confirmPayment, confirm.status ]
	);
	return (
		<Row>
			<Col sm={24}>
				<NavBar />
			</Col>
			<Col md={24} sm={24}>
				{paymentStatus === 200 ? (
					<Result
						status="success"
						title="Successfully Locked the Offer"
						subTitle={`here is a payment reerence: ${ref}  `}
					/>
				) : paymentStatus === 400 ? (
					<Result
						status="error"
						title="Cannot Confirm Payment"
						subTitle="Please ensure payment was made with valid details"
					/>
				) : (
					<div className="spinner">
						<Spin />
					</div>
				)}
			</Col>
		</Row>
	);
};

const mapStateToProps = (state) => ({
	userDiscount: state.userDiscount
});

export default connect(mapStateToProps, { confirmPayment })(ConfirmPayment);
