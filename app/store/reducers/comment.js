import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENT_POST_START:
      return {
        ...state,
        error: null,
      };

    case actionTypes.COMMENT_POST_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case actionTypes.COMMENT_POST_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    default:
      return state;
  }
};
