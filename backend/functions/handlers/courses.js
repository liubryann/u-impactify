const { admin, db } = require("../util/admin");
const { userTypes } = require('../util/constants');

exports.getCourse = (req, res) => {
    const { courseId } = req.body;
    db.doc(`/courses/${courseId}`).get()
        .then(doc => {
            if(doc.exists){
                return res.status(201).json(doc.data());           
            } else {
                return res.status(404).json({error: "No such course"});
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err.code});
        });
        
};
