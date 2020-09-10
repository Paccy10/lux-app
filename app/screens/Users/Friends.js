import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  RefreshControl,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../../components/UI/AppText';
import AppButton from '../../components/UI/AppButton';
import FriendItem from '../../components/UI/lists/FriendItem';
import ListItemsSeparator from '../../components/UI/lists/ListItemsSeparator';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { fetchFriends } from '../../store/actions/friend';

const Friends = ({ fetchFriends, friends, error, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});

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
        <Fragment>
          <FlatList
            data={friends}
            keyExtractor={(friend) => friend.key}
            renderItem={({ item }) => (
              <FriendItem
                user={item}
                onPress={() => {
                  setModalVisible(true);
                  setUser(item);
                }}
              />
            )}
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
          <Modal visible={modalVisible} transparent>
            <SafeAreaView style={{ flex: 1 }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.backdrop}></View>
              </TouchableOpacity>
              <View style={styles.modal}>
                <AppText style={styles.modalTitle}>Select Options</AppText>
                <ListItemsSeparator />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate(routes.USER_PROFILE, user);
                  }}
                >
                  <MaterialCommunityIcons
                    name='account'
                    size={23}
                    style={styles.icon}
                  />
                  <AppText
                    style={styles.modalButtonText}
                  >{`${user.fullname}'s Profile`}</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate(routes.CHAT, user);
                  }}
                >
                  <MaterialCommunityIcons
                    name='email'
                    size={23}
                    style={styles.icon}
                  />
                  <AppText style={styles.modalButtonText}>Send Message</AppText>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
        </Fragment>
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
  backdrop: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modal: {
    backgroundColor: colors.white,
    width: '80%',
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  icon: {
    color: colors.medium,
    marginRight: 10,
  },
  modalButtonText: {
    color: colors.medium,
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
