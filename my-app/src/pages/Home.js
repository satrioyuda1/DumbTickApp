import React, { Component } from 'react';
import Header from '../components/Header';
import Category from '../components/Categories';
import Event from '../components/Events';
import EventsToday from '../components/EventsToday';
import Footer from '../components/Footer';
import EventUpcoming from '../components/EventUpcoming';
import Search from '../components/search';
export default class Home extends Component {
	render() {
		return (
			<div style={{ backgroundColor: '#fbe9e7', height: '200%' }}>
				<Header />
				<div style={{ width: '75%', margin: 'auto', backgroundColor: '#fbe9e7' }}>
					<Search />
					<Category />
					<Event />
					<EventsToday />
					<EventUpcoming />
				</div>
				<Footer />
			</div>
		);
	}
}
