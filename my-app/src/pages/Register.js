import React, { Component } from 'react';
import Header from '../components/Header';
import { Grid, Card, CardContent, Typography, Container, TextField, Button } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			phone: '',
			username: '',
			password: '',
			image: '',
			show1: 'inline',
			show2: 'none',
			hidepass: 'password'
		};
	}

	onSubmit = (register) => {
		const data = {
			name: this.state.name,
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			createdAt: new Date('d F Y'),
			updatedAt: new Date('d F Y'),
			role: 'user'
		};
		register.preventDefault();
		axios({
			method: 'post',
			url: 'http://localhost:5000/api/v1/signup',
			data
		})
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				window.location.href = 'http://localhost:3000/';
			})
			.catch((err) => {
				window.location.href = 'http://localhost:3000/signup';
			});
	};

	onChangeName = (register) => {
		this.setState({ name: register.target.value });
	};
	onChangeEmail = (register) => {
		this.setState({ email: register.target.value });
	};

	onChangeUsername = (register) => {
		this.setState({ username: register.target.value });
	};
	onChangePassword = (register) => {
		this.setState({ password: register.target.value });
	};

	onClickShow1 = () => {
		this.setState({ show1: 'none', show2: 'inline', hidepass: 'text' });
	};
	onClickShow2 = () => {
		this.setState({ show1: 'inline', show2: 'none', hidepass: 'password' });
	};

	render() {
		return (
			<div>
				<div>
					<Header />
				</div>
				<div>
					<Container style={{ marginTop: '50px' }}>
						<Grid>
							<Typography
								variant='h4'
								component='h4'
								style={{
									textAlign: 'center',
									justifyContent: 'center'
								}}>
								Create New Account
							</Typography>
							<Card
								style={{
									display: 'flex',
									backgroundColor: '#fbe9e7',
									marginTop: '20px',
									alignItems: 'center',
									justifyContent: 'center'
								}}>
								<CardContent>
									<form noValidate autoComplete='off'>
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
											name='email'
											value={this.state.email}
											onChange={this.onChangeEmail}
											id='standard-basic'
											label='Your Email'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>

										<TextField
											name='username'
											value={this.state.username}
											onChange={this.onChangeUsername}
											id='standard-basic'
											label='Your username'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>

										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<TextField
												name='password'
												value={this.state.password}
												onChange={this.onChangePassword}
												id='standard-basic'
												label='Your Password'
												type={this.state.hidepass}
												fullWidth
												style={{ marginBottom: '30px' }}
											/>
											<VisibilityOffIcon
												style={{ display: this.state.show1 }}
												onClick={this.onClickShow1}
											/>
											<VisibilityIcon
												style={{ display: this.state.show2 }}
												onClick={this.onClickShow2}
											/>
										</div>
										<Button
											variant='outlined'
											size='large'
											color='primary'
											fullWidth
											style={{ marginTop: '30px', marginBottom: '20px' }}
											onClick={this.onSubmit}>
											Register Now
										</Button>
									</form>
								</CardContent>
							</Card>
						</Grid>
					</Container>
				</div>
			</div>
		);
	}
}
export default Register;
