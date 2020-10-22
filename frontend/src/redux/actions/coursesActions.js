import { GETCOURSE, COURSE_ERROR, SET_COURSES } from '../types';
import API from '../../api';

export const getCourse = (courseId) => ( async dispatch => { 
    await API.post('/getCourse', { courseId })
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
            console.log(err);
            let msg = '';
            if(err.response){
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

export const getAllCourses = () => ( async dispatch => {
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
})