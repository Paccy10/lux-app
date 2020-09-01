import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import colors from '../../../config/colors';

const AppImage = ({ source, style }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={source} style={[styles.image, style]} resizeMode='cover' />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 300,
    backgroundColor: colors.lightGray,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default AppImage;
