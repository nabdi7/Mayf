// Remove these React Native Firebase imports
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
// import '@react-native-firebase/database';
// import '@react-native-firebase/firestore';
// import '@react-native-firebase/messaging';
// import '@react-native-firebase/storage';

// New Expo Firebase imports
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
// import { getMessaging } from 'firebase/messaging';
import { configF } from '../configs/configF.js';
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your existing Firebase config can stay the same
const firebaseConfig = {
  apiKey: configF.apiKey,
  authDomain: configF.authDomain,
  databaseURL: configF.databaseURL,  
  projectId: configF.projectId,
  storageBucket: configF.storageBucket,
  messagingSenderId: configF.messagingSenderId,
  appId: configF.appId
};

// Remove the firebase name configuration as it's not needed in Expo
// const firebaseName = {
//   name: 'AbuMSJApp-Test',
// };

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig, 'AbuMSJApp-Test');
} else {
  app = getApp('AbuMSJApp-Test');
}

// Initialize Firebase services
// const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
let messaging;
try {
  // messaging = getMessaging(app);
} catch (error) {
  // Messaging might not be available on all platforms
  console.log('Firebase messaging is not available on this platform');
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, firestore, storage, database, messaging };
export default app;