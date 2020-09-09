import * as actionTypes from './types';

export const sendFriendRequest = (receiverId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.SEND_FRIEND_REQUEST_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const ref = firebase.database().ref('friendRequests');

    return ref
      .child(senderId)
      .child(receiverId)
      .child('request_type')
      .set('sent')
      .then(() => {
        ref
          .child(receiverId)
          .child(senderId)
          .child('request_type')
          .set('received')
          .then(() =>
            dispatch({ type: actionTypes.SEND_FRIEND_REQUEST_SUCCESS })
          )
          .catch((error) =>
            dispatch({ type: actionTypes.SEND_FRIEND_REQUEST_FAIL, error })
          );
      })
      .catch((err) =>
        dispatch({ type: actionTypes.SEND_FRIEND_REQUEST_FAIL, err })
      );
  };
};

export const checkFriendRequest = (receiverId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.CHECK_FRIEND_REQUEST_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const ref = firebase.database().ref('friendRequests');

    return ref
      .child(senderId)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const requestType = snapshot
            .child(receiverId)
            .child('request_type')
            .val();
          let currentState = '';
          if (requestType === 'sent') {
            currentState = 'request_sent';
          }
          dispatch({
            type: actionTypes.CHECK_FRIEND_REQUEST_SUCCESS,
            currentState,
          });
        }
      })
      .catch((error) =>
        dispatch({ type: actionTypes.CHECK_FRIEND_REQUEST_FAIL, error })
      );
  };
};
