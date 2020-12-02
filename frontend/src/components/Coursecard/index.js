import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ProfilePopup from '../ProfilePopup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { enrollInCourse, dropCourse, resetAlert } from '../../redux/actions/coursesActions';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        flexGrow: 1,
    },
    card: {
        maxWidth: 300,
        height: '100%',
        backgroundColor: theme.palette.primary,
        margin: 'auto',
        marginBottom: '7.5px',
        marginTop: '7.5px'
    },
    expand: {
        height: 30,
        margin: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    header: {
        padding: 8,
        marginLeft: theme.spacing(1),
    },
    icon: {
        padding: 0,
        height: 30,
    },
    divider: {
        margin: `${theme.spacing(2)}px 0`
    },
    cardContent: {
        paddingTop: 0
    },
}));


function CourseCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onClick = () => {
        if (!props.enrolled) {
            props.enrollInCourse(props.course.courseId);
        } else {
            props.dropCourse(props.course.courseId);
        }
    }

    const onClose = async () => {
        await props.resetAlert();
    }

    return (
        <Card className={classes.root, classes.card} style={{ backgroundColor: ' #9badbd', color: 'white' }}>
            <CardActionArea component={Link} to={`/course/${props.course.courseId}`} style={{pointerEvents:window.location.pathname === "/courses" ? "none" : "auto"}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.course.courseImageURL}
                />
            </CardActionArea>
            <CardHeader
                className={classes.header}
                avatar={
                    <ProfilePopup pic={props.course.instructorImageURL} authorEmail={props.course.instructorEmail}/>
                }
                title={props.course.title}
                subheader={props.course.instructor}
                subheaderTypographyProps={{ variant: 'subtitle2' }}
                titleTypographyProps={{ variant: 'subtitle1' }}
            />
            <CardActions disableSpacing className={classes.icon}>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.collapse}>
                <CardContent className={classes.cardContent}>
                    <Typography variant='h6' align="center">
                        Course Overview
                    </Typography>
                    <Divider className={classes.divider} dark />
                    <Typography variant='subtitle2'>
                        {props.course.summary}
                    </Typography>
                </CardContent>
            </Collapse>
            <Container align='center'>
                <Typography variant='caption' align="center">
                {props.isStudent && (<Button onClick={onClick}> {(!props.enrolled) ? "Enroll" : "Drop"} </Button>)}
                </Typography>
            </Container>
            <Snackbar open={ props.courses.enroll } autoHideDuration={3000} onClose={ onClose }>
                <MuiAlert severity={ "success" }>
                { "Enrolled!" }
                </MuiAlert>
            </Snackbar>
            <Snackbar open={ props.courses.drop } autoHideDuration={3000} onClose={ onClose }>
                <MuiAlert severity={ "success" }>
                { "Dropped!" }
                </MuiAlert>
            </Snackbar>
            <Snackbar open={ props.courses.error.error } autoHideDuration={3000} onClose={ onClose }>
                <MuiAlert severity={ "error"}>
                    { "Sorry there was an error!" }
                </MuiAlert>
            </Snackbar>
        </Card>
    );
}

const mapStateToProps = (state) => ({
    courses: state.courses
});

const mapDispatchToProps = {
    enrollInCourse: enrollInCourse,
    dropCourse: dropCourse,
    resetAlert: resetAlert
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseCard));