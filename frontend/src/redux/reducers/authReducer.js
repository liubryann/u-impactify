import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, SIGNUP_START, SIGNUP_ERROR, SIGNUP_SUCCESS } from '../types';

const initialState = {
    loading: false,
    authErrors: null
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_START:
            return {
                ...state,
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case LOGIN_ERROR:
            return {
                authErrors: action.payload.msg,
                loading: false
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                authErrors: action.payload
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                authErrors: {}
            };
        case SIGNUP_START:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }
}