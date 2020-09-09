import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import AppText from '../AppText';
import colors from '../../../config/colors';
import routes from '../../../navigation/routes';

const FriendItem = ({ user }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.USER_PROFILE, user)}
    >
      <View style={styles.container}>
        <Avatar
          rounded
          size='medium'
          source={
            user.profileImage.imageUrl
              ? { uri: user.profileImage.imageUrl }
              : require('../../../assets/profile.png')
          }
          avatarStyle={styles.avatar}
        />
        <View style={styles.details}>
          <AppText style={styles.name}>{user.fullname}</AppText>
          <AppText style={styles.status} numberOfLines={1}>
            {user.status}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  avatar: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  details: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontWeight: '700',
  },
  status: {
    fontSize: 15,
    color: colors.medium,
  },
});

export default FriendItem;
