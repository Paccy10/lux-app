import React from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';

import AppTextInput from '../../components/UI/AppTextInput';
import AppButton from '../../components/UI/AppButton';

const Register = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/logo-white.png')}
        />
        <View style={styles.formContainer}>
          <AppTextInput
            name='email'
            icon='email'
            placeholder='E-mail Address'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
          />
          <AppTextInput
            icon='lock'
            name='password'
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            textContentType='password'
            secureTextEntry
          />
          <AppTextInput
            icon='lock'
            name='confirmPassword'
            placeholder='Confirm Password'
            autoCapitalize='none'
            autoCorrect={false}
            textContentType='password'
            secureTextEntry
          />
          <AppButton
            title='Create Account'
            color='primary'
            style={styles.button}
          />
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

export default Register;
