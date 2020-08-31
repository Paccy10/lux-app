import React from 'react';
import { StyleSheet, Image, View, ScrollView, Alert } from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import GoogleButton from '../../components/UI/GoogleButton';
import FacebookButton from '../../components/UI/FacebookButton';
import { register, googleLogin } from '../../store/actions/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  confirmPassword: Yup.string()
    .required('Confirm the entered password')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

const Register = ({
  register,
  loading,
  authError,
  googleLogin,
  googleLoading,
}) => {
  const handleSubmit = (userInfo) => {
    register(userInfo);
  };

  if (authError) {
    Alert.alert('Error', authError);
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/logo-white.png')}
        />
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <AppFormField
              name='email'
              icon='email'
              placeholder='E-mail Address'
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
            />
            <AppFormField
              icon='lock'
              name='password'
              placeholder='Password'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              secureTextEntry
            />
            <AppFormField
              icon='lock'
              name='confirmPassword'
              placeholder='Confirm Password'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              secureTextEntry
            />
            <AppSubmitButton
              title='Create Account'
              color='primary'
              style={styles.button}
              loading={loading}
              disabled={loading}
            />
          </AppForm>
        </View>
        <View style={styles.socialButtons}>
          <GoogleButton
            style={styles.button}
            onPress={googleLogin}
            loading={googleLoading}
            disabled={googleLoading}
          />
          <FacebookButton style={styles.button} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 180,
    width: 180,
    marginBottom: 70,
  },
  button: {
    marginTop: 20,
  },
  socialButtons: {
    marginTop: 20,
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  googleLoading: state.auth.googleLoading,
  authError: state.auth.authError,
});

const mapDispatchToProps = (dispatch) => ({
  register: (newUser) => dispatch(register(newUser)),
  googleLogin: () => dispatch(googleLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
