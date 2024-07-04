import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';

let firebaseApp = null;

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
console.log("api key", process.env.API_KEY);
if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}
const FIREBASE_DB = getDatabase();

const FIREBASE_AUTH = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { FIREBASE_DB, FIREBASE_AUTH }