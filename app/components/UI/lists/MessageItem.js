import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../../config/colors';

const MessageItem = ({ receiver, message }) => {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: auth.uid === message.from ? 'flex-end' : 'flex-start',
      }}
    >
      {auth.uid === message.from ? (
        <View style={styles.senderTextContainer}>
          <AppText style={styles.senderText}>{message.message}</AppText>
        </View>
      ) : (
        <View style={styles.receiver}>
          <Avatar
            size='small'
            rounded
            source={
              receiver.profileImage.imageUrl
                ? { uri: receiver.profileImage.imageUrl }
                : require('../../../assets/profile.png')
            }
            avatarStyle={styles.avatar}
          />
          <View style={styles.receiverTextContainer}>
            <AppText style={styles.receiverText}>{message.message}</AppText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  receiver: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  receiverTextContainer: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E8E8E9',
    borderRadius: 25,
    maxWidth: '85%',
  },
  receiverText: {
    fontSize: 17,
  },
  senderTextContainer: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 25,
    maxWidth: '85%',
  },
  senderText: {
    color: colors.white,
    fontSize: 17,
  },
});

export default MessageItem;
