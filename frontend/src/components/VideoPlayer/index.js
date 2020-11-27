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
        marginTop: theme.spacing(1)
    },
    title: {
        marginBottom: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(3),
        height: '100%'
    },


}));

function VideoPlayer(props){
    const classes = useStyles();
    const { title } = props;
    const { url } = props;
    const { summary } = props;

    return(
    <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" className={classes.title} >{title}</Typography>
        <div>
            <ReactPlayer controls={true} url={url} width='100%' height='100%'/>
        </div>
        <Typography variant="h6" className={classes.description}>Description</Typography>
        <Typography variant="body1">{summary}</Typography>
    </Paper>
)}

VideoPlayer.propTypes = {
    title: PropTypes.string.isRequired,
    url:  PropTypes.string.isRequired,
}

export default VideoPlayer;
