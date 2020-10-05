const { admin, db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

// Sign up 
exports.signup = (req, res) => {
    const newUser = {
        name: req.body.name,
        body: req.body.body
    }

    db.doc(`/test/${newUser.name}`).set(newUser)
    .then(() => {
        return res.status(200).json({ good: "shit"});
    })
    .catch(err => {
        res.status(400).json({err});
    })
}