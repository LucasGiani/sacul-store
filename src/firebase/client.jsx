import firebase from 'firebase/app';
import '@firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyB2KmjtnO8_cuuu65kVgxvUidiZ4cntJjw",
    authDomain: "sacul-e-commerce.firebaseapp.com",
    projectId: "sacul-e-commerce",
    storageBucket: "sacul-e-commerce.appspot.com",
    messagingSenderId: "762745007016",
    appId: "1:762745007016:web:8c5f06133534b544698b9d"
});

export const getFirebase = () => firebaseConfig;

export const getFirestore = () => firebase.firestore(firebaseConfig);