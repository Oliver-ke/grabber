import React, { useEffect, useState, Fragment } from 'react';
import { Result, Spin, Icon } from 'antd';
import { connect } from 'react-redux';

const PaymentNotification = ({ userDiscount }) => {
	const { savedDiscount } = userDiscount;
	const [ payMenthod, setPaymethod ] = useState('');
	if (payMenthod === 'online') {
		window.location.href = savedDiscount.payUrl;
	}
	useEffect(
		() => {
			setPaymethod(savedDiscount.paymentMethod);
			console.log(savedDiscount.paymentMethod);
		},
		[ savedDiscount.paymentMethod ]
	);
	return (
		<Fragment>
			{payMenthod === 'offline' ? (
				<Result
					icon={<Icon type="smile" theme="twoTone" />}
					title="Great, we just sent you an email, check your mail for payment instruction"
				/>
			) : (
				<Spin />
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	userDiscount: state.userDiscount
});
export default connect(mapStateToProps, null)(PaymentNotification);
