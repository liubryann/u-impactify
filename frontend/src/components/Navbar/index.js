import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { logoutUser } from '../../redux/actions/authActions';
import { defaultCourseImg } from '../../constants.js';

import { connect } from 'react-redux';
import { getAuthenticatedUserData } from '../../redux/actions/userActions'


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    
  },
  button: {
    marginLeft: theme.spacing(4),
    
  },
  bar:{
    color:theme.palette.primary,
  },
  grow:{
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  signout: {
    marginRight: theme.spacing(4),
  }
});

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
        imageURL: ""       
    };
}
  async componentDidMount(){
    await this.props.getAuthenticatedUserData();
    this.setState({
      imageURL: this.props.user.userData.credentials.imageUrl
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              U-Impactify
            </Typography>
            <Button className={classes.button}>
              <Typography>Dashboard</Typography>
            </Button>
            <Button className={classes.button} onClick={() => (window.location.href = '/giving-garden')}>
              <Typography>Giving Garden</Typography>
            </Button>
            <Button className={classes.button} onClick={() => (window.location.href = '/courses')}>
              <Typography>Courses</Typography>
            </Button>
            <Button className={classes.button}>
              <Typography>Settings</Typography>
            </Button>
            <div className={classes.grow}/>
            <Button className={classes.signout} onClick={() => {logoutUser(); window.location.href='/login';}}>
              <Typography>Sign out</Typography>
            </Button>
            <Button onClick={() => (window.location.href = '/profile')}>
              <Avatar src={this.state.imageURL} className={classes.large}/>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

const mapDispatchToProps = {
  getAuthenticatedUserData: getAuthenticatedUserData
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));
