const functions = require('firebase-functions');

const app = require('express')();

const { db } = require('./util/admin');

const { signup } = require ('./handlers/users'); 

// user routes
app.post('/signup', signup);

exports.api = functions.https.onRequest(app);