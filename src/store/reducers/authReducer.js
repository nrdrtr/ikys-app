import {
  ISARAYAN_LOGIN_FAILURE,
  ISARAYAN_LOGIN_SUCCESS,
  ISVEREN_LOGIN_FAILURE,
  ISVEREN_LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_USER
} from "../types";

const initialState = {
  loading: false,
  jobseekerLoggedIn: false,
  employerLoggedIn: false,
  error: null,
  jobSeeker: null,
  employer: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ISARAYAN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        jobseekerLoggedIn: true,
        employerLoggedIn: false,
        jobSeeker: action.payload,
      };
    case ISVEREN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        jobseekerLoggedIn: false,
        employerLoggedIn: true,
        employer: action.payload,
      };
    case ISARAYAN_LOGIN_FAILURE:
    case ISVEREN_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        jobSeeker: null,
        employer: null,
        jobseekerLoggedIn: false,
        employerLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;