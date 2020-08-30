import React, { useEffect, useState, useCallback, Fragment } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import PostItem from '../components/PostItem';
import AppText from '../components/UI/AppText';
import AppButton from '../components/UI/AppButton';
import ListItemsSeparator from '../components/UI/lists/ListItemsSeparator';
import { fetchPosts } from '../store/actions/post';
import colors from '../config/colors';

const Home = (props) => {
  const isFocused = useIsFocused();
  const { error, fetchPosts, posts } = props;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    await fetchPosts();
    setLoading(false);
  });

  useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);

  return (
    <Fragment>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.primary} size='large' />
        </View>
      ) : error ? (
        <View style={styles.error}>
          <AppText>Couldn't retrieve the posts.</AppText>
          <AppButton title='Retry' onPress={fetchPosts} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.key}
          renderItem={({ item }) => (
            <PostItem
              fullname={item.user.fullname}
              time={item.createdAt}
              profileImage={item.user.profileImage}
              postImage={item.image}
              description={item.description}
            />
          )}
          ItemSeparatorComponent={ListItemsSeparator}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchPosts}
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
});

const mapStateToProps = (state) => ({
  error: state.post.error,
  posts: state.post.posts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
