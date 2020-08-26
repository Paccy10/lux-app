import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase, firebaseReducer } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({ firebase: firebaseReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
);

export default store;
