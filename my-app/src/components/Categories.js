import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../_actions/categories';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Categories extends Component {
	componentDidMount() {
		this.props.getCategories();
	}

	render() {
		const { data, isLoading, error } = this.props.categories;
		console.log(this.props.categories);
		if (isLoading) {
			return (
				<div>
					<h1>now isloading</h1>
				</div>
			);
		}
		if (error) {
			return (
				<div>
					<h1>error.</h1>
				</div>
			);
		}
		return (
			<div>
				<h1 style={{ marginTop: '2%', color: '#ff5252' }}>Category</h1>
				<Grid
					container
					spacing={3}
					style={{
						display: 'flex',
						justifyContent: 'center'
					}}>
					{data.map((entry, index) => {
						return (
							<Grid item xs={3}>
								<Link
									to={'/category/' + entry.id + '/events'}
									style={{ textDecoration: 'none', color: 'black' }}>
									<Button
										style={{ width: '200px', backgroundColor: '#FF1493', position: 'relative' }}>
										<p key={index}>{entry.name}</p>
									</Button>
								</Link>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}
// class Content extends Component {
// 	render() {
// 		return <p>{this.props.title}</p>;
// 	}
// }

const mapStateToProps = (state) => {
	return {
		categories: state.categories
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCategories: () => {
			dispatch(getCategories());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
