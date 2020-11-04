import { POST_ERROR, SET_POSTS } from '../types';
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