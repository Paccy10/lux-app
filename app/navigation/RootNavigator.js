import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const rootNavigator = ({ auth, navigation }) => {
  if (!isLoaded(auth)) {
    return <AppLoading />;
  }

  return !isEmpty(auth) ? <MainNavigator /> : <AuthNavigator />;
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(rootNavigator);
