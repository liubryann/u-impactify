import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Post from '../Post'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        margin: 'auto',
    },
}));

export default function PostWrapper(props) {
    const classes = useStyles();
    if(!props.posts){
        return (
            <div className={classes.root}>
                <Typography variant='h6' align="center" color="textSecondary">
                        There are no posts available.
                </Typography>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container>
                { props.posts.filter((post) => 
                    props.postType ? post.type === props.postType : post
                ).filter((post) => post.title.toLowerCase().includes(props.searchTitle.toLowerCase()))
                .slice(0,props.postLimit)
                .map((post, index) => <Post key={index} title={post.title} postType={post.type} postContent={post.content} user={post.authorName} authorEmail={post.authorEmail}/>) }
            </Grid>
        </div>
    )
}
