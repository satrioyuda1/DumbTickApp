import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { Grid, Card, CardContent, Typography, Container, TextField, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';

import { login } from '../_actions/user';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			show1: 'inline',
			show2: 'none',
			hidepass: 'password'
		};
	}

	onSubmit = (register) => {
		const data = {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			createdAt: new Date('d F Y'),
			updatedAt: new Date('d F Y')
		};

		register.preventDefault();
		axios({
			method: 'post',
			url: 'http://localhost:5000/api/v1/login',
			data
		})
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				console.log(res.data);
				window.location.href = 'http://localhost:3000/';
			})
			.catch((err) => {
				window.location.href = 'http://localhost:3000/login';
			});
	};
	onChangeEmail = (register) => {
		this.setState({ email: register.target.value });
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
		const { success, token } = this.props.dataUser.data;
		console.log(this.state.email);
		if (success === true) {
			localStorage.setItem('token', token);
			window.location.href = 'http://localhost:3000/';
		}
		return (
			<div>
				<Header />
				<Container style={{ marginTop: '50px' }}>
					<Grid>
						<Typography
							variant='h4'
							component='h4'
							style={{
								textAlign: 'center',
								justifyContent: 'center'
							}}>
							Login
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
										name='email'
										value={this.state.email}
										onChange={this.onChangeEmail}
										id='standard-basic'
										label='Your email'
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
										Login
									</Button>
								</form>
							</CardContent>
						</Card>
					</Grid>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//ini didapatkan dari store
		dataUser: state.isLogin
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//dari actions
		login1: (dataUser) => {
			dispatch(login(dataUser));
		}
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
