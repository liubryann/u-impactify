import React, { Component } from 'react'

import withStyles from "@material-ui/core/styles/withStyles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from '@material-ui/core/Grid'

const styles = (theme) => ({

})

class Profile extends Component {
    render() {
        return (
            <div>
                <Grid container component="main">
                    <CssBaseline />
                    <Grid item xs={false} />
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Profile)