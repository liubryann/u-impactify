const { admin, db } = require("../util/admin");
const config = require("../util/config")
const { userTypes } = require('../util/constants');
const { validateCourseCreation } = require("../util/validators");
const BusBoy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { uuid } = require("uuidv4");
const { generateV4UploadSignedUrl, generateV4DownloadSignedUrl } = require('../util/gcp');

exports.getCourse = (req, res) => {
  const { courseId } = req.body;
  db.doc(`/courses/${courseId}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(201).json(doc.data());
      } else {
        return res.status(404).json({ error: "No such course" });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.makeCourse = (req, res) => {
  const newCourse = {
    title: req.body.title,
    summary: req.body.summary,
    courseImageURL: req.body.courseImageURL,
    instructor: req.body.instructor,
    instructorImageURL: req.body.instructorImageURL,
    instructorEmail: req.body.instructorEmail,
    createdAt: new Date().toISOString(),
    content: req.body.content,
    sections: req.body.sections
  }
  const { valid, errors } = validateCourseCreation(newCourse);
  if (!valid) return res.status(400).json(errors);

  db.collection('courses').add(newCourse)
    .then((doc) => {
      const resCourse = newCourse;
      resCourse.courseId = doc.id;
      
      db.collection('users')
        .doc(req.body.instructorEmail)
        .collection('courses')
        .doc(doc.id).set({});
      return res.status(201).json(resCourse);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
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
          title: doc.data().title,
          summary: doc.data().summary,
          instructorImageURL: doc.data().instructorImageURL,
          courseImageURL: doc.data().courseImageURL
        })
      });
      return res.json(courses);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code })
    })

};

exports.uploadImage = (req, res) => {

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return imageUrl;
      })
      .then((firebaseUrl) => {
        return res.status(201).json({ message: "Image uploaded successfully", imageUrl: firebaseUrl });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong with the image upload" });
      });
  });
  busboy.end(req.rawBody);
}


exports.generateSignedURL = (req, res) => {
  generateV4UploadSignedUrl(req.query.vidName)
    .then(urls => {
      return res.status(200).json(urls);
    })
    .catch(err => {
      console.err(err); 
      return res.status(500).json({ error: "Something went wrong with the video upload" });
    })
}
