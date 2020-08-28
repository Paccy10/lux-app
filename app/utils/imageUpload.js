import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

import firebase from '../config/firebase';

export const verifyPermissions = async () => {
  const result = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (result.status !== 'granted') {
    Alert.alert(
      'Permission Denied',
      'You need to grant camera permissions to take an image'
    );
    return false;
  }
  return true;
};

export const uploadProfileImage = async (imageUri, userId) => {
  try {
    const imageExtension = imageUri.split('.').pop();
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return firebase
      .storage()
      .ref()
      .child(`profile images/${userId}.${imageExtension}`)
      .put(blob);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadPostImage = async (imageUri, userId) => {
  try {
    const imageExtension = imageUri.split('.').pop();
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return firebase
      .storage()
      .ref()
      .child(`post images/${userId}-${Date.now()}.${imageExtension}`)
      .put(blob);
  } catch (error) {
    throw new Error(error.message);
  }
};
