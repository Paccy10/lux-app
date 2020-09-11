import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import ProfileImage from '../../components/UI/images/ProfileImage';
import ProfileItem from '../../components/UI/lists/ProfileItem';
import AppButton from '../../components/UI/AppButton';
import { fetchFriends } from '../../store/actions/friend';
import { fetchUserPosts } from '../../store/actions/user';
import routes from '../../navigation/routes';
import colors from '../../config/colors';

const ViewProfile = ({
  profile,
  friends,
  fetchFriends,
  navigation,
  fetchUserPosts,
  posts,
}) => {
  const [loading, setLoading] = useState(false);

  const loadFriendsAndPosts = useCallback(async () => {
    setLoading(true);
    await fetchFriends();
    await fetchUserPosts();
    setLoading(false);
  });

  useEffect(() => {
    loadFriendsAndPosts();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ProfileImage
            source={profile.profileImage ? profile.profileImage.imageUrl : ''}
          />
        </View>
        <View style={styles.details}>
          <ProfileItem
            icon='at'
            header='Username'
            subheader={profile.username}
            separator
          />
          <ProfileItem
            icon='account'
            header='Fullname'
            subheader={profile.fullname}
            separator
          />
          <ProfileItem
            icon='flag'
            header='Country'
            subheader={profile.country}
            separator
          />
          <ProfileItem
            icon='calendar-clock'
            header='Date of Birth'
            subheader={
              profile.dateOfBirth
                ? moment(profile.dateOfBirth).format('DD-MM-YYYY')
                : 'Not specified'
            }
            separator
          />
          <ProfileItem
            icon='gender-male-female'
            header='Gender'
            subheader={profile.gender ? profile.gender.label : 'Not specified'}
            separator
          />
          <ProfileItem
            icon='account-multiple'
            header='Realationship Status'
            subheader={
              profile.relationshipStatus
                ? profile.relationshipStatus.label
                : 'Not specified'
            }
            separator
          />
          <ProfileItem
            icon='information'
            header='Status'
            subheader={profile.status}
          />
        </View>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <View style={styles.buttons}>
            <AppButton
              style={styles.button}
              title={`${friends.length} ${
                friends.length === 1 ? 'Friend' : 'Friends'
              }`}
              color='primary'
              onPress={() => navigation.navigate(routes.MY_FRIENDS)}
            />
            <AppButton
              style={styles.button}
              title={`${posts.length} ${posts.length === 1 ? 'Post' : 'Posts'}`}
              color='primary'
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
  imageContainer: {
    alignItems: 'center',
  },
  details: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
  },
  loader: {
    padding: 20,
  },
});

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
  friends: state.friend.friends,
  posts: state.post.posts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFriends: () => dispatch(fetchFriends()),
  fetchUserPosts: () => dispatch(fetchUserPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
