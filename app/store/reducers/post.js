import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST_START:
    case actionTypes.FETCH_POSTS_START:
    case actionTypes.FETCH_POST_START:
    case actionTypes.DELETE_POST_START:
    case actionTypes.UPDATE_POST_START:
    case actionTypes.FETCH_USER_POSTS_START:
      return {
        ...state,
        error: null,
      };

    case actionTypes.CREATE_POST_SUCCESS:
    case actionTypes.DELETE_POST_SUCCESS:
    case actionTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case actionTypes.CREATE_POST_FAIL:
    case actionTypes.FETCH_POST_FAIL:
    case actionTypes.FETCH_POSTS_FAIL:
    case actionTypes.DELETE_POST_FAIL:
    case actionTypes.UPDATE_POST_FAIL:
    case actionTypes.FETCH_USER_POSTS_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    case actionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        error: null,
        posts: [action.post],
      };

    case actionTypes.FETCH_POSTS_SUCCESS:
    case actionTypes.FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        error: null,
        posts: action.posts,
      };

    default:
      return state;
  }
};
