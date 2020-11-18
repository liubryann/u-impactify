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

import { connect } from 'react-redux';
import { getAuthenticatedUserData, updateUserDetails, uploadUserImage } from '../../redux/actions/userActions'

const styles = (theme) => ({
    paper: {
        // height: "90%",
        width: "19%",
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    userIcon: {
        minWidth: "150px",
        minHeight: "150px",
    },
});

class ProfileView extends Component {
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
            intro: credentials.intro
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Avatar src={this.state.imageURL} className={classes.userIcon} style={{ marginBottom: 15 }}/>
                <Typography variant="h5"> {this.state.name} </Typography>
                <Typography variant="h6" style={{ marginBottom: 15 }}> {this.state.email} </Typography>
                <TextField
                    id="standard-multiline-static"
                    InputProps={{readOnly: true}}
                    name="skills"
                    label="Skills"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={this.state.skills || ''}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    id="standard-multiline-static"
                    InputProps={{readOnly: true}}
                    label="Introduction"
                    name="intro"
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                    value={this.state.intro || ''}
                    style={{ marginBottom: 15 }}
                />
            </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileView));