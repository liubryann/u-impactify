import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color: '#000000',
    textAlign: 'left',
  },
  botBar: {
    top: 'auto',
    bottom: 0,
    background: 'transparent',
    boxShadow: 'none',
    position: 'fixed',
    height: '50px'
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <AppBar className={classes.botBar}>
      <Toolbar>
        <Typography className={classes.title}>
          Made with 💖
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;