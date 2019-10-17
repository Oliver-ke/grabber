import React, { useState, useEffect, Fragment } from 'react';
import { Button, Steps, message } from 'antd';
import CustomCard from '../common/Card';
import Category from './Category';
import Range from './Range';
import Discount from './Discount';
import LockDiscountModal from './LockDiscountModal';
import PaymentNotification from './PaymentNotification';
import { getDiscount } from '../../actions/discount';
import { getUserDiscount, setSelection } from '../../actions/userDiscount';
import { connect } from 'react-redux';

const { Step } = Steps;

const steps = [
	{
		title: 'Select package',
		content: <Category />,
		parentTitle: 'Select a Suitable Package'
	},
	{
		title: 'Choose Range',
		content: <Range />,
		parentTitle: 'Select Your Range of Students'
	},
	{
		title: 'Discount',
		content: <Discount />,
		parentTitle: 'Your Discount'
	}
];

const DiscountContainer = ({ userDiscount, getDiscount, getUserDiscount, setSelection }) => {
	const [ current, setCurrent ] = useState(0);
	const [ showLockModal, setShowLockModal ] = useState(false);
	const { usersSelection, savedDiscount } = userDiscount;

	useEffect(
		() => {
			getDiscount();
		},
		[ getDiscount ]
	);
	const next = () => {
		const newCurrent = current + 1;
		if (steps[newCurrent] !== undefined) {
			// if the new current is range the lets get the users discount
			if (newCurrent === 2) {
				// fire get discount method to populate the store with the discount
				getUserDiscount(usersSelection);
			}
			return setCurrent(newCurrent);
		}
	};

	const prev = () => {
		const newCurrent = current - 1;
		if (steps[newCurrent] !== undefined) {
			return setCurrent(current - 1);
		}
	};

	const lockOfferBtnClick = () => {
		// trigger show lock modal
		setShowLockModal(true);
		message.success('Processing complete!');
	};

	const onModalClose = () => {
		setShowLockModal(false);
	};

	const isBtnDisable = () => {
		let disable = false;
		if (current === 0) {
			disable = !usersSelection.category ? true : false;
			return disable;
		} else if (current === 1) {
			disable = !usersSelection.range ? true : false;
			return disable;
		}
		return disable;
	};
	return (
		<div className="r-side-card">
			<LockDiscountModal showModal={showLockModal} modalClosed={onModalClose} />
			<div>
				<h2 className="card-header-text">Nortify Discounts</h2>
			</div>
			{!savedDiscount.saved ? (
				<Fragment>
					{current === 2 ? null : (
						<Steps className="step" current={current}>
							{steps.map((item) => <Step key={item.title} title={item.title} />)}
						</Steps>
					)}
					<CustomCard title={steps[current].parentTitle}>{steps[current].content}</CustomCard>
					<div className="steps-action-btn">
						{current > 0 && (
							<Button size="large" block style={{ marginRight: 8 }} onClick={prev}>
								Previous
							</Button>
						)}
						{current < steps.length - 1 && (
							<Button disabled={isBtnDisable()} size="large" block type="primary" onClick={() => next()}>
								Next
							</Button>
						)}
						{current === steps.length - 1 && (
							<Button size="large" block type="primary" onClick={lockOfferBtnClick}>
								Lock Offer
							</Button>
						)}
					</div>
				</Fragment>
			) : (
				<PaymentNotification />
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	userDiscount: state.userDiscount
});
export default connect(mapStateToProps, { getDiscount, getUserDiscount, setSelection })(DiscountContainer);
