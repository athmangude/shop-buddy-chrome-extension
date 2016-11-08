const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVs5Fdq7aCMnSRcgsQcbtsdjH6e26jhEc",
    authDomain: "toonga-shopbuddy.firebaseapp.com",
    databaseURL: "https://toonga-shopbuddy.firebaseio.com",
    storageBucket: "toonga-shopbuddy.appspot.com",
    messagingSenderId: "533443841306"
};

export default function () {
  return firebase.initializeApp(firebaseConfig);
}
