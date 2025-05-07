// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnImwbl-tbYj2uUcxyKzZBtGsfZELAl0M",
  authDomain: "my-social-media-app-b1a8f.firebaseapp.com",
  projectId: "my-social-media-app-b1a8f",
  storageBucket: "my-social-media-app-b1a8f.firebasestorage.app",
  messagingSenderId: "157177618837",
  appId: "1:157177618837:web:dfc05f21376b201e87169c",
  measurementId: "G-48T0PJ43LB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase auth, firestore, and storage instances
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
