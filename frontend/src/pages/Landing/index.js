import React from 'react'
import Topbar from '../../components/topbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

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
    height: '100vh',
  },
  botBar: {
    top: 'auto',
    bottom: 0,
    color: '#000000',
    background: '#E5E5E5CC',
    elevation: '0',
  }
}));

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Topbar />
      <Grid Container component='main' >
        <CssBaseline />
        <Grid item className={classes.image} />
      </Grid>
    </div>
  );
}

export default Landing;