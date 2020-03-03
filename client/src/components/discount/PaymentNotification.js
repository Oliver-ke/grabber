import React, { useEffect, Fragment } from 'react';
import { Result, Spin, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { verifyMonifyPayment } from '../../actions/paymentActions';

// run payment verification to server
// show payment success or payment failure message

const PaymentNotification = ({ payment, verifyMonifyPayment }) => {
	const { paymentDetail: { transactionReference }, paymentLoading, confirmed } = payment;
	useEffect(() => {
		verifyMonifyPayment(transactionReference);
		return () => {
			message.success('Process Completed');
		};
	}, []);

	return (
		<Fragment>
			{confirmed === null && <Spin />}
			{confirmed === true && (
				<Result
					icon={<Icon type="check-circle" theme="twoTone" />}
					title="Great, Payment Was success, check your mail for further instructions"
				/>
			)}
			{confirmed === false && (
				<Result
					icon={<Icon type="close" />}
					title="Error Confirming Payment, Please Ensure payment was completed"
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	userDiscount: state.userDiscount,
	payment: state.payment
});
export default connect(mapStateToProps, { verifyMonifyPayment })(PaymentNotification);
