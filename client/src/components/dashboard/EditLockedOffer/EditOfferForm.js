import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateLockedOffer } from '../../../actions/lockedOffers';

import { Form, Input, Button, Switch, Alert } from 'antd';

//const { Group: InputGroup } = Input;

const EditForm = ({ updateLockedOffer, closeModal, cancel, lockedOffer }) => {
	const { loading, editData } = lockedOffer;
	const { paid, id } = editData;
	const [ formInputs, setFormInputs ] = useState({ paid });
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
		// const { paid } = formInputs;
		// if (!paid) {
		// 	return setError('Please fill all available fields');
		// }
		updateLockedOffer({ formInputs, id });
		if (!loading) {
			closeModal();
		}
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 12 },
			sm: { span: 12 }
		},
		wrapperCol: {
			xs: { span: 12 },
			sm: { span: 12 }
		}
	};

	return (
		<Form {...formItemLayout} onSubmit={formSubmit}>
			{error ? <Alert message={error} type="error" closable afterClose={() => setError('')} /> : null}
			<Form.Item label="Change Payment Status">
				<Switch checked={formInputs.paid} onChange={(e) => setFormInputs({ ...formInputs, paid: e })} />
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
	lockedOffer: state.lockedOffer
});

export default connect(mapStateToProps, { updateLockedOffer })(EditForm);
