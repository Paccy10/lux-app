import * as actionTypes from './types';
import { fetchPost } from './post';

export const commentPost = (postKey, comment) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.COMMENT_POST_START });
    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;
    const { fullname, profileImage } = getState().firebase.profile;
    const user = {
      uid,
      fullname,
      profileImage,
    };
    return firebase
      .database()
      .ref(`posts/${postKey}/comments`)
      .push()
      .set({
        comment,
        createdAt: new Date().toString(),
        user,
      })
      .then(() => {
        dispatch({ type: actionTypes.COMMENT_POST_SUCCESS });
        dispatch(fetchPost(postKey));
      })
      .catch((error) =>
        dispatch({ type: actionTypes.COMMENT_POST_FAIL, error })
      );
  };
};
