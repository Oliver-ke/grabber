import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Landing from './components/pages/Landing';
import Login from './components/auth/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard';
import ConfirmPayment from './components/pages/ConfirmPayment';
import './App.css';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Route exact path="/" component={Landing} />
				<Route exact path="/admin" component={Login} />
				<Switch>
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
				</Switch>
				<Route exact path="/payment" component={ConfirmPayment} />
			</Router>
		</Provider>
	);
}

export default App;
