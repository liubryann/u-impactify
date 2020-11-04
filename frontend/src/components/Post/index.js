import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const { postTypes } = require("../../constants");


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
    },
    card: {
        //maxWidth can be modified based on giving garden page if required
        maxWidth: 800,  
        backgroundColor: theme.palette.primary,
        margin: 'auto',
        marginBottom: '7.5px',
        marginTop: '7.5px'
    },
    expand: {
        height: 30,
        margin: 'auto',
    },
    post: {
        padding: 8,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),

    },
    icon: {
        padding: 0,
        height: 30,
        width: "100%"
    },
    verticalDivider: {
        height: "85%",
        right: "0%"
    },
    gridItem: {
        position: "relative",
    },
    toCenterComponent: {
        position: "absolute",
        top: "50%",
        transform: 'translate(-50%, -50%)',
        alignItems: "center",
        margin: 0,
        left: "50%",
    }
}));


export default function Post(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const read = expanded ? "Read Less" : "Read More"
    const postText = expanded ? props.postContent : props.postContent.slice(0, 185) + " ..."

    return (
        <Grid item xs={12}>
            <Card className={[classes.root, classes.card].join(" ")} style={{ backgroundColor: ' #9badbd', color: 'white' }}>
                <Grid container>
                    <Grid item xs={9}>
                        <CardHeader
                            className={classes.post}
                            title={props.title}
                            subheader={props.postType === "OFFERING" ? postTypes.OFFERING : postTypes.ASKING}
                            subheaderTypographyProps={{ variant: 'subtitle2' }}
                            titleTypographyProps={{ variant: 'h5' }}
                        />
                        <Typography variant="body2" className={classes.post}>
                            {postText}
                        </Typography>
                        <CardActions disableSpacing className={classes.icon}>

                            <Button
                                className={clsx(classes.expand)}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                            >
                                {read}
                            </Button>
                        </CardActions>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Divider className={[classes.verticalDivider, classes.toCenterComponent].join(" ")} dark='true' orientation="vertical" />
                    </Grid>
                    <Grid item className={classes.gridItem} xs={3}>
                        <Button className={classes.toCenterComponent} size="large" >Interested</Button>
                        {/*will need to implement Button task after post notifications are discussed*/}
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}
