import * as actionTypes from './types';

export const fetchUsers = () => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.FETCH_USERS_START });

    const firebase = getFirebase();

    return firebase
      .database()
      .ref('users')
      .once('value')
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          user.key = childSnapshot.key;
          users.unshift(user);
        });
        dispatch({
          type: actionTypes.FETCH_USERS_SUCCESS,
          users,
        });
      })
      .catch((error) =>
        dispatch({ type: actionTypes.FETCH_USERS_FAIL, error })
      );
  };
};
