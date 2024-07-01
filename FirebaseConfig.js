import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';

let firebaseApp = null;

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
};

if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}
const FIREBASE_DB = getDatabase();

const FIREBASE_AUTH = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { FIREBASE_DB, FIREBASE_AUTH }