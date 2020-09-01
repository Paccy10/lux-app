import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../AppText';
import ItemSeparator from '../lists/ListItemsSeparator';
import colors from '../../../config/colors';

const ProfileItem = ({ separator, header, subheader, icon }) => {
  return (
    <View style={styles.item}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={colors.primary}
          style={styles.icon}
        />
        <View style={styles.details}>
          <AppText style={styles.header}>{header}</AppText>
          <AppText style={styles.subheader}>{subheader}</AppText>
        </View>
      </View>
      {separator && <ItemSeparator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  header: {
    color: colors.medium,
    fontSize: 15,
  },
  subheader: {
    fontWeight: '700',
  },
});

export default ProfileItem;
