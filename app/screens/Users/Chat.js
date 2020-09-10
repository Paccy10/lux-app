import React, { useState, useCallback, useEffect, Fragment } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import {
  AppForm,
  AppFormField,
  AppIconSubmitButton,
} from '../../components/forms';
import AppText from '../../components/UI/AppText';
import MessageItem from '../../components/UI/lists/MessageItem';
import { sendMessage, fetchMessages } from '../../store/actions/message';
import colors from '../../config/colors';

const Chat = ({ sendMessage, messages, route, fetchMessages }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const loadMessages = useCallback(async () => {
    setLoadingMessages(true);
    await fetchMessages(route.params.key);
    setLoadingMessages(false);
  });

  const handleSubmit = async (messageData) => {
    if (messageData.message === '') {
      return;
    }
    setLoading(true);
    await sendMessage(route.params.key, messageData.message);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <Fragment>
      {loadingMessages ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} size='small' />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior='height'
          keyboardVerticalOffset={90}
          style={styles.container}
        >
          {!loadingMessages && messages.length > 0 ? (
            <FlatList
              data={messages}
              keyExtractor={(message) => message.key}
              renderItem={({ item }) => (
                <MessageItem message={item} receiver={route.params} />
              )}
              inverted
            />
          ) : (
            <View style={styles.noData}>
              <AppText style={styles.noMessage}>
                This is the very beginning of your direct message history with{' '}
                <AppText style={styles.username}>
                  {route.params.fullname}
                </AppText>
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
                autoCapitalize='sentences'
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
      )}
    </Fragment>
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
  loader: {
    padding: 20,
  },
});

const mapStateToProps = (state) => ({
  error: state.message.error,
  messages: state.message.messages,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (receiverId, message) =>
    dispatch(sendMessage(receiverId, message)),
  fetchMessages: (receiverId) => dispatch(fetchMessages(receiverId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
