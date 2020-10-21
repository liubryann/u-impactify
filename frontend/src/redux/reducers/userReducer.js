import { USER_COURSE_IDS, USER_ERROR } from '../types';

const initialState = {
    userCourseIds: [],
    errors: null,
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_COURSE_IDS:
            return {
                ...state,
                userCourseIds: action.payload.courses
            }
        case USER_ERROR:
            return {
                ...state,
                errors: action.payload.msg
            }
        default:
            return state
    }
}