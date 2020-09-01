import * as actionTypes from './types';
import { uploadPostImage, deleteImage } from '../../utils/imageUpload';

export const createPost = (postData) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.CREATE_POST_START });

    const { uid } = getState().firebase.auth;
    const uploadResponse = await uploadPostImage(postData.imageUri, uid);
    const imageUrl = await uploadResponse.ref.getDownloadURL();
    const imageName = await uploadResponse.ref.name;
    const { fullname, profileImage } = getState().firebase.profile;
    const user = { fullname, profileImage };
    const firebase = getFirebase();

    return firebase
      .database()
      .ref('posts')
      .push()
      .set({
        uid,
        createdAt: new Date().toString(),
        description: postData.description,
        image: { imageUrl, imageName },
        user,
      })
      .then(() => dispatch({ type: actionTypes.CREATE_POST_SUCCESS }))
      .catch((error) =>
        dispatch({ type: actionTypes.CREATE_POST_FAIL, error })
      );
  };
};

export const fetchPosts = () => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.FETCH_POSTS_START });
    const firebase = getFirebase();
    return firebase
      .database()
      .ref('posts')
      .once('value')
      .then((snapshot) => {
        const posts = [];
        snapshot.forEach((childSnapshot) => {
          const post = childSnapshot.val();
          post.key = childSnapshot.key;
          posts.unshift(post);
        });
        dispatch({
          type: actionTypes.FETCH_POSTS_SUCCESS,
          posts,
        });
      })
      .catch((error) =>
        dispatch({ type: actionTypes.FETCH_POSTS_FAIL, error })
      );
  };
};

export const fetchPost = (postKey) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.FETCH_POST_START });
    const firebase = getFirebase();
    return firebase
      .database()
      .ref('posts')
      .child(postKey)
      .once('value')
      .then((snapshot) => {
        const post = snapshot.val();
        post.key = snapshot.key;
        dispatch({
          type: actionTypes.FETCH_POST_SUCCESS,
          post,
        });
      })
      .catch((error) => dispatch({ type: actionTypes.FETCH_POST_FAIL, error }));
  };
};

export const deletePost = (post) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.DELETE_POST_START });
    const firebase = getFirebase();

    return firebase
      .database()
      .ref('posts')
      .child(post.key)
      .remove()
      .then(async () => {
        await deleteImage('post images', post.image.imageName);
        dispatch({ type: actionTypes.DELETE_POST_SUCCESS });
      })
      .catch((error) =>
        dispatch({ type: actionTypes.DELETE_POST_FAIL, error })
      );
  };
};

export const updatePost = (post, description) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.UPDATE_POST_START });
    const firebase = getFirebase();

    return firebase
      .database()
      .ref('posts')
      .child(post.key)
      .child('description')
      .set(description)
      .then(() => dispatch({ type: actionTypes.UPDATE_POST_SUCCESS }))
      .catch((error) =>
        dispatch({ type: actionTypes.UPDATE_POST_FAIL, error })
      );
  };
};
