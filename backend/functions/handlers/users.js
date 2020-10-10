const { admin, db } = require("../util/admin");
const { validateSignupData } = require('../util/validators');
const { userTypes } = require('../util/constants');

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

    let token, uid; 
    db.doc(`/users/userTypes/${newUser.type}/${newUser.email}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ email: 'This email is already taken' });
            }
            else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password); 
            }
        })
        .then(data => {
            uid = data.user.uid; 
            return data.user.getIdToken(); 
        })
        .then(idToken => {
            token = idToken; 
            var userCredentials; 
            if (newUser.type === userTypes.SOCIAL_INITIATIVE) {
                userCredentials = {
                    type: newUser.type,
                    org: newUser.org,
                    email: newUser.email,
                };
            }
            else {
                userCredentials = {
                    type: newUser.type,
                    email: newUser.email,
                    first: newUser.first, 
                    last: newUser.last
                };
            }
            return db.doc(`/users/userTypes/${newUser.type}/${newUser.email}`).set(userCredentials); 
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err); 
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use '});
            }
            else {
                return res.status(500).json({ error: err.code }); 
            }
        })
}
