import * as actionTypes from './types';

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
