import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../_actions/events';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';

export class Event extends Component {
	componentDidMount() {
		this.props.getEvents1();
	}
	render() {
		const { data, isLoading, error } = this.props.events2;

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

		return (
			<div style={{ marginTop: '3%' }}>
				<h1 style={{ marginTop: '2%', color: '#ff5252' }}>Event</h1>
				<Grid container style={{ marginTop: '2%', justifyContent: 'center', textAlign: 'center' }}>
					{data.map((item, index) => {
						return (
							<Grid item xs={4} style={{ boxShadow: '2px 2px #ede7f6', marginBottom: '2%' }} key={index}>
								<Link to={'/event/' + item.id} style={{ textDecoration: 'none', color: 'black' }}>
									<div style={{ margin: '5px' }}>
										<Card>
											<CardActionArea>
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
											</CardActionArea>
										</Card>
									</div>
								</Link>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		events2: state.events
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEvents1: () => {
			dispatch(getEvents());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
