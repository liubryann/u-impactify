import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  appBar: {
    color: '#000000',
    background: ' #dbd9d7',
  },
}));

function Topbar() {
  const classes = useStyles();
  return (
      <AppBar position="fixed" className={classes.appBar} elevation='0'>
            <Toolbar>
                <Box display="flex" flexGrow={1}>
                    <Typography variant="h6" className={classes.topBar}>
                        U-IMPACTIFY
                    </Typography>
                </Box>
                <Button href="/login" color="default">
                    Sign in
                </Button>
                <Button href="/signup" color="default">
                    Sign up
                </Button>
            </Toolbar>
        </AppBar>

  );
}

export default Topbar;