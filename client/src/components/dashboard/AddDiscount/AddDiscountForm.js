import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addDiscount } from '../../../actions/discount';
import { getCategories } from '../../../actions/category';
import { Form, Input, Select, Button, Switch, Alert } from 'antd';
const { Option } = Select;

const { Group: InputGroup } = Input;

const AddDiscountForm = ({ addDiscount, getCategories, closeModal, cancel, discount, stateCategory }) => {
	const { loading } = discount;
	const { categories, loading: categoryLoading } = stateCategory;
	const [ formInputs, setFormInputs ] = useState({
		price: '',
		discount: '',
		implementationCost: '',
		implementationDiscount: '',
		maxRange: '',
		minRange: '',
		categoryId: '',
		fixed: false
	});
	const [ error, setError ] = useState('');

	useEffect(
		() => {
			getCategories();
		},
		[ getCategories ]
	);

	const handleInput = (e) => {
		const { value, name } = e.target;
		setFormInputs({
			...formInputs,
			[name]: value
		});
	};
	const formSubmit = (e) => {
		e.preventDefault();
		console.log(formInputs);
		const { price, discount, maxRange, minRange, categoryId } = formInputs;
		if (!price || !discount || !maxRange || !minRange || !categoryId) {
			return setError('Please fill all available fields');
		}
		if (parseInt(minRange) >= parseInt(maxRange)) {
			return setError('Min Range cannot be greater than Max Range');
		}
		addDiscount(formInputs);
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
			<Form.Item label="TS Offer">
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
			<Form.Item label="IAS Fee">
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
			<Form.Item label="Student Range">
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
						value={formInputs.maxRange}
						onChange={handleInput}
						name="maxRange"
						style={{ width: '40%' }}
						placeholder="Max"
					/>
				</InputGroup>
			</Form.Item>
			<Form.Item label="Nortify Plan">
				<Select
					onSelect={(e) => setFormInputs({ ...formInputs, categoryId: e })}
					style={{ width: '80%' }}
					placeholder="Select plan"
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
			<Form.Item label="Fixed">
				<Switch onChange={(e) => setFormInputs({ ...formInputs, fixed: e })} />
			</Form.Item>
			<hr />
			<div style={{ textAlign: 'right' }}>
				<Button type="primary" loading={loading} htmlType="submit">
					Add
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

export default connect(mapStateToProps, { addDiscount, getCategories })(AddDiscountForm);
