import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import {
  AppForm,
  AppFormField,
  AppIconSubmitButton,
} from '../../components/forms';
import AppText from '../../components/UI/AppText';
import { sendMessage } from '../../store/actions/message';
import colors from '../../config/colors';

const Chat = ({ sendMessage, messages, route }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (messageData) => {
    if (messageData.message === '') {
      return;
    }
    setLoading(true);
    await sendMessage(route.params.key, messageData.message);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior='height'
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      {messages.length > 0 ? (
        <ScrollView></ScrollView>
      ) : (
        <View style={styles.noData}>
          <AppText style={styles.noMessage}>
            This is the very beginning of your direct message history with{' '}
            <AppText style={styles.username}>{route.params.fullname}</AppText>
          </AppText>
        </View>
      )}
      <SafeAreaView style={styles.formContainer}>
        <AppForm
          initialValues={{ message: '' }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          <AppFormField
            name='message'
            icon='email'
            placeholder='Type a message'
            autoCorrect
            autoCapitalize='none'
            keyboardType='default'
            textContentType='none'
            multiline
            width='80%'
            style={{ marginRight: 10 }}
          />

          <AppIconSubmitButton
            style={styles.button}
            loading={loading}
            disabled={loading}
          />
        </AppForm>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noMessage: {
    color: colors.medium,
  },
  username: {
    fontWeight: '700',
  },
});

const mapStateToProps = (state) => ({
  error: state.message.error,
  messages: state.message.messages,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (receiverId, message) =>
    dispatch(sendMessage(receiverId, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
