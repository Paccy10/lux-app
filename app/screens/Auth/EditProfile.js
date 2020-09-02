import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProfileImagePicker from '../../components/UI/images/ProfileImagePicker';
import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import AppFormPicker from '../../components/forms/AppFormPicker';
import AppFormDatePicker from '../../components/forms/AppFormDatePicker';
import { updateProfile } from '../../store/actions/auth';
import routes from '../../navigation/routes';

const genders = [
  {
    backgroundColor: '#26de81',
    icon: 'human-male',
    label: 'Male',
    value: 1,
  },
  {
    backgroundColor: '#a55eea',
    icon: 'human-female',
    label: 'Female',
    value: 2,
  },
  {
    backgroundColor: '#778ca3',
    icon: 'application',
    label: 'Other',
    value: 3,
  },
];

const relationships = [
  {
    backgroundColor: '#fc5c65',
    icon: 'human',
    label: 'Single',
    value: 1,
  },
  {
    backgroundColor: '#fd9644',
    icon: 'human-male-female',
    label: 'In a relationship',
    value: 2,
  },
  {
    backgroundColor: '#fed330',
    icon: 'ring',
    label: 'Engaged',
    value: 3,
  },
  {
    backgroundColor: '#26de81',
    icon: 'human-male-female',
    label: 'Married',
    value: 4,
  },
  {
    backgroundColor: '#2bcbba',
    icon: 'human',
    label: 'Divorced',
    value: 5,
  },
  {
    backgroundColor: '#45aaf2',
    icon: 'human-male-female',
    label: 'Taken',
    value: 6,
  },
  {
    backgroundColor: '#4b7bec',
    icon: 'panorama-fisheye',
    label: "I don't want to say",
    value: 7,
  },
];

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  fullname: Yup.string().required().label('Fullname'),
  country: Yup.string().required().label('Country'),
});

const EditProfile = ({
  profile,
  authError,
  loading,
  updateProfile,
  navigation,
}) => {
  const [image, setImage] = useState();

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const handleSubmit = async (profileData) => {
    profileData.imageUri = image;
    await updateProfile(profileData);
    Alert.alert('Success', 'Profile successfully updated');
    navigation.navigate(routes.VIEW_PROFILE);
  };

  if (authError) {
    Alert.alert('Error', authError);
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <ProfileImagePicker
          onImageTaken={imageTakenHandler}
          image={profile.profileImage ? profile.profileImage.imageUrl : ''}
        />
        <View>
          <AppForm
            initialValues={{
              username: profile.username,
              fullname: profile.fullname,
              country: profile.country,
              dateOfBirth: profile.dateOfBirth,
              relationshipStatus: profile.relationshipStatus
                ? profile.relationshipStatus
                : '',
              gender: profile.gender ? profile.gender : '',
              status: profile.status,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
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
            <AppFormDatePicker name='dateOfBirth' placeholder='Date of Birth' />
            <AppFormPicker
              name='gender'
              icon='gender-male-female'
              placeholder='Gender'
              items={genders}
            />
            <AppFormPicker
              name='relationshipStatus'
              icon='account-multiple'
              placeholder='Relationship Status'
              items={relationships}
            />
            <AppFormField
              name='status'
              icon='information'
              placeholder='Status'
              autoCorrect={false}
              autoCapitalize='words'
              textContentType='countryName'
            />
            <AppSubmitButton
              title='Update Profile'
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
  profile: state.firebase.profile,
  loading: state.auth.loading,
  authError: state.auth.authError,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (userData) => dispatch(updateProfile(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
