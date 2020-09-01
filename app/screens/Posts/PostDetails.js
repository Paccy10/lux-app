import React, { useState } from 'react';
import { StyleSheet, Image, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';

import AppText from '../../components/UI/AppText';
import AppButton from '../../components/UI/AppButton';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { deletePost } from '../../store/actions/post';

const EditPost = ({ route, auth, deletePost, navigation }) => {
  const [loading, setLoading] = useState(false);
  const post = route.params;
  const isOwner = post.uid === auth.uid;

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
          setLoading(true);
          await deletePost(post);
          setLoading(false);
          alert('Post successfully deleted');
          navigation.navigate(routes.HOME);
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.image.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.descContainer}>
          <AppText>{post.description}</AppText>
        </View>
        {isOwner && (
          <View style={styles.buttonsContainer}>
            <AppButton
              style={styles.button}
              color='primary'
              title='Edit Post'
            />
            <AppButton
              style={styles.button}
              color='secondary'
              title='Delete Post'
              onPress={onDeletePost}
              loading={loading}
              disabled={loading}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 300,
    backgroundColor: colors.lightGray,
  },
  image: {
    height: '100%',
  },
  descContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  buttonsContainer: {
    padding: 10,
    marginTop: 30,
  },
  button: {
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (post) => dispatch(deletePost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
