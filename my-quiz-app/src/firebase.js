// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4r20sy8A7_opZfbbGuwTmeWhkYpPjoGE",
  authDomain: "quiz-project-8531c.firebaseapp.com",
  projectId: "quiz-project-8531c",
  storageBucket: "quiz-project-8531c.firebasestorage.app",
  messagingSenderId: "125261070187",
  appId: "1:125261070187:web:2fa7c7a1a93fac0548d62e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth };
