//Firebase
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";

//Seed data
import { SEED_DATA } from "./seed";

export const seed = async () => {
  const userListRef = collection(db, "users", "V7raGgEr2eSaN04w0wJLYitHD6T2", "list");
  const userListQuery = await getDocs(userListRef);


  for (const show of SEED_DATA) {
    if (!userListQuery.docs.some(doc => doc.data().title === show.title)) {
      await addDoc(userListRef, show);
    }
  }
};