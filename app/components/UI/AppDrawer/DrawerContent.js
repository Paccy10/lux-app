import React, { useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AppText from '../AppText';
import AppDrawerItem from './AppDrawerItem';
import colors from '../../../config/colors';
import { logout } from '../../../store/actions/auth';
import routes from '../../../navigation/routes';

const DrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isImageLoading, setIsImageLoading] = useState(false);
  const profile = useSelector((state) => state.firebase.profile);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              profile.profileImage
                ? { uri: profile.profileImage }
                : require('../../../assets/profile.png')
            }
            onLoadStart={() => setIsImageLoading(true)}
            onLoadEnd={() => setIsImageLoading(false)}
          />
          {isImageLoading && (
            <ActivityIndicator
              size={23}
              color={colors.primary}
              style={styles.imageLoader}
            />
          )}
        </View>
        <AppText style={styles.username}>{profile.fullname}</AppText>
      </View>
      <AppDrawerItem
        label='Home'
        icon='home'
        onPress={() => navigation.navigate(routes.HOME)}
      />
      <AppDrawerItem
        label='New Post'
        icon='newspaper-plus'
        onPress={() => navigation.navigate(routes.NEW_POST)}
      />
      <AppDrawerItem
        label='Profile'
        icon='account-circle'
        onPress={() => navigation.navigate(routes.HOME)}
      />
      <AppDrawerItem
        label='Friends'
        icon='account-group'
        onPress={() => navigation.navigate(routes.HOME)}
      />
      <AppDrawerItem
        label='Messages'
        icon='email'
        onPress={() => navigation.navigate(routes.HOME)}
      />
      <AppDrawerItem
        label='Settings'
        icon='settings'
        onPress={() => navigation.navigate(routes.HOME)}
      />
      <AppDrawerItem
        label='Logout'
        icon='logout'
        onPress={() => dispatch(logout())}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: colors.primary,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 114,
    width: 114,
    borderRadius: 57,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageLoader: {
    position: 'absolute',
  },
  username: {
    color: colors.white,
    marginTop: 10,
  },
});

export default DrawerContent;
