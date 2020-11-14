const { admin, db } = require("../util/admin");
const { validatePostCreation } = require("../util/validators");

exports.getPost = (req, res) => {
    const { postId } = req.body;
    db.doc(`/posts/${postId}`).get()
        .then(doc => {
            if(doc.exists){
                return res.status(200).json(doc.data());           
            } else {
                return res.status(404).json({error: "No such post"});
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err.code});
        });
        
};

exports.getAllPosts = (req, res) => {
    db.collection('posts')
        .get()
        .then((data) => {
            let posts = []; 
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id, 
                    type: doc.data().type, 
                    title: doc.data().title, 
                    content: doc.data().content
                })
            });
            return res.status(200).json(posts);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code })
        })
  
}

exports.makePost = (req, res) => {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
    }
    const { valid, errors } = validatePostCreation(newPost);
    if (!valid) return res.status(400).json(errors);
  
    db.collection('posts').add(newPost)
      .then((doc) => {
        db.collection('users')
          .doc(req.user.email)
          .collection('posts')
          .doc(doc.id).set({});
        return res.status(201).json({});
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      })
  };
