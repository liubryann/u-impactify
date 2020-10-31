import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import withStyles from "@material-ui/core/styles/withStyles";
import NavBar from '../../components/Navbar'
import { Typography } from '@material-ui/core'

import { connect } from 'react-redux';
import { getAuthenticatedUserData } from '../../redux/actions/userActions';
import store from '../../redux/store';
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
        width: theme.spacing(25),
        height: theme.spacing(25),
        padding: '30px',
    },
});

class Profile extends Component {
    componentDidMount(){
        console.log("component did mount");
        this.props.getAuthenticatedUserData();
    }

    render () {
        const { classes } = this.props;
        const { userDetails } = this.props.user
        console.log(store.getState());
        return(
            <div>
                <NavBar/>
                <Box className={classes.root}>
                    <Box className={classes.profile}>
                        <Box pt={10} pb={4} p={15}>
                            <Avatar alt="Bob" className={classes.userIcon}/>
                        </Box>
                        <Box p={1}>
                            <Typography variant="h5"> {userDetails.name} </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography variant="h5"> {userDetails.email} </Typography>
                        </Box>
                    </Box>
                    <Box mt={10} ml={5} mr={3} p={5} flexGrow={1} className={classes.roundBox}>
                        <Box>
                            <Typography variant="h4"> Who am I? </Typography>
                        </Box>
                        <Box mt={2} p={2}  className={classes.who}>
                            <Typography variant="h4"> I don't even know who I am </Typography>
                        </Box>
                        <Box pt={7}>
                            <Typography variant="h4"> Introduction </Typography>
                        </Box>
                        <Box mt={2} p={2} mb={3} className={classes.intro}>
                            <Typography variant="h4"> I want coffee </Typography>
                        </Box>
                    </Box>
                </Box>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getAuthenticatedUserData: getAuthenticatedUserData
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));