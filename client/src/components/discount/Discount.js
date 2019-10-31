import React, { useState, useEffect, Fragment } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { setTotalLockPrice } from '../../actions/userDiscount';
import PriceItem from '../common/PriceItem';

const Discount = ({ discount, setTotalLockPrice }) => {
	const [ packageDiscount, setPackageDiscount ] = useState({});
	const [ impDiscount, setImpDiscount ] = useState({});
	const [ totalLockValue, setTotalLockValue ] = useState({});
	const { loading, discountDetail } = discount;
	const { discount: userDiscount, price, implementationCost, implementationDiscount } = discountDetail;

	const calculateDiscount = (actualAmount, discountPercent) => {
		const discountPrice = parseInt(discountPercent / 100 * actualAmount);
		return {
			actualAmount,
			discountPercent,
			discountPrice,
			paymentPrice: actualAmount - discountPrice
		};
	};

	const totalLockPrice = (totalImp, totalPackage) => {
		const totalPrice = Math.floor(parseInt(totalImp) + parseInt(totalPackage));
		const lockOfferPrice = Math.floor(30 / 100 * totalPrice);
		return {
			totalPrice,
			lockOfferPrice
		};
	};

	useEffect(
		() => {
			const packageResult = calculateDiscount(price, userDiscount);
			const impResult = calculateDiscount(implementationCost, implementationDiscount);
			setPackageDiscount(packageResult);
			setImpDiscount(impResult);
			const lockTotalResult = totalLockPrice(impResult.paymentPrice, packageResult.paymentPrice);

			// this is setting value for the local component state
			setTotalLockValue(lockTotalResult);
			// this is setting value for the general state
			setTotalLockPrice(lockTotalResult);
			return () => {
				setPackageDiscount({});
			};
		},
		// eslint-disable-next-line
		[ discount.discountDetail ]
	);

	return (
		<Fragment>
			{loading ? (
				<Spin className="spinner" />
			) : (
				<Fragment>
					<h4>Termly Subscription</h4>
					<PriceItem stricked={true} tag="Official Price:" amount={`₦${packageDiscount.actualAmount}`} />
					<PriceItem tag="Discounted Price:" amount={`₦${packageDiscount.paymentPrice}`} />
					<PriceItem tag="Amount Saved:" amount={`₦${packageDiscount.discountPrice}`} />
					<hr />
					<h4>Implementation Assistance (setup, training, customization)</h4>
					<PriceItem stricked={true} tag="Official Setup Price:" amount={`₦${impDiscount.actualAmount}`} />
					<PriceItem tag="Discounted Setup Price:" amount={`₦${impDiscount.paymentPrice}`} />
					<PriceItem tag="Setup Amount Saved:" amount={`₦${impDiscount.discountPrice}`} />
					<hr />
					<h4>Total Amount = Termly Subscription + Implementation Assistance</h4>
					<PriceItem tag="Total Amount:" amount={`₦${totalLockValue.totalPrice}`} />
					<PriceItem tag="Secure Discount with:" amount={`₦${totalLockValue.lockOfferPrice}`} />
					<h5>TC: Offer last for 45 days</h5>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	discount: state.userDiscount
});
export default connect(mapStateToProps, { setTotalLockPrice })(Discount);
