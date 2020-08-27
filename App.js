import React from 'react';
import { StyleSheet, StatusBar, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import RootNavigator from './app/navigation/RootNavigator';
import theme from './app/config/theme';
import store from './app/store';
import firebase from './app/config/firebase';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = { ...console };
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const rrfConfig = { userProfile: 'users' };
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <NavigationContainer theme={theme}>
          <StatusBar barStyle='light-content' />
          <RootNavigator />
        </NavigationContainer>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
