import * as actionTypes from './types';
import { fetchPosts } from './post';
import { fetchUserPosts } from './user';

export const likePost = (postKey) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.LIKE_POST_START });

    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;
    const ref = firebase.database().ref('likes');

    return ref
      .child(postKey)
      .once('value')
      .then((snapshot) => {
        if (snapshot.hasChild(uid)) {
          ref.child(postKey).child(uid).remove();
        } else {
          ref.child(postKey).child(uid).set(true);
        }
        dispatch(fetchPosts());
        dispatch({
          type: actionTypes.LIKE_POST_SUCCESS,
        });
      })
      .catch((error) => dispatch({ type: actionTypes.LIKE_POST_FAIL, error }));
  };
};

export const likeOwnPost = (postKey) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.LIKE_POST_START });

    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;
    const ref = firebase.database().ref('likes');

    return ref
      .child(postKey)
      .once('value')
      .then((snapshot) => {
        if (snapshot.hasChild(uid)) {
          ref.child(postKey).child(uid).remove();
        } else {
          ref.child(postKey).child(uid).set(true);
        }
        dispatch(fetchUserPosts());
        dispatch({
          type: actionTypes.LIKE_POST_SUCCESS,
        });
      })
      .catch((error) => dispatch({ type: actionTypes.LIKE_POST_FAIL, error }));
  };
};
