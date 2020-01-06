import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Container, Divider, Button, Hidden, TextField } from '@material-ui/core';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
class ProfileUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stepDetail: '',
			stepEdit: [ 'xs', 'sm', 'lg', 'md', 'xl' ],
			name: '',
			phone: '',
			email: '',
			image: ''
		};
	}

	onChangeName = (edit) => {
		this.setState({ name: edit.target.value });
	};

	onChangeEmail = (edit) => {
		this.setState({ email: edit.target.value });
	};
	onChangePhone = (edit) => {
		this.setState({ phone: edit.target.value });
	};
	onChangeImage = (edit) => {
		this.setState({ image: edit.target.value });
	};
	handelEdit = () => {
		this.setState({
			stepDetail: [ 'xs', 'sm', 'lg', 'md', 'xl' ],
			stepEdit: ''
		});
	};
	handelCancel = () => {
		this.setState({
			stepDetail: '',
			stepEdit: [ 'xs', 'sm', 'lg', 'md', 'xl' ]
		});
	};
	onSubmit = (edit) => {
		let token = localStorage.getItem('token');
		token = 'Bearer ' + token;
		const data = {
			name: this.state.name,
			email: this.state.email,
			phone: this.state.phone,
			image: this.state.image,
			updatedAt: new Date('d F Y')
		};
		edit.preventDefault();
		axios({
			method: 'put',
			url: `http://localhost:5000/api/v1/profile`,
			data,
			headers: {
				Authorization: token
			}
		})
			.then((res) => {
				window.location.href = 'http://localhost:3000/profile';
			})
			.catch((err) => {
				window.location.href = `http://localhost:3000/profile`;
			});
	};
	render() {
		const { data } = this.props.profileUser1;
		return (
			<div>
				<Header />
				<Hidden only={this.state.stepDetail}>
					<Container>
						<Grid container style={{ marginTop: '60px' }} display='hidden'>
							<Grid
								item
								lg={6}
								md={6}
								xs={6}
								style={{ display: 'flex', flexDirection: 'column', marginLeft: '100px' }}>
								<Typography
									variant='h3'
									component='h3'
									style={{
										fontFamily: 'Bitter',
										color: 'black',
										marginBottom: '15px'
									}}>
									My Profile
								</Typography>
								<Typography
									variant='h4'
									component='h4'
									style={{
										fontFamily: 'Bitter',
										color: 'black',
										marginTop: '15px'
									}}>
									{data.name}
								</Typography>
								<Typography
									variant='subtitle'
									component='subtitle'
									style={{
										fontFamily: 'Bitter',
										color: 'black',
										marginTop: '15px'
									}}>
									{data.email}
								</Typography>
								<Typography
									variant='subtitle'
									component='subtitle'
									style={{
										fontFamily: 'Bitter',
										color: 'black',
										marginTop: '15px'
									}}>
									{data.phone}
								</Typography>
							</Grid>
							<Grid item lg={5} md={5} xs={5}>
								<img
									src={data.image}
									alt='Avatar'
									className='avatar'
									style={{
										width: '300px',
										height: 'auto',
										marginLeft: '50px',
										borderRadius: '10%'
									}}
								/>
							</Grid>
							<Button
								variant='contained'
								color='secondary'
								size='small'
								style={{ marginLeft: '98px', marginTop: '15px' }}
								onClick={this.handelEdit}>
								edit profil
							</Button>
						</Grid>
					</Container>
				</Hidden>
				<Hidden only={this.state.stepEdit}>
					<Container>
						<Grid container style={{ marginTop: '60px' }} display='hidden'>
							<Grid
								item
								lg={6}
								md={6}
								xs={6}
								style={{ display: 'flex', flexDirection: 'column', marginLeft: '100px' }}>
								<Typography
									variant='h3'
									component='h3'
									style={{
										fontFamily: 'Bitter',
										color: 'black',
										marginBottom: '15px'
									}}>
									Edit Profile
								</Typography>
								<TextField
									name='name'
									value={this.state.name}
									onChange={this.onChangeName}
									id='standard-basic'
									label='Your name'
									fullWidth
									style={{ marginBottom: '30px' }}
								/>
								<TextField
									name='phone'
									value={this.state.email}
									onChange={this.onChangeEmail}
									id='standard-basic'
									label='Your email'
									fullWidth
									style={{ marginBottom: '30px' }}
								/>
								<TextField
									name='phone'
									value={this.state.phone}
									onChange={this.onChangePhone}
									id='standard-basic'
									label='Your Phone'
									fullWidth
									style={{ marginBottom: '30px' }}
								/>
								<TextField
									name='phone'
									value={this.state.image}
									onChange={this.onChangeImage}
									id='standard-basic'
									label='Image Url'
									fullWidth
									style={{ marginBottom: '30px' }}
								/>
							</Grid>
							<Grid item lg={5} md={5} xs={5}>
								<img
									src={this.state.image}
									alt='Avatar'
									className='avatar'
									style={{
										width: '300px',
										height: 'auto',
										marginTop: 38,
										marginLeft: '50px',
										borderRadius: '10%'
									}}
								/>
							</Grid>
							<Button
								variant='contained'
								color='secondary'
								size='small'
								style={{ marginLeft: '98px', marginTop: '15px' }}
								onClick={this.handelCancel}>
								Cancel
							</Button>
							<Button
								variant='contained'
								color='secondary'
								size='small'
								style={{ marginLeft: 20, marginTop: '15px' }}
								onClick={this.onSubmit}>
								Save
							</Button>
						</Grid>
					</Container>
				</Hidden>
				<Container>
					<Divider style={{ marginTop: 30, marginBottom: 20 }} />
				</Container>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profileUser1: state.profileUser
	};
};

export default connect(mapStateToProps)(ProfileUser);
