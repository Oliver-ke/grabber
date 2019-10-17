import React from 'react';
import { Col, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';
import logo from '../../assets/logo.png';

const Navbar = ({ logoutUser, auth, location }) => {
	const handleLogout = () => {
		logoutUser();
	};
	console.log(location);
	return (
		<Col sm={24} md={auth.isAuthenticated ? 24 : 12}>
			<div className="nav">
				<div className="logo">
					<img src={logo} alt="logo" />
				</div>
				{auth.isAuthenticated && (
					<div className="logout-btn" style={{ textAlign: 'right' }}>
						<Button onClick={handleLogout}>
							<Icon type="close-circle" theme="twoTone" />
							Logout
						</Button>
					</div>
				)}
			</div>
		</Col>
	);
};

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
