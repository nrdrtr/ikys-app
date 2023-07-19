const initialState = {
  resume: null,
  error: null,
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESUME_SUCCESS':
      return {
        ...state,
        resume: action.payload,
        error: null,
      };
    case 'GET_RESUME_ERROR':
      return {
        ...state,
        resume: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default resumeReducer;
