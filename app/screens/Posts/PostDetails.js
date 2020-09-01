import React from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import AppText from '../../components/UI/AppText';
import AppButton from '../../components/UI/AppButton';
import colors from '../../config/colors';
import routes from '../../navigation/routes';

const EditPost = ({ route, auth }) => {
  const post = route.params;
  const isOwner = post.uid === auth.uid;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.image }} style={styles.image} />
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

export default connect(mapStateToProps)(EditPost);
