import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CourseWrapper from '../../components/Coursewrapper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { connect, useSelector, shallowEqual } from 'react-redux';
import store from '../../redux/store'
import { userTypeDetails } from '../../redux/actions/userActions';
import NavBar from "../../components/Navbar"
import { getAllCourses } from '../../redux/actions/coursesActions';
import Bottombar from "../../components/Bottombar"


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
    console.log(courses);

    if (userType === "IMPACT LEARNER") {
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
    } else if (userType === "IMPACT INSTRUCTOR") {
      return (
        <div className={classes.root}>
          <NavBar />
          <Grid container justify='space-evenly' alignItems='center'>
            <Grid item xs={5} className={classes.item}>
              <h1 className={classes.title}>My Courses</h1>
              <Paper className={classes.paper}>
                <CourseWrapper courses={courses}/>
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
          <Bottombar />
        </div>
      )
    }
  }
}

// const mapStateToProps = (state) => ({});


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


// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));