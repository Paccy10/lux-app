import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';

import AppText from '../components/UI/AppText';
import colors from '../config/colors';

const PostItem = ({ fullname, time, profileImage, postImage, description }) => {
  return (
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
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: postImage }}
          resizeMode='cover'
        />
      </View>
      <View style={styles.descriptionContainer}>
        <AppText style={styles.description}>
          <AppText style={styles.descriptionUsername}>{fullname} </AppText>
          {description}
        </AppText>
      </View>
    </View>
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
  imageContainer: {
    height: 300,
    backgroundColor: '#f7f7f7',
  },
  image: {
    height: '100%',
    width: '100%',
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
