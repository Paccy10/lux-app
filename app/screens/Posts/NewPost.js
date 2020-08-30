import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import PostImagePicker from '../../components/UI/PostImagePicker';
import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import { createPost } from '../../store/actions/post';
import routes from '../../navigation/routes';

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label('Description'),
});

const NewPost = ({ error, createPost, navigation }) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const handleSubmit = async (postData) => {
    if (!image) {
      Alert.alert('Error', 'The post image is required');
      return;
    }
    setLoading(true);
    postData.imageUri = image;
    await createPost(postData);
    setLoading(false);
    navigation.navigate(routes.HOME);
  };

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <View>
      <PostImagePicker onImageTaken={imageTakenHandler} />
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ description: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          <AppFormField
            name='description'
            icon='comment-question'
            placeholder='What is on your mind?'
            autoCorrect
            autoCapitalize='none'
            keyboardType='default'
            textContentType='none'
            multiline
          />

          <AppSubmitButton
            title='Add Post'
            color='primary'
            style={styles.button}
            loading={loading}
            disabled={loading}
          />
        </AppForm>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 10,
  },
});

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  error: state.post.error,
});

const mapDispatchToProps = (dispatch) => ({
  createPost: (postData) => dispatch(createPost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
