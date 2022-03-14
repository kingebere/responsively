import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// var firebaseConfig = {
//   apiKey: "AIzaSyA71xx5FC5XQjA81o_-EwtNmty38Fh7oAs",
//   authDomain: "music-db-f0d09.firebaseapp.com",
//   databaseURL: "https://music-db-f0d09.firebaseio.com",
//   projectId: "music-db-f0d09",
//   storageBucket: "music-db-f0d09.appspot.com",
//   messagingSenderId: "148541303421",
//   appId: "1:148541303421:web:20faa12a3dcc24f9d21f14",
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBT8KsFbuVnNIYY9P5WmcbMwnsNNKjIuxc',
  authDomain: 'clone-practice-30ea3.firebaseapp.com',
  projectId: 'clone-practice-30ea3',
  storageBucket: 'clone-practice-30ea3.appspot.com',
  messagingSenderId: '866561872233',
  appId: '1:866561872233:web:b12c7dfe10dc64fc04edf8',
};

export const firebaseAuth = firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const providerFB = new firebase.auth.FacebookAuthProvider();

export const firebaseDB = firebase.firestore();
export const storage = firebase.storage();
