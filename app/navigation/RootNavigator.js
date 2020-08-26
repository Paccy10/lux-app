import React from 'react';
import { connect } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const rootNavigator = ({ auth }) => {
  return auth.uid ? <MainNavigator /> : <AuthNavigator />;
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(rootNavigator);
