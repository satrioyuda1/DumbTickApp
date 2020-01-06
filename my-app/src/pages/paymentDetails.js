import React, { Component } from 'react';
import { Divider, Grid, Button, Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { getPending } from '../_actions/payments';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import QRCode from 'qrcode.react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class PaymentDetails extends Component {
	componentDidMount() {
		this.props.orderPending(this.props.id);
		console.log(this.props.id);
	}
	onSubmit = (confirm) => {
		let token = localStorage.getItem('token');
		token = 'Bearer ' + token;
		confirm.preventDefault();
		axios({
			method: 'put',
			url: `http://localhost:5000/api/v1/confirm/${this.props.id}`,
			headers: {
				Authorization: token
			}
		})
			.then((res) => {
				window.location.href = 'http://localhost:3000/my_ticket';
			})
			.catch((err) => {
				window.location.href = `http://localhost:3000/payment/${this.props.id}`;
			});
	};
	render() {
		const { order, isLoading, error } = this.props.pendingId;
		{
			console.log(this.props.id);
		}

		let eventTitle = order.event ? order.event.title : '';
		let eventAddress = order.event ? order.event.address : '';
		let startTime = order.event ? order.event.starTime : '';
		let orderQuantity = order.quantity ? order.quantity : '';
		let orderTotalPrice = order.totalPrice ? order.totalPrice : 0;
		let orderStatus = order.status ? order.status : '';

		return (
			<div>
				<Header />
				{/* {console.log(data)} */}
				<Container>
					<div style={{ paddingTop: '10px' }}>
						<h1 style={{ color: '#E74267' }}>Payment Details</h1>
						<Divider style={{ marginBottom: 20 }} />

						<Grid container>
							<Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
								<div
									style={{
										backgroundColor: '#CA4040',
										padding: 10,
										width: '100%'
									}}>
									<div
										style={{
											margin: 10,
											height: 210,
											backgroundColor: '#FFF'
										}}>
										<div
											style={{
												height: 40,
												backgroundColor: '#BEBEBE',
												padding: 10,
												display: 'flex',
												position: 'relative'
											}}>
											<div>
												<h3 style={{ marginTop: 0, marginBottom: 0 }} />
												<p style={{ marginTop: 0 }}>
													<small>User id : {order.buyerId} </small>
												</p>
											</div>
											<div style={{ position: 'absolute', top: 4, right: 10 }}>
												<small>Total Price :{order.totalPrice}</small>
											</div>
										</div>
										<div
											style={{
												height: 40,
												padding: 10,
												display: 'flex',
												position: 'relative',
												flexDirection: 'column'
											}}>
											<Grid item lg={10} md={9} sm={12} xs={12}>
												<h1 style={{ marginTop: 0, marginBottom: 0 }}>{eventTitle}</h1>
												<p style={{ marginTop: 10, marginBottom: 5 }}>{startTime}</p>
												<p style={{ marginTop: 0, marginBottom: 0 }}>{eventAddress}</p>
											</Grid>

											<Grid
												item
												lg={2}
												md={3}
												sm={12}
												xs={12}
												style={{
													position: 'absolute',
													top: 10,
													right: 10,
													marginBottom: 100
												}}>
												<div>
													<QRCode
														id='123456'
														value='123456'
														size={70}
														level={'H'}
														includeMargin={true}
													/>
													<a onClick={this.downloadQR}> </a>
												</div>
											</Grid>
											<div style={{ display: 'flex' }}>
												<h3>Status : {order.status}</h3>
												<Grid
													item
													lg={6}
													md={6}
													sm={12}
													xs={12}
													style={{ textAlign: 'right' }}
												/>
											</div>
										</div>
									</div>
								</div>
							</Grid>
						</Grid>
						<Divider style={{ marginTop: 20, marginBottom: 40 }} />
					</div>
					<div>
						<h2 style={{ marginBottom: 10 }}>Shopping Summary</h2>
						<div style={{ display: 'flex', position: 'relative' }}>
							<Grid item lg={6} md={6} sm={12} xs={12}>
								Total Price ({orderQuantity} item)
							</Grid>
							<Grid item lg={6} md={6} sm={12} xs={12} style={{ textAlign: 'right' }}>
								{orderTotalPrice}
							</Grid>
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
							<Divider style={{ marginTop: 20, marginBottom: 40 }} />
							<h2 style={{ marginBottom: 10 }}>Prove of payment</h2>
							<Grid
								item
								lg={10}
								md={10}
								sm={10}
								xs={10}
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									textAlign: 'right',
									marginBottom: '30px'
								}}>
								{orderStatus === 'pending' && (
									<Button
										size='large'
										style={{
											backgroundColor: '#CA4040',
											color: '#FFF',
											fontWeight: 'bold'
										}}
										onClick={this.onSubmit}>
										Confirm
									</Button>
								)}
							</Grid>
						</div>
					</div>
				</Container>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		//ini didapatkan dari store
		id: ownProps.match.params.id,
		pendingId: state.getPendingById,
		confirmPost: state.postConfirm
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//dari actions
		// confirm: (id) => {
		// 	dispatch(postConfirm(id));
		// },
		orderPending: (id) => {
			dispatch(getPending(id));
		}
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentDetails));
