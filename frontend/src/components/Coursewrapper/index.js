import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CourseCard from '../Coursecard'
import GridList from "@material-ui/core/GridList";
import Typography from '@material-ui/core/Typography';

// import { userCourseIds } from '../../redux/actions/userActions';
// import { connect, useSelector, shallowEqual } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        width: "100%",
        margin: 'auto',
    },
    gridList: {
        height: "100%",
        width: "100%"
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
    // const email = localStorage.getItem('email');
    // console.log("coursewrapper " + props.userType);
    // props.userCourseIds(email, props.userType)
    // const userCourseIds = useSelector(state => state.user.userCourseIds, shallowEqual);
    const courses = props.courses;
    const enrolled = props.enrolled; // true will show "enroll" on the button, "false" will show "unenroll"
    const isStudent = props.isStudent;
    if(!courses){
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
            {courses.map((course, index) => <CourseCard key={index} course={course} enrolled={enrolled} isStudent={isStudent} />)}
                {/* {userCourseIds.map((userCourseId) => (
                    <CourseCard courseId={userCourseId}/>
                ))} */}
            </GridList>
        </div>
    )
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {
//     userCourseIds: userCourseIds
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CourseWrapper);
export default CourseWrapper;