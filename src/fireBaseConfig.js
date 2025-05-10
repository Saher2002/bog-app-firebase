// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxYqAEZ0k6ZDOlYkgd0kpa5r-V11VUut0",
  authDomain: "my-firebase-app-5c41c.firebaseapp.com",
  projectId: "my-firebase-app-5c41c",
  storageBucket: "my-firebase-app-5c41c.firebasestorage.app",
  messagingSenderId: "1052319596563",
  appId: "1:1052319596563:web:f6ef35111d86b47b6dffe6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)