import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHUeGnOV0zY_d6K9IA7q6gs4nxRSxiwao",
  authDomain: "note-s-app-90c8f.firebaseapp.com",
  projectId: "note-s-app-90c8f",
  storageBucket: "note-s-app-90c8f.firebasestorage.app",
  messagingSenderId: "892246633463",
  appId: "1:892246633463:web:a01a68d63b46fb0e431cf2",
  measurementId: "G-TC3MSKQB8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);