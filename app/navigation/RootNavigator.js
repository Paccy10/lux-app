import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

const rootNavigator = ({ auth }) => {
  if (!isLoaded(auth)) {
    return <AppLoading />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isEmpty(auth) ? (
        <Stack.Screen name='Main' component={MainNavigator} />
      ) : (
        <Stack.Screen name='Auth' component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(rootNavigator);
