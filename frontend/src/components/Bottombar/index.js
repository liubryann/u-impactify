import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar'
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    flexGrow: 1,
    textAlign: "right",
  },
  botBar: {
    top: 'auto',
    bottom: 0,
    color: '#000000',
    background: '#E5E5E5CC',
    elevation: '0',
  }
}));

function Bottombar() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.botBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.insButton} color="inherit" aria-label="menu">
          <InstagramIcon />
        </IconButton>
        <IconButton edge="start" className={classes.faceButton} color="inherit" aria-label="menu">
          <FacebookIcon />
        </IconButton>
        <IconButton edge="start" className={classes.twitterButton} color="inherit" aria-label="menu">
          <TwitterIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Contact us
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Bottombar;