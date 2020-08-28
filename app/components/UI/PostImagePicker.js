import React, { useState, Fragment } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppButton from '../../components/UI/AppButton';
import { verifyPermissions } from '../../utils/imageUpload';

const PostImagePicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <Fragment>
      {pickedImage ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pickedImage }}
            style={styles.image}
            resizeMode='cover'
          />
        </View>
      ) : (
        <View style={styles.imageButtonContainer}>
          <AppButton
            title='Add an image'
            color='secondary'
            onPress={takeImageHandler}
          />
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  imageButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  imageContainer: {
    height: 300,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PostImagePicker;
