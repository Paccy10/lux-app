import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

import AppText from '../AppText';
import colors from '../../../config/colors';

const FriendItem = ({ profileImage, fullname, status }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Avatar
          rounded
          size='medium'
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../../assets/profile.png')
          }
          avatarStyle={styles.avatar}
        />
        <View style={styles.details}>
          <AppText style={styles.name}>{fullname}</AppText>
          <AppText style={styles.status} numberOfLines={1}>
            {status}
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
