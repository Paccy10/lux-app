import * as actionTypes from './types';

export const sendMessage = (receiverId, message) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.SEND_MESSAGE_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const ref = firebase.database().ref('messages');
    const messageKey = ref.push().key;
    const messageBody = {
      date: new Date().toString(),
      message,
      type: 'text',
      from: senderId,
    };

    return ref
      .child(senderId)
      .child(receiverId)
      .child(messageKey)
      .set(messageBody)
      .then(() => {
        ref
          .child(receiverId)
          .child(senderId)
          .child(messageKey)
          .set(messageBody)
          .then(() => {
            dispatch({ type: actionTypes.SEND_MESSAGE_SUCCESS });
          })
          .catch((error) =>
            dispatch({ type: actionTypes.SEND_MESSAGE_FAIL, error })
          );
      })
      .catch((err) =>
        dispatch({ type: actionTypes.SEND_MESSAGE_FAIL, error: err })
      );
  };
};

export const fetchMessages = (receiverId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.FETCH_MESSAGES_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const ref = firebase.database().ref('messages');
    return ref
      .child(senderId)
      .child(receiverId)
      .on(
        'value',
        (snapshot) => {
          const messages = [];
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            message.key = childSnapshot.key;
            messages.unshift(message);
          });
          dispatch({ type: actionTypes.FETCH_MESSAGES_SUCCESS, messages });
        },
        (error) => dispatch({ type: actionTypes.FETCH_MESSAGES_FAIL, error })
      );
  };
};
