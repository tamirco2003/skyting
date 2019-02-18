import firebase from 'firebase/app';
import 'firebase/database'

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "skyouting-65648.firebaseapp.com",
    databaseURL: "https://skyouting-65648.firebaseio.com",
    projectId: "skyouting-65648",
    storageBucket: "skyouting-65648.appspot.com",
    messagingSenderId: "886119279292"
};
firebase.initializeApp(config);
export default firebase;