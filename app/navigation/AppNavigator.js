import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import NewPostScreen from '../screens/Posts/NewPost';
import PostDetailsScreen from '../screens/Posts/PostDetails';
import EditPostScreen from '../screens/Posts/EditPost';
import ViewProfileScreen from '../screens/Auth/ViewProfile';
import defaultNavigationOptions from './defaultOptions';
import DrawerToggler from '../components/UI/AppDrawer/DrawerToggler';
import NewPostButton from '../components/UI/NewPostButton';
import routes from './routes';

const Stack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavigationOptions,
      }}
    >
      <Stack.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          headerLeft: () => <DrawerToggler />,
          headerRight: () => <NewPostButton />,
        }}
      />
      <Stack.Screen name={routes.NEW_POST} component={NewPostScreen} />
      <Stack.Screen name={routes.POST_DETAILS} component={PostDetailsScreen} />
      <Stack.Screen name={routes.EDIT_POST} component={EditPostScreen} />
      <Stack.Screen name={routes.VIEW_PROFILE} component={ViewProfileScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
