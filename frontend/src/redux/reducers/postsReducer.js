import { SET_POSTS, POST_ERROR, POST_CREATION_START, POST_CREATION_SUCCESS } from "../types";

const initialState = {
    posts: [],
    error: null,
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_POSTS:
          return {
              ...state,
              posts: action.payload
          }
        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case POST_CREATION_START:
            return {
                ...state,
                loading: true
            }
        case POST_CREATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {}
            }
        default:
            return state        
    }
}