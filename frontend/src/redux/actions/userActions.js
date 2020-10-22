import API from '../../api';
import { USER_COURSE_IDS, USER_ERROR, USER_TYPE } from '../types';


export const userCourseIds = (email, usertype) => (async (dispatch) => {
    const userData = {
        email: email,
        usertype: usertype
    }
    console.log(userData);

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