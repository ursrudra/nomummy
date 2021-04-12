import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const rrfConfig = {
    userProfile: 'profiles',
    useFirestoreForProfile: true,
    enableLogging: false,
    enableClims: true,
    updateProfileOnLogin: false,

}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();
export {
    auth,
    firestore,
    firebase,
    storage
}