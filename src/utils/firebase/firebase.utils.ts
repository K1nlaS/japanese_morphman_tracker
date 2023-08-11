//Firebase & Firestore
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
	User,
	NextOrObserver,
} from "firebase/auth";

//Types
import { Show, historyChange } from "../../store/list/list.types";

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
	DocumentReference,
	QueryDocumentSnapshot,
} from "firebase/firestore";

//Anilist API
import { fetchAnilistShow } from "./anilist.api.utils";

//Firebase Helpers
import {
	batchReaderFile,
	createHistoryEntry,
	doesEntryExist,
} from "./firebase.helpers";

//Firbase configuration and initialization
const firbaseConfig = {
	apiKey: process.env.REACT_APP_FIRBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIRBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIRBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIRBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIRBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIRBASE_APP_ID,
};

initializeApp(firbaseConfig);

////Firestore & Authentication

export const auth = getAuth();
export const db = getFirestore();

export type UserData = {
	email: string;
	createdAt: Date;
	titleLanguage: string;
	defaultSort: string;
};

// Users Related
export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInfo = {}
): Promise<UserData | void> => {
	if (!userAuth) return;

	// Getting the document reference to the specific user
	const userDocRef = doc(db, "users", userAuth.uid);
	// Getting the user snapshot data
	const userSnapshot = await getDoc(userDocRef);

	// Creates user snapshot data if it doesn't exist in the DB or returns it if it does
	if (!userSnapshot.exists()) {
		const { email } = userAuth;
		const createdAt = new Date();

		const titleLanguage = "romaji";
		const defaultSort = "Title";

		try {
			await setDoc(userDocRef, {
				email,
				createdAt,
				...additionalInfo,
				titleLanguage,
				defaultSort,
			});
		} catch (e) {
			console.log("error creating the user", e);
		}
	}

	return userSnapshot.data() as UserData;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

//// List Related

//Returns list of user's shows from firestore
export const getCollectionList = async (userAuth: User) => {
	if (!userAuth) return;

	const userListRef = collection(db, "users", userAuth.uid, "list");
	const data = await getDocs(userListRef);

	return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getCollectionItem = async (
	userAuth: User,
	showRef: DocumentReference
) => {
	if (!userAuth) return;

	const show = await getDoc(showRef);
	return { ...show.data(), id: show.id };
};

//Adds new entry to the user's list of shows
export const addNewListDocument = async (
	userAuth: User,
	postData: Show
): Promise<DocumentReference> => {
	if (!userAuth || !postData) throw new Error("Invalid userAuth or postData");

	const userListRef = collection(db, "users", userAuth.uid, "list");
	const userListQuery = await getDocs(userListRef);

	//Checks if there is an entry with the same title, if there is not it creates a new entry
	if (!doesEntryExist(userListQuery, postData)) {
		//Searches Anilist's API for the show
		try {
			const { data } = await fetchAnilistShow(postData.title);
			Object.assign(postData, data);
		} catch (error) {
			console.log(error);
		}

		const createdAt = new Date();
		const historyChange: historyChange[] = [];

		// Setting percent values to 00.00 format
		const localeOptions = {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			minimumIntegerDigits: 2,
		};

		postData.lineReadability = parseFloat(
			postData.lineReadability
		).toLocaleString(undefined, localeOptions);
		postData.knownInstances = parseFloat(
			postData.knownInstances
		).toLocaleString(undefined, localeOptions);

		const uknownMorphs = "";
		postData.status = postData.status
			? postData.status
			: (postData.status = "Planning");
		postData.type = postData.type ? postData.type : (postData.type = "TV");

		const show = await addDoc(userListRef, {
			uknownMorphs,
			...postData,
			createdAt,
			historyChange,
			updatedAt: createdAt,
		});

		return show;
	} else {
		throw new Error("Entry with the same title already exists");
	}
};

//Updating signle list entry
export const updateListDocument = async (userAuth: User, postData: Show) => {
	if (!userAuth || !postData) return;

	const userListRef = collection(db, "users", userAuth.uid, "list");
	const userListQuery = await getDocs(userListRef);

	//Checks whether post data has an id of the document or not, if not it looks it up by title and adds it to post data
	if (!postData.id) {
		userListQuery.docs.map(doc =>
			doc.data().title.toLowerCase() === postData.title.toLowerCase()
				? (postData.id = doc.id)
				: ""
		);
	}

	const listItemRef = doc(db, "users", userAuth.uid, "list", postData.id);
	const listItemDoc = await getDoc(listItemRef);

	//If user tries to change the name of the show to one that already exists in sthe db the changes will not be applied
	if (doesEntryExist(userListQuery, postData)) {
		return;
	}

	//Checks if the title is the same as the one in DB, if not creates a new fetch request to Anilist API
	try {
		if (listItemDoc.data()?.Media) {
			const mediaTitle = Object.values(
				listItemDoc.data()?.Media.title as string
			);
			const isMatched = mediaTitle.some(
				(title: string) => title?.toLowerCase() === postData.title.toLowerCase()
			);

			//Searches Anilist's API for the show data
			if (!isMatched) {
				const { data } = await fetchAnilistShow(postData.title);
				Object.assign(postData, data);
			}
		} else if (
			listItemDoc.data()?.title.toLowerCase() !== postData.title.toLowerCase()
		) {
			const { data } = await fetchAnilistShow(postData.title);
			Object.assign(postData, data);
		}
	} catch (error) {
		console.log(error);
	}

	// Setting percent values to 00.00 format
	const localeOptions = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		minimumIntegerDigits: 2,
	};

	postData.lineReadability = parseFloat(
		postData.lineReadability
	).toLocaleString(undefined, localeOptions);
	postData.knownInstances = parseFloat(postData.knownInstances).toLocaleString(
		undefined,
		localeOptions
	);

	//Creates a history entry object and adds it to the item's history change array if the values of lineReadability or knownInstances are changed
	const historyEntry = createHistoryEntry(listItemDoc, postData);
	historyEntry &&
		(await updateDoc(listItemRef, { historyChange: arrayUnion(historyEntry) }));

	await updateDoc(listItemRef, { ...postData, updatedAt: new Date() });

	return listItemRef;
};

//Deleting list entry along side the subcollections
export const deleteListDocument = async (
	userAuth: User,
	documentId: string
) => {
	if (!userAuth || !documentId) return;

	const listDocumentRef = doc(db, "users", userAuth.uid, "list", documentId);
	await deleteDoc(listDocumentRef);

	return listDocumentRef;
};

//Updating history entry
export const updateHistoryEntry = async (
	userAuth: User,
	documentId: string,
	postData: historyChange
) => {
	if (!userAuth || !documentId || !postData) return;

	const listItemRef = doc(db, "users", userAuth.uid, "list", documentId);
	const listItemDoc = await getDoc(listItemRef);

	const history = listItemDoc.data()?.historyChange;

	// Setting percent values to 00.00 format
	const localeOptions = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		minimumIntegerDigits: 2,
	};

	postData.lineReadability = parseFloat(
		postData.lineReadability
	).toLocaleString(undefined, localeOptions);
	postData.knownInstances = parseFloat(postData.knownInstances).toLocaleString(
		undefined,
		localeOptions
	);

	for (let entry of history) {
		if (entry.id === postData.id) {
			entry.lineReadability = postData.lineReadability;
			entry.knownInstances = postData.knownInstances;
			entry.uknownMorphs = postData.uknownMorphs;
		}
	}

	await updateDoc(listItemRef, { historyChange: history });
};

