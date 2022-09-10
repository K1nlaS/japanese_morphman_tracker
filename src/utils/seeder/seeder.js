//Firebase
import { addNewListDocument } from "../firebase/firebase.utils";

//Seed data
import { SEED_DATA } from "./seed";

export const seed = async () => {
  const userAuth = {
    uid: "V7raGgEr2eSaN04w0wJLYitHD6T2"
  };

  for (const show of SEED_DATA) {
    await addNewListDocument(userAuth, show);
  }
};