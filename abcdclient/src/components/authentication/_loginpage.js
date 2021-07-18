import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        abcdkcdc
      </Link>{' '}
      {2025}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const SignIn = ({
  LoginDtls,
  SubmitLogin,
  handleChange,
  ProcesssubmitData

}) => {

  const classes = useStyles();
  return (
  
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} onSubmit={SubmitLogin} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="UserID"
              name="Email"
              autoFocus
              onChange={handleChange}
              value={LoginDtls.Email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={LoginDtls.Password}
              validators={['required']}
              errorMessages={['password is required']}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={ProcesssubmitData}
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/forgotpwd" variant="body2" >
                  Forgot password?
      </NavLink>

              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        
      </Container>
    
  );
}
SignIn.propTypes = {
  LoginDtls: PropTypes.object.isRequired,
  errors: PropTypes.object,
  SubmitLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  ProcesssubmitData: PropTypes.bool
};

export default SignIn;
