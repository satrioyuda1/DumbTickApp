import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Card, CardMedia, CardActionArea, Typography, Button, Divider } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TwitterIcon from '@material-ui/icons/Twitter';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withRouter } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { eventsDetails } from '../_actions/events';
import { setNewOrder } from '../_actions/payments';
class DetailEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		};
	}

	componentDidMount() {
		this.props.getEventDetail(this.props.eventId);
	}

	handlerInc = () => {
		this.setState({ quantity: this.state.quantity + 1 });
	};

	handlerDec = () => {
		this.setState({ quantity: this.state.quantity !== 0 ? (this.state.quantity -= 1) : 0 });
	};

	handleSetNewOrder = () => {
		const order = {
			eventId: this.props.eventId,
			quantity: this.state.quantity
		};
		this.props.NewOrder(order);
	};

	render() {
		// const { order } = this.props.newOrderData;
		const { data, isLoading, error } = this.props.eventsDetail;

		// const name = this.props.eventCategory;
	// 	 if (order.message === "success") {
    //   window.location.href = "http://localhost:3000/payments";
    // }
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
			<div style={{ backgroundColor: '#fbe9e7' }}>
				<Header />
				<Container>
					<div
						style={{
							boxSizing: 'content-box',
							width: 'auto',
							height: 'auto',
							border: '1px solid grey',
							marginTop: '150px',
							borderRadius: '15px'
						}}>
						<Grid container>
							<Grid items xs={12}>
								<Card>
									<CardActionArea>
										<CardMedia
											component='img'
											alt='Title Image'
											className='card-img'
											image={data.img}
											title='Title Image'
										/>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={0}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								padding: '25px'
							}}>
							<Grid item lg={9} md={9} xs={9}>
								<Typography
									variant='h3'
									component='h3'
									style={{
										fontFamily: 'Bitter',
										color: 'black',
										marginBottom: '15px'
									}}>
									{data.title}
								</Typography>
								<Typography
									variant='h5'
									style={{
										fontFamily: 'Bitter',
										color: '#f44336',
										marginBottom: '15px'
									}}>
									{data.category_name}
								</Typography>
							</Grid>
							<Grid
								item
								lg={3}
								md={3}
								xs={3}
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'flex-end'
								}}>
								<Button onClick={this.handlerDec} variant='outlined'>
									<RemoveIcon />
								</Button>
								<Typography variant='h4' style={{ margin: '0 10px' }}>
									{this.state.quantity}
								</Typography>
								<Button onClick={this.handlerInc} variant='outlined' style={{ marginRight: '10px' }}>
									<AddIcon />
								</Button>
								<Button variant='contained' color='secondary' size='large' onClick={this.handleSetNewOrder}>
									{data.price}
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Divider style={{ backgroundColor: '#212121' }} />
							</Grid>
							<Grid
								container
								spacing={0}
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginTop: '30px'
								}}>
								<Grid item lg={3} md={5} xs={8}>
									<Typography
										variant='h6'
										component='h6'
										style={{
											fontFamily: 'Bitter',
											color: '#black',
											marginBottom: '15px'
										}}>
										Hosted By
									</Typography>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<img
											src={data.image}
											alt='Avatar'
											style={{ width: '60px', borderRadius: '20%' }}
										/>
										<Typography
											variant='h6'
											component='h6'
											style={{
												fontFamily: 'Bitter',
												color: '#grey',
												marginTop: '15px',
												marginLeft: '20px'
											}}>
											{data.name}
										</Typography>
									</div>
								</Grid>
								<Grid item lg={3} md={5} xs={8}>
									<Typography
										variant='h6'
										component='p'
										style={{
											fontFamily: 'Bitter',
											color: '#black',
											marginBottom: '15px'
										}}>
										Date & Time
									</Typography>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<CalendarTodayIcon />
										<Typography
											variant='p2'
											component='p2'
											style={{
												fontFamily: 'Bitter',
												color: '#black',
												marginBottom: '15px',
												padding: '5px',
												marginLeft: '5px'
											}}>
											{data.startTime}
										</Typography>
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<AccessTimeIcon />
										<Typography
											variant='p2'
											component='p2'
											style={{
												fontFamily: 'Bitter',
												color: 'black',
												marginBottom: '15px',
												padding: '5px',
												marginLeft: '5px'
											}}>
											{data.endTime}
										</Typography>
									</div>
								</Grid>
								<Grid item lg={3} md={5} xs={8}>
									<Typography
										variant='h6'
										component='p'
										style={{
											fontFamily: 'Bitter',
											color: 'black',
											marginBottom: '15px'
										}}>
										Contact Persons
									</Typography>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<AssignmentIcon />
										<Typography
											variant='p2'
											component='p2'
											style={{
												fontFamily: 'Bitter',
												color: 'black',
												marginBottom: '15px',
												padding: '5px',
												marginLeft: '5px'
											}}>
											{data.userName}
										</Typography>
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<PhoneIcon />
										<Typography
											variant='p2'
											component='p2'
											style={{
												fontFamily: 'Bitter',
												color: 'black',
												marginBottom: '15px',
												padding: '5px',
												marginLeft: '5px'
											}}>
											{data.phoneNumber}
										</Typography>
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row'
										}}>
										<MailOutlineIcon />
										<Typography
											variant='p2'
											component='p2'
											style={{
												fontFamily: 'Bitter',
												color: 'black',
												marginBottom: '15px',
												padding: '5px',
												marginLeft: '5px'
											}}>
											{data.email}
										</Typography>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</div>
					<Grid>
						<Grid
							container
							spacing={0}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: '60px'
							}}>
							<Grid
								item
								lg={5}
								md={5}
								xs={4}
								style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: '60px' }}>
								<Typography
									variant='h5'
									component='h5'
									style={{
										display: 'flex',
										fontFamily: 'Bitter',
										color: 'black',
										marginBottom: '15px',
										textAlign: 'center',
										justifyContent: 'center'
									}}>
									{data.title}
								</Typography>
								<Typography
									variant='p'
									component='p'
									style={{
										fontFamily: 'Bitter',
										color: 'black',
										marginBottom: '15px',
										textAlign: 'justify'
									}}>
									{data.description}
								</Typography>
							</Grid>
							<Grid item lg={1} md={1} xs={1} style={{ padding: '20px' }}>
								<div style={{ borderLeft: '3px solid black', height: '500px' }} />
							</Grid>
							<Grid
								item
								lg={3}
								md={3}
								xs={3}
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginRight: '50px'
								}}>
								<Typography
									variant='h5'
									component='h5'
									style={{
										display: 'flex',
										fontFamily: 'Bitter',
										color: 'black',
										marginBottom: '15px',
										textAlign: 'center',
										justifyContent: 'center'
									}}>
									Location
								</Typography>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row'
									}}>
									<LocationOnIcon />
									<Typography
										variant='p'
										component='p'
										style={{
											fontFamily: 'Bitter',
											color: 'black',
											marginBottom: '15px',
											textAlign: 'justify',
											marginLeft: '10px'
										}}>
										{data.address}
									</Typography>
								</div>
								<iframe
									style={{
										width: '400px',
										height: '200px',
										frameBorder: '0',
										style: 'border:0;',
										allowFullscreen: ''
									}}
									src={data.urlMaps}
								/>
								<Typography
									variant='h5'
									component='h5'
									style={{
										display: 'flex',
										fontFamily: 'Bitter',
										color: 'black',
										marginTop: '15px',
										textAlign: 'center',
										justifyContent: 'center'
									}}>
									Share Event
								</Typography>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row'
									}}>
									<TwitterIcon />
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Container>
				<Footer />
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		//ini didapatkan dari store
		eventId: ownProps.match.params.id,
		eventsDetail: state.eventsDetail,
		newOrderData: state.newOrder
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//dari actions
		NewOrder: (order) => {
			dispatch(setNewOrder(order));
		},
		getEventDetail: (eventId) => {
			dispatch(eventsDetails(eventId));
		}
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailEvent));
