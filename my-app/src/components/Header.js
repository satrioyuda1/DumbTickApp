import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

function ButtonAppBar(props) {
	const { data } = props.profileUser1;

	const token = localStorage.getItem('token');
	let auth = true;
	if (token === null) auth = false;

	const classes = useStyles();

	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		localStorage.clear();
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar
				position='static'
				color='secondary'
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-start',
							width: '20%',
							padding: '20px',
							marginLeft: '20px'
						}}>
						<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
							<Button color='inherit'>DumbTick</Button>
						</Link>
					</div>
					{!auth && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								width: '80%',
								padding: '20px',
								marginRight: '20px'
							}}>
							<Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
								<Button color='inherit'>Login</Button>
							</Link>
							<Link to={'/signup'} style={{ textDecoration: 'none', color: 'white' }}>
								<Button color='inherit'>Register</Button>
							</Link>
						</div>
					)}
					{auth && (
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-end',
								width: '80%',
								padding: '20px',
								marginRight: '20px'
							}}>
							<h3 style={{ marginRight: 20 }}>Welcome {data.name}</h3>
							<div style={{ marginTop: '15px', marginRight: '20px' }}>
								<ListItemAvatar onClick={handleClick} aria-controls='user-account-menu'>
									<Avatar alt={data.name} src={data.image} />
								</ListItemAvatar>
								<Menu
									id='user-account-menu'
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
									style={{ transformOrigin: 'bottom' }}>
									<List style={{ padding: '0px 40px 10px 40px' }}>
										<ListItem onClick={handleClose}>
											<ListItemAvatar>
												<Avatar alt={data.name} src={data.image} />
											</ListItemAvatar>
											<ListItemText primary={data.name} secondary={data.email} />
										</ListItem>
									</List>
									<Divider light style={{ marginBottom: '10px' }} />
									<Link to='/profile' style={{ textDecoration: 'none', color: '#5e5e5e' }}>
										<MenuItem onClick={handleClose}>Profile</MenuItem>
									</Link>
									<Link to='/my_ticket' style={{ textDecoration: 'none', color: '#5e5e5e' }}>
										<MenuItem onClick={handleClose}>My Ticket</MenuItem>
									</Link>
									<Link to='/payments' style={{ textDecoration: 'none', color: '#5e5e5e' }}>
										<MenuItem onClick={handleClose}>Payment</MenuItem>
									</Link>
									<Link to='/add_event' style={{ textDecoration: 'none', color: '#5e5e5e' }}>
										<MenuItem onClick={handleClose}>Add Event</MenuItem>
									</Link>
									<Divider light style={{ marginBottom: '10px' }} />
									<Link to='/' style={{ textDecoration: 'none', color: '#5e5e5e' }}>
										<MenuItem onClick={logout}>Logout</MenuItem>
									</Link>
								</Menu>
							</div>
						</div>
					)}
				</div>
			</AppBar>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		profileUser1: state.profileUser
	};
};

export default connect(mapStateToProps)(ButtonAppBar);
