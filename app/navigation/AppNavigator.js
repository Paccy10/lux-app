import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import NewPostScreen from '../screens/Posts/NewPost';
import PostDetailsScreen from '../screens/Posts/PostDetails';
import EditPostScreen from '../screens/Posts/EditPost';
import ViewProfileScreen from '../screens/Auth/ViewProfile';
import EditProfileScreen from '../screens/Auth/EditProfile';
import defaultNavigationOptions from './defaultOptions';
import DrawerToggler from '../components/UI/AppDrawer/DrawerToggler';
import RightHeaderButton from '../components/UI/RightHeaderButton';
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
          headerRight: () => (
            <RightHeaderButton icon='newspaper-plus' route={routes.NEW_POST} />
          ),
        }}
      />
      <Stack.Screen name={routes.NEW_POST} component={NewPostScreen} />
      <Stack.Screen name={routes.POST_DETAILS} component={PostDetailsScreen} />
      <Stack.Screen name={routes.EDIT_POST} component={EditPostScreen} />
      <Stack.Screen
        name={routes.VIEW_PROFILE}
        component={ViewProfileScreen}
        options={{
          headerRight: () => (
            <RightHeaderButton
              icon='account-edit'
              route={routes.EDIT_PROFILE}
            />
          ),
        }}
      />
      <Stack.Screen name={routes.EDIT_PROFILE} component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
