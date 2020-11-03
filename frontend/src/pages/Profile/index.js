import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import CustomButton from '../../components/CustomButton'
import EditIcon from '@material-ui/icons/Edit'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import withStyles from "@material-ui/core/styles/withStyles"
import NavBar from '../../components/Navbar'
import { Button, Container, Typography } from '@material-ui/core'

import { connect } from 'react-redux';
import { getAuthenticatedUserData, updateUserDetails } from '../../redux/actions/userActions'
import { uploadImage } from '../../redux/actions/coursesActions';
// Link to the dashboard!
const styles = (theme) => ({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        color: "#666666"
    },
    profile: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    roundBox: {
        height: "100%",
        // width: "53%",
        display: "flex",
        flexDirection: "column",
        alignitems: "center",
        border: '3px solid',
        borderRadius: 50,
        borderColor: "#AAAAAA"
    },
    who: {
        height: "100px",
        border: '3px solid',
        borderRadius: 25,
        borderColor: "#AAAAAA",
        backgroundColor: "#DDDDDD"
    },
    intro: {
        height: "160px",
        border: '3px solid',
        borderRadius: 25,
        borderColor: "#AAAAAA",
        backgroundColor: "#DDDDDD"
    },
    userIcon: {
        border: '2px solid',
        width: theme.spacing(25),
        height: theme.spacing(25),
        padding: '30px',
    },
});

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            imageURL: ""       
        };
    }
    async componentDidMount(){
        await this.props.getAuthenticatedUserData();
        const { credentials } = this.props.user.userData;
        this.setState({
            name: `${credentials.first} ${credentials.last}`,
            email: credentials.email,
            imageURL: credentials.imageUrl,
            skills: credentials.skills,
            intro: credentials.intro
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const skills = document.getElementById('skills').value;
        const intro = document.getElementById('intro').value;
        const userDetails = {
          skills: skills,
          intro: intro,
          imageUrl: this.state.imageURL
        }
        this.props.updateUserDetails(userDetails);
      }

    handleImageUpload = async (event) => {
        console.log("in handleImageButton");
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name); 
        await this.props.uploadImage(formData);
        this.setState({
            imageURL: this.props.user.userData.credentials.imageUrl
        })
        console.log(this.state.imageURL);
    }

    handleUploadButton = () => {
        console.log("in handleUploadButton");
        const fileInput = document.getElementById('uploadImage');
        fileInput.click();
    }

    render () {
        const { classes } = this.props;
        return(
            <div>
                <NavBar/>
                <form
                    noValidate
                    onSubmit={this.handleSubmit}
                >
                    <Box className={classes.root}>
                        <Box className={classes.profile}>
                            <Box pt={10} pb={1} p={15}>
                                <Avatar src={this.state.imageURL} className={classes.userIcon}/>
                            </Box>
                            <input type="file" id="uploadImage" hidden="hidden" onChange={this.handleImageUpload}/>
                            <CustomButton tip="Upload a Profile Image" onClick={this.handleUploadButton}>
                                <EditIcon color="primary"/>
                            </CustomButton>
                            <Box pt={3} p={1}>
                                <Typography variant="h5"> {this.state.name} </Typography>
                            </Box>
                            <Box p={1}>
                                <Typography variant="h5"> {this.state.email} </Typography>
                            </Box>
                        </Box>
                        <Box flexGrow={1} height='100%'>
                            <Box mt={10} ml={5} mr={3} p={5} flexGrow={1} className={classes.roundBox}>
                                <Box>
                                    <Typography variant="h4"> Skills </Typography>
                                </Box>
                                <Box mt={2} p={2}  className={classes.who}>
                                    <InputBase id="skills" defaultValue={this.state.skills} fullWidth multiline rowsMax='2' inputProps={{style: {fontSize: 30, lineHeight: 1.2}}}/>
                                </Box>
                                <Box pt={3}>
                                    <Typography variant="h4"> Introduction </Typography>
                                </Box>
                                <Box mt={2} p={2} mb={4} className={classes.intro}>
                                    <InputBase id="intro" defaultValue={this.state.intro} fullWidth multiline rowsMax='4' inputProps={{style: {fontSize: 30, lineHeight: 1.2}}}/>
                                </Box>
                            </Box>
                            <Box pt={4} pr={6} display='flex' flexDirection='row' justifyContent='flex-end'>
                                <Box pr={2}>
                                    <Button onClick={() => (window.location.href = '/profile')}>Cancel</Button>
                                </Box>
                                <Box pr={2}>
                                    <Button type="submit" variant="contained" color="primary">Save</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getAuthenticatedUserData: getAuthenticatedUserData,
    updateUserDetails: updateUserDetails,
    uploadImage: uploadImage
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));