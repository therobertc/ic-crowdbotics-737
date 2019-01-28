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
  firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
  .then((res) => {
      var user = firebase.auth().currentUser;
      this._saveUserInfo(user.uid, userInfo);
      user.sendEmailVerification();
      return res.json();
  })
  .catch((err) => err.message)
}
