import React, { Fragment, useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';
import AppText from '../UI/AppText';
import AppButton from './AppButton';
import AppPickerItem from './AppPickerItem';

const AppPicker = ({
  icon,
  items,
  placeholder,
  onSelectItem,
  selectedItem,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name='chevron-down'
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <SafeAreaView>
          <View style={styles.modal}>
            <AppButton
              title='Close'
              color='secondary'
              onPress={() => setModalVisible(false)}
            />
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <AppPickerItem
                  item={item}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  modal: {
    paddingHorizontal: 20,
  },
});

export default AppPicker;
