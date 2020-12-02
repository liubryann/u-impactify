import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import CustomButton from '../../components/CustomButton'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import withStyles from "@material-ui/core/styles/withStyles"
import NavBar from '../../components/NavBar'
import { Button, TextField, Typography } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAuthenticatedUserData, updateUserDetails, uploadUserImage } from '../../redux/actions/userActions'

const styles = (theme) => ({
    root: {
        height: "100%",
    },
    profile: {
        padding: theme.spacing(4),
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    userIcon: {
        minWidth: "200px",
        minHeight: "200px"
    },
    paper: {
        height: "90%",
        padding: theme.spacing(4),
    },
    container: {
        justifyContent: 'center',
        marginTop: theme.spacing(4),

    },
    buttons: {
        width: '100%',
        textAlign: 'center',
        bottom: 0
    },
});

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            imageURL: "",
            skills: "",
            intro: ""
        };
    }
    async componentDidMount() {
        await this.props.getAuthenticatedUserData();
        const { credentials } = this.props.user.userData;
        this.setState({
            name: `${credentials.first} ${credentials.last}`,
            email: credentials.email,
            imageURL: credentials.imageUrl,
            skills: credentials.skills,
            intro: credentials.intro,
            save: false 
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const skills = this.state.skills;
        const intro = this.state.intro;
        const userDetails = {
            skills: skills,
            intro: intro,
            imageUrl: this.state.imageURL
        }
        this.props.updateUserDetails(userDetails);

        this.setState({
            save: true
        })
    }

    handleImageUpload = async (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        await this.props.uploadUserImage(formData);
        this.setState({
            imageURL: this.props.user.userImageURL
        })
    }

    handleUploadButton = () => {
        const fileInput = document.getElementById('uploadImage');
        fileInput.click();
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavBar />
                <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                    <div className={classes.root}>
                        <Grid container spacing={3} className={classes.container}>
                            <Grid item xs={3}>
                                <Paper className={classes.profile}>
                                    <Avatar src={this.state.imageURL} className={classes.userIcon} />
                                    <input type="file" id="uploadImage" hidden="hidden" onChange={this.handleImageUpload} />
                                    <CustomButton tip="Upload a Profile Image" onClick={this.handleUploadButton}>
                                        <EditIcon color="primary" />
                                    </CustomButton>
                                    <Typography variant="h5"> {this.state.name} </Typography>
                                    <br />
                                    <Typography variant="h6"> {this.state.email} </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <TextField
                                        id="standard-multiline-static"
                                        name="skills"
                                        label="Skills"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={this.state.skills || ''}
                                        style={{ marginBottom: 40 }}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Introduction"
                                        name="intro"
                                        fullWidth
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        value={this.state.intro || ''}
                                        onChange={this.handleChange}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className={classes.buttons}>
                        <Button to="/home" component={Link}>Cancel</Button>
                    
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                    </div>
                </form>
                <Snackbar open={ this.state.save } autoHideDuration={3000} onClose={ () => { this.setState({ save: false })} }>
                <MuiAlert severity={ "success" }>
                { "Saved!" }
                </MuiAlert>
            </Snackbar>
            </div >
        )
    }
}

const mapDispatchToProps = {
    getAuthenticatedUserData: getAuthenticatedUserData,
    updateUserDetails: updateUserDetails,
    uploadUserImage: uploadUserImage
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));