import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

import colors from '../../config/colors';
import AppText from './AppText';

const ChatHeaderTitle = () => {
  const route = useRoute();
  const user = route.params;
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size='small'
        source={
          user.profileImage.imageUrl
            ? { uri: user.profileImage.imageUrl }
            : require('../../assets/profile.png')
        }
        containerStyle={styles.avatar}
      />
      <AppText style={styles.name} numberOfLines={1}>
        {user.fullname}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 10,
  },
  name: {
    color: colors.white,
    fontWeight: '700',
  },
});

export default ChatHeaderTitle;
