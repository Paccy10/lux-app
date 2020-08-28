import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};
