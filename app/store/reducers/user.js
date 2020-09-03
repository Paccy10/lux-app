import * as actionTypes from '../actions/types';

const initialState = {
  users: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
    case actionTypes.SEARCH_USER_START:
      return {
        ...state,
        error: null,
      };

    case actionTypes.FETCH_USERS_SUCCESS:
    case actionTypes.SEARCH_USER_SUCCESS:
      return {
        ...state,
        users: action.users,
        error: null,
      };

    case actionTypes.FETCH_USERS_FAIL:
    case actionTypes.SEARCH_USER_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    default:
      return state;
  }
};