//List batch updater
export const listBatchUpdate = async (
	userAuth: User,
	fileRaw: string
): Promise<void> => {
	if (!userAuth || !fileRaw) return;

	const userListRef = collection(db, "users", userAuth.uid, "list");
	const userListQuery = await getDocs(userListRef);

	const fileReady = batchReaderFile(fileRaw);

	//Checks if there is a show with the provided title, if not it creates a new entry, if there is it updates the values.
	for (const show of fileReady) {
		if (!doesEntryExist(userListQuery, show)) {
			await addNewListDocument(userAuth, show as Show);
		} else {
			await updateListDocument(userAuth, show as Show);
		}
	}
};

//// Settings Related

// Returns an object of user's settings
export const getSettingsList = async (userAuth: User) => {
	if (!userAuth) return;

	const userRef = doc(db, "users", userAuth.uid);
	const data = await getDoc(userRef);

	return { ...data.data(), id: userAuth.uid };
};

// Updating user's settings
export const updateUserSettings = async (userAuth: User, postData) => {
	if (!userAuth || !postData) return;

	const userRef = doc(db, "users", userAuth.uid);

	await updateDoc(userRef, { ...postData });
};

//Updating user's email
export const updateUserEmail = async (userAuth: User, email: string) => {
	if (!userAuth || !email) return;

	try {
		await updateEmail(userAuth, email);
	} catch (error) {
		console.log(error);
	}
};

//Updateing user's password
export const updateUserPassword = async (
	userAuth: User,
	newPassword: string
) => {
	if (!userAuth || !newPassword) return;

	try {
		await updatePassword(userAuth, newPassword);
	} catch (error) {
		console.log(error);
	}
};
