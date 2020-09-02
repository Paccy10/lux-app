import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';

import AppHeaderButton from './AppHeaderButton';

const RightHeaderButton = ({ icon, route }) => {
  const navigation = useNavigation();
  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
      <Item iconName={icon} onPress={() => navigation.navigate(route)} />
    </HeaderButtons>
  );
};

export default RightHeaderButton;
