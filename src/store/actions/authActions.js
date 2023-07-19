import axios from "axios";

export const jobseekerLogin = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await axios.post("http://localhost:8080/api/isarayan/login", { email, password });
      const jobSeeker = response.data.jobSeeker;
      dispatch({ type: "ISARAYAN_LOGIN_SUCCESS", payload: jobSeeker });
    } catch (error) {
      const errorMessage = error.response.data.message; 
      dispatch({ type: "ISARAYAN_LOGIN_FAILURE", payload: errorMessage });
    }
  };
};

export const employerLogin = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await axios.post("http://localhost:8080/api/employer/login", { email, password });
      const employer = response.data.employer;
      dispatch({ type: "ISVEREN_LOGIN_SUCCESS", payload: employer });
    } catch (error) {
      const errorMessage = error.response.data.message;
      dispatch({ type: "ISVEREN_LOGIN_FAILURE", payload: errorMessage });
    }
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};