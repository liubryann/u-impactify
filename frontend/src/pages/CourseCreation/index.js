import React, { Component } from 'react'
import NavBar from '../../components/Navbar';
import Bottombar from '../../components/Bottombar';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CustomButton from '../../components/CustomButton';
import Typography from '@material-ui/core/Typography';
import { FormHelperText } from "@material-ui/core";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import PublishIcon from '@material-ui/icons/Publish';

import { getAuthenticatedUserData } from '../../redux/actions/userActions';
import { uploadImage, submitCourse } from '../../redux/actions/coursesActions';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { defaultCourseImg } from '../../constants.js';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  pageHeader: {
    marginBottom: theme.spacing(3)
  },
  header: {
    color: theme.palette.text.primary
  },
  paper: {
    padding: theme.spacing(2),
    height: "90%"
  },
  title: {
    width: '80%',
    marginBottom: theme.spacing(1)
  },
  summary: {
    width: '80%',
    marginBottom: theme.spacing(3)
  },
  courseImg: {
    width: '80%',
    height: '50%'
  },
  treeView: {
    marginTop: theme.spacing(3)
  },
  newSection: {
    marginLeft: theme.spacing(3),
    width: '90%',
  },
  submitButton: {
    textAlign: 'center'
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
            error: {},
            sections: [],
            selected: "",
            newSection: "",
            sectionCount: 1,
            desc: "",        
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

    handleSelect = (event, nodeId) => {
      this.setState({ selected: nodeId })
    }

    handleNewSectionEnter = (event) => {
      if (event.key === 'Enter') {
        const newSection = `Section ${this.state.sectionCount++}: ${this.state.newSection}`;
        const URLs = `${newSection}URLs`;
        const desc = `${newSection}Desc`;
        this.setState(prevState => ({
          sections: [...prevState.sections, newSection],
          [newSection]: [],
          [URLs]: [],
          [desc]: [],
          newSection: ""
        }))
      }
    }

    handleNewSubsectionEnter = (event) => {
      if (event.key === 'Enter') {
        const id = event.target.id;
        const name = event.target.name;
        this.setState(prevState => ({
          [id]: [...prevState[id], this.state[name]],
          [name]: ""
        }))
      }
    }

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

        let outline = (
          this.state.sections.map((section) => 
              <TreeItem nodeId={section} label={section}>
                {this.state[section].map((subsection) => 
                <TreeItem nodeId={subsection} label={subsection}/> )}
                <Input 
                  id={section} 
                  name={`${section}Value`} 
                  className={classes.newSection} 
                  disableUnderline margin="dense" 
                  placeholder="New subsection" 
                  inputProps={{ 'aria-label': 'description' }} 
                  onChange={this.handleChange} 
                  value={this.state[`${section}Value`]}
                  onKeyPress={this.handleNewSubsectionEnter} />
              </TreeItem>
            )
        )
      
        return (
          <div>
            <NavBar/>
            <div className={classes.root}>
            <Typography className={classes.pageHeader} variant="h5">Create a course</Typography>
              <Grid container spacing={3}>
              <Grid item xs={4} >
                <Paper className={classes.paper}>
                  <Typography variant="h6">Card</Typography>
              
                  <br/>
                  <form onSubmit={this.handleSubmit}>
                      <TextField className={classes.title} id="title" name="title" label="Title" value={this.state.title} onChange={this.handleChange} helperText={error.title} error={error.title}/>
                      <br/>
                      <TextField className={classes.summary} id="summary" name="summary" label="Course summary" multiline rows={4} value={this.state.summary} onChange={this.handleChange} helperText={error.summary} error={error.summary}/>
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
                  </form>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography className={classes.header} variant="h6">Outline</Typography>
                  <TreeView
                    className={classes.treeView}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={this.handleSelect}
                  >
                    {outline}
                    <Input 
                      id="newSection" 
                      name="newSection" 
                      className={classes.newSection}  
                      disableUnderline 
                      margin="dense" 
                      placeholder="New section" 
                      inputProps={{ 'aria-label': 'description' }} 
                      onChange={this.handleChange} 
                      value={this.state.newSection} 
                      onKeyPress={this.handleNewSectionEnter}
                        />
                  </TreeView>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography className={classes.header} variant="h6">Content</Typography>
                  <TextField className={classes.summary} id="desc" name="desc" label="Describe section" multiline rows={4} value={this.state.desc} onChange={this.handleChange}/>
                  <br/>
                  <Button variant="outlined">
                    Upload
                    <PublishIcon/>
                  </Button>
                  <br/>
                  <br/>
                  <Typography variant="caption">Upload a video for each subsection</Typography>
                </Paper>
                </Grid>
              </Grid>
              </div>
              <div className={classes.submitButton}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  Publish course
                </Button>
              </div>
              <Bottombar />
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
