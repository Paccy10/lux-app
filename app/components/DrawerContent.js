import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import AppText from './UI/AppText';
import colors from '../config/colors';
import { logout } from '../store/actions/auth';

const DrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/profile.png')} />
        <AppText style={styles.username}>Username</AppText>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label='Logout'
        icon={({ color, size }) => (
          <MaterialCommunityIcons name='logout' color={color} size={size} />
        )}
        labelStyle={{ fontSize: 15 }}
        onPress={() => dispatch(logout())}
      />
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
