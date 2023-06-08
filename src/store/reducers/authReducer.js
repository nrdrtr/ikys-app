const initialState = {
  isArayanLoggedIn: false,
  isgverenLoggedIn: false,
  userId: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ISARAYAN_LOGIN_SUCCESS":
      return {
        ...state,
        isArayanLoggedIn: true,
        isgverenLoggedIn: false,
        userId: action.payload.userId,
        error: null,
      };
    case "ISARAYAN_LOGIN_FAILURE":
      return {
        ...state,
        isArayanLoggedIn: false,
        isgverenLoggedIn: false,
        userId: null,
        error: action.payload,
      };
    case "ISGVEREN_LOGIN_SUCCESS":
      return {
        ...state,
        isArayanLoggedIn: false,
        isgverenLoggedIn: true,
        userId: null,
        error: null,
      };
    case "ISGVEREN_LOGIN_FAILURE":
      return {
        ...state,
        isArayanLoggedIn: false,
        isgverenLoggedIn: false,
        userId: null,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isArayanLoggedIn: true, // Varsayılan olarak giriş yapıldı olarak işaretle
        isgverenLoggedIn: false,
        userId: action.payload.userId,
        error: null,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isArayanLoggedIn: false,
        isgverenLoggedIn: false,
        userId: null,
        error: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isArayanLoggedIn: false,
        isgverenLoggedIn: false,
        userId: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
