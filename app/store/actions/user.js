import * as actionTypes from './types';

export const fetchUsers = () => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.FETCH_USERS_START });

    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;

    return firebase
      .database()
      .ref('users')
      .once('value')
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          user.key = childSnapshot.key;
          if (user.key !== uid) {
            users.unshift(user);
          }
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

export const searchUser = (query) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.SEARCH_USER_START });

    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;

    return firebase
      .database()
      .ref('users')
      .orderByChild('fullname')
      .startAt(query)
      .endAt(`${query}\uf8ff`)
      .once('value')
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          user.key = childSnapshot.key;
          if (user.key !== uid) {
            users.unshift(user);
          }
        });
        dispatch({
          type: actionTypes.SEARCH_USER_SUCCESS,
          users,
        });
      })
      .catch((error) =>
        dispatch({ type: actionTypes.SEARCH_USER_FAIL, error })
      );
  };
};

export const fetchUserPosts = () => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.FETCH_USER_POSTS_START });

    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;

    return firebase
      .database()
      .ref('posts')
      .orderByChild('uid')
      .startAt(uid)
      .endAt(uid)
      .once('value')
      .then(async (snapshot) => {
        const posts = [];
        const reads = [];
        snapshot.forEach((childSnapshot) => {
          const post = childSnapshot.val();
          post.key = childSnapshot.key;
          const comments = [];
          commentsSnap = childSnapshot.child('comments');
          commentsSnap.forEach((childSnap) => {
            const comment = childSnap.val();
            comment.key = childSnap.key;
            comments.push(comment);
          });
          post.comments = comments;

          const promise = firebase
            .database()
            .ref('likes')
            .child(post.key)
            .once('value')
            .then((likeSnapshot) => {
              const likes = likeSnapshot.numChildren();
              let hasLiked = false;
              post.likes = likes;
              if (likeSnapshot.hasChild(uid)) {
                hasLiked = true;
              }
              post.likes = likes;
              post.hasLiked = hasLiked;
              dispatch({
                type: actionTypes.FETCH_POST_LIKES_SUCCESS,
              });
            })
            .catch((error) =>
              dispatch({ type: actionTypes.FETCH_POST_LIKES_FAIL, error })
            );
          reads.push(promise);
          posts.unshift(post);
        });
        await Promise.all(reads);
        dispatch({ type: actionTypes.FETCH_USER_POSTS_SUCCESS, posts });
      })
      .catch((error) =>
        dispatch({ type: actionTypes.FETCH_USER_POSTS_FAIL, error })
      );
  };
};
