import React from 'react';
import { StyleSheet, Image, View, ScrollView, Alert } from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import { login } from '../../store/actions/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const Login = ({ login, loading, authError }) => {
  const handleSubmit = (credentials) => {
    login(credentials);
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
            initialValues={{ email: '', password: '' }}
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
            <AppSubmitButton
              title='Login'
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
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authError: state.auth.authError,
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
