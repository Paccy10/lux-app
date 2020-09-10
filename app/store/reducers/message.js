import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE_START:
    case actionTypes.FETCH_MESSAGES_START:
      return {
        ...state,
        error: null,
        messages: [],
      };

    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case actionTypes.SEND_MESSAGE_FAIL:
    case actionTypes.FETCH_MESSAGES_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    case actionTypes.FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        error: null,
        messages: action.messages,
      };

    default:
      return state;
  }
};
