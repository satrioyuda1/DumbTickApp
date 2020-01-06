import React, { Component } from 'react';
import { Grid, Typography, Container, Divider } from '@material-ui/core';
class Footer extends Component {
	render() {
		return (
			<div
				style={{
					backgroundColor: '#f44336',
					padding: '20px'
				}}>
				<Container>
					<Grid
						container
						spacing={0}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							marginLeft: '2px'
						}}>
						<Grid item lg={3} md={5} xs={8}>
							<Typography
								variant='h6'
								component='p'
								style={{
									fontFamily: 'Bitter',
									color: '#fff',
									marginBottom: '15px'
								}}>
								Dumb-Tick
							</Typography>
							<Typography
								variant='subtitle1'
								style={{
									fontFamily: 'Bitter',
									color: '#fff',
									marginBottom: '15px'
								}}>
								dumb tick - is a web-based platform that provides tickets for various events around
								sports, music, science, and programming.
							</Typography>
						</Grid>
						<Grid item lg={3} md={5} xs={8}>
							<Typography
								variant='h6'
								component='p'
								style={{
									fontFamily: 'Bitter',
									color: '#fff',
									marginBottom: '15px'
								}}>
								Dumb-Tick
							</Typography>
							<Typography
								variant='subtitle1'
								style={{
									fontFamily: 'Bitter',
									color: '#fff',
									marginBottom: '15px'
								}}>
								Follow all the topics you care about, and we’ll deliver the best stories for you to your
								homepage and inbox. Explore
							</Typography>
						</Grid>
						<Grid item lg={3} md={5} xs={8}>
							<Typography
								variant='h6'
								component='p'
								style={{
									fontFamily: 'Bitter',
									color: '#fff',
									marginBottom: '15px'
								}}>
								Become a member
							</Typography>
							<Typography
								variant='subtitle1'
								style={{
									fontFamily: 'Bitter',
									color: '#fff',
									marginBottom: '15px'
								}}>
								Get unlimited access to the best stories on Dumb-Tick — and support writers while you’re
								at it. Just $5/month. Upgrade
							</Typography>
						</Grid>
					</Grid>

					<Divider style={{ backgroundColor: '#fff', margin: '30px 0' }} />
					<Grid
						container
						spacing={2}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							marginLeft: '2px'
						}}>
						<Grid item lg={10} md={10} xs={12}>
							<Typography
								variant='h4'
								style={{
									fontFamily: 'Frank Ruhl Libre',
									fontWeight: 'bold',
									color: '#fff'
								}}>
								Dumb-Tick
							</Typography>
						</Grid>
						<Grid
							item
							lg={2}
							md={2}
							xs={5}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								padding: '15px'
							}}>
							<Grid>
								<Typography
									variant='subtitle1'
									style={{
										fontFamily: 'Frank Ruhl Libre',
										fontWeight: 'bold',
										color: '#fff'
									}}>
									About
								</Typography>
							</Grid>
							<Grid>
								<Typography
									variant='subtitle1'
									style={{
										fontFamily: 'Frank Ruhl Libre',
										fontWeight: 'bold',
										color: '#fff'
									}}>
									Help
								</Typography>
							</Grid>
							<Grid>
								<Typography
									variant='subtitle1'
									style={{
										fontFamily: 'Frank Ruhl Libre',
										fontWeight: 'bold',
										color: '#fff'
									}}>
									Legal
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}
}

export default Footer;
