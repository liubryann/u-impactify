import { USER_COURSES, USER_ERROR, USER_TYPE, SET_USER, GET_USER, UPDATE_USER, UPLOAD_USER_IMAGE } from '../types';

const initialState = {
    userType: null,
    userCourses: [],
    errors: null,
    userData: null,
    authorData: null,
    userImageURL: null
}

export default function (state = initialState, action) {
    switch (action.type) {
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
        case GET_USER:
            return {
                ...state,
                authorData: action.payload,
                errors: {}
            }
        case UPDATE_USER:
            return {
                ...state
            }
        case UPLOAD_USER_IMAGE:
            return {
                ...state,
                userImageURL: action.payload.imageUrl
            }
        default:
            return state
    }
}