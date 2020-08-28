import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';

import AppHeaderButton from './AppHeaderButton';
import routes from '../../navigation/routes';

const NewPostButton = () => {
  const navigation = useNavigation();
  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
      <Item
        title='NewPost'
        iconName='newspaper-plus'
        onPress={() => navigation.navigate(routes.NEW_POST)}
      />
    </HeaderButtons>
  );
};

export default NewPostButton;
