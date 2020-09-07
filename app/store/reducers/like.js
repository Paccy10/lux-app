import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST_LIKES_START:
    case actionTypes.LIKE_POST_START:
      return {
        ...state,
        error: null,
      };

    case actionTypes.FETCH_POST_LIKES_SUCCESS:
    case actionTypes.LIKE_POST_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case actionTypes.FETCH_POST_LIKES_FAIL:
    case actionTypes.LIKE_POST_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    default:
      return state;
  }
};
