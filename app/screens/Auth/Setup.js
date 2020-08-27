import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

import colors from '../../config/colors';
import AppTextInput from '../../components/UI/AppTextInput';
import AppButton from '../../components/UI/AppButton';

const Setup = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/profile.png')}
        />
        <View>
          <AppTextInput
            autoCapitalize='none'
            autoCorrect={false}
            icon='at'
            name='username'
            placeholder='Username'
            textContentType='username'
          />
          <AppTextInput
            autoCapitalize='words'
            autoCorrect={false}
            icon='account'
            name='fullname'
            placeholder='Full Name'
            textContentType='name'
          />
          <AppTextInput
            autoCapitalize='none'
            autoCorrect={false}
            icon='flag'
            name='country'
            placeholder='Country'
            textContentType='countryName'
          />
          <AppButton title='Save' color='primary' style={styles.button} />
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
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: colors.primary,
    borderWidth: 3,
    marginBottom: 50,
  },
  button: {
    marginTop: 20,
  },
});

export default Setup;
