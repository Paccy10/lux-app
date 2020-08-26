import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import colors from '../config/colors';
import AppButton from '../components/UI/AppButton';
import routes from '../navigation/routes';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={require('../assets/logo-purple.png')}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title='Login'
          color='white'
          style={styles.button}
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title='Register'
          color='secondary'
          style={styles.button}
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    height: '50%',
    justifyContent: 'center',
  },
  image: {
    height: 180,
    width: 180,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 40,
  },

  button: {
    marginVertical: 15,
  },
});

export default Welcome;
