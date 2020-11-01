import React, { Component } from 'react'
import NavBar from '../../components/Navbar';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CustomButton from '../../components/CustomButton';
import Typography from '@material-ui/core/Typography';
import { FormHelperText } from "@material-ui/core";

import { getAuthenticatedUserData } from '../../redux/actions/userActions';
import { uploadImage, submitCourse } from '../../redux/actions/coursesActions';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { defaultCourseImg } from '../../constants.js';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  header: {
    color: theme.palette.text.primary
  },
  title: {
    width: '30%',
    marginBottom: theme.spacing(1)
  },
  summary: {
    width: '30%',
    marginBottom: theme.spacing(3)
  },
  courseImg: {
    width: '30%',
    height: '20%'
  }
});

export class CourseCreation extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            summary: "",
            courseImageURL: "",
            instructor:"",
            instructorImageURL: "",
            instructorEmail: "",
            error: {}
        };
    }

    async componentDidMount() {
      await this.props.getAuthenticatedUserData();
      const credentials = this.props.user.userData.credentials;
      this.setState({
        instructor: `${credentials.first} ${credentials.last}`,
        instructorImageURL: credentials.imageUrl, 
        instructorEmail: credentials.email
      })
    }

    componentDidUpdate(prevProps) {
      if (this.props.courses.error !== prevProps.courses.error) {
        this.setState({ error: this.props.courses.error });
      }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    handleSubmit = (event) => {
      event.preventDefault();
      const newCourse = {
        title: this.state.title,
        summary: this.state.summary,
        courseImageURL: this.state.courseImageURL,
        instructor: this.state.instructor,
        instructorImageURL: this.state.instructorImageURL,
        instructorEmail: this.state.instructorEmail
      }
      this.props.submitCourse(newCourse,this.props.history);
    }

    handleImageUpload = async (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image, image.name); 
      await this.props.uploadImage(formData);
      this.setState({
        courseImageURL: this.props.courses.courseImageURL
      })
    }

    handleUploadButton = () => {
      const fileInput = document.getElementById('uploadImage');
      fileInput.click();
    }

    render() {
        const { userData } = this.props.user;
        const { classes } = this.props;
        const { loading } = this.props.courses; 
        const { error } = this.state;
      
        return (
            <div>
                <NavBar/>
                <div className={classes.root}>
                <header className={classes.header}>
                <Typography variant="h5">Create a Course</Typography>
                </header>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <TextField className={classes.title} id="title" name="title" label="Title" value={this.state.title} onChange={this.handleChange} helperText={error.title} error={error.title}/>
                    <br/>
                    <TextField className={classes.summary} id="summary" name="summary" label="Course Summary" multiline rows={4} value={this.state.summary} onChange={this.handleChange} helperText={error.summary} error={error.summary}/>
                    <br/>

                    <img className={classes.courseImg} src={this.state.courseImageURL ? this.state.courseImageURL : defaultCourseImg} />
                  
                    <input
                      type="file"
                      id="uploadImage"
                      hidden="hidden"
                      onChange={this.handleImageUpload}
                      />
                    <CustomButton
                      tip="Upload a course image"
                      onClick={this.handleUploadButton}
                      >
                        <EditIcon color="primary"/>
                      </CustomButton>
                      {error.courseImageURL && (
                    <FormHelperText error={error.courseImageURL ? true : false}>
                      Required
                    </FormHelperText>
                    )}
                    <br/>
        
                    <br/>
                
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        Submit
                    </Button>
                </form>
                </div>
            </div>
        )
    }
}

CourseCreation.propTypes = {
  user: PropTypes.object.isRequired,
  getAuthenticatedUserData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  courses: state.courses
})

const mapDispatchToProps = {
  getAuthenticatedUserData: getAuthenticatedUserData,
  uploadImage: uploadImage,
  submitCourse: submitCourse
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CourseCreation)));
