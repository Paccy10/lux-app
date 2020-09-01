import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';

import AppText from '../components/UI/AppText';
import PostImage from './UI/images/PostImage';
import colors from '../config/colors';

const PostItem = ({
  fullname,
  time,
  profileImage,
  postImage,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar
            size='medium'
            rounded
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/profile.png')
            }
            avatarStyle={styles.avatar}
          />
          <View style={styles.usernameContainer}>
            <AppText style={styles.username}>{fullname}</AppText>
            <AppText style={styles.timestamp}>
              {moment(new Date(time)).fromNow()}
            </AppText>
          </View>
        </View>
        <PostImage source={{ uri: postImage }} />
        <View style={styles.descriptionContainer}>
          <AppText style={styles.description}>
            <AppText style={styles.descriptionUsername}>{fullname} </AppText>
            {description}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatar: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  usernameContainer: {
    marginLeft: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 13,
    fontWeight: '100',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  descriptionUsername: {
    fontSize: 15,
    fontWeight: '700',
  },

  description: {
    fontSize: 15,
    fontWeight: '300',
  },
});

export default PostItem;
