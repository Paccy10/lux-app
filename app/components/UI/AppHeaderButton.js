import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';

const AppHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialCommunityIcons}
      iconSize={23}
      color={colors.white}
    />
  );
};

export default AppHeaderButton;
