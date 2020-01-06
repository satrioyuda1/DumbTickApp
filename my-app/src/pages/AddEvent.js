import React, { Component } from 'react';
import { Grid, Card, CardContent, Typography, Container, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getCategories } from '../_actions/categories';
import { addEvent } from '../_actions/events';
import Header from '../components/Header';
class AddEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			image: '',
			categoryId: 1,
			startTime: '',
			endTime: '',
			price: '',
			address: '',
			description: '',
			urlMap:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.940602642446!2d106.7951507152948!3d-6.271541595460681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a0d52ae3cd%3A0xe6f01c088b82e9a1!2sGlints%20Indonesia!5e0!3m2!1sid!2sid!4v1577973813927!5m2!1sid!2sid'
		};
	}
	onChangeTitle = (event) => {
		this.setState({ title: event.target.value });
	};
	onChangeImage = (event) => {
		this.setState({ image: event.target.value });
	};
	onChangeStartTime = (event) => {
		this.setState({ startTime: event.target.value });
	};
	onChangeCategory = (event) => {
		this.setState({ categoryId: event.target.value });
	};
	onChangeEndTime = (event) => {
		this.setState({ endTime: event.target.value });
	};
	onChangePrice = (event) => {
		this.setState({ price: event.target.value });
	};
	onChangeAddress = (event) => {
		this.setState({ address: event.target.value });
	};
	onChangeDescription = (event) => {
		this.setState({ description: event.target.value });
	};
	onChangeUrlMap = (event) => {
		this.setState({ urlMap: event.target.value });
	};

	onChangeImage = (event) => {
		this.setState({ image: event.target.value });
	};
	handleAddEvent = () => {
		// alert(this.state.description);
		const event = {
			title: this.state.title,
			categoryId: this.state.categoryId,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			price: this.state.price,
			description: this.state.description,
			address: this.state.address,
			urlMap: this.state.urlMap,
			image: this.state.image
		};
		this.props.addEvent1(event);
	};
	componentDidMount() {
		this.props.getCategories(this.props.categories);
	}

	render() {
		const { message } = this.props.addEvent1;
		const { data } = this.props.categories;

		console.log(data);
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
								ADD EVENT
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
											name='title'
											value={this.state.title}
											onChange={this.onChangeTitle}
											id='standard-basic'
											label='title'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>
										<select name='category_id' onChange={this.onChangeCategory}>
											{data.map((categories, i) => {
												return (
													<option key={i} value={categories.id}>
														{categories.name}
													</option>
												);
											})}
										</select>
										<TextField
											name='image'
											value={this.state.image}
											onChange={this.onChangeImage}
											id='standard-basic'
											label='image-url'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>
										<TextField
											name='startTime'
											value={this.state.startTime}
											onChange={this.onChangeStartTime}
											id='standard-basic'
											label='Start Time'
											type='datetime-local'
											fullWidth
											style={{ marginBottom: '30px' }}
											InputLabelProps={{
												shrink: true
											}}
										/>
										<TextField
											name='endTime'
											value={this.state.endTime}
											onChange={this.onChangeEndTime}
											id='standard-basic'
											label='End Time'
											type='datetime-local'
											fullWidth
											style={{ marginBottom: '30px' }}
											InputLabelProps={{
												shrink: true
											}}
										/>
										<TextField
											name='price'
											value={this.state.price}
											onChange={this.onChangePrice}
											id='standard-basic'
											label='Price'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>
										<TextField
											name='address'
											value={this.state.address}
											onChange={this.onChangeAddress}
											id='standard-basic'
											label='Address'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>
										<h3>Location</h3>
										<iframe
											src={this.state.urlMap}
											width='100%'
											height='400'
											frameBorder='0'
											style={{ marginRight: 40 }}
										/>
										<TextField
											name='urlMap'
											value={this.state.urlMap}
											onChange={this.onChangeUrlMap}
											id='standard-basic'
											label='Map url'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>
										<TextField
											name='description'
											value={this.state.description}
											onChange={this.onChangeDescription}
											id='standard-basic'
											label='Description'
											fullWidth
											style={{ marginBottom: '30px' }}
										/>
										<Button
											variant='outlined'
											size='large'
											color='primary'
											fullWidth
											style={{ marginTop: '30px', marginBottom: '20px' }}
											onClick={this.handleAddEvent}>
											Submit
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

const mapStateToProps = (state) => {
	return {
		categories: state.categories,
		addEvent: state.addEvent
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCategories: () => {
			dispatch(getCategories());
		},
		addEvent1: (event) => {
			dispatch(addEvent(event));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
