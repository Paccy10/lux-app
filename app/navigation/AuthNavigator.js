import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import defaultNavigationOptions from '../navigation/defaultOptions';
import routes from './routes';
import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Auth/Register';
import LoginScreen from '../screens/Auth/Login';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name={routes.WELCOME}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
