// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy9l2sEsgvONGThRWzt4gNdZwmlA6eBfw",
  authDomain: "projeto1-b792b.firebaseapp.com",
  projectId: "projeto1-b792b",
  storageBucket: "projeto1-b792b.firebasestorage.app",
  messagingSenderId: "142084959768",
  appId: "1:142084959768:web:99c51b6365ed6891849d6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };