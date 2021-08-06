import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [firstName,setFirstName]=useState("")
	const [lastName,setLastName]=useState("")
	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")


	const handleSubmit=(e)=>{
		e.preventDefault();
		console.log(firstName, lastName, email, password)
		//	Handle registration request there
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(e)}>
					<TextField
						autoComplete="fname"
						name="firstName"
						variant="outlined"
						required
						fullWidth
						id="firstName"
						label="First Name"
						margin="normal"
						onChange={(e)=>setFirstName(e.target.value)}
						autoFocus
					/>
					<TextField
						autoComplete="lname"
						name="lastName"
						variant="outlined"
						required
						fullWidth
						id="lastName"
						label="Last Name"
						margin="normal"
						onChange={(e)=>setLastName(e.target.value)}
					/>
					<TextField
						autoComplete="email"
						name="email"
						variant="outlined"
						required
						fullWidth
						id="email"
						label="Email Address"
						margin="normal"
						onChange={(e)=>setEmail(e.target.value)}
					/>
					<TextField
						autoComplete="current-password"
						name="password"
						variant="outlined"
						required
						fullWidth
						label="Password"
						id="password"
						margin="normal"
						type="password"
						onChange={(e)=>setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright/>
			</Box>
		</Container>
	);
}