import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ProfileImage from '../../components/UI/images/ProfileImage';
import ProfileItem from '../../components/UI/lists/ProfileItem';

const ViewProfile = () => {
  const profile = useSelector((state) => state.firebase.profile);
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
});

export default ViewProfile;
