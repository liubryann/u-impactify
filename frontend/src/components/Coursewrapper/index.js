import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CourseCard from '../Coursecard'
import GridList from "@material-ui/core/GridList";
import Typography from '@material-ui/core/Typography';

import { userCourseIds } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

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

/*
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
*/

function CourseWrapper(props) {
    const classes = useStyles();
    props.userCourseIds(props.email, props.usertype)
    const { userCourseIds } = props.courseIds;

    if(!userCourseIds){
        return (
            <div className={classes.root}>
                <Typography variant='h6' align="center" color="textSecondary">
                        Add courses to view them on your dashboard!  {/* Later we can add a button that routes to courses page */}
                </Typography>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList}>
                {userCourseIds.map((userCourseId) => (
                    <CourseCard courseId={userCourseId} />
                ))}
            </GridList>
        </div>
    )
}

const mapStateToProps = (state) => ({
    courseIds: state.user.userCourseIds,
    email: state.auth.email,
    usertype: state.auth.usertype
});

const mapDispatchToProps = {
    userCourseIds: userCourseIds
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseWrapper);