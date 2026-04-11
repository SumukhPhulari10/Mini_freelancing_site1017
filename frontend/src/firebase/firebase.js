import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLEp3aoSYhOQkorexRGV0LLz7mM9p_x5Y",
  authDomain: "minifreelancing.firebaseapp.com",
  projectId: "minifreelancing",
  storageBucket: "minifreelancing.firebasestorage.app",
  messagingSenderId: "665275799922",
  appId: "1:665275799922:web:be27642d404ad159f465eb",
  measurementId: "G-RBH9TMNT0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Google provider
const googleProvider = new GoogleAuthProvider();

export { 
  app, 
  auth, 
  db, 
  analytics,
  googleProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs
};
