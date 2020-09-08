import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';

const AppIconButton = ({ onPress, style, loading, disabled }) => {
  return (
    <View
      style={{
        ...style,
        ...styles.container,
        backgroundColor: disabled ? colors.light : colors.primary,
      }}
    >
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <MaterialCommunityIcons name='send' color={colors.white} size={23} />
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppIconButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
