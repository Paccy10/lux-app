import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  authError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        authError: null,
      };

    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authError: null,
      };

    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        authError: action.error.message,
      };

    case actionTypes.LOGOUT_SUCCESS:
      return state;

    default:
      return state;
  }
};
