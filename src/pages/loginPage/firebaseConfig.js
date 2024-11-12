// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBhSSUQw8GsEUWSBP_nJouDr8l0s_nMHy4",
  authDomain: "bajamar-45ca9.firebaseapp.com",
  projectId: "bajamar-45ca9",
  storageBucket: "bajamar-45ca9.appspot.com",
  messagingSenderId: "115620361657",
  appId: "1:115620361657:web:179aea8470047b8df43268",
  measurementId: "G-YPBC6P17RV",
  databaseURL: "https://bajamar-45ca9-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);