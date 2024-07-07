import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';

let firebaseApp = null;

const firebaseConfig = {
  apiKey: "AIzaSyAXz0rxl3OEnIKfVR2OTj9mIxHTR7ULq_w",
  authDomain: "fueldash-eba84.firebaseapp.com",
  databaseURL: "https://fueldash-eba84-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fueldash-eba84",
  storageBucket: "fueldash-eba84.appspot.com",
  messagingSenderId: "371192371165",
  appId: "1:371192371165:web:431f26572bfaebf9710834",
  measurementId: "G-CGPT3CNZ4H"
};

if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}
const FIREBASE_DB = getDatabase();

const FIREBASE_AUTH = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { FIREBASE_DB, FIREBASE_AUTH }