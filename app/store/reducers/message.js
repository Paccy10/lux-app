import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE_START:
      return {
        ...state,
        error: null,
      };

    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case actionTypes.SEND_MESSAGE_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    default:
      return state;
  }
};
