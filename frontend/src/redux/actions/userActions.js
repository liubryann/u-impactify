import { LOGIN } from '../types';

export const loginUser = (userData) => (dispatch) => {
    dispatch({
        type: LOGIN
    });
    //TODO: hit login api 
    //TODO: localstorage stuff
}