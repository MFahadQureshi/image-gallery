// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv5ZG3v_BsV-PGIpt86smEJAs3ZZu11SY",
  authDomain: "image-gallery-c277e.firebaseapp.com",
  projectId: "image-gallery-c277e",
  storageBucket: "image-gallery-c277e.appspot.com",
  messagingSenderId: "669518109091",
  appId: "1:669518109091:web:79bf5f05ba2fd9d9f1e216"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db }