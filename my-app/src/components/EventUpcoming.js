import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEventUpcoming } from '../_actions/events';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';

class EventsUpcoming extends Component {
	componentDidMount() {
		this.props.getEventUpcoming();
	}

	render() {
		const { data } = this.props.eventsUpcoming;
		if (data.length === 0) {
			return (
				<div>
					<h1 style={{ marginTop: '81	x`px', color: '#ff5252' }}>Event Upcoming</h1>
					<Grid container style={{ marginTop: '2%', justifyContent: 'center', textAlign: 'center' }}>
						<Typography gutterBottom variant='h5' component='h2'>
							No Event Upcoming
						</Typography>
					</Grid>
				</div>
			);
		} else {
			return (
				<div style={{ marginTop: '50%' }}>
					<h1 style={{ marginTop: '2%', color: '#ff5252' }}>Event Upcoming</h1>
					<Grid container style={{ marginTop: '2%', justifyContent: 'center', textAlign: 'center' }}>
						{data.map((item) => {
							return (
								<Grid item xs={4} style={{ boxShadow: '2px 2px #ede7f6', marginBottom: '2%' }}>
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
}

const mapStateToProps = (state) => {
	return {
		eventsUpcoming: state.eventsUpcoming
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEventUpcoming: () => {
			dispatch(getEventUpcoming());
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsUpcoming);
