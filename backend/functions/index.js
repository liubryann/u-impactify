const functions = require('firebase-functions');

const app = require('express')();

const { signup, login, userCourses } = require ('./handlers/users'); 
const { getCourse } = require ('./handlers/courses');

const cors = require('cors');
app.use(cors());

const config = require("./util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

// user routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/userCourses', userCourses);
app.get('/getCourse', getCourse)

exports.api = functions.https.onRequest(app);