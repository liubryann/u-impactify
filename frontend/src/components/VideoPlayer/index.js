import React from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    description:{
        textAlign:"center"
        
    },

}));

function VideoPlayer(props){
    const classes = useStyles();
    const { title } = props;
    const { url } = props;
    const { summary } = props;

    return(
    <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={3}>
            <Typography variant="h4">{title}</Typography>
        </Grid>   
        <Grid item xs={12}>
            <ReactPlayer controls="true" url={url}/>
            <Typography variant="h6">Summary</Typography>
            <Paper className={classes.description}>
                {summary}
            </Paper>
        </Grid> 
    </Grid> 
)}

VideoPlayer.propTypes = {
    title: PropTypes.string.isRequired,
    url:  PropTypes.string.isRequired,
}

export default VideoPlayer;
