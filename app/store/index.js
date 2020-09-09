import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase, firebaseReducer } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/auth';
import postReducer from './reducers/post';
import userReducer from './reducers/user';
import likeReducer from './reducers/like';
import commentReducer from './reducers/comment';
import friendReducer from './reducers/friend';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  like: likeReducer,
  comment: commentReducer,
  friend: friendReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
);

export default store;
