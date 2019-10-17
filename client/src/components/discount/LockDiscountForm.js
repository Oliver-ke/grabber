import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUserDiscount } from '../../actions/userDiscount';
import { Form, Input, Button, Alert, Radio } from 'antd';

const LockDiscountForm = ({ saveUserDiscount, closeModal, cancel, discount }) => {
	const { loading, discountDetail, totalLockPrice } = discount;
	const [ formInputs, setFormInputs ] = useState({
		email: '',
		phone: '',
		school: '',
		paymentMethod: 'online'
	});

	const [ error, setError ] = useState('');
	const handleInput = (e) => {
		const { value, name } = e.target;
		setFormInputs({
			...formInputs,
			[name]: value
		});
	};
	const formSubmit = (e) => {
		e.preventDefault();
		const { email, phone, school } = formInputs;
		if (!email || !phone || !school) {
			return setError('Please fill all available fields');
		}
		const { id } = discountDetail;
		const detail = { ...formInputs, ...totalLockPrice, dealId: id };
		saveUserDiscount(detail);
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
			<Form.Item label="Your Email">
				<Input
					type="email"
					onChange={handleInput}
					value={formInputs.email}
					name="email"
					style={{ width: '80%' }}
					placeholder="email"
				/>
			</Form.Item>
			<Form.Item label="Phone">
				<Input
					type="number"
					onChange={handleInput}
					value={formInputs.phone}
					name="phone"
					style={{ width: '80%' }}
					placeholder="Phone number"
				/>
			</Form.Item>
			<Form.Item label="School Name">
				<Input
					type="text"
					onChange={handleInput}
					value={formInputs.school}
					name="school"
					style={{ width: '80%' }}
					placeholder="school name"
				/>
			</Form.Item>
			<Form.Item label="Payment">
				<Radio.Group name="paymentMethod" onChange={handleInput} value={formInputs.paymentMethod}>
					<Radio value="online">Pay Online</Radio>
					<Radio value="offline">Make tranfer/deposit</Radio>
				</Radio.Group>
			</Form.Item>
			<hr />
			<div style={{ textAlign: 'right' }}>
				<Button type="primary" loading={loading} htmlType="submit">
					Proceed
				</Button>
				<Button onClick={cancel} style={{ marginLeft: 8 }}>
					Cancel
				</Button>
			</div>
		</Form>
	);
};

const mapStateToProps = (state) => ({
	discount: state.userDiscount
});

export default connect(mapStateToProps, { saveUserDiscount })(LockDiscountForm);
