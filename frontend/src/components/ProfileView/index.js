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
import { getAuthenticatedUserData, updateUserDetails, uploadUserImage, getUserData } from '../../redux/actions/userActions'

const styles = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    userIcon: {
        minWidth: "150px",
        minHeight: "150px",
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: '#666666 !important'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `#BBBBBB !important`
        }
    },
    cssFocused: {},
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
        const userData = {
            email: this.props.authorEmail
        };
        await this.props.getUserData(userData);

        const authorCred = this.props.user.authorData;
        this.setState({
            name: `${authorCred.first} ${authorCred.last}`,
            email: authorCred.email,
            imageURL: authorCred.imageUrl,
            skills: authorCred.skills,
            intro: authorCred.intro
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Avatar src={this.state.imageURL} className={classes.userIcon} style={{ marginBottom: 10, marginTop: 10 }} />
                <Typography variant="h6"> {this.state.name} </Typography>
                <Typography variant="h7" style={{ marginBottom: 15 }}> {this.state.email} </Typography>
                <TextField
                    id="standard-multiline-static"
                    InputProps={{ readOnly: true }}
                    name="skills"
                    label="Skills"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={this.state.skills || ''}
                    style={{ marginBottom: 20 }}
                    InputLabelProps={{
                        style: { color: '#666666' },
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused
                        }
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}
                />
                <TextField
                    id="standard-multiline-static"
                    InputProps={{ readOnly: true }}
                    label="Introduction"
                    name="intro"
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                    value={this.state.intro || ''}
                    style={{ marginBottom: 15 }}
                    InputLabelProps={{
                        style: { color: '#666666' },
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused
                        }
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}
                />
            </Paper>
        )
    }
}

const mapDispatchToProps = {
    getAuthenticatedUserData: getAuthenticatedUserData,
    updateUserDetails: updateUserDetails,
    uploadUserImage: uploadUserImage,
    getUserData: getUserData
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileView));