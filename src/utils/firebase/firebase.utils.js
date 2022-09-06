//Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

//Firbase configuration and initialization
const firbaseConfig = {
  apiKey: process.env.REACT_APP_FIRBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIRBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRBASE_APP_ID
};

initializeApp(firbaseConfig);

////Firestore & Authentication

export const auth = getAuth();
export const db = getFirestore();

// Users Related
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  // Getting the document reference to the specific user
  const userDocRef = doc(db, "users", userAuth.uid);
  // Getting the user snapshot data
  const userSnapshot = await getDoc(userDocRef);

  // Creates user snapshot data if it doesn't exist in the DB or returns it if it does
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email, createdAt, ...additionalInfo
      });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);