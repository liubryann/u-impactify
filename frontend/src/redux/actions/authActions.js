import {  LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, SIGNUP_START, SIGNUP_ERROR, SIGNUP_SUCCESS } from '../types';
import API from '../../api';
import axios from 'axios';

export const loginUser = (userData, loginSuccess, loginFailure) => ( async dispatch => { 
    dispatch({
        type: LOGIN_START
    });
    await API.post('/login', userData)
        .then((response) => {
            const { token } = response.data
            if (token) {
                setAuthHeader(token);
                saveToLocalStorage(token, userData.email);
                dispatch({ 
                    type: LOGIN_SUCCESS
                 });
                loginSuccess();
            } else {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: {}
                });
                loginFailure();
            }
        })
        .catch((err) => {
            console.log(err.response);
            const msg = err.response.data.error
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    msg
                }
            });
            loginFailure();
        })
});

export const signupUser = (newUserData, history) => (async dispatch => {
    dispatch({ type: SIGNUP_START });
    await API.post('/signup', newUserData)
        .then((res) => {
        setAuthHeader(res.data.token);
        dispatch({ type: SIGNUP_SUCCESS });
        history.push('/home');
        })
        .catch ((err) => {
        dispatch({ type: SIGNUP_ERROR, payload: err.response.data });
        })
  });

const setAuthHeader = (token) => {
    const idToken = `Bearer ${token}`;
    window.localStorage.setItem('idToken', token);
    API.defaults.headers.common['Authorization'] = idToken;
  };

const saveToLocalStorage = (token, email) => {
    window.localStorage.setItem('idToken', token);
    window.localStorage.setItem('email', email);
}

export const logoutUser = () => {
    localStorage.removeItem('idToken');
    delete axios.defaults.headers.common['Authorization'];
  };

export const isLoggedIn = () => {
    const token = localStorage.getItem('idToken');
    return !!token;
}