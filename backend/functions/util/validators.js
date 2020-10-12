const {userTypes} = require('./constants'); 

const isEmail = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
}

const isEmpty = (string) => {
    return string.trim() === ''; 
}

exports.validateSignupData = (data) => {
    let errors = {}; 

    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty'; 
    }
    else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address';
    }
    if (data.type === userTypes.SOCIAL_INITIATIVE) {
        if (isEmpty(data.org)) {
            errors.org = 'Must not be empty'; 
        }
    }
    else{
        if (isEmpty(data.first)) {
            errors.first = 'Must not be empty'; 
        }
        if (isEmpty(data.last)) {
            errors.last = 'Must not be empty'; 
        }
    }
    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty'; 
    }
    else if(data.password.length < 6) {
        errors.password = 'Length must be at least 6 characters'
    }
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords must match'; 
    }
    
    return {
        errors, 
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
