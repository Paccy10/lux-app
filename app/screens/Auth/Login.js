import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import GoogleButton from '../../components/UI/GoogleButton';
import AppText from '../../components/UI/AppText';
import { login, googleLogin } from '../../store/actions/auth';
import colors from '../../config/colors';
import routes from '../../navigation/routes';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const Login = ({
  login,
  loading,
  authError,
  googleLogin,
  googleLoading,
  navigation,
}) => {
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
        <View style={styles.socialButtons}>
          <GoogleButton
            style={styles.button}
            onPress={googleLogin}
            loading={googleLoading}
            disabled={googleLoading}
          />
        </View>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate(routes.RESET_PASSWORD)}
        >
          <AppText style={styles.linkText}>Forgot Password</AppText>
        </TouchableOpacity>
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
  link: {
    marginTop: 20,
  },
  linkText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  googleLoading: state.auth.googleLoading,
  authError: state.auth.authError,
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
  googleLogin: () => dispatch(googleLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
