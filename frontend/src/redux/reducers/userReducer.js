import { USER_ERROR, USER_TYPE, SET_USER, USER_COURSES } from '../types';

const initialState = {
    userType: null,
    userCourses: [],
    errors: null,
    userData: null, 
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_COURSES:
            return {
                ...state,
                userCourses: action.payload
              }
        case USER_TYPE:
            return {
                ...state,
                userType: action.payload.type
            }
        case USER_ERROR:
            return {
                ...state,
                errors: action.payload.msg
              }
        case SET_USER:
            return {
                ...state,
                userData: action.payload,
                errors: {}
            }
        default:
            return state
    }
}