// ACTION TYPES

const API_CALL_REQUEST = 'API_CALL_REQUEST';
const API_CALL_SUCCESS = 'API_CALL_SUCCESS';
const API_CALL_FAILURE = 'API_CALL_FAILURE';

// reducer
const initialState = {
  fetching: false,
  dog: null,
  error: null
};

export const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { 
        ...state,
        fetching: true,
      };
    case API_CALL_SUCCESS:
      return {
        ...state, 
        fetching: false,
        dog: action.dog,
      }
    case API_CALL_FAILURE: 
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state;
  }
}
