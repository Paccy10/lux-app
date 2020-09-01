import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';

import colors from '../../../config/colors';

const ProfileImage = ({ source }) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={
          source ? { uri: source } : require('../../../assets/profile.png')
        }
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
      />
      {isImageLoading && (
        <ActivityIndicator
          size='small'
          color={colors.primary}
          style={styles.imageLoader}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 114,
    width: 114,
    borderRadius: 57,
    backgroundColor: colors.lightGray,
    borderColor: colors.primary,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageLoader: {
    position: 'absolute',
  },
});

export default ProfileImage;
