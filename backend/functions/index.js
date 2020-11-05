const functions = require('firebase-functions');

const express = require('express');
app = express(); 

const { getCourse, makeCourse, getAllCourses, uploadImage, generateSignedURL  } = require('./handlers/courses');
const { getPost, getAllPosts } = require('./handlers/posts');
const { signup, login, userCourses, userType, getAuthenticatedUser, getUserDetails, updateUserDetails } = require('./handlers/users');
const fbAuth = require('./util/fbAuth');


const cors = require('cors');
app.use(cors());

const config = require("./util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

// user routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/userCourses', fbAuth, userCourses);
app.post('/getCourse', getCourse)
app.post('/userType', userType)
app.get('/getAllCourses', getAllCourses);
app.post('/makeCourse', fbAuth, makeCourse);
app.post('/uploadImage', fbAuth, uploadImage);
app.get('/getAuthenticatedUser', fbAuth, getAuthenticatedUser);
app.get('/getPost', fbAuth, getPost);
app.get('/getAllPosts', fbAuth, getAllPosts)
app.get('/getUserDetails', getUserDetails);
app.put('/updateUserDetails', fbAuth, updateUserDetails);
app.get('/generateSignedURL', fbAuth, generateSignedURL);

exports.api = functions.https.onRequest(app);