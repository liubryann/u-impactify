const functions = require('firebase-functions');

const app = require('express')();

const { signup } = require ('./handlers/users'); 

// user routes
app.post('/signup', signup);

exports.api = functions.https.onRequest(app);