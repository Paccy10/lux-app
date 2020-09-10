import * as actionTypes from '../actions/types';

const initialState = {
  friendshipCurrentState: 'not_friends',
  error: null,
  friends: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_FRIEND_REQUEST_START:
    case actionTypes.CHECK_FRIEND_REQUEST_START:
    case actionTypes.CANCEL_FRIEND_REQUEST_START:
    case actionTypes.ACCEPT_FRIEND_REQUEST_START:
    case actionTypes.DECLINE_FRIEND_REQUEST_START:
    case actionTypes.UNFRIEND_USER_START:
    case actionTypes.FETCH_FRIENDS_START:
      return {
        ...state,
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
    case actionTypes.DECLINE_FRIEND_REQUEST_FAIL:
    case actionTypes.UNFRIEND_USER_FAIL:
    case actionTypes.FETCH_FRIENDS_FAIL:
      return {
        ...state,
        error: action.error.message,
      };

    case actionTypes.CHECK_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendshipCurrentState: action.currentState,
        error: null,
      };

    case actionTypes.CANCEL_FRIEND_REQUEST_SUCCESS:
    case actionTypes.DECLINE_FRIEND_REQUEST_SUCCESS:
    case actionTypes.UNFRIEND_USER_SUCCESS:
      return initialState;

    case actionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendshipCurrentState: 'friends',
        error: null,
      };

    case actionTypes.FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        error: null,
        friends: action.friends,
      };

    default:
      return state;
  }
};
