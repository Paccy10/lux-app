import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyDP3Z_vVqbes-gqBAeAvMo5A9L4J2lm7MU',
  authDomain: 'lux-app-cea21.firebaseapp.com',
  databaseURL: 'https://lux-app-cea21.firebaseio.com',
  projectId: 'lux-app-cea21',
  storageBucket: 'lux-app-cea21.appspot.com',
  messagingSenderId: '771353433795',
  appId: '1:771353433795:web:8cd54555f099d1fafeb476',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
