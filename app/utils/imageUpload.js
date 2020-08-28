import firebase from '../config/firebase';

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
