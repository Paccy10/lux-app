import * as actionTypes from './types';
import { getFirebase } from 'react-redux-firebase';

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
