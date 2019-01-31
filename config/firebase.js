import * as firebase from 'firebase';
import 'firebase/firestore';

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
  return firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
  .then(() => {
      var user = firebase.auth().currentUser;
      this._saveUserInfo(user.uid, userInfo);
      user.sendEmailVerification();
      return 'You account was created successfully.';
  })
  .catch((err) => {
    return err.message
  });
}

export const _loginAPI = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    var user = firebase.auth().currentUser;
    if (!user.emailVerified) {
      return 'You need to verify your email address first to login';
    } else {
      return 'You logged in successfully.';
    }
  })
  .catch((err) => {
    return err.message;
  })
}

export const _updateUserInfoAPI = (userInfo) => {
  const user = firebase.auth().currentUser;
  return firebase.firestore().collection('questions')
  .doc(user.uid).update(userInfo)
  .then(() => {
    return 'Updated the userinfo successfully.'
  })
  .catch((err) => {
    return err.message;
  })
}

export const _sendResetPasswordEmail = (email) => {
  return firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    return 'Reset password email was sent to ' + email + ' successfully.';
  }).catch((err) => {
    return err.message;
  })
}
