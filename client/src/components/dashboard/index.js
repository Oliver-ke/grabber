import React, { useState } from 'react';
import DiscountTable from './Table';
import Nav from '../common/Navbar';
import AddDiscount from './AddDiscount';
import CategoryContainer from './category';
import LockOfferTable from './LockedOfferTable';
import { Row, Col, Button, Icon } from 'antd';
const Dashboard = () => {
	const [ showLockOffer, setShowLockOffer ] = useState(false);
	const toggleShowLockOffer = () => {
		setShowLockOffer(!showLockOffer);
	};
	return (
		<Row>
			<Col span={24}>
				<Nav />
			</Col>
			<Col span={24}>
				<div className="dashboard-content">
					<div style={{ width: '100%', marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
						<AddDiscount />
						<CategoryContainer />
					</div>
					<Button onClick={toggleShowLockOffer}>
						{!showLockOffer ? (
							<span>
								<Icon type="up" /> Show Locked Offers
							</span>
						) : (
							<span>
								<Icon type="down" /> Hide Locked Offers
							</span>
						)}
					</Button>
					{showLockOffer && (
						<div className="table">
							<LockOfferTable />
						</div>
					)}
					<div className="table">
						<DiscountTable />
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Dashboard;
