import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { userTypeDetails } from '../../redux/actions/userActions';
import { userCourses } from '../../redux/actions/userActions';
import { getAllPosts } from '../../redux/actions/postActions';

import NavBar from "../../components/NavBar"
import CourseWrapper from '../../components/Coursewrapper';
import CustomButton from '../../components/CustomButton'; 
import { userTypes } from '../../constants';
import PostWrapper from '../../components/Postwrapper';

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
    this.props.userCourses();
    this.props.userTypeDetails();
    this.props.getAllPosts();
  }

  render() {
    const { userCourses } = this.props.user;
    const { classes } = this.props;
    const { userType} = this.props.user;
    const { posts } = this.props.posts;
    const searchTitle = "";
    const postLimit = 3;
    const email = localStorage.getItem("email");

    if (userType === userTypes.IMPACT_LEARNER) {
      return (
        <div className={classes.root}>
          <NavBar />
          <Grid container justify='space-evenly' alignItems='center'>
            <Grid item xs={6} className={classes.item}>
              <h1 className={classes.title}>My Courses</h1>
              <Paper className={classes.paper}>
                <CourseWrapper enrolled= {true} isStudent={true} courses={userCourses}/>
              </Paper>
            </Grid>
            <Grid item xs={6} className={classes.item}>
              <h1 className={classes.title}>My Posts</h1>
              <Paper className={classes.paper}>
                <PostWrapper posts={posts} searchTitle={searchTitle} postLimit={postLimit} email = {email}/>
              </Paper>
            </Grid>
          </Grid>
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
                <CourseWrapper enrolled= {true} isStudent={false} courses={userCourses}/>
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
              <Paper className={classes.paper}>
                <PostWrapper posts={posts} searchTitle={searchTitle} postLimit={postLimit} email = {email}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <NavBar />
          <Grid container justify='space-evenly' alignItems='center'>
            <Grid item xs={12} className={classes.item}>
              <h1 className={classes.title}>My Posts</h1>
              <Paper className={classes.paper} style={{minHeight:"100px"}}>
                <PostWrapper posts={posts} searchTitle={searchTitle} postLimit={postLimit} email = {email}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

const mapDispatchToProps = {
  userTypeDetails: userTypeDetails,
  userCourses: userCourses,
  getAllPosts:getAllPosts
};

Dashboard.propTypes = {
  userCourses: PropTypes.func.isRequired,
  userTypeDetails: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts:state.posts
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));