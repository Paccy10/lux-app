import React, { Fragment, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import ProfileImage from '../../components/UI/images/ProfileImage';
import ProfileItem from '../../components/UI/lists/ProfileItem';
import AppButton from '../../components/UI/AppButton';
import {
  sendFriendRequest,
  checkFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  unFriendUser,
  declineFriendRequest,
} from '../../store/actions/friend';
import colors from '../../config/colors';

const UserProfile = ({
  route,
  sendFriendRequest,
  checkFriendRequest,
  friendshipCurrentState,
  cancelFriendRequest,
  acceptFriendRequest,
  unFriendUser,
  declineFriendRequest,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);

  const profile = route.params;

  const loadCheckRequest = useCallback(async () => {
    setLoadingCheck(true);
    await checkFriendRequest(profile.key);
    setLoadingCheck(false);
  });

  const sendOrCancelRequest = async () => {
    setLoading(true);
    if (friendshipCurrentState === 'not_friends') {
      await sendFriendRequest(profile.key);
      Alert.alert('Success', 'Friend request successfully sent');
    } else if (friendshipCurrentState === 'request_sent') {
      await cancelFriendRequest(profile.key);
      Alert.alert('Success', 'Friend request successfully cancelled');
    } else if (friendshipCurrentState === 'request_received') {
      await acceptFriendRequest(profile.key);
      Alert.alert('Success', 'Friend request successfully accepeted');
    } else {
      await unFriendUser(profile.key);
      Alert.alert('Success', 'Friendship successfully stopped');
    }
    setLoading(false);
  };

  const declineRequest = async () => {
    setLoadingDecline(true);
    await declineFriendRequest(profile.key);
    setLoadingDecline(false);
  };

  useEffect(() => {
    loadCheckRequest();
  }, []);

  let firstButtonText = '';
  if (friendshipCurrentState === 'request_sent') {
    firstButtonText = 'Cancel friend request';
  } else if (friendshipCurrentState === 'request_received') {
    firstButtonText = 'Accept friend request';
  } else if (friendshipCurrentState === 'not_friends') {
    firstButtonText = 'Send friend request';
  } else {
    firstButtonText = 'Unfriend this user';
  }

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
        <View style={styles.buttons}>
          {loadingCheck ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Fragment>
              <AppButton
                style={styles.button}
                title={firstButtonText}
                color='primary'
                onPress={sendOrCancelRequest}
                loading={loading}
                disabled={loading || loadingDecline}
              />
              {friendshipCurrentState === 'request_received' && (
                <AppButton
                  style={styles.button}
                  title='Decline friend request'
                  color='secondary'
                  onPress={declineRequest}
                  loading={loadingDecline}
                  disabled={loading || loadingDecline}
                />
              )}
            </Fragment>
          )}
        </View>
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
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    marginBottom: 15,
  },
});

const mapStateToProps = (state) => ({
  friendshipCurrentState: state.friend.friendshipCurrentState,
  error: state.friend.error,
});

const mapDispatchToProps = (dispatch) => ({
  sendFriendRequest: (receiverId) => dispatch(sendFriendRequest(receiverId)),
  checkFriendRequest: (receiverId) => dispatch(checkFriendRequest(receiverId)),
  cancelFriendRequest: (receiverId) =>
    dispatch(cancelFriendRequest(receiverId)),
  acceptFriendRequest: (receiverId) =>
    dispatch(acceptFriendRequest(receiverId)),
  declineFriendRequest: (receiverId) =>
    dispatch(declineFriendRequest(receiverId)),
  unFriendUser: (userId) => dispatch(unFriendUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
