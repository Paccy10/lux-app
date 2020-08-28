import * as actionTypes from './types';
import { uploadProfileImage } from '../../utils/imageUpload';

export const register = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.REGISTER_START });
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => dispatch({ type: actionTypes.REGISTER_SUCCESS }))
      .catch((error) => dispatch({ type: actionTypes.REGISTER_FAIL, error }));
  };
};

export const login = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.LOGIN_START });
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => dispatch({ type: actionTypes.LOGIN_SUCCESS }))
      .catch((error) => dispatch({ type: actionTypes.REGISTER_FAIL, error }));
  };
};

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      });
  };
};

export const setUserProfile = (userData) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.SETUP_PROFILE_START });
    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;
    let imageUrl = '';
    if (userData.imageUri) {
      const uploadResponse = await uploadProfileImage(userData.imageUri, uid);
      imageUrl = await uploadResponse.ref.getDownloadURL();
    }

    firebase
      .database()
      .ref(`users/${uid}`)
      .update({
        username: userData.username,
        fullname: userData.fullname,
        country: userData.country,
        status: 'Hey there, I am using Lux App!',
        gender: 'none',
        dateOfBirth: 'none',
        relationshipStatus: 'none',
        profileImage: imageUrl,
      })
      .then(() => dispatch({ type: actionTypes.SETUP_PROFILE_SUCCESS }))
      .catch((error) =>
        dispatch({ type: actionTypes.SETUP_PROFILE_FAIL, error })
      );
  };
};
