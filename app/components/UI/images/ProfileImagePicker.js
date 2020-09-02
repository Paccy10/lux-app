import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import colors from '../../../config/colors';
import { verifyPermissions } from '../../../utils/imageUpload';

const AppProfileImagePicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const [isImageLoading, setIsImageLoading] = useState(false);

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.picker}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={
            pickedImage
              ? { uri: pickedImage }
              : props.image
              ? { uri: props.image }
              : require('../../../assets/profile.png')
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
      <TouchableOpacity style={styles.pick} onPress={takeImageHandler}>
        <MaterialCommunityIcons name='camera' size={25} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: colors.lightGray,
    borderColor: colors.primary,
    borderWidth: 3,
    marginBottom: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageLoader: {
    position: 'absolute',
  },
  pick: {
    position: 'absolute',
    top: '50%',
    right: 0,
    backgroundColor: colors.primary,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppProfileImagePicker;
