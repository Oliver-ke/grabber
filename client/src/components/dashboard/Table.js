import React, { useEffect, useState } from 'react';
import { Table, Divider, Tag } from 'antd';
import CustomCard from '../common/Card';
import EditModal from './EditDiscount';
import { getDiscount, deleteDiscount, editData } from '../../actions/discount';
import { connect } from 'react-redux';

const DiscountTable = ({ discount, getDiscount, deleteDiscount, editData }) => {
	const [ showModal, setShowModal ] = useState(false);

	const handleEdit = (data) => {
		editData(data);
		setShowModal(true);
	};
	const onModalClose = () => {
		setShowModal(false);
	};
	const columns = [
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (text) => <a href="#!">₦{text}</a>
		},
		{
			title: 'Discount',
			dataIndex: 'discount',
			key: 'discount',
			render: (value) => <span>{`${value}%`}</span>
		},
		{
			title: 'Imp Cost',
			dataIndex: 'implementationCost',
			key: 'implementationCost',
			render: (text) => <a href="#!">₦{text}</a>
		},
		{
			title: 'Imp Discount',
			dataIndex: 'implementationDiscount',
			key: 'implementationDiscount',
			render: (value) => <span>{`${value}%`}</span>
		},
		{
			title: 'Min Range',
			dataIndex: 'minRange',
			key: 'minRange'
		},
		{
			title: 'Max Range',
			dataIndex: 'maxRange',
			key: 'maxRange'
		},
		{
			title: 'Fixed',
			dataIndex: 'fixed',
			key: 'fixed',
			render: (value) => {
				let color = 'blue';
				if (value === true) {
					color = 'red';
				}
				value = value ? 'Yes' : 'No';
				return <span style={{ color: `${color}` }}>{value}</span>;
			}
		},
		{
			title: 'Category',
			key: 'dealCategory',
			dataIndex: 'dealCategory',
			render: (cat) => {
				let color = 'yellow';
				if (cat === 'school Accounting') {
					color = 'volcano';
				}
				if (cat === 'grade Coverage') {
					color = 'geekblue';
				}
				if (cat === 'enterprise') {
					color = 'green';
				}
				const name = cat ? cat.name : 'Deleted';
				return (
					<span>
						<Tag color={color}>{name.toUpperCase()}</Tag>
					</span>
				);
			}
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<a onClick={() => handleEdit(record)} href="#!">
						Edit
					</a>
					<Divider type="vertical" />
					<a onClick={() => deleteDiscount(record.id)} href="#!" style={{ color: 'red' }}>
						Delete
					</a>
				</span>
			)
		}
	];
	useEffect(
		() => {
			getDiscount();
		},
		[ getDiscount ]
	);
	let { discounts, loading } = discount;
	if (discounts) {
		// add key and sort
		discounts = discounts
			.map((deal) => {
				const { id, ...rest } = deal;
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
				<EditModal showModal={showModal} modalClosed={onModalClose} />
				<Table loading={loading} bordered columns={columns} dataSource={discounts} />
			</CustomCard>
		</div>
	);
};

const mapStateToProps = (state) => ({
	discount: state.discount
});

export default connect(mapStateToProps, { getDiscount, deleteDiscount, editData })(DiscountTable);
