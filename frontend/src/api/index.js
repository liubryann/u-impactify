import axios from 'axios';

var url;
if( process.env.NODE_ENV === 'development') {
  url = `http://localhost:5000/cscc01-b55d7/us-central1/api/`;
}

export default axios.create({
    baseURL: url,
});