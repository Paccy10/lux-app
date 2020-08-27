import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import colors from '../../config/colors';

const AppButton = ({ title, color, style, onPress, ...otherProps }) => {
  return (
    <Button
      title={title}
      raised
      buttonStyle={{ ...styles.button, backgroundColor: colors[color] }}
      titleStyle={{
        ...styles.title,
        color: color == 'white' ? colors.primary : colors.white,
      }}
      containerStyle={{ ...styles.container, ...style }}
      onPress={onPress}
      loadingProps={{ color: colors.primary }}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default AppButton;
