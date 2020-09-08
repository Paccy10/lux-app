import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';

import colors from '../../../config/colors';
import AppText from '../AppText';

const CommentItem = ({ username, comment, userprofileImage, time }) => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size='medium'
        source={
          userprofileImage
            ? { uri: userprofileImage }
            : require('../../../assets/profile.png')
        }
        avatarStyle={styles.avatar}
      />
      <View style={styles.details}>
        <AppText style={styles.comment}>
          <AppText style={styles.username}>{username} </AppText>
          {comment}
        </AppText>
        <AppText style={styles.time}>
          {moment(new Date(time)).fromNow()}
        </AppText>
      </View>
    </View>
  );
};

export default CommentItem;

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
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
  },
  comment: {
    fontSize: 16,
    fontWeight: '300',
  },
  time: {
    marginTop: 5,
    fontSize: 13,
    color: colors.medium,
    fontWeight: '300',
  },
});
