import React, { useEffect, useState, useCallback, Fragment } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import PostItem from '../components/UI/lists/PostItem';
import AppText from '../components/UI/AppText';
import AppButton from '../components/UI/AppButton';
import ListItemsSeparator from '../components/UI/lists/ListItemsSeparator';
import { fetchPosts } from '../store/actions/post';
import colors from '../config/colors';
import routes from '../navigation/routes';

const Home = (props) => {
  const isFocused = useIsFocused();
  const { error, fetchPosts, posts, navigation } = props;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    await fetchPosts();
    setLoading(false);
  });

  const loadPostsonRefresh = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPosts();
    });

    return unsubscribe;
  }, [navigation]);

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <Fragment>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.primary} size='large' />
        </View>
      ) : error ? (
        <View style={styles.error}>
          <AppText style={styles.text}>Couldn't retrieve the posts.</AppText>
          <AppButton
            style={styles.retryBtn}
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
            />
          )}
          ItemSeparatorComponent={ListItemsSeparator}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={loadPostsonRefresh}
              tintColor={colors.primary}
              titleColor={colors.primary}
              title='Pull to refresh'
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
    paddingHorizontal: 20,
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
