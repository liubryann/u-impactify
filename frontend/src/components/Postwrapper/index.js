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
        width: "70%",
        margin: 'auto',
    },
}));

//to test posts
const posts = [
    {
        title: 'Post 1',
        postType: 'OFFERING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 2',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 3',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 1',
        postType: 'OFFERING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 2',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 3',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 1',
        postType: 'OFFERING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 2',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 3',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 1',
        postType: 'OFFERING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 2',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        title: 'Post 3',
        postType: 'ASKING',
        postContent: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rtebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    }
]

// to test no posts
// const posts = undefined

export default function PostWrapper(props) {
    const classes = useStyles();

    if(!posts){
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
                    {posts.map((course) => <Post title={course.title} postType={course.postType} postContent={course.postContent}/>)}
            </Grid>
        </div>
    )
}
