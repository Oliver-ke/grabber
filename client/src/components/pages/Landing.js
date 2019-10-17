import React from 'react';
import { Row, Col } from 'antd';
import NavBar from '../common/Navbar';
import Hero from '../common/Hero';
import DiscountContainer from '../discount/DiscountContainer';
const Landing = () => {
	return (
		<Row>
			<Col sm={24}>
				<NavBar />
			</Col>
			<Col md={12} sm={24}>
				<div className="landing-maincontainer">
					<div className="overlay">
						<Hero />
					</div>
				</div>
			</Col>
			<Col md={12} sm={24}>
				<DiscountContainer />
			</Col>
		</Row>
	);
};

export default Landing;
