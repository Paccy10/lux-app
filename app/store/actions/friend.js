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
        dispatch({ type: actionTypes.SEND_FRIEND_REQUEST_FAIL, error: err })
      );
  };
};

export const checkFriendRequest = (receiverId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.CHECK_FRIEND_REQUEST_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const requestsRef = firebase.database().ref('friendRequests');
    const friendsRef = firebase.database().ref('friends');

    return requestsRef
      .child(senderId)
      .once('value')
      .then(async (snapshot) => {
        let currentState = 'not_friends';
        if (snapshot.exists()) {
          const requestType = snapshot
            .child(receiverId)
            .child('request_type')
            .val();
          if (requestType === 'sent') {
            currentState = 'request_sent';
          } else if (requestType === 'received') {
            currentState = 'request_received';
          }
        }
        const friendSnapshot = await friendsRef.child(senderId).once('value');
        if (friendSnapshot.exists()) {
          if (friendSnapshot.child(receiverId).hasChild('date')) {
            currentState = 'friends';
          }
        }
        dispatch({
          type: actionTypes.CHECK_FRIEND_REQUEST_SUCCESS,
          currentState,
        });
      })
      .catch((error) =>
        dispatch({ type: actionTypes.CHECK_FRIEND_REQUEST_FAIL, error })
      );
  };
};

export const cancelFriendRequest = (receiverId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.CANCEL_FRIEND_REQUEST_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const ref = firebase.database().ref('friendRequests');

    return ref
      .child(senderId)
      .child(receiverId)
      .remove()
      .then(() => {
        ref
          .child(receiverId)
          .child(senderId)
          .remove()
          .then(() => {
            dispatch({ type: actionTypes.CANCEL_FRIEND_REQUEST_SUCCESS });
          })
          .catch((error) =>
            dispatch({ type: actionTypes.CANCEL_FRIEND_REQUEST_FAIL, error })
          );
      })
      .catch((err) =>
        dispatch({ type: actionTypes.CANCEL_FRIEND_REQUEST_FAIL, error: err })
      );
  };
};

export const acceptFriendRequest = (receiverId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.ACCEPT_FRIEND_REQUEST_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const requestsRef = firebase.database().ref('friendRequests');
    const friendsRef = firebase.database().ref('friends');

    return friendsRef
      .child(senderId)
      .child(receiverId)
      .child('date')
      .set(new Date().toString())
      .then(() => {
        friendsRef
          .child(receiverId)
          .child(senderId)
          .child('date')
          .set(new Date().toString())
          .then(async () => {
            await requestsRef.child(senderId).child(receiverId).remove();
            await requestsRef.child(receiverId).child(senderId).remove();
            dispatch({ type: actionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS });
          })
          .catch((error) =>
            dispatch({ type: actionTypes.ACCEPT_FRIEND_REQUEST_FAIL, error })
          );
      })
      .catch((err) =>
        dispatch({ type: actionTypes.ACCEPT_FRIEND_REQUEST_FAIL, error: err })
      );
  };
};

export const declineFriendRequest = (receiverId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.DECLINE_FRIEND_REQUEST_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const ref = firebase.database().ref('friendRequests');

    return ref
      .child(senderId)
      .child(receiverId)
      .remove()
      .then(() => {
        ref
          .child(receiverId)
          .child(senderId)
          .remove()
          .then(() => {
            dispatch({ type: actionTypes.DECLINE_FRIEND_REQUEST_SUCCESS });
          })
          .catch((error) =>
            dispatch({ type: actionTypes.DECLINE_FRIEND_REQUEST_FAIL, error })
          );
      })
      .catch((err) =>
        dispatch({ type: actionTypes.DECLINE_FRIEND_REQUEST_FAIL, error: err })
      );
  };
};

export const unFriendUser = (userId) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.UNFRIEND_USER_START });
    const senderId = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const ref = firebase.database().ref('friends');

    return ref
      .child(senderId)
      .child(userId)
      .remove()
      .then(() => {
        ref
          .child(userId)
          .child(senderId)
          .remove()
          .then(() => {
            dispatch({ type: actionTypes.UNFRIEND_USER_SUCCESS });
          })
          .catch((error) =>
            dispatch({ type: actionTypes.UNFRIEND_USER_FAIL, error })
          );
      })
      .catch((err) =>
        dispatch({ type: actionTypes.UNFRIEND_USER_FAIL, error: err })
      );
  };
};

export const fetchFriends = () => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.FETCH_FRIENDS_START });
    const { uid } = getState().firebase.auth;
    const firebase = getFirebase();
    const friendsRef = firebase.database().ref('friends');
    const usersRef = firebase.database().ref('users');

    return friendsRef
      .child(uid)
      .once('value')
      .then(async (snapshot) => {
        const friends = [];
        const reads = [];
        snapshot.forEach((childSnapshot) => {
          const promise = usersRef
            .child(childSnapshot.key)
            .once('value')
            .then((userSnapshot) => {
              const friend = userSnapshot.val();
              friend.key = userSnapshot.key;
              friends.unshift(friend);
            })
            .catch((error) =>
              dispatch({ type: actionTypes.FETCH_FRIENDS_FAIL, error })
            );
          reads.push(promise);
        });
        await Promise.all(reads);
        dispatch({ type: actionTypes.FETCH_FRIENDS_SUCCESS, friends });
      })
      .catch((err) =>
        dispatch({ type: actionTypes.FETCH_FRIENDS_FAIL, error: err })
      );
  };
};
