import React, { useEffect } from 'react';
import { Table, Divider, Tag } from 'antd';
import CustomCard from '../common/Card';
import { getAllLockedOffers } from '../../actions/userDiscount';
import { connect } from 'react-redux';

const OfferTable = ({ userDiscount, getAllLockedOffers }) => {
	const columns = [
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <a href="#!">{text}</a>
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			render: (value) => <span>{`${value}`}</span>
		},
		{
			title: 'School Name',
			dataIndex: 'school',
			key: 'school',
			render: (text) => <a href="#!">{text}</a>
		},
		{
			title: 'Total Price',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (value) => <span>{`₦${value}`}</span>
		},
		{
			title: 'Locked Price',
			dataIndex: 'lockOfferPrice',
			key: 'lockOfferPrice',
			render: (value) => <span>{`₦${value}`}</span>
		},
		{
			title: 'Payment Method',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			render: (value) => {
				let color;
				if (value === 'online') {
					color = 'brown';
				}
				if (value === 'offline') {
					color = 'geekblue';
				}
				return (
					<span>
						<Tag color={color}>{value.toUpperCase()}</Tag>
					</span>
				);
			}
		}
	];

	// consider implementing view discount detail with a modal that show the discount detail of the users offer

	useEffect(
		() => {
			getAllLockedOffers();
		},
		[ getAllLockedOffers ]
	);
	const { lockedOffers, loading } = userDiscount;
	let { lockDeals } = lockedOffers;
	if (lockDeals) {
		// add key and sort
		lockDeals = lockDeals
			.map((offer) => {
				const { id, ...rest } = offer;
				return {
					...rest,
					key: id,
					id
				};
			})
			.sort((a, b) => {
				return new Date(b.createdAt) - new Date(a.createdAt);
			});
	}
	return (
		<div>
			<CustomCard>
				<Table loading={loading} bordered columns={columns} dataSource={lockDeals} />
			</CustomCard>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userDiscount: state.userDiscount
});

export default connect(mapStateToProps, { getAllLockedOffers })(OfferTable);
