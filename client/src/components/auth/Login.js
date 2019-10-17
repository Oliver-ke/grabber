import React, { useState, useEffect } from 'react';
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
//import { withRouter } from 'react-router-dom';

import { Form, Icon, Input, Button, Row, Col, Card, Alert } from 'antd';

const LoginForm = ({ auth, loginUser, history, errors: reduxError }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ stateErrs, setErrors ] = useState([]);

	useEffect(
		() => {
			if (auth.isAuthenticated) {
				history.push('/dashboard');
			}

			if (reduxError.errors) {
				const { errors } = reduxError;
				if (errors && typeof errors === 'object') {
					return setErrors(Object.values(errors));
				}
				return setErrors([ errors ]);
			}
		},
		[ auth, history, reduxError ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			return setErrors([ 'Please provide both email and password' ]);
		}
		let user = {
			email: email,
			password: password
		};
		return loginUser(user);
	};
	const itemLayout = {
		wrapperCol: {
			xs: { span: 23 }
		}
	};
	const submitLayout = {
		labelCol: {
			xs: { span: 6 }
		},
		wrapperCol: {
			xs: { span: 18 }
		}
	};

	return (
		<Row type="flex" style={{ height: '100vh' }} justify="center" align="middle">
			<Col xs={20} sm={18} xl={10}>
				<Card
					style={{
						background: '#fff',
						color: '#f3f7f7',
						borderRadius: '20px',
						boxShadow: 'rgba(115,143,147,0.3)0px 14px 28px 0px'
					}}
				>
					<div style={{ textAlign: 'center', marginBottom: '5rem' }}>
						<img style={{ height: '75px' }} src={logo} alt="logo" />
					</div>
					{stateErrs.length > 0 &&
						stateErrs.map((error, index) => (
							<div key={index} style={{ margin: '20px' }}>
								<Alert
									message={error}
									onClose={() => setErrors('')}
									closable={true}
									type="error"
									showIcon
								/>
							</div>
						))}
					<h3 style={{ color: '#bba' }}>Please Login to your Account</h3>
					<Form {...itemLayout} onSubmit={handleSubmit}>
						<Form.Item>
							<Input
								type="email"
								style={{ height: '50px' }}
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.6)' }} />}
								placeholder="Email"
								value={email}
								autoFocus={true}
								name="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Item>
						<Form.Item>
							<Input
								style={{ height: '50px' }}
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.6)' }} />}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="Password"
								value={password}
								name="password"
							/>
						</Form.Item>
						<Form.Item {...submitLayout}>
							<Button disabled={!email || !password} type="primary" htmlType="submit">
								Log in
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};

LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
