import axios from "axios";

export const isArayanLogin = (email, password) => {
  return (dispatch) => {
    // İş arayan girişini gerçekleştir
    axios
      .post("http://localhost:8080/api/isarayan/login", { email, password })
      .then((response) => {
        dispatch({
          type: "ISARAYAN_LOGIN_SUCCESS",
          payload: { data: response.data, userId: response.data.userId },
        });
      })
      .catch((error) => {
        dispatch({ type: "ISARAYAN_LOGIN_FAILURE", payload: error.message });
      });
  };
};

export const isgverenLogin = (email, password) => {
  return (dispatch) => {
    // İşveren girişini gerçekleştir
    axios
      .post("http://localhost:8080/api/employer/login", { email, password })
      .then((response) => {
        dispatch({
          type: "ISGVEREN_LOGIN_SUCCESS",
          payload: { data: response.data, userId: response.data.userId },
        });
      })
      .catch((error) => {
        dispatch({ type: "ISGVEREN_LOGIN_FAILURE", payload: error.message });
      });
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
 

// export const registerEmployer = (employerData) => {
//   return (dispatch) => {
//     axios
//       .post("http://localhost:8080/api/employer/save", employerData)
//       .then((response) => {
//         dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: "REGISTER_FAIL", payload: error.message });
//       });
//   };
// };

export const registerJobSeeker = (jobSeekerData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/api/isarayan/save", jobSeekerData)
      .then((response) => {
        dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "REGISTER_FAIL", payload: error.message });
      });
  };
};
