import { Timestamp } from "firebase/firestore";

export enum USER_ACTION_TYPES {
	//Other
	CHECK_USER_SESSION = "user/CHECK_USER_SESSION",

	//Sign In
	EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START",
	SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS",
	SIGN_IN_FAILED = "user/SIGN_IN_FAILURE",

	//Sign Up
	SIGN_UP_START = "user/SIGN_UP_START",
	SIGN_UP_SUCCESS = "user/SIGN_UP_SUCCESS",
	SIGN_UP_FAILED = "user/SIGN_UP_FAILED",

	//Sign Out
	SIGN_OUT_START = "user/SIGN_OUT_START",
	SIGN_OUT_SUCCESS = "user/SIGN_OUT_SUCCESS",
	SIGN_OUT_FAILED = "user/SIGN_OUT_FAILED",

	//Update List Settings
	UPDATE_LIST_SETTINGS_START = "user/UPDATE_LIST_SETTINGS_START",
	UPDATE_LIST_SETTINGS_SUCCESS = "user/UPDATE_LIST_SETTINGS_SUCCESS",
	UPDATE_LIST_SETTINGS_FAILED = "user/UPDATE_LIST_SETTINGS_FAILED",

	//Update Email
	UPDATE_EMAIL_START = "user/UPDATE_EMAIL_START",
	UPDATE_EMAIL_SUCCESS = "user/UPDATE_EMAIL_SUCCESS",
	UPDATE_EMAIL_FAILED = "user/UPDATE_EMAIL_FAILED",
}

export type CurrentUser = {
	id: string;
	createdAt: Timestamp;
	defaultSort: string;
	email: string;
	titleLanguage: string;
	username: string;
};
