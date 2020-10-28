const functions = require('firebase-functions');

const app = require('express')();

const { getCourse, makeCourse, getAllCourses, uploadImage } = require('./handlers/courses');
const { signup, login, userCourses, userType, getAuthenticatedUser } = require('./handlers/users');
const fbAuth = require('./util/fbAuth');


const cors = require('cors');
app.use(cors());

const config = require("./util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

// user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/userCourses', userCourses);
app.post('/getCourse', getCourse)
app.post('/userType', userType)
app.get('/getAllCourses', getAllCourses);
app.post('/makeCourse', fbAuth, makeCourse);
app.post('/uploadImage', fbAuth, uploadImage);
app.get('/getAuthenticatedUser', fbAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);