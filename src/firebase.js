// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY994DDUBiOfy6w90dKEjKg1hINqLEv1g",
  authDomain: "video-3623a.firebaseapp.com",
  projectId: "video-3623a",
  storageBucket: "video-3623a.appspot.com",
  messagingSenderId: "327283820910",
  appId: "1:327283820910:web:50c84e4787817a573d597f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;