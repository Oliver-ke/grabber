import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';
import { getCategories, addCategory, deleteCategory } from '../../../actions/category';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';

const CategoryContainer = ({ stateCategory, getCategories, deleteCategory, addCategory }) => {
	const { loading, categories } = stateCategory;
	const [ formInput, setFormInput ] = useState({
		name: '',
		features: ''
	});
	const deleteHandler = (id) => {
		deleteCategory(id);
	};

	const formSubmit = (e) => {
		e.preventDefault();
		const { name, features } = formInput;
		let payload = { name, features };
		if (!name) {
			// do something
			return;
		}
		if (!features) {
			payload = { name };
		}
		addCategory(payload);
		setFormInput({ name: '', features: '' });
	};

	const handleInput = (e) => {
		const { value, name } = e.target;
		setFormInput({
			...formInput,
			[name]: value
		});
	};
	useEffect(
		() => {
			getCategories();
		},
		[ getCategories ]
	);

	const formItemLayout = {
		labelCol: {
			xs: { span: 4 },
			sm: { span: 4 }
		},
		wrapperCol: {
			xs: { span: 20 },
			sm: { span: 20 }
		}
	};

	return (
		// forms
		<div>
			<Form {...formItemLayout} onSubmit={formSubmit}>
				<Form.Item label="Name">
					<Input
						name="name"
						onChange={handleInput}
						value={formInput.name}
						style={{ width: '100%' }}
						placeholder="Add a name"
					/>
				</Form.Item>
				<Form.Item label="Features">
					<Input
						name="features"
						onChange={handleInput}
						value={formInput.features}
						style={{ width: '100%' }}
						placeholder="e.g accademic records, finance"
					/>
					<div style={{ textAlign: 'right' }}>
						<Button type="primary" loading={loading} htmlType="submit">
							Add To Categories
						</Button>
					</div>
				</Form.Item>
			</Form>
			<hr />
			<div>
				{categories.map((category) => (
					<CategoryItem key={category.id} category={category} deleteHandler={deleteCategory} />
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	stateCategory: state.category
});

export default connect(mapStateToProps, { getCategories, addCategory, deleteCategory })(CategoryContainer);
