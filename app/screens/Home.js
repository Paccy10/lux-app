import React, { useEffect, useState, Fragment } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import PostItem from '../components/UI/lists/PostItem';
import AppText from '../components/UI/AppText';
import AppButton from '../components/UI/AppButton';
import ListItemsSeparator from '../components/UI/lists/ListItemsSeparator';
import { fetchPosts } from '../store/actions/post';
import colors from '../config/colors';
import routes from '../navigation/routes';

const Home = (props) => {
  const { error, fetchPosts, posts, navigation, dispatch } = props;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPosts = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPosts();
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <Fragment>
      {error ? (
        <View style={styles.error}>
          <AppText style={styles.text}>Couldn't retrieve the posts.</AppText>
          <AppButton
            style={styles.retryBtn}
            color='secondary'
            title='Retry'
            onPress={loadPosts}
          />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.key}
          renderItem={({ item }) => (
            <PostItem
              fullname={item.user.fullname}
              time={item.createdAt}
              profileImage={item.user.profileImage.imageUrl}
              postImage={item.image.imageUrl}
              description={item.description}
              onPress={() =>
                props.navigation.navigate(routes.POST_DETAILS, item)
              }
              postKey={item.key}
              likes={item.likes}
              hasLiked={item.hasLiked}
              comments={item.comments}
            />
          )}
          ItemSeparatorComponent={ListItemsSeparator}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={loadPosts}
              tintColor={colors.primary}
              titleColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  error: {
    padding: 20,
  },
  retryBtn: {
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  error: state.post.error,
  posts: state.post.posts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
