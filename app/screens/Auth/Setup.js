import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import ProfileImagePicker from '../../components/UI/images/ProfileImagePicker';
import { setUserProfile } from '../../store/actions/auth';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  fullname: Yup.string().required().label('Fullname'),
  country: Yup.string().required().label('Country'),
});

import colors from '../../config/colors';

const Setup = ({ createUserProfile, loading, authError }) => {
  const [image, setImage] = useState();
  const handleSubmit = (userData) => {
    userData.imageUri = image;
    createUserProfile(userData);
  };

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  if (authError) {
    Alert.alert('Error', authError);
  }
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <ProfileImagePicker onImageTaken={imageTakenHandler} />
        <View>
          <AppForm
            initialValues={{ username: '', fullname: '', country: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <AppFormField
              name='username'
              icon='at'
              placeholder='Username'
              autoCorrect={false}
              autoCapitalize='none'
              textContentType='username'
            />
            <AppFormField
              name='fullname'
              icon='account'
              placeholder='Full Name'
              autoCorrect={false}
              autoCapitalize='words'
              textContentType='name'
            />
            <AppFormField
              name='country'
              icon='flag'
              placeholder='Country'
              autoCorrect={false}
              autoCapitalize='words'
              textContentType='countryName'
            />
            <AppSubmitButton
              title='Setup Profile'
              color='primary'
              style={styles.button}
              loading={loading}
              disabled={loading}
            />
          </AppForm>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authError: state.auth.authError,
});

const mapDispatchToProps = (dispatch) => ({
  createUserProfile: (userData) => dispatch(setUserProfile(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
