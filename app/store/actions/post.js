import * as actionTypes from './types';
import { uploadPostImage } from '../../utils/imageUpload';

export const createPost = (postData) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.CREATE_POST_START });

    const { uid } = getState().firebase.auth;
    const uploadResponse = await uploadPostImage(postData.imageUri, uid);
    const imageUrl = await uploadResponse.ref.getDownloadURL();
    const { fullname, profileImage } = getState().firebase.profile;
    const user = { fullname, profileImage };
    const firebase = getFirebase();

    firebase
      .database()
      .ref('posts')
      .push()
      .set({
        uid,
        createdAt: new Date().toString(),
        description: postData.description,
        image: imageUrl,
        user,
      })
      .then(() => dispatch({ type: actionTypes.CREATE_POST_SUCCESS }))
      .catch((error) =>
        dispatch({ type: actionTypes.CREATE_POST_FAIL, error })
      );
  };
};
