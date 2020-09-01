import React, { useState, Fragment } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppButton from '../AppButton';
import PostImage from '../images/PostImage';
import { verifyPermissions } from '../../../utils/imageUpload';

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
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <Fragment>
      {pickedImage ? (
        <PostImage source={{ uri: pickedImage }} />
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
});

export default PostImagePicker;
