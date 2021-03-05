import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAuykd47-o6cwlrpgOgpVUdeFe5v3ZVyMY",
    authDomain: "react-firebase-7d8d8.firebaseapp.com",
    projectId: "react-firebase-7d8d8",
    storageBucket: "react-firebase-7d8d8.appspot.com",
    messagingSenderId: "1086567227093",
    appId: "1:1086567227093:web:115403bfa21728718b8c5c",
    measurementId: "G-9TQ2PBFXY6"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const auth = fire.auth()
  const store = fire.firestore()

  export {auth}
  export {store}