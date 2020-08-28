import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AppNavigator from './AppNavigator';
import DrawerContent from '../components/UI/AppDrawer/DrawerContent';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name='App' component={AppNavigator} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
