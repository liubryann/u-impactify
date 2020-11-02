import React, { Component } from "react";
import PropTypes from "prop-types";

// Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";
import Bottombar from '../../components/Bottombar'; 
import Topbar from '../../components/topbar'; 

// redux
import { signupUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";

const { userTypes } = require("../../constants");

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 50,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: "100%",
  },
  progress: {
    position: "absolute",
  },
});

function TextFieldWrapper(props) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name={props.name}
      label={props.label}
      type={props.type}
      id={props.name}
      autoComplete={props.name}
      autoFocus
      value={props.value}
      onChange={props.onChange}
      helperText={props.helperText}
      error={props.error}
    />
  );
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
      first: "",
      last: "",
      org: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      type: this.state.userType,
      org: this.state.org,
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth.authErrors !== prevProps.auth.authErrors) {
      this.setState({ errors: this.props.auth.authErrors });
    }
  }

  nameField(userType, errors) {
    if (userType === userTypes.SOCIAL_INITIATIVE) {
      return (
        <TextFieldWrapper
          name="org"
          label="Organization"
          value={this.state.org}
          onChange={this.handleChange}
          helperText={errors.org}
          error={errors.org ? true : false}
        />
      );
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextFieldWrapper
              name="first"
              label="First Name"
              value={this.state.first}
              onChange={this.handleChange}
              helperText={errors.first}
              error={errors.first ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldWrapper
              label="Last Name"
              name="last"
              value={this.state.last}
              onChange={this.handleChange}
              helperText={errors.last}
              error={errors.last ? true : false}
            />
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    const {
      classes,
      auth: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div>
      <Topbar/>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar} />
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="userType">Select an account type</InputLabel>
                <Select
                  labelId="userType"
                  id="userType"
                  type="userType"
                  name="userType"
                  value={this.state.userType}
                  onChange={this.handleChange}
                  error={errors.userType ? true : false}
                >
                  <MenuItem value={userTypes.IMPACT_CONSULTANT}>
                    {userTypes.IMPACT_CONSULTANT}
                  </MenuItem>
                  <MenuItem value={userTypes.SOCIAL_INITIATIVE}>
                    {userTypes.SOCIAL_INITIATIVE}
                  </MenuItem>
                  <MenuItem value={userTypes.IMPACT_LEARNER}>
                    {userTypes.IMPACT_LEARNER}
                  </MenuItem>
                </Select>
                {errors.userType && (
                  <FormHelperText error={errors.userType ? true : false}>
                    Required
                  </FormHelperText>
                )}
              </FormControl>

              {this.nameField(this.state.userType, errors)}

              <TextFieldWrapper
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                helperText={errors.email}
                error={errors.email ? true : false}
              />
              <TextFieldWrapper
                name="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password ? true : false}
              />
              <TextFieldWrapper
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Sign Up
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
      <Bottombar/>
      </div>
    );
  }
}

Signup.propTypes = {
  auth: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
