import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CardMedia, Container } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { eventbytitle } from '../_actions/events';

class EventByTitle extends Component {
	componentDidMount() {
		this.props.eventbytitle(this.props.title);
	}

	render() {
		const { data, isLoading, error } = this.props.eventbytitle1;

		// const name = this.props.eventCategory;

		if (isLoading) {
			return <div>Mohon Tunggu</div>;
		}

		if (error) {
			return (
				<div>
					<h1>eror</h1>
				</div>
			);
		}
		if (data.success === false) {
			return (
				<div style={{ backgroundColor: '#fbe9e7', height: '100%' }}>
					<Header />
					<Container style={{ marginTop: '50px' }}>
						<div
							style={{
								backgroundColor: '#b71c1c',
								padding: '10px',
								color: '#fff',
								textAlign: 'center'
							}}>
							<Typography variant='h5'>{data.message}</Typography>
						</div>
					</Container>
					<Footer />
				</div>
			);
		} else {
			return (
				<div style={{ backgroundColor: '#fbe9e7' }}>
					<Header />
					<Grid container style={{ marginTop: '2%', justifyContent: 'center', textAlign: 'center' }}>
						{data.map((item, index) => {
							return (
								<Grid
									item
									xs={4}
									style={{ boxShadow: '2px 2px #ede7f6', marginBottom: '2%' }}
									key={index}>
									<div style={{ margin: '5px' }}>
										<Card>
											<CardActionArea>
												<Link
													to={'/event/' + item.id}
													style={{ textDecoration: 'none', color: 'black' }}>
													<CardMedia component='img' height='300px' image={item.image} />
													<CardContent>
														<Typography gutterBottom variant='h5' component='h2'>
															{item.title}
														</Typography>
														<Typography variant='body1' color='textSecondary' component='p'>
															{item.price}
														</Typography>
														<Typography variant='body2' color='textSecondary' component='p'>
															{item.description}
														</Typography>
													</CardContent>
												</Link>
											</CardActionArea>
										</Card>
									</div>
								</Grid>
							);
						})}
					</Grid>
					<Footer />
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		//ini didapatkan dari store
		title: ownProps.match.params.title,
		eventbytitle1: state.eventbytitle
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//dari actions
		eventbytitle: (title) => {
			dispatch(eventbytitle(title));
		}
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventByTitle));
