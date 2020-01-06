import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Event from './components/Events';
import PageCategory from './pages/PageCategory';
import DetailEvent from './pages/DetailEvent';
import Register from './pages/Register';
import EventByTitle from './pages/EventByTitle';
import Login from './pages/Login';
import AddEvent from './pages/AddEvent';
import ProfileUser from './pages/ProfileUser';
import { getProfileUser } from './_actions/user';
import Payments from './pages/Payments';
import PaymentDetails from './pages/paymentDetails';
import MyTicket from './pages/MyTicket';
class App extends Component {
	componentDidMount() {
		this.props.userDetail1();
		console.log(this.props.userDetail1.data);
	}

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path='/my_ticket'>
							<MyTicket />
						</Route>
						<Route path='/payment/:id'>
							<PaymentDetails />
						</Route>
						<Route path='/payments'>
							<Payments />
						</Route>
						<Route path='/profile'>
							<ProfileUser />
						</Route>
						<Route path='/add_event'>
							<AddEvent />
						</Route>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/search/:title'>
							<EventByTitle />
						</Route>
						<Route path='/signup'>
							<Register />
						</Route>
						<Route path='/event/:id'>
							<DetailEvent />
						</Route>
						<Route path='/event'>
							<Event />
						</Route>
						<Route path='/category/:id/events'>
							<PageCategory />
						</Route>
						<Route path='/'>
							<Home />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profileUser1: state.profileUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userDetail1: () => {
			dispatch(getProfileUser());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
