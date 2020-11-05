const admin = require('firebase-admin');
const keyfile = require('../util/keyfile.json');

admin.initializeApp({
    credential: admin.credential.cert(keyfile)
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { admin, db, storage};