import React, { Component } from 'react'
import NavBar from '../../components/NavBar';
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import { getAuthenticatedUserData } from '../../redux/actions/userActions';
import { uploadImage, uploadVideo, submitCourse } from '../../redux/actions/coursesActions';
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
    position: 'relative',
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
  upload: {
    width: '85px',
  },
  progress: {
    position: 'absolute',
  },
  fade: {
    opacity: "20%"
  },
  save: {
    textAlign: 'center',
    position: 'absolute', 
    bottom: 20,
    width: '100%', 
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
            vidName: "",    
            save: false
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
      const [section, subsection] = nodeId.split(";");
      const index = this.state[section].indexOf(subsection);
      const desc = this.state[`${section}Desc`][index]; 
      const vidName = this.state[`${section}VidName`][index];
      this.setState({ 
        selected: nodeId,
        desc: desc,
        vidName: vidName
       })
    }

    handleNewSectionEnter = (event) => {
      if (event.key === 'Enter' && this.state.newSection.trim() !== "") {
        const newSection = `Section ${this.state.sectionCount++}: ${this.state.newSection}`;
        const URLs = `${newSection}URLs`;
        const desc = `${newSection}Desc`;
        const vidName = `${newSection}VidName`; 
        this.setState(prevState => ({
          sections: [...prevState.sections, newSection],
          [newSection]: [],
          [URLs]: [],
          [vidName]: [],
          [desc]: [],
          newSection: ""
        }))
      }
    }

    handleNewSubsectionEnter = (event) => {
      const name = event.target.name;
      const id = event.target.id;
      if (event.key === 'Enter'  && this.state[name]) {
        this.setState(prevState => ({
          [id]: [...prevState[id], this.state[name]],
          [name]: "",
          [`${id}Desc`]: [...prevState[`${id}Desc`], ""],
          [`${id}URLs`]: [...prevState[`${id}URLs`], ""],
          [`${id}VidName`]: [...prevState[`${id}VidName`], ""]
        }))
      }
    }

    handleVideoUpload = async (event) => {
      const selected = this.state.selected; 
      if (!selected.includes(";") || selected === "") {
        this.setState({
          error: {
            content: "Select a subsection"
          }
        })
      }
      else {
        const [section, subsection] = selected.split(";"); 
        const index = this.state[section].indexOf(subsection);
        const video = event.target.files[0];
        const formData = new FormData();
        formData.append('video', video, video.name); 
        formData.append('Content-Type', video.type);
        await this.props.uploadVideo(formData); 
        const vidNames = this.state[`${section}VidName`];
        vidNames[index] = video.name;
        const vidURLs = this.state[`${section}URLs`];
        vidURLs[index] = this.props.courses.videoURL; 
        this.setState({
          [`${section}URLs`]: vidURLs,
          [`${section}VidName`]: vidNames,
          vidName: video.name
        })
      }
    }

    handleUploadVideoButton = () => {
      const fileInput = document.getElementById('uploadVideo');
      fileInput.click();
    }

    handleSave = () => {
      const selected = this.state.selected; 
      if (!selected.includes(";") || selected === "") {
        this.setState({
          error: {
            content: "Select a subsection"
          }
        })
      }
      else {
        const [section, subsection] = selected.split(";"); 
        const index = this.state[section].indexOf(subsection);
        const desc = this.state[`${section}Desc`]; 
        desc[index] = this.state.desc; 
        this.setState({
          error: {},
          [`${section}Desc`]: desc,
          save: true
        })
      }
    }

    handleSubmit = (event) => {
      event.preventDefault();
      let newCourse = {
        title: this.state.title,
        summary: this.state.summary,
        courseImageURL: this.state.courseImageURL,
        instructor: this.state.instructor,
        instructorImageURL: this.state.instructorImageURL,
        instructorEmail: this.state.instructorEmail,
        sections: this.state.sections
      }

      let content = { }; 
      for(const section of this.state.sections) {
        const sectionContent = { }; 
        sectionContent.subsections = this.state[section];
        sectionContent.descriptions = this.state[`${section}Desc`];
        sectionContent.URLs = this.state[`${section}URLs`]; 

        content = {
          ...content,
          [section]: sectionContent
        }
      }

      newCourse = {
        ...newCourse,
        'content': content 
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
        const { classes } = this.props;
        const { loading } = this.props.courses; 
        const { error } = this.state;

        let outline = (
          this.state.sections.map((section) => 
              <TreeItem key={section} nodeId={section} label={section}>
                {this.state[section].map((subsection) => 
                <TreeItem key={`${section};${subsection}`} nodeId={`${section};${subsection}`} label={subsection}/> )}
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
                  <form  id="form" onSubmit={this.handleSubmit}>
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
                    disableSelection={loading}
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
                  <TextField className={classes.summary} id="desc" name="desc" label="Describe subsection" multiline rows={4} value={this.state.desc || ''} onChange={this.handleChange} helperText={error.content} error={error.content}/>
                  <br/>
                  <input
                        type="file"
                        id="uploadVideo"
                        hidden="hidden"
                        onChange={this.handleVideoUpload}
                        />
                  <Button className={classes.upload} variant="outlined" onClick={this.handleUploadVideoButton}>
                    <PublishIcon className={loading ? classes.fade : ""}/>
                    {loading && (
                     <CircularProgress color="secondary" size={25} className={classes.progress} />
                    )}
                  </Button>
                  <br/>
                  {error.videoUpload && (
                    <FormHelperText error={error.videoUpload ? true : false}>
                      Videos need to be mp4
                    </FormHelperText>
                  )}
                  <Typography variant="caption">{this.state.vidName ? this.state.vidName : 'Upload a video'}</Typography>
                  <br/>
                  <div className={classes.save}>
                    <Button variant="outlined" onClick={this.handleSave}>
                      Save
                    </Button>
                    <br/>
                    <Typography variant="caption">Save content for each subsection</Typography>
                  </div>
                </Paper>
                </Grid>
              </Grid>
              </div>
              <div className={classes.submitButton}>
                <Button form="form" type="submit" variant="contained" color="primary" disabled={loading}>
                  Publish course
                </Button>
              </div>
              <Snackbar open={this.state.save} autoHideDuration={3000} onClose={() => this.setState({ save: false })}>
                <MuiAlert severity="success">
                  Subsection saved!
                </MuiAlert>
              </Snackbar>
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
  uploadVideo: uploadVideo, 
  submitCourse: submitCourse
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CourseCreation)));
