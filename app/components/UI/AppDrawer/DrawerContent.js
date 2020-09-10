import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AppText from '../AppText';
import AppDrawerItem from './AppDrawerItem';
import ProfileImage from '../images/ProfileImage';
import colors from '../../../config/colors';
import { logout } from '../../../store/actions/auth';
import routes from '../../../navigation/routes';

const DrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profile = useSelector((state) => state.firebase.profile);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <ProfileImage
          source={profile.profileImage ? profile.profileImage.imageUrl : ''}
        />
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
        onPress={() => navigation.navigate(routes.VIEW_PROFILE)}
      />
      <AppDrawerItem
        label='My Friends'
        icon='account-group'
        onPress={() => navigation.navigate(routes.MY_FRIENDS)}
      />
      <AppDrawerItem
        label='Find Friends'
        icon='account-search'
        onPress={() => navigation.navigate(routes.ALL_USERS)}
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
  username: {
    color: colors.white,
    marginTop: 10,
  },
});

export default DrawerContent;
