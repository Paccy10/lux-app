import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import PostImage from '../images/PostImage';
import colors from '../../../config/colors';
import { likePost } from '../../../store/actions/like';

const PostItem = ({
  fullname,
  time,
  profileImage,
  postImage,
  description,
  onPress,
  postKey,
  likes,
  hasLiked,
}) => {
  const dispatch = useDispatch();

  const onLIkePost = (postKey) => {
    dispatch(likePost(postKey));
  };

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
                : require('../../../assets/profile.png')
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
        <View style={styles.buttons}>
          <View style={styles.button}>
            {hasLiked ? (
              <TouchableWithoutFeedback onPress={() => onLIkePost(postKey)}>
                <MaterialCommunityIcons
                  name='heart'
                  size={23}
                  color={colors.secondary}
                />
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => onLIkePost(postKey)}>
                <MaterialCommunityIcons name='heart-outline' size={23} />
              </TouchableWithoutFeedback>
            )}
            <AppText style={styles.text}>{likes} Likes</AppText>
          </View>
          <View style={styles.button}>
            <TouchableWithoutFeedback>
              <MaterialCommunityIcons name='comment-outline' size={23} />
            </TouchableWithoutFeedback>
            <AppText style={styles.text}>0 comments</AppText>
          </View>
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
  buttons: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    marginRight: 20,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default PostItem;
