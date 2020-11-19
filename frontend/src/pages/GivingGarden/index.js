import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateIcon from '@material-ui/icons/Create';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import NavBar from "../../components/NavBar";
import PostWrapper from "../../components/Postwrapper";
import ScrollButton from "../../components/ScrollButton";
import { withStyles } from '@material-ui/core';
import { postTypes } from '../../constants';

import { getAllPosts, makePost } from '../../redux/actions/postActions';

const styles = (theme) => ({
  searchField: {
    padding: theme.spacing(1.5),
  },
  root: {
    display: "flex",
    justifyContent: 'center',
  },
  progress: {
    position: 'absolute',
  },
  fade: {
    opacity: "20%"
  },
  grid: {
    margin: "17px",
    display: 'flex',
    width: "810px",
  },
  button: {
    display: "flex",
  },
  error: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  }
});

class GivingGarden extends Component {
  constructor() {
    super();
    this.state = {
      displayPostType: "",
      postLimit: "",
      searchTitle: "",
      showPopup: false,
      title: "",
      postType: "",
      postContent: "",
      error: {}
    };
  };

  componentDidMount() {
    this.props.getAllPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts.error !== prevProps.posts.error) {
      this.setState({ error: this.props.posts.error });
    }
  }

  CheckBoxWrapper(label, value, name) {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state[name] === value}
            onChange={this.handleChange}
            name={name}
            value={value}
            color="primary"
          />
        }
        label={label}
      />
    )
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked ? event.target.value : ""
    })
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handlePopup = () => this.setState({ showPopup: !this.state.showPopup });


  handleSubmit = (event) => {
    event.preventDefault();
    const newPostData = {
      title: this.state.title,
      type: this.state.postType,
      content: this.state.postContent
    };
    this.props.makePost(newPostData) 
  };

  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.posts;
    const { error } = this.state;
    return (
      <div >
        <NavBar />
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid container direction='row' justify='space-between' alignItems='center' className={classes.grid} >
            <Grid item xs={4} >
              <TextField
                autoFocus
                fullWidth
                id="title"
                label="Title"
                size="small"
                variant="outlined"
                name="searchTitle"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={2} >
              <TextField
                autoFocus
                fullWidth
                id="limit"
                label="Limit"
                type="number"
                size="small"
                variant="outlined"
                InputProps={{ inputProps: { min: 1 } }}
                name="postLimit"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={1}>
              {this.CheckBoxWrapper(
                postTypes.OFFERING_STR.charAt(0) + postTypes.OFFERING_STR.slice(1).toLowerCase(),
                postTypes.OFFERING_STR,
                "displayPostType"
              )}
            </Grid>
            <Grid item xs={1}>
              {this.CheckBoxWrapper(
                postTypes.ASKING_STR.charAt(0) + postTypes.ASKING_STR.slice(1).toLowerCase(),
                postTypes.ASKING_STR,
                "displayPostType"
              )}
            </Grid>
            <Grid item xs={2}>

              <Button fullWidth variant="contained" color="primary" startIcon={<CreateIcon />} onClick={this.handlePopup} className={classes.button}>
                New Post
                </Button>
            </Grid>
            <Dialog open={this.state.showPopup} onClose={this.handlePopup} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Create post</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Get noticed by organizations and consultants! Post on the Giving Garden asking for support or offering a service.
                </DialogContentText>
                <TextField
                  required
                  defaultValue={this.state.title}
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="title"
                  name="title"
                  label="Title"
                  type="title"
                  fullWidth
                  onChange={this.handleInput}
                  InputLabelProps={{ shrink: true }}
                  helperText={error.title}
                  error={error.title ? true : false}
                />
                <TextField
                  required
                  defaultValue={this.state.postContent}
                  fullWidth
                  margin="normal"
                  id="content"
                  name="postContent"
                  label="What's on your mind?"
                  multiline
                  rows={5}
                  variant="outlined"
                  onChange={this.handleInput}
                  InputLabelProps={{ shrink: true }}
                  helperText={error.content}
                  error={error.content ? true : false}
                />
                <Typography variant="subtitle2"> I am posting to : </Typography>
                <Grid container justify='space-evenly' alignItems='center'>
                  <Grid item xs={6}>
                    {this.CheckBoxWrapper(
                      "Offer a service",
                      postTypes.OFFERING_STR,
                      "postType"
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {this.CheckBoxWrapper(
                      "Ask for support",
                      postTypes.ASKING_STR,
                      "postType"
                    )}
                  </Grid>
                  {error.type && (
                    <Typography variant="body2" className={classes.error}>
                      {error.type}
                    </Typography>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handlePopup} color="primary" disabled={loading}>
                  Cancel
                </Button>
                <Button className={loading ? classes.fade : ""} type="submit" onClick={this.handleSubmit} color="primary">
                  Create
                  {loading && (
                     <CircularProgress color="secondary" size={25} className={classes.progress} />
                    )}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid item xs={12} >
            <PostWrapper posts={posts} postType={this.state.displayPostType} postLimit={this.state.postLimit ? this.state.postLimit : undefined} searchTitle={this.state.searchTitle} />
          </Grid>
        </Grid >
        <div className={classes.root}>
          <ScrollButton />
        </div>
      </div >
    )
  }
}


const mapDispatchToProps = {
  getAllPosts: getAllPosts,
  makePost: makePost
};

const mapStateToProps = (state) => ({
  posts: state.posts
});



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GivingGarden));