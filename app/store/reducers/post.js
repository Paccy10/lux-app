import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST_START:
    case actionTypes.FETCH_POSTS_START:
      return {
        ...state,
        error: null,
      };

    case actionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case actionTypes.CREATE_POST_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        error: null,
        posts: action.posts,
      };

    default:
      return state;
  }
};
