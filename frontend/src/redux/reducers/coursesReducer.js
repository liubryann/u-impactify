import { GETCOURSE, COURSE_ERROR } from '../types';

const initialState = {
    name: '',
    overview: '',
    instructor: '',
    content: [],
    error: null
}

export default function(state = initialState, action){
    switch(action.type){
        case GETCOURSE:
            return {
                ...state,
                name: action.payload.name,
                instructor: action.payload.instructor,
                overview: action.payload.overview,
            }
        case COURSE_ERROR:
            return {
                ...state,
                error: action.payload.msg
            }
        default:
            return state
    }
}