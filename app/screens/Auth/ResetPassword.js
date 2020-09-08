import React from 'react';
import { StyleSheet, Image, View, Alert } from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import { resetPassword } from '../../store/actions/auth';
import routes from '../../navigation/routes';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

const ResetPassword = ({ loading, authError, resetPassword, navigation }) => {
  const handleSubmit = async (data) => {
    const { error } = await resetPassword(data.email);
    if (!error) {
      Alert.alert('Success', 'Email Link successfully sent');
      navigation.navigate(routes.LOGIN);
    }
  };

  if (authError) {
    Alert.alert('Error', authError);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logo-white.png')}
      />
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
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
          <AppSubmitButton
            title='Send Link'
            color='primary'
            style={styles.button}
            loading={loading}
            disabled={loading}
          />
        </AppForm>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  resetPassword: (userEmail) => dispatch(resetPassword(userEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
