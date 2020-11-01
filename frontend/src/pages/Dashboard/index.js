import React, { Component } from 'react'
import { connect, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { userTypeDetails } from '../../redux/actions/userActions';
import { getAllCourses } from '../../redux/actions/coursesActions';

import NavBar from "../../components/Navbar"
import Bottombar from "../../components/Bottombar"
import CourseWrapper from '../../components/Coursewrapper';
import CustomButton from '../../components/CustomButton'; 
import { userTypes } from '../../constants';


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    margin: 5,
  },
  title: {
    textAlign: 'center',
  },
  item: {
    paddingBottom: '0.5%',
  }, 
  createCourseBtn: {
    float: 'right',
  },
  preventOverflow: {
    overflow:'auto'
  }

});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAllCourses();
    this.props.userTypeDetails();
  }

  render() {
    const { courses } = this.props.courses;
    const { classes } = this.props;
    const { userType } = this.props.user;

    if (userType === userTypes.IMPACT_LEARNER) {
      return (
        <div className={classes.root}>
          <NavBar />
          <Grid container justify='space-evenly' alignItems='center'>
            <Grid item xs={6} className={classes.item}>
              <h1 className={classes.title}>My Courses</h1>
              <Paper className={classes.paper}>
                <CourseWrapper courses={courses}/>
              </Paper>
            </Grid>
            <Grid item xs={6} className={classes.item}>
              <h1 className={classes.title}>Suggested Courses</h1>
              <Paper className={classes.paper}>{/* Courses go here */}</Paper>
            </Grid>
          </Grid>
          <Bottombar />
        </div>
      )
    } else if (userType === userTypes.IMPACT_CONSULTANT) {
      return (
        <div className={classes.root}>
          <NavBar />
          <Grid container justify='space-evenly' alignItems='center'>
            <Grid item xs={5} className={classes.item}>
              <h1 className={classes.title}>My Courses</h1>
              <Paper className={classes.paper}>
                <CourseWrapper courses={courses}/>
                <div className={classes.preventOverflow}>
                 <CustomButton
                    tip="Create a new course"
                    btnClassName={classes.createCourseBtn}
                  >
                    <Link to="/course-creation">
                      <AddCircleIcon fontSize="large" color="primary"/>
                    </Link>
                  </CustomButton>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={5} className={classes.item}>
              <h1 className={classes.title}>My Posts</h1>
              <Paper className={classes.paper}>{/* Posts go here */}</Paper>
            </Grid>
          </Grid>
          <Bottombar />
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <NavBar />
          <Grid container justify='space-evenly' alignItems='center'>
            <Grid item xs={12} className={classes.item}>
              <h1 className={classes.title}>My Courses</h1>
              <Paper className={classes.paper}>
                <CourseWrapper courses={courses} justify="space-evenly" />
              </Paper>
            </Grid>
          </Grid>
          <Bottombar position="sticky" />
        </div>
      )
    }
  }
}

const mapDispatchToProps = {
  userTypeDetails: userTypeDetails,
  getAllCourses: getAllCourses
};

Dashboard.propTypes = {
  getAllCourses: PropTypes.func.isRequired,
  userTypeDetails: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  courses: state.courses,
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));