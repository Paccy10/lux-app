import React from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';
import defaultStyles from '../../config/styles';

const AppTextInput = ({
  icon,
  loadingIcon,
  width = '100%',
  style,
  ...otherProps
}) => {
  return (
    <View
      style={[
        styles.container,
        { width },
        { display: otherProps.hidden ? 'none' : 'flex' },
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
      />
      {loadingIcon && <ActivityIndicator color={colors.medium} size='small' />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});

export default AppTextInput;
