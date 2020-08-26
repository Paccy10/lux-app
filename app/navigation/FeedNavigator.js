import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import defaultNavigationOptions from '../navigation/defaultOptions';
import DrawerToggler from '../components/UI/DrawerToggler';

const Stack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavigationOptions,
        headerLeft: () => <DrawerToggler />,
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
