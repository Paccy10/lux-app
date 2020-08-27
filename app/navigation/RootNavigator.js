import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SetupScreen from '../screens/Auth/Setup';
import routes from './routes';
import defaultOptions from './defaultOptions';

const Stack = createStackNavigator();

const rootNavigator = ({ auth, profile }) => {
  if (!isLoaded(auth)) {
    return <AppLoading />;
  }

  let route = null;
  if (!isEmpty(auth)) {
    if (profile.isEmpty) {
      route = (
        <Stack.Screen
          name={routes.SETUP}
          component={SetupScreen}
          options={{ headerShown: true }}
        />
      );
    } else {
      route = <Stack.Screen name='Main' component={MainNavigator} />;
    }
  } else {
    route = <Stack.Screen name='Auth' component={AuthNavigator} />;
  }

  return (
    <Stack.Navigator screenOptions={{ ...defaultOptions, headerShown: false }}>
      {route}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(rootNavigator);
