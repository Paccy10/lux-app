import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';

import AppHeaderButton from '../AppHeaderButton';

const DrawerToggler = () => {
  const navigation = useNavigation();
  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
      <Item
        title='Menu'
        iconName='menu'
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  );
};

export default DrawerToggler;
