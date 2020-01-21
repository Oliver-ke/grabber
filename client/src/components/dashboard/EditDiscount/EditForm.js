import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateDiscount } from '../../../actions/discount';
import { getCategories } from '../../../actions/category';
import { Form, Input, Select, Button, Switch, Alert } from 'antd';
const { Option } = Select;

const { Group: InputGroup } = Input;

const EditForm = ({ updateDiscount, getCategories, closeModal, cancel, discount, stateCategory }) => {
	const { loading, editData } = discount;
	const { loading: categoryLoading, categories } = stateCategory;

	useEffect(
		() => {
			getCategories();
		},
		[getCategories]
	);

	const {
		price,
		discount: editDiscount,
		maxRange,
		minRange,
		categoryId,
		discountFixed,
		implementationFixed,
		id,
		implementationCost,
		implementationDiscount,
		dealCategory
	} = editData;
	const [formInputs, setFormInputs] = useState({
		price,
		discount: editDiscount,
		implementationDiscount,
		implementationCost,
		maxRange,
		minRange,
		categoryId,
		discountFixed,
		implementationFixed,
		id
	});
	const [error, setError] = useState('');
	const handleInput = (e) => {
		const { value, name } = e.target;
		setFormInputs({
			...formInputs,
			[name]: value
		});
	};
	const formSubmit = (e) => {
		e.preventDefault();
		const { price, discount, maxRange, minRange, categoryId } = formInputs;
		if (!price || !discount || !maxRange || !minRange || !categoryId) {
			return setError('Please fill all available fields');
		}
		const updatedCategory = categories.filter((category) => category.id === categoryId)[0];
		updateDiscount({ formInputs, updatedCategory });
		if (!loading) {
			closeModal();
		}
	};
	const formItemLayout = {
		labelCol: {
			xs: { span: 8 },
			sm: { span: 8 }
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 }
		}
	};

	return (
		<Form {...formItemLayout} onSubmit={formSubmit}>
			{error ? <Alert message={error} type="error" closable afterClose={() => setError('')} /> : null}
			<Form.Item label="Price Offer">
				<InputGroup>
					<Input
						onChange={handleInput}
						type="number"
						value={formInputs.price}
						name="price"
						style={{ width: '40%' }}
						placeholder="e.g 4569000"
					/>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.discount}
						name="discount"
						style={{ width: '40%' }}
						placeholder="% discount"
					/>
				</InputGroup>
			</Form.Item>
			<Form.Item label="Implementation">
				<InputGroup>
					<Input
						onChange={handleInput}
						type="number"
						value={formInputs.implementationCost}
						name="implementationCost"
						style={{ width: '40%' }}
						placeholder="amount"
					/>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.implementationDiscount}
						name="implementationDiscount"
						style={{ width: '40%' }}
						placeholder="% discount"
					/>
				</InputGroup>
			</Form.Item>
			<Form.Item label="Range">
				<InputGroup>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.minRange}
						name="minRange"
						style={{ width: '40%' }}
						placeholder="Min"
					/>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.maxRange}
						name="maxRange"
						style={{ width: '40%' }}
						placeholder="Max"
					/>
				</InputGroup>
			</Form.Item>
			<Form.Item label="Category">
				<Select
					onSelect={(e) => setFormInputs({ ...formInputs, categoryId: e })}
					style={{ width: '80%' }}
					value={formInputs.categoryId}
					placeholder="Select category"
				>
					{categoryLoading ? (
						<Option value="something">Loading..</Option>
					) : (
							categories.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.name}
								</Option>
							))
						)}
				</Select>
			</Form.Item>
			<Form.Item label="Fixed Discount">
				<Switch checked={formInputs.discountFixed} onChange={(e) => setFormInputs({ ...formInputs, discountFixed: e })} />
			</Form.Item>
			<Form.Item label="Fixed Implementation">
				<Switch checked={formInputs.implementationFixed} onChange={(e) => setFormInputs({ ...formInputs, implementationFixed: e })} />
			</Form.Item>
			<hr />
			<div style={{ textAlign: 'right' }}>
				<Button type="primary" loading={loading} htmlType="submit">
					Update
				</Button>
				<Button onClick={cancel} style={{ marginLeft: 8 }}>
					Cancel
				</Button>
			</div>
		</Form>
	);
};

const mapStateToProps = (state) => ({
	discount: state.discount,
	stateCategory: state.category
});

export default connect(mapStateToProps, { updateDiscount, getCategories })(EditForm);
