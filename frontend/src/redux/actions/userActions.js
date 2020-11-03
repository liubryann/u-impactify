import API from '../../api';
import { USER_COURSE_IDS, USER_ERROR, USER_TYPE, SET_USER, UPDATE_USER, UPLOAD_USER_IMAGE } from '../types';


export const userCourseIds = (email, usertype) => (async (dispatch) => {
    const userData = {
        email: email,
        usertype: usertype
    }

    await API.post('/userCourses', userData)
        .then((response) => {
            const { courses } = response.data;
            dispatch({ 
                type: USER_COURSE_IDS,
                payload: {
                    courses
                }
             });
        })
        .catch((err) => {
            console.log(err);
            let msg = '';
            if(err.response){
                msg = err.response.data.error;
            }
            dispatch({
                type: USER_ERROR,
                payload: {
                    msg
                }
            });
        })
});

export const userTypeDetails = () => (async (dispatch) => {
    const email = localStorage.getItem('email');
    const userData = {
        email: email
    }
    await API.post('/userType', userData)
        .then((response) => {
            const { type } = response.data;
            dispatch({ 
                type: USER_TYPE,
                payload: {
                    type
                }
             });
        })
        .catch((err) => {
            console.log(err);
            let msg = '';
            if(err.response){
                msg = err.response.data.error;
            }
            dispatch({
                type: USER_ERROR,
                payload: {
                    msg
                }
            });
        })
});

export const getAuthenticatedUserData = () => (async (dispatch) => {
    await API.get('/getAuthenticatedUser', { headers: {
        'Authorization': `Bearer ${localStorage.getItem('idToken')}`
    }})
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: USER_ERROR,
                payload: { msg: err.response.data }
            });
        })
 })

 export const updateUserDetails = (userData) => (async (dispatch) => {
    await API.put('/updateUserDetails', userData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('idToken')}`
        }
      })
        .then(() => {
          dispatch({
            type: UPDATE_USER
          })
        })
        .catch(err => {
          dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.data }  
          })
        })
 })

 export const uploadUserImage = (formData) => (async dispatch => {
    await API.post('/uploadImage', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('idToken')}`
      }
    })
      .then((res) => {
        dispatch({
          type: UPLOAD_USER_IMAGE,
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
          type: USER_ERROR,
          payload: msg
        })
      });
  });
 
