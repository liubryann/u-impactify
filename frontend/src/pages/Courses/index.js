import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import NavBar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Bottombar from "../../components/Bottombar"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
      },
      paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.paper,
        margin: 5,
      },
      title: {
        textAlign: 'center',
      },
      item: {
        paddingBottom: '0.5%',
      }
}));

export default function Courses() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
          <NavBar/>
          <Grid container justify='space-evenly' alignItems='center'>
              <Grid item xs={12} className={classes.item}>
                <h1 className={classes.title}>Courses</h1>
                <Paper className={classes.paper}>
                    {/*Courses Go Here*/}
                </Paper>
              </Grid>
          </Grid>
          <Bottombar position="sticky" />
        </div>
        
    )
}