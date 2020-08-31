import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import AppButton from '../../components/UI/AppButton';
import colors from '../../config/colors';

const FacebookButton = ({ style, ...otherProps }) => {
  return (
    <AppButton
      style={style}
      title='Facebook'
      icon={
        <Entypo
          name='facebook-with-circle'
          color={colors.white}
          style={styles.icon}
        />
      }
      color='facebook'
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

export default FacebookButton;
