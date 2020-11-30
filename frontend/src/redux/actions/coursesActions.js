import {
  GET_COURSE,
  COURSE_ERROR,
  SET_COURSES,
  COURSE_CREATION_SUCCESS, 
  COURSE_CREATION_ERROR, 
  IMAGE_UPLOAD_SUCCESS, 
  VIDEO_UPLOAD_START, 
  VIDEO_UPLOAD_SUCCESS, 
  COURSE_CREATION_START,
  ENROLL_SUCCESS, 
  ENROLL_ERROR, 
  DROP_SUCCESS,
  DROP_ERROR,
  RESET_ALERT
} from '../types';
import API from '../../api';
import axios from 'axios';

export const getCourse = (courseId) => (async dispatch => {
  await API.get('/getCourse', {"params": { courseId } })
    .then((response) => {
      dispatch({
        type: GET_COURSE,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
      let msg = '';
      if (err.response) {
        msg = err.response.data.error;
      }
      dispatch({
        type: COURSE_ERROR,
        payload: {
          msg
        }
      })
    })
});

export const getAllCourses = () => (async dispatch => {
  await API.get('/getAllCourses')
    .then((res) => {
      dispatch({
        type: SET_COURSES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_COURSES,
        payload: []
      })
    })
});

export const uploadImage = (formData) => (async dispatch => {
  await API.post('/uploadImage', formData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }
  })
    .then((res) => {
      dispatch({
        type: IMAGE_UPLOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_CREATION_ERROR,
        payload: err.response.data
      })
    });
});

export const uploadVideo = (formData) => (async dispatch => {
  dispatch({ type: VIDEO_UPLOAD_START }); 
  await API.get('/generateSignedURL', { params: { vidName: formData.get("video").name }, headers: { 'Authorization': `Bearer ${localStorage.getItem('idToken')}` }})
    .then(async res => {
      // this add on thing is only neccessary for development I think
      const url = 'https://cors-anywhere.herokuapp.com/' + res.data.url; 
      await API.put(url, formData.get("video"), { headers : { 'Content-Type': formData.get("Content-Type") }})
        .then(() => {
          dispatch({
            type: VIDEO_UPLOAD_SUCCESS,
            payload: res.data.accessURL
          })
        })
        .catch(err => {
          const videoErr = { videoUpload: err.response.data };
          dispatch({
            type: COURSE_CREATION_ERROR,
            payload: videoErr
          })
        })
    })
    .catch(err => {
      dispatch({
        type: COURSE_CREATION_ERROR,
        payload: err.response.data
      })
    })
});

export const submitCourse = (newCourseData, history) => (async dispatch => {
  dispatch({ type: COURSE_CREATION_START });
  await API.post('/makeCourse', newCourseData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }
  })
    .then((res) => {
      dispatch({
        type: COURSE_CREATION_SUCCESS,
        payload: res.data
      })
      history.push(`/course/${res.data.courseId}`);
    })
    .catch(err => {
      dispatch({
        type: COURSE_CREATION_ERROR,
        payload: err.response.data  
      })
    })
})

export const enrollInCourse = (courseId) => (async dispatch => {
  await API.post('/enrollInCourse', {courseId}, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }
  })
  .then(() => {
    dispatch({
      type: ENROLL_SUCCESS
    })
  })
  .catch(err => {
    dispatch({
      type: ENROLL_ERROR, 
      payload: err.response.data
    })
  })
})

export const dropCourse = (courseId) => (async dispatch => {
  await API.post('/dropCourse', {courseId}, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }
  })
  .then(() => {
    dispatch({
      type: DROP_SUCCESS
    })
  })
  .catch(err => {
    dispatch({
      type: DROP_ERROR, 
      payload: err.response.data
    })
  })
})

export const resetAlert = () => (dispatch => {
  dispatch({
    type: RESET_ALERT
  })
})

