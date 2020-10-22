import { GETCOURSE, COURSE_ERROR, SET_COURSES } from '../types';

const initialState = {
    name: '',
    overview: '',
    instructor: '',
    content: [],
    error: null,
    courses: []
}

export default function(state = initialState, action){
    switch(action.type){
        case GETCOURSE:
            state.name = action.payload.name;
            state.instructor = action.payload.instructor;
            state.overview = action.payload.overview;
            return state;
        case COURSE_ERROR:
            state.error = action.payload.msg;
            return state;
        case SET_COURSES:
            return {
                ...state,
                courses: action.payload
            };
        default:
            return state
    }
}