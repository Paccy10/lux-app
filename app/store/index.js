import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase, firebaseReducer } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/auth';
import postReducer from './reducers/post';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  post: postReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
);

export default store;
