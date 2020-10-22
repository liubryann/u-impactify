import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../types';

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
        default:
            return state
    }
}