import React, { useEffect } from 'react';
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

// import { connect, useSelector, shallowEqual } from 'react-redux';

// import { getCourseName, getCourseInstructor, getCourseOverview } from '../../redux/selectors/coursesSelectors';
// import { getCourse } from '../../redux/actions/coursesActions'
// import store from '../../redux/store';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        flexGrow: 1,
    },
    card: {
        maxWidth: 300,
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
    const [expanded, setExpanded] = React.useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    

    return (
        <Card className={classes.root, classes.card} style={{ backgroundColor: ' #9badbd', color: 'white' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.course.courseImageURL}
                />
            </CardActionArea>
            <CardHeader
                className={classes.header}
                avatar={
                    <Avatar src={props.course.instructorImageURL} />
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
        </Card>
    );
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {
//     getCourse: getCourse
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CourseCard);
export default CourseCard;