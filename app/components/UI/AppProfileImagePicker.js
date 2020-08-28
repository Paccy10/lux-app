import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import colors from '../../config/colors';

const AppProfileImagePicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'You need to grant camera permissions to take an image',
        [{ text: 'ok' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
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
            props.image
              ? { uri: props.image }
              : pickedImage
              ? { uri: pickedImage }
              : require('../../assets/profile.png')
          }
        />
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
    borderColor: colors.primary,
    borderWidth: 3,
    marginBottom: 50,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
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
