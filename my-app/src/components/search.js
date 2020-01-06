import React, { Component } from 'react';
import { Container, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
export default class search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
	}
	handleOnChage = (event) => {
		this.setState({ query: `/search/${event.target.value}` });
	};

	handleKeyUp = (event) => {
		if (event.keyCode === 13) {
			window.location = this.state.query;
		}
	};
	handleOnclick = (event) => {
		this.setState((window.location = this.state.query));
	};
	render() {
		return (
			<div style={{ marginTop: '30px' }}>
				<Container>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							name='title'
							onChange={this.handleOnChage}
							id='standard-basic'
							label='Searching'
							fullWidth
							style={{ marginBottom: '30px' }}
						/>
						<SearchIcon onClick={this.handleOnclick} style={{ marginTop: '20px', marginRight: '20px' }} />
					</div>
				</Container>
			</div>
		);
	}
}
