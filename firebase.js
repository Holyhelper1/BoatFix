// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8FFo9yJwBBOwXSS947UvtBPy5I7GevXo",
  authDomain: "boatfix-97d3f.firebaseapp.com",
  projectId: "boatfix-97d3f",
  storageBucket: "boatfix-97d3f.firebasestorage.app",
  messagingSenderId: "369442658333",
  appId: "1:369442658333:web:a691a7d09fd5acfebf4ef4",
  measurementId: "G-TSTYV5L4JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);