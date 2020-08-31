import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import AppButton from '../../components/UI/AppButton';
import colors from '../../config/colors';

const GoogleButton = ({ style, ...otherProps }) => {
  return (
    <AppButton
      style={style}
      title='Google'
      icon={
        <FontAwesome5
          name='google-plus'
          color={colors.white}
          style={styles.icon}
        />
      }
      color='google'
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    fontSize: 23,
  },
});

export default GoogleButton;
