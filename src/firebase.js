// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9TMcdY8UuNIpko_mK_Hwnrme0z-pQiSs",
  authDomain: "carauth-d80ec.firebaseapp.com",
  projectId: "carauth-d80ec",
  storageBucket: "carauth-d80ec.appspot.com",
  messagingSenderId: "640627132822",
  appId: "1:640627132822:web:a06466a7edfebd1d11f5b7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword };
export default firebaseApp;