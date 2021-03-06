import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import NewPostScreen from '../screens/Posts/NewPost';
import PostDetailsScreen from '../screens/Posts/PostDetails';
import EditPostScreen from '../screens/Posts/EditPost';
import ViewProfileScreen from '../screens/Auth/ViewProfile';
import EditProfileScreen from '../screens/Auth/EditProfile';
import AllUsersScreen from '../screens/Users/AllUsers';
import CommentsScreen from '../screens/Posts/Comments';
import UserProfileScreen from '../screens/Users/UserProfile';
import FriendsScreen from '../screens/Users/Friends';
import ChatScreen from '../screens/Users/Chat';
import PostsScreen from '../screens/Users/Posts';
import defaultNavigationOptions from './defaultOptions';
import DrawerToggler from '../components/UI/AppDrawer/DrawerToggler';
import RightHeaderButton from '../components/UI/RightHeaderButton';
import ChatHeaderTitle from '../components/UI/ChatHeaderTitle';
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
      <Stack.Screen
        name={routes.ALL_USERS}
        component={AllUsersScreen}
        options={{ headerTitle: 'Find Friends' }}
      />
      <Stack.Screen name={routes.COMMENTS} component={CommentsScreen} />
      <Stack.Screen name={routes.USER_PROFILE} component={UserProfileScreen} />
      <Stack.Screen name={routes.MY_FRIENDS} component={FriendsScreen} />
      <Stack.Screen
        name={routes.CHAT}
        component={ChatScreen}
        options={{ headerTitle: (props) => <ChatHeaderTitle {...props} /> }}
      />
      <Stack.Screen name={routes.MY_POSTS} component={PostsScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
