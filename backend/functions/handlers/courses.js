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

exports.getAllCourses = (req, res) => {
    db.collection('courses')
        .get()
        .then((data) => {
            let courses = []; 
            data.forEach((doc) => {
                courses.push({
                    courseId: doc.id, 
                    instructor: doc.data().instructor, 
                    name: doc.data().name, 
                    overview: doc.data().overview
                })
            });
            return res.json(courses);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code })
        })
  
}