import React, { useEffect, useState, Fragment } from 'react';
import { Result, Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import {verifyMonifyPayment} from '../../actions/paymentActions';

// run payment verification to server
// show payment success or payment failure message

const PaymentNotification = ({payment}) => {
	const {reference} = payment.paymentDetail;
	useEffect(
		() => {
			verifyMonifyPayment(reference);
		},
		[payment]
	);
	return (
		<Fragment>
			<Result
				icon={<Icon type="check-circle" theme="twoTone" />}
				title="Great, Payment Was success, check your mail for further instructions"
			/>
			{/* <Spin /> */}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	userDiscount: state.userDiscount,
	payment: state.payment
});
export default connect(mapStateToProps, null)(PaymentNotification);
