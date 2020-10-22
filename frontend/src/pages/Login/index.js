import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Bottombar from '../../components/Bottombar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { loginUser } from '../../redux/actions/authActions'
import Topbar from '../../components/topbar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  progress: {
    position: 'absolute'
  },
  error: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  }
}));

function Login(props) {
  
const classes = useStyles();

const { loading, authErrors } = props.auth;

  return (
    <div>

    <Topbar />
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
          initialValues = {{
            email: "",
            password: ""
          }}
          validationSchema = {Yup.object({
            email: Yup.string("Enter your email")
              .min(1)
              .email("Enter a valid email")
              .required("Email is required"),
            password: Yup.string("")
              .min(6, "Password must contain at least 8 characters")
              .required("Password is required")
          }) }
          onSubmit = {(values, {resetForm, setSubmitting}) => {
            props.loginUser(
              values,
              function loginSucess() { setSubmitting(false); window.location.href = '/home'; },
              function loginFailure() { setSubmitting(false); resetForm({ values: "" });}
            );
          }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={values.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={values.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                onChange={handleChange}
              />
              {authErrors && (
              <Typography variant="body2" className={classes.error}>
                {authErrors}
              </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Sign In
                {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
      <Bottombar/>
    </div>
  );
}

const mapDispatchToProps = {
  loginUser: loginUser
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);