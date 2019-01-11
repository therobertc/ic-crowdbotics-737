import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDTEm1-9dt5hBFBhg7-_2I-ZFNrqiVWxqU',
  authDomain: 'emmaapi.firebaseapp.com',
  databaseURL: 'https://emmaapi.firebaseio.com',
  projectId: 'emmaapi',
  storageBucket: 'emmaapi.appspot.com',
  messagingSenderId: '1075847453292'
};

firebase.initializeApp(firebaseConfig);
