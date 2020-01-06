import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Grid, Button, Container, Typography } from '@material-ui/core';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { getApproved } from '../_actions/payments';

class MyTicket extends Component {
	componentDidMount() {
		this.props.getApproved();
	}

	render() {
		const { order } = this.props.approved;
		return (
			<div>
				<Header />
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
const mapStateToProps = (state) => {
	return {
		//ini dari store
		approved: state.approved
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getApproved: () => {
			dispatch(getApproved());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTicket);
