import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppDrawerItem = ({ label, icon, onPress }) => {
  return (
    <DrawerItem
      label={label}
      icon={({ color, size }) => (
        <MaterialCommunityIcons name={icon} color={color} size={size} />
      )}
      labelStyle={{ fontSize: 16 }}
      onPress={onPress}
    />
  );
};

export default AppDrawerItem;
