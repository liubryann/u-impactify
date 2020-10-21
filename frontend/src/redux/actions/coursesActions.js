import { GETCOURSE, COURSE_ERROR } from '../types';
import API from '../../api';

export const getCourse = (courseId) => ( async dispatch => { 
    await API.get('/getCourse', { courseId })
        .then((response) => {
            const { name, instructor, overview} = response.data;
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
            console.log(err.response);
            const msg = err.response.data.error
            dispatch({
                type: COURSE_ERROR,
                payload: {
                    msg
                }
            })
        })
});