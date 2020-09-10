import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import AppText from '../../components/UI/AppText';
import AppButton from '../../components/UI/AppButton';
import FriendItem from '../../components/UI/lists/FriendItem';
import ListItemsSeparator from '../../components/UI/lists/ListItemsSeparator';
import colors from '../../config/colors';
import { fetchFriends } from '../../store/actions/friend';

const Friends = ({ fetchFriends, friends, error }) => {
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadFriends = useCallback(async () => {
    setLoading(true);
    await fetchFriends();
    setLoading(false);
  });

  const loadFriendsOnRefresh = async () => {
    setIsRefreshing(true);
    await fetchFriends();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.primary} size='small' />
        </View>
      ) : error ? (
        <View style={styles.error}>
          <AppText style={styles.text}>Couldn't retrieve your friends.</AppText>
          <AppButton
            color='secondary'
            title='Retry'
            onPress={loadFriends}
            style={styles.retryBtn}
          />
        </View>
      ) : friends.length > 0 ? (
        <FlatList
          data={friends}
          keyExtractor={(friend) => friend.key}
          renderItem={({ item }) => <FriendItem user={item} />}
          ItemSeparatorComponent={ListItemsSeparator}
          style={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={loadFriendsOnRefresh}
              tintColor={colors.primary}
              titleColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      ) : (
        <View style={styles.noData}>
          <AppText style={styles.noDataText}>
            You don't have any friend yet
          </AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
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
  noData: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: colors.medium,
    fontStyle: 'italic',
  },
});

const mapStateToProps = (state) => ({
  friends: state.friend.friends,
  error: state.friend.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFriends: () => dispatch(fetchFriends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
