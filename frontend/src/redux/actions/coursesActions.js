import { GETCOURSE, COURSE_ERROR, SET_COURSES, COURSE_CREATION_SUCCESS, IMAGE_UPLOAD_START, COURSE_CREATION_ERROR, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR, COURSE_CREATION_START} from '../types';
import API from '../../api';

export const getCourse = (courseId) => (async dispatch => {
  await API.post('/getCourse', { courseId })
    .then((response) => {
      const { name, instructor, overview } = response.data;
      dispatch({
        type: GETCOURSE,
        payload: {
          name,
          instructor,
          overview
        },
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
      console.log(err);
      let msg = '';
      if (err.response) {
        msg = err.response.data.error;
      }
      dispatch({
        type: IMAGE_UPLOAD_ERROR,
        payload: msg
      })
    });
});

export const submitCourse = (newCourseData, history) => (async dispatch => {
  dispatch({ type: COURSE_CREATION_START });
  await API.post('/makeCourse', newCourseData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }
  })
    .then((res) => {
      const courseId = res.data.courseId;
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