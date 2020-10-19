import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        flexGrow: 1,
    },
    card: {
        maxWidth: 300,
        backgroundColor: theme.palette.primary,
        margin: 'auto',
        marginBottom: '15px'
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

export default function CourseCard(props) {
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
                    image="data:image/png;base64,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"
                />
            </CardActionArea>
            <CardHeader
                className={classes.header}
                avatar={
                    <Avatar
                        alt={props.course.instructor}
                    ></Avatar>
                }
                title={props.course.name}
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
                        {props.course.overview}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}