import React, { Fragment, useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import {
  AppForm,
  AppFormField,
  AppIconSubmitButton,
} from '../../components/forms';
import AppText from '../../components/UI/AppText';
import CommentItem from '../../components/UI/lists/CommentItem';
import ListItemsSeparator from '../../components/UI/lists/ListItemsSeparator';
import { commentPost } from '../../store/actions/comment';
import { fetchPost } from '../../store/actions/post';
import colors from '../../config/colors';

const Comments = ({ fetchPost, commentPost, route, error, post }) => {
  const [loadingPost, setLoadingPost] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPost = useCallback(async () => {
    setLoadingPost(true);
    await fetchPost(route.params);
    setLoadingPost(false);
  });

  const handleSubmit = async (commentData) => {
    if (commentData.comment === '') {
      return;
    }
    setLoading(true);
    await commentPost(route.params, commentData.comment);
    setLoading(false);
  };

  if (error) {
    Alert.alert('Error', error);
  }

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <Fragment>
      {loadingPost ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} size='small' />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior='height'
          keyboardVerticalOffset={90}
          style={styles.container}
        >
          {post.comments.length > 0 ? (
            <FlatList
              style={styles.comments}
              data={post.comments}
              keyExtractor={(comment) => comment.key}
              renderItem={({ item }) => (
                <CommentItem
                  username={item.user.fullname}
                  comment={item.comment}
                  userprofileImage={item.user.profileImage.imageUrl}
                  time={item.createdAt}
                />
              )}
              ItemSeparatorComponent={ListItemsSeparator}
            />
          ) : (
            <View style={styles.noData}>
              <AppText style={styles.noComment}>No comment added yet.</AppText>
            </View>
          )}

          <SafeAreaView style={styles.formContainer}>
            <AppForm
              initialValues={{ comment: '' }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmit(values);
                setSubmitting(false);
                resetForm();
              }}
            >
              <AppFormField
                name='comment'
                icon='comment-question'
                placeholder='What is on your mind?'
                autoCorrect
                autoCapitalize='none'
                keyboardType='default'
                textContentType='none'
                multiline
                width='80%'
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
  comments: {
    padding: 10,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 10,
  },
  loader: {
    padding: 20,
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noComment: {
    color: colors.medium,
  },
});

const mapStateToProps = (state) => ({
  post: state.post.posts[0],
  error: state.comment.error,
});

const mapDispatchToProps = (dispatch) => ({
  commentPost: (postKey, comment) => dispatch(commentPost(postKey, comment)),
  fetchPost: (postKey) => dispatch(fetchPost(postKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
