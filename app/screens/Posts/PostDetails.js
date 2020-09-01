import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import AppText from '../../components/UI/AppText';
import AppButton from '../../components/UI/AppButton';
import PostImage from '../../components/UI/images/PostImage';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { deletePost, fetchPost } from '../../store/actions/post';

const PostDetails = ({
  route,
  auth,
  deletePost,
  navigation,
  error,
  fetchPost,
  post,
}) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const isFocused = useIsFocused();
  const isOwner = route.params.uid === auth.uid;

  const loadPost = useCallback(async () => {
    setLoading(true);
    await fetchPost(route.params.key);
    setLoading(false);
  });

  useEffect(() => {
    if (isFocused) {
      loadPost();
    }
  }, [isFocused]);

  const onDeletePost = () => {
    Alert.alert('Warning', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
      },
      {
        text: 'OK',
        onPress: async () => {
          setDeleteLoading(true);
          await deletePost(post);
          setDeleteLoading(false);
          Alert.alert('Success', 'Post successfully deleted');
          navigation.navigate(routes.HOME);
        },
      },
    ]);
  };

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <ScrollView>
      {loading ? (
        <View>
          <ActivityIndicator color={colors.primary} size='small' />
        </View>
      ) : (
        <View style={styles.container}>
          <PostImage source={{ uri: post.image.imageUrl }} />
          <View style={styles.descContainer}>
            <AppText>{post.description}</AppText>
          </View>
          {isOwner && (
            <View style={styles.buttonsContainer}>
              <AppButton
                style={styles.button}
                color='primary'
                title='Edit Post'
                onPress={() => navigation.navigate(routes.EDIT_POST, post)}
                disabled={deleteLoading}
              />
              <AppButton
                style={styles.button}
                color='secondary'
                title='Delete Post'
                onPress={onDeletePost}
                loading={deleteLoading}
                disabled={deleteLoading}
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  descContainer: {
    padding: 20,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  button: {
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  post: state.post.posts[0],
  error: state.post.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postKey) => dispatch(fetchPost(postKey)),
  deletePost: (post) => dispatch(deletePost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
