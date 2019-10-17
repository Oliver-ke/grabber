import React from 'react';
import { Col } from 'antd';

const Hero = () => {
	return (
		<Col md={24}>
			<div className="caption">
				<div>
					<h1 className="hero-text">
						Grab your <br /> Discount Now!
					</h1>
					<p className="lead">and automate your school growth</p>
					{/* <Button type="primary">Get Your Deal</Button> */}
				</div>
			</div>
		</Col>
	);
};

export default Hero;
