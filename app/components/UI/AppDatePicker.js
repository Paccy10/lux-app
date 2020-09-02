import React, { Fragment, useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
  SafeAreaView,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import colors from '../../config/colors';
import AppText from './AppText';
import AppButton from './AppButton';

const AppDatePicker = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showDatepicker = () => {
    setModalVisible(true);
    props.setShow(true);
  };

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name='calendar-clock'
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
          {props.value ? (
            <AppText style={styles.text}>
              {moment(props.value).format('DD-MM-YYYY')}
            </AppText>
          ) : (
            <AppText style={styles.placeholder}>{props.placeholder}</AppText>
          )}
        </View>
      </TouchableWithoutFeedback>
      {props.show && (
        <Fragment>
          {Platform.OS === 'android' ? (
            <DateTimePicker
              value={props.value ? props.value : new Date()}
              mode='date'
              is24Hour={true}
              display='calendar'
              onChange={props.onChange}
              maximumDate={new Date()}
            />
          ) : (
            <Modal visible={modalVisible} animationType='slide'>
              <SafeAreaView>
                <View style={styles.modal}>
                  <AppButton
                    title='Pick'
                    color='primary'
                    onPress={() => setModalVisible(false)}
                  />
                  <DateTimePicker
                    value={props.value ? props.value : new Date()}
                    mode='date'
                    display='default'
                    onChange={props.onChange}
                    style={styles.pickerIOS}
                    textColor={colors.primary}
                    maximumDate={new Date()}
                  />
                </View>
              </SafeAreaView>
            </Modal>
          )}
        </Fragment>
      )}
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
  pickerIOS: {
    height: 300,
  },
});

export default AppDatePicker;
