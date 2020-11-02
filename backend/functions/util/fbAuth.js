const { admin, db } = require('./admin');
 
// if you want to use this, you need to send the auth token from the local storage through the header (ask bryan if u need help)
module.exports = (req, res, next) => {
   let idToken;
 
   if (
     req.headers.authorization &&
     req.headers.authorization.startsWith('Bearer ')
   ) {
     idToken = req.headers.authorization.split('Bearer ')[1];
   } else {
     console.error('No token found');
     return res.status(403).json({ error: 'Unauthorized' });
   }
    admin
     .auth()
     .verifyIdToken(idToken)
     .then((decodedToken) => {
       req.user = decodedToken;
       console.log(req.user.uid);
       return db
         .collection('users')
         .where('uid', '==', req.user.uid)
         .limit(1)
         .get();
     })
     .then((data) => {
       req.user.email = data.docs[0].data().email;
       return next();
     })
     .catch((err) => {
       console.error('Error while verifying token ', err);
       return res.status(403).json({ error: err.code });
     });
 };
