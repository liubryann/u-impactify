import API from '../../api';
import { USER_COURSE_IDS, USER_ERROR } from '../types';


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
            console.log(err.response);
            const msg = err.response.data.error;
            dispatch({
                type: USER_ERROR,
                payload: {
                    msg
                }
            });
        })
});