import * as actionTypes from '../actions/types';

const initialState = {
  friendshipCurrentState: '',
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_FRIEND_REQUEST_START:
    case actionTypes.CHECK_FRIEND_REQUEST_START:
    case actionTypes.CANCEL_FRIEND_REQUEST_START:
    case actionTypes.CANCEL_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendshipCurrentState: '',
        error: null,
      };

    case actionTypes.SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendshipCurrentState: 'request_sent',
        error: null,
      };

    case actionTypes.SEND_FRIEND_REQUEST_FAIL:
    case actionTypes.CHECK_FRIEND_REQUEST_FAIL:
    case actionTypes.CANCEL_FRIEND_REQUEST_FAIL:
      return {
        ...state,
        friendshipCurrentState: '',
        error: action.error.message,
      };

    case actionTypes.CHECK_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendshipCurrentState: action.currentState,
        error: null,
      };

    default:
      return state;
  }
};
