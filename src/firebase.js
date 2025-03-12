import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8FFo9yJwBBOwXSS947UvtBPy5I7GevXo",
  authDomain: "boatfix-97d3f.firebaseapp.com",
  projectId: "boatfix-97d3f",
  storageBucket: "boatfix-97d3f.firebasestorage.app",
  messagingSenderId: "369442658333",
  appId: "1:369442658333:web:a691a7d09fd5acfebf4ef4",
  measurementId: "G-TSTYV5L4JK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
