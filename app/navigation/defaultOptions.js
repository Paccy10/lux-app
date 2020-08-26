import React from 'react';

import DrawerToggler from '../components/UI/DrawerToggler';
import colors from '../config/colors';

export default {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerBackTitle: 'Back',
  headerLeft: () => <DrawerToggler />,
};
