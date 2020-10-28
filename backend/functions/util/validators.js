const { userTypes } = require('./constants');

const isEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regEx);
}

const isEmpty = (string) => {
  return string.trim() === '';
}

exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.type)) {
    errors.userType = 'Must not be empty';
  }
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
  else {
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
  else if (data.password.length < 8) {
    errors.password = 'Length must be at least 8 characters'
  }
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Must not be empty';
  }
  else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email) || isEmpty(data.password)) {
    errors.error = 'Must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateCourseCreation = (data) => {
  let errors = {};

  if (isEmpty(data.title)) {
    errors.title = 'Must not be empty';
  }
  if (isEmpty(data.summary)) {
    errors.summary = 'Must not be empty';
  }
  if (isEmpty(data.courseImageURL)) {
    errors.courseImageURL = 'Must not be empty';
  }
  if (isEmpty(data.instructor)) {
    errors.instructor = 'Must not be empty';
  }
  if (isEmpty(data.instructorImageURL)) {
    errors.instructorImageURL = 'Must not be empty';
  }
  if (isEmpty(data.instructorEmail)) {
    errors.instructorEmail = 'Must not be empty';
  }
  if(isEmpty(data.createdAt)){
    errors.createdAt = 'Must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}



