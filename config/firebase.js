import * as firebase from 'firebase';
import 'firebase/firestore';
import { _showAlert } from './util';

export const firebaseConfig = {
  apiKey: 'AIzaSyDTEm1-9dt5hBFBhg7-_2I-ZFNrqiVWxqU',
  authDomain: 'emmaapi.firebaseapp.com',
  databaseURL: 'https://emmaapi.firebaseio.com',
  projectId: 'emmaapi',
  storageBucket: 'emmaapi.appspot.com',
  messagingSenderId: '1075847453292'
};

_saveUserInfo = (uid, userInfo) => {
  var database = firebase.firestore().collection('user_info')
  var obj = {
      'name': userInfo.name
  }
  database.doc(uid).set(obj);
}

export const _signupAPI = (userInfo) => {
  firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
  .then((res) => {
      var user = firebase.auth().currentUser;
      this._saveUserInfo(user.uid, userInfo);
      user.sendEmailVerification();
      _showAlert('You account was created successfully.');
  })
  .catch((err) => _showAlert(err.message))
}

export const _loginAPI = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((res) => {
    var user = firebase.auth().currentUser;
    if (!user.emailVerified) {
      _showAlert('You need to verify your email address first to login');
    } else {
      _showAlert('You logged in successfully.')
    }
  })
  .catch(_showAlert(err.message))
}

export const _sendResetPasswordEmail = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
  .then((res) => {
    _showAlert('Reset password email was sent to ' + email + ' successfully.')
  }).catch((err) => {
    _showAlert(err.message)
  })
}
