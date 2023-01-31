import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9l631mQYLG1uHsS0rFRUvWJ5PP1KEbB4",
  authDomain: "nwiter-e9c45.firebaseapp.com",
  projectId: "nwiter-e9c45",
  storageBucket: "nwiter-e9c45.appspot.com",
  messagingSenderId: "540298488741",
  appId: "1:540298488741:web:c1b97f9b8c35ad4afe164c",
};

firebase.initializeApp(firebaseConfig);

export default authService = firebase.auth;
