const {Storage} = require('@google-cloud/storage');
const { uuid } = require("uuidv4");
const config = require("../util/config")
const projectId = `${config.projectId}`;
const keyFilename = './util/keyfile.json';
const bucketName = `${config.storageBucket}`;
const storage = new Storage({ projectId, keyFilename });

async function generateV4UploadSignedUrl(vidName) {
    const fileName = `${vidName}`;
    const generatedToken = uuid(); 
    const options = {
        version: 'v4', 
        action: 'write', 
        expires: Date.now() + 604800, 
        //expires in 7 days
        contentType: 'video/mp4',
        metadata : {
            metadata: {
                firebaseStorageDownloadTokens: generatedToken
            }
        }
    }; 
    
    const accessURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${fileName}?alt=media&token=${generatedToken}`;

    const [url] = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl(options); 
    
    return { url: url, accessURL: accessURL };
}

generateV4UploadSignedUrl().catch(console.error);

module.exports = { generateV4UploadSignedUrl };