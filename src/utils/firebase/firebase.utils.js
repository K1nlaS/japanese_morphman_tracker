//Firebase & Firestore
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
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
  arrayUnion,
} from "firebase/firestore";

//Anilist API
import { fetchAnilistShow } from "./anilist.api.utils";

//Firebase Helpers
import { createHistoryEntry, doesEntryExist } from "./firebase.helpers";

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

    const titleLanguage = "romanji";
    const defaultSort = "Title";

    try {
      await setDoc(userDocRef, {
        email, createdAt, ...additionalInfo, titleLanguage, defaultSort
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
  if (!doesEntryExist(userListQuery, postData)) {
    //Searches Anilist's API for the show
    try {
      const { data } = await fetchAnilistShow(postData.title);
      Object.assign(postData, data);
    } catch (error) {
      console.log(error.message);
    }

    const createdAt = new Date();
    const historyChange = [];

    // Setting percent values to 00.00 format
    const localeOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 2 };

    postData.lineReadability = parseFloat(postData.lineReadability).toLocaleString(undefined, localeOptions);
    postData.knownInstances = parseFloat(postData.knownInstances).toLocaleString(undefined, localeOptions);


    await addDoc(userListRef, {
      ...postData, createdAt, historyChange, updatedAt: createdAt
    });

  };
};

//Updating signle list entry
export const updateListDocument = async (userAuth, postData) => {
  if (!userAuth || !postData) return;

  const userListRef = collection(db, "users", userAuth.uid, "list");
  const userListQuery = await getDocs(userListRef);

  const listItemRef = doc(db, "users", userAuth.uid, "list", postData.id);
  const listItemDoc = await getDoc(listItemRef);

  //If user tries to change the name of the show to one that already exists in the db the changes will not be applied
  if (doesEntryExist(userListQuery, postData)) { return; };

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

  // Setting percent values to 00.00 format
  const localeOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 2 };

  postData.lineReadability = parseFloat(postData.lineReadability).toLocaleString(undefined, localeOptions);
  postData.knownInstances = parseFloat(postData.knownInstances).toLocaleString(undefined, localeOptions);

  //Creates a history entry object and adds it to the item's history change array if the values of lineReadability or knownInstances are changed
  const historyEntry = createHistoryEntry(listItemDoc, postData);
  historyEntry && await updateDoc(listItemRef, { historyChange: arrayUnion(historyEntry) });

  await updateDoc(listItemRef, { ...postData, updatedAt: new Date() });
};

//Deleting list entry along side the subcollections
export const deleteListDocument = async (userAuth, documentId) => {
  if (!userAuth || !documentId) return;

  const listDocumentRef = doc(db, "users", userAuth.uid, "list", documentId);
  await deleteDoc(listDocumentRef);
};

//Updating history entry
export const updateHistoryEntry = async (userAuth, documentId, postData) => {
  if (!userAuth || !documentId || !postData) return;

  const listItemRef = doc(db, "users", userAuth.uid, "list", documentId);
  const listItemDoc = await getDoc(listItemRef);

  const history = listItemDoc.data().historyChange;

  // Setting percent values to 00.00 format
  const localeOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 2 };

  postData.lineReadability = parseFloat(postData.lineReadability).toLocaleString(undefined, localeOptions);
  postData.knownInstances = parseFloat(postData.knownInstances).toLocaleString(undefined, localeOptions);

  for (let entry of history) {
    if (entry.id === postData.id) {
      entry.lineReadability = postData.lineReadability;
      entry.knownInstances = postData.knownInstances;
      entry.uknownMorphs = postData.uknownMorphs;
    }
  }

  await updateDoc(listItemRef, { historyChange: history });
};

//// Settings Related

// Returns an object of user's settings
export const getSettingsList = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const data = await getDoc(userRef);

  return { ...data.data(), id: userAuth.uid };
};

// Updating user's settings
export const updateUserSettings = async (userAuth, postData) => {
  if (!userAuth || !postData) return;

  const userRef = doc(db, "users", userAuth.uid);

  await updateDoc(userRef, { ...postData });
};

//Updating user's email
export const updateUserEmail = async (userAuth, email) => {
  if (!userAuth || !email) return;

  try {
    await updateEmail(userAuth, email);
  } catch (error) {
    console.log(error);
  }
};

//Updateing user's password
export const updateUserPassword = async (userAuth, newPassword) => {
  if (!userAuth, !newPassword) return;

  try {
    await updatePassword(userAuth, newPassword);
  } catch (error) {
    console.log(error);
  }
};