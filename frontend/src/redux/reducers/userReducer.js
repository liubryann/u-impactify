import { LOGIN } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    posts: [],
    courses: []
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                authenticated: true
            };
        default:
            return state
    }
}