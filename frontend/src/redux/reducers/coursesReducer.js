import 
{ 
  GETCOURSE, 
  COURSE_ERROR, 
  SET_COURSES, 
  COURSE_CREATION_SUCCESS, 
  COURSE_CREATION_START, 
  COURSE_CREATION_ERROR, 
  VIDEO_UPLOAD_START, 
  VIDEO_UPLOAD_SUCCESS, 
  IMAGE_UPLOAD_SUCCESS,
  ENROLL_SUCCESS,
  ENROLL_ERROR,
  RESET_ALERT
 } from '../types';

const initialState = {
  title: '',
  summary: '',
  courseImageURL: '',
  instructorEmail: '',
  instructorImageURL: '',
  createdAt: '',
  name: '',
  overview: '',
  instructor: '',
  content: [],
  error: null,
  courses: [],
  loading: false,
  videoURL: "",
  enroll: false, 
  error: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GETCOURSE:
      state.name = action.payload.name;
      state.instructor = action.payload.instructor;
      state.overview = action.payload.overview;
      return state;
    case COURSE_ERROR:
      state.error = action.payload.msg;
      return state;
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    case COURSE_CREATION_START:
      return {
        ...state,
        loading: true
      };
    case COURSE_CREATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: {}
      };
    case COURSE_CREATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        courseImageURL: action.payload.imageUrl,
        loading: false,
        error: {}
      };
    case VIDEO_UPLOAD_START:
      return {
        ...state,
        loading: true,
      };
    case VIDEO_UPLOAD_SUCCESS:
      return {
        ...state, 
        videoURL: action.payload,
        loading: false,
        error: {}
      };
    case ENROLL_SUCCESS: 
      return { 
        ...state, 
        error: {},
        enroll: true
      }
    case ENROLL_ERROR:
      return {
        ...state, 
        error: action.payload
      }
    case RESET_ALERT:
      return {
        ...state, 
        error: {},
        enroll: false
      }
    default:
      return state;
  }
}