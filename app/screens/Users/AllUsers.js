import React, { Fragment, useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import AppTextInput from '../../components/UI/AppTextInput';
import AppText from '../../components/UI/AppText';
import AppButton from '../../components/UI/AppButton';
import FriendItem from '../../components/UI/lists/FriendItem';
import ListItemsSeparator from '../../components/UI/lists/ListItemsSeparator';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { fetchUsers, searchUser } from '../../store/actions/user';

const AllUsers = ({ fetchUsers, searchUser, users, error, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    await fetchUsers();
    setLoading(false);
  });

  const loadSearchUsers = async (query) => {
    setSearchLoading(true);
    await searchUser(query);
    setSearchLoading(false);
  };

  const loadUsersOnRefresh = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUsers();
    });

    return unsubscribe;
  }, [navigation]);

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AppTextInput
          icon='account-search'
          placeholder='Search Friends...'
          onChangeText={(text) => loadSearchUsers(text)}
          loadingIcon={searchLoading}
        />
      </View>
      <Fragment>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={colors.primary} size='small' />
          </View>
        ) : error ? (
          <View style={styles.error}>
            <AppText style={styles.text}>Couldn't retrieve the users.</AppText>
            <AppButton
              color='secondary'
              title='Retry'
              onPress={loadUsers}
              style={styles.retryBtn}
            />
          </View>
        ) : users.length > 0 ? (
          <FlatList
            data={users}
            keyExtractor={(user) => user.key}
            renderItem={({ item }) => (
              <FriendItem
                user={item}
                onPress={() => navigation.navigate(routes.USER_PROFILE, item)}
              />
            )}
            ItemSeparatorComponent={ListItemsSeparator}
            style={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={loadUsersOnRefresh}
                tintColor={colors.primary}
                titleColor={colors.primary}
                title='Pull to refresh'
                colors={[colors.primary]}
              />
            }
          />
        ) : (
          <View style={styles.noData}>
            <AppText style={styles.noDataText}>No user found</AppText>
          </View>
        )}
      </Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
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
  users: state.user.users,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  searchUser: (query) => dispatch(searchUser(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
