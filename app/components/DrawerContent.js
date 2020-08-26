import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import AppText from './UI/AppText';
import colors from '../config/colors';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/profile.png')} />
        <AppText style={styles.username}>Username</AppText>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 114,
    width: 114,
    borderRadius: 57,
    backgroundColor: colors.white,
  },
  username: {
    color: colors.white,
    marginTop: 10,
  },
});

export default DrawerContent;
