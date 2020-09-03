import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import PostImage from '../../components/UI/images/PostImage';
import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import { updatePost } from '../../store/actions/post';
import routes from '../../navigation/routes';

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label('Description'),
});

const EditPost = ({ route, error, updatePost, navigation }) => {
  const post = route.params;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (postData) => {
    setLoading(true);
    await updatePost(post, postData.description);
    setLoading(false);
    navigation.navigate(routes.POST_DETAILS, post);
  };

  if (error) {
    Alert.alert('Error', error);
  }
  return (
    <View>
      <PostImage source={{ uri: post.image.imageUrl }} />
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ description: post.description }}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 10,
  },
});

const mapStateToProps = (state) => ({
  error: state.post.error,
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (post, description) => dispatch(updatePost(post, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
