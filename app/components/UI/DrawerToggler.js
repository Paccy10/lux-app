import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';

import AppHeaderButton from './AppHeaderButton';

const DrawerToggler = () => {
  const navigation = useNavigation();
  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
      <Item
        title='Menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  );
};

export default DrawerToggler;
