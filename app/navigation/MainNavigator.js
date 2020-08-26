import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FeedNavigator from './FeedNavigator';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        labelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={FeedNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='NewPost'
        component={FeedNavigator}
        options={{
          drawerLabel: 'Add New Post',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='newspaper-plus'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={FeedNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-circle'
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name='Friends'
        component={FeedNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-group'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='FindFriends'
        component={FeedNavigator}
        options={{
          drawerLabel: 'Find Friends',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-search'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Messages'
        component={FeedNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='email' color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={FeedNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='settings' color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='Logout'
        component={FeedNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='logout' color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
