import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from "@material-ui/core/styles/withStyles"
import NavBar from '../../components/NavBar'
import { Button, TextField, Typography } from '@material-ui/core'
const { userTypes } = require("../../constants");

const styles = (theme) => ({
    root: {
        height: "100%",
        backgroundColor: theme.palette.background.default,
    },
    form: {
        width: "100%", 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        margin: "auto",
        border: 1,
        width: '40%', 
        height: '85%',
        marginTop: 20,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    userIcon: {
        minWidth: "200px",
        minHeight: "200px",
        margin: 5,
    },
    grid: {
        padding: 15,
        paddingBottom: 0,
    },
    textfield: {
        width: "90%"
    }
});

function TextFieldWrapper(props) {
    return (
      <TextField
        variant="outlined"
        margin="normal"
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


class Settings extends Component {
    constructor() {
      super();
      this.state = {
        userType: "Social Initiative",    //this.props.userType after redux
        first: "Random",                  //this.props.first after redux
        last: "Name",                     //this.props.last after redux
        org: "Organization name",         //this.props.org after redux
        currentPassword: "",
        newPassword: "",
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
        const newUserData = {
          userType: this.state.userType,
          first: this.state.first,
          last: this.state.last,
          org: this.state.org,
          currentPassword: this.state.currentPassword,
          newPassword: this.state.newPassword,
          confirmPassword: this.state.confirmPassword,
        };
        //call redux to submit changes;
      };

      nameField(userType, errors) {
        if (userType === userTypes.SOCIAL_INITIATIVE) {
          return (
            <Grid item xs={12} className={this.props.classes.grid}>
                <TextFieldWrapper
                name="org"
                label="Organization"
                value={this.state.org}
                onChange={this.handleChange}
                //helperText={errors.org}
                //error={errors.org ? true : false}
                />
            </Grid>
          );
        } else {
          return (
            <Grid container spacing={3} className={this.props.classes.grid} paddingBottom={0}>
              <Grid item xs={6}>
                <TextFieldWrapper
                  name="first"
                  label="First Name"
                  value={this.state.first}
                  onChange={this.handleChange}
                  //helperText={errors.first}
                  //error={errors.first ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldWrapper
                  label="Last Name"
                  name="last"
                  value={this.state.last}
                  onChange={this.handleChange}
                  //helperText={errors.last}
                  //error={errors.last ? true : false}
                />
              </Grid>
            </Grid>
          );
        }
      }

      render() {
        const { classes } = this.props;
        const { error } = this.state;
        return (
            <div>
                <NavBar />
                <Paper className={classes.paper}>
                    <Avatar src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"} className={classes.userIcon} />
                    {/*src will be this.props.imageUrl after redux*/}
                    <Typography component="h1" variant="h5">
                        Settings
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>

                    {this.nameField(this.state.userType)}   {/*{this.nameField(this.state.userType, errors)} <<< after redux*/} 

                        <Grid item xs={12} className={classes.grid}>
                            <TextFieldWrapper
                                name="currentPassword"
                                label="Current Password"
                                type="password"
                                value={this.state.currentPassword}
                                onChange={this.handleChange}
                                //helperText={error.title}
                                //error={error.title ? true : false}
                            />
                            <TextFieldWrapper
                                name="newPassword"
                                label="New Password"
                                type="password"
                                value={this.state.newPassword}
                                onChange={this.handleChange}
                                //helperText={error.title}
                                //error={error.title ? true : false}
                            />
                            <TextFieldWrapper
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                className={classes.textfield}
                                //helperText={error.title}
                                //error={error.title ? true : false}
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                                Update
                            </Button>
                        </Grid>
                    </form>    
                </Paper>
            </div>
        )
      }
}

export default (withStyles(styles)(Settings))
