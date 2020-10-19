import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CourseCard from '../Coursecard'
import GridList from "@material-ui/core/GridList";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        width: "100%",
    },
    gridList: {
        width: 6000,
        height: 700,
    },
}));

//for testing purposes
const courses = [
    {
        name: 'Course 1',
        instructor: 'Shree Shah',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 2',
        instructor: 'Ivin Able',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 3',
        instructor: 'Simar Bassi',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 1',
        instructor: 'Shree Shah',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 2',
        instructor: 'Ivin Able',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 3',
        instructor: 'Simar Bassi',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 1',
        instructor: 'Shree Shah',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 2',
        instructor: 'Ivin Able',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 3',
        instructor: 'Simar Bassi',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 1',
        instructor: 'Shree Shah',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 2',
        instructor: 'Ivin Able',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    },
    {
        name: 'Course 3',
        instructor: 'Simar Bassi',
        overview: "ebfhjerbf begjrtg bghjrtbg ifbhjerg bgtjrhgrt gbtrwkngtjrkg bghjrtgj bfhejrbghjrt gbghjrtjqg trbhgjtrhjg rt"
    }
]

export default function CourseWrapper(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList}>
                {courses.map((course) => (
                    <CourseCard course={course} />
                ))}
            </GridList>
        </div>
    )
}