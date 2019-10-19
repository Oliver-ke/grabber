import React, { useEffect, useState } from 'react';
import { Table, Divider, Tag } from 'antd';
import CustomCard from '../common/Card';
import { getAllLockedOffers, deleteLockedOffer, setEditData } from '../../actions/lockedOffers';
import EditOfferContainer from './EditLockedOffer';
import { connect } from 'react-redux';

const OfferTable = ({ stateLockOffer, getAllLockedOffers, deleteLockedOffer, setEditData }) => {
	const [ showModal, setShowModal ] = useState(false);

	const handleEdit = (data) => {
		setEditData(data);
		setShowModal(true);
	};

	const onModalClose = () => {
		setShowModal(false);
	};
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
		},
		{
			title: 'Paid',
			dataIndex: 'paid',
			key: 'paid',
			render: (value) => {
				return <span>{value ? <Tag color="blue">Yes</Tag> : <Tag color="#351328">No</Tag>}</span>;
			}
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<a onClick={() => handleEdit(record)} href="#!">
						Edit Payment Status
					</a>
					<Divider type="vertical" />
					<a onClick={() => deleteLockedOffer(record.id)} href="#!" style={{ color: 'red' }}>
						Delete
					</a>
				</span>
			)
		}
	];

	useEffect(
		() => {
			getAllLockedOffers();
		},
		[ getAllLockedOffers ]
	);

	const { lockedOffers, loading } = stateLockOffer;
	let arrangedOffers = lockedOffers
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

	return (
		<div>
			<CustomCard>
				<EditOfferContainer showModal={showModal} modalClosed={onModalClose} />
				<Table loading={loading} bordered columns={columns} dataSource={arrangedOffers} />
			</CustomCard>
		</div>
	);
};

const mapStateToProps = (state) => ({
	stateLockOffer: state.lockedOffer
});

export default connect(mapStateToProps, { getAllLockedOffers, deleteLockedOffer, setEditData })(OfferTable);
