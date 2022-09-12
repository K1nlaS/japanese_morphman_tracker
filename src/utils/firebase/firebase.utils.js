//Firebase & Firestore
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
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
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

//Anilist API
import { fetchAnilistShow } from "./anilist.api.utils";

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

//// List Related

//Returns list of user's shows from firestore
export const getCollectionList = async (userAuth) => {
  if (!userAuth) return;

  const userListRef = collection(db, "users", userAuth.uid, "list");
  const data = await getDocs(userListRef);

  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

//Adds new entry to the user's list of shows
export const addNewListDocument = async (userAuth, postData) => {
  if (!userAuth || !postData) return;

  const userListRef = collection(db, "users", userAuth.uid, "list");
  const userListQuery = await getDocs(userListRef);

  //Checks if there is an entry with the same title, if there is not it creates a new entry
  if (!userListQuery.docs.some(doc => doc.data().title.toLowerCase() === postData.title.toLowerCase())) {

    //Searches Anilist's API for the show
    try {
      const { data } = await fetchAnilistShow(postData.title);
      Object.assign(postData, data);
    } catch (error) {
      console.log(error.message);
    }

    const createdAt = new Date();
    const historyChange = {};

    await addDoc(userListRef, {
      ...postData, createdAt, updatedAt: createdAt, historyChange
    });
  };
};

//Updating signle list entry
export const updateListDocument = async (userAuth, postData) => {
  if (!userAuth || !postData) return;

  const listItemRef = doc(db, "users", userAuth.uid, "list", postData.id);
  const listItemDoc = await getDoc(listItemRef);

  //Checks if the title is the same as the one in DB, if not creates a new fetch request to Anilist API
  try {
    if (listItemDoc.data().Media) {
      const mediaTitle = Object.values(listItemDoc.data().Media.title);
      const isMatched = mediaTitle.some(title => title.toLowerCase() === postData.title.toLowerCase());

      //Searches Anilist's API for the show data
      if (!isMatched) {
        const { data } = await fetchAnilistShow(postData.title);
        Object.assign(postData, data);
      }

    } else if (listItemDoc.data().title.toLowerCase() !== postData.title.toLowerCase()) {
      const { data } = await fetchAnilistShow(postData.title);
      Object.assign(postData, data);
    }
  } catch (error) {
    console.log(error.message);
  }

  await updateDoc(listItemRef, { ...postData });
};

//Deleting list entry along side the subcollections
export const deleteListDocument = async (userAuth, documentId) => {
  if (!userAuth || !documentId) return;

  const listDocumentRef = doc(db, "users", userAuth.uid, "list", documentId);
  await deleteDoc(listDocumentRef);
};