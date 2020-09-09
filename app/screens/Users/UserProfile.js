import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import ProfileImage from '../../components/UI/images/ProfileImage';
import ProfileItem from '../../components/UI/lists/ProfileItem';
import AppButton from '../../components/UI/AppButton';
import {
  sendFriendRequest,
  checkFriendRequest,
  cancelFriendRequest,
} from '../../store/actions/friend';

const UserProfile = ({
  route,
  sendFriendRequest,
  checkFriendRequest,
  friendshipCurrentState,
  cancelFriendRequest,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);

  const profile = route.params;

  const loadCheckRequest = useCallback(async () => {
    setLoadingCheck(true);
    await checkFriendRequest(profile.key);
    setLoadingCheck(false);
  });

  const sendOrCancelRequest = async () => {
    setLoading(true);
    if (friendshipCurrentState === '') {
      await sendFriendRequest(profile.key);
      Alert.alert('Success', 'Friend request successfully sent');
    } else {
      await cancelFriendRequest(profile.key);
      Alert.alert('Success', 'Friend request successfully cancelled');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCheckRequest();
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
        {!loadingCheck && (
          <View style={styles.buttons}>
            <AppButton
              style={styles.button}
              title={
                friendshipCurrentState !== 'request_sent'
                  ? 'Send friend request'
                  : 'Cancel friend request'
              }
              color='primary'
              onPress={sendOrCancelRequest}
              loading={loading}
              disabled={loading}
            />
            {friendshipCurrentState !== 'request_sent' &&
              friendshipCurrentState !== '' && (
                <AppButton
                  style={styles.button}
                  title='Decline friend request'
                  color='secondary'
                />
              )}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
