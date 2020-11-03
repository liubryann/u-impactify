import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { logoutUser } from '../../redux/actions/authActions';


const useStyles = makeStyles((theme) => ({
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
}));

export default function NavBar() {
  const classes = useStyles();

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
          <Avatar alt="Bob" className={classes.large}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
