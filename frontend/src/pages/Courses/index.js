import { withStyles, Paper } from '@material-ui/core';
import React, { Component } from 'react'
import NavBar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Bottombar from "../../components/Bottombar"
import CourseWrapper from '../../components/Coursewrapper';

import { connect } from 'react-redux';
import { getAllCourses } from '../../redux/actions/coursesActions';
import { userTypeDetails } from '../../redux/actions/userActions';

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
      }
});

class Courses extends Component {
    componentDidMount() {
      this.props.getAllCourses();
      this.props.userTypeDetails();
    }
    
    
    render() {
      const { classes } = this.props;
      const { courses } = this.props.courses;
      const { userType } = this.props.user;
      var isStudent;
      userType == userTypes.IMPACT_LEARNER ? isStudent = true : isStudent = false;
      return(
        <div className={classes.root}>
          <NavBar/>
          <Grid container justify='space-evenly' alignItems='center'>
              <Grid item xs={12} className={classes.item}>
                <h1 className={classes.title}>Courses</h1>
                <Paper className={classes.paper}>
                  <CourseWrapper enrolled= {false} isStudent={isStudent} courses={courses}/>
                </Paper>
              </Grid>
          </Grid>
          <Bottombar position="sticky" />
        </div>
      )
    }
}

const mapDispatchToProps = {
  getAllCourses: getAllCourses,
  userTypeDetails: userTypeDetails
};

const mapStateToProps = (state) => ({
  courses: state.courses,
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Courses));