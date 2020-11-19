import { POST_ERROR, SET_POSTS, POST_CREATION_START, POST_CREATION_SUCCESS } from '../types';
import API from '../../api';

export const getAllPosts = () => (async dispatch => {
  await API.get('/getAllPosts', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }})
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.error
      })
    })
});

export const makePost = (postData) => (async dispatch => {
  dispatch({
    type: POST_CREATION_START
  })
  await API.put('/makePost', postData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }})
    .then(() => {
      dispatch({
        type: POST_CREATION_SUCCESS
      });
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      })
    })
});