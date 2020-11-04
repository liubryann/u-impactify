import { SET_POSTS, POST_ERROR } from "../types";

const initialState = {
    posts: [],
    error: null
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
                error: action.payload
            }
        default:
            return state        
    }
}