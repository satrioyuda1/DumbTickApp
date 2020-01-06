import React, { Component } from 'react';
import { Divider, Grid, Button, Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPendingOrder } from '../_actions/payments';

import QRCode from 'qrcode.react';
import Header from '../components/Header';

class Payments extends Component {
	componentDidMount() {
		this.props.orderPending();
	}
	downloadQR = () => {
		const canvas = document.getElementById('123456');
		const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
		let downloadLink = document.createElement('a');
		downloadLink.href = pngUrl;
		downloadLink.download = '123456.png';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	render() {
		const { order, isLoading, error } = this.props.pendingStatus;
		// console.log(data);
		console.log(order);
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
		if (order.message === 'data payment is not found') {
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
							<Typography variant='h5'>You dont have a payment</Typography>
						</div>
					</Container>
				</div>
			);
		} else {
			return (
				<div>
					<Header />
					{/* {console.log(data)} */}
					<Container>
						<div style={{ paddingTop: '10px' }}>
							<h1 style={{ color: '#E74267' }}>Payment List</h1>
							<Divider style={{ marginBottom: 20 }} />

							<Grid container>
								{order.map((item, i) => (
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
															<small>User id : {item.buyer.id} </small>
														</p>
													</div>
													<div style={{ position: 'absolute', top: 4, right: 10 }}>
														<small>Total Price :{item.totalPrice}</small>
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
														<h1 style={{ marginTop: 0, marginBottom: 0 }}>
															{item.event.title}
														</h1>
														<p style={{ marginTop: 10, marginBottom: 5 }}>
															{item.event.startTime}
														</p>
														<p style={{ marginTop: 0, marginBottom: 0 }}>
															{item.event.address}
														</p>
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

														{item.status === 'pending' && (
															<Link
																to={'/payment/' + item.id}
																style={{ textDecoration: 'none' }}>
																<Button
																	size='large'
																	style={{
																		backgroundColor: '#CA4040',
																		color: '#FFF',
																		fontWeight: 'bold'
																	}}>
																	CHECK OUT
																</Button>
															</Link>
														)}
													</Grid>
													<div style={{ display: 'flex' }}>
														<h3>Status : {item.status}</h3>
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
								))}
							</Grid>
						</div>
					</Container>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		//ini didapatkan dari store
		pendingStatus: state.pendingOrder
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		//dari actions
		orderPending: () => {
			dispatch(getPendingOrder());
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Payments);
