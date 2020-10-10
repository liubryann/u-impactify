const { admin, db } = require("../util/admin");
const { validateSignupData } = require('../util/validators');

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

// Sign up 
exports.signup = (req, res) => {
    const newUser = {
        type: req.body.type, 
        org: req.body.org,
        first: req.body.first,
        last: req.body.last, 
        email: req.body.email, 
        password: req.body.password, 
        confirmPassword: req.body.confirmPassword
    }

    const { valid, errors } = validateSignupData(newUser); 
    if(!valid) return res.status(400).json(errors); 

  
}