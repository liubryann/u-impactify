const admin = require('firebase-admin');
const keyfile = require('../util/keyfile.json');

// admin.initializeApp({
//     credential: admin.credential.cert(keyfile)
// });
admin.initializeApp();

const db = admin.firestore();
module.exports = { admin, db};