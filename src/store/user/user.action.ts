//Reducer shorthand
import { User } from "firebase/auth";
import {
	createAction,
	Action,
	ActionWithPayLoad,
	withMatcher,
} from "../../utils/reducer/reducer.utils";

//Action types
import { CurrentUser, USER_ACTION_TYPES } from "./user.types";
import { AdditionalInformation } from "../../utils/firebase/firebase.utils";

export type userSettings = {
	sortOption?: string;
	username?: string;
	defaultSort?: string;
	titleLanguage?: string;
	email?: string;
};

type newEmail = {
	email: string;
};

////Custom Actions
//Other
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

//Sign In
export type EmailSignInStart = ActionWithPayLoad<
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export type SignInSuccess = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	CurrentUser
>;

export type SignInFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_IN_FAILED,
	Error
>;

//Sign Up
export type SignUpStart = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_UP_START,
	{ email: string; password: string; username: string }
>;
export type SignUpSuccess = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{ user: User; additionalDetails: AdditionalInformation }
>;
export type SignUpFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_UP_FAILED,
	Error
>;

//Sign Out
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_OUT_FAILED,
	Error
>;

//Update List Settings
export type UpdateListSettingsStart = ActionWithPayLoad<
	USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_START,
	userSettings
>;

export type UpdateListSettingsSuccess = ActionWithPayLoad<
	USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_SUCCESS,
	userSettings
>;

export type UpdateListSettingsFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_FAILED,
	Error
>;

//Update Email
export type UpdateEmailStart = ActionWithPayLoad<
	USER_ACTION_TYPES.UPDATE_EMAIL_START,
	string
>;

export type UpdateEmailSuccess = ActionWithPayLoad<
	USER_ACTION_TYPES.UPDATE_EMAIL_SUCCESS,
	newEmail
>;

export type UpdateEmailFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.UPDATE_EMAIL_FAILED,
	Error
>;

////Actions
//Other
export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

//Sign In
export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
	(user: CurrentUser): SignInSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
	(error: Error): SignInFailed =>
		createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

//Sign Up
export const signUpStart = withMatcher(
	(email: string, password: string, username: string): SignUpStart =>
		createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, username })
);

export const signUpSuccess = withMatcher(
	(user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export const signUpFailed = withMatcher(
	(error: Error): SignUpFailed =>
		createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

//Sign Out
export const signOutStart = withMatcher(
	(): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
	(): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
	(error: Error): SignOutFailed =>
		createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

//Update List Settings
export const updateListSettingsStart = withMatcher(
	(postData: userSettings): UpdateListSettingsStart =>
		createAction(USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_START, postData)
);

export const updateListSettingsSuccess = withMatcher(
	(postData: userSettings): UpdateListSettingsSuccess =>
		createAction(USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_SUCCESS, postData)
);

export const updateListSettingsFailed = withMatcher(
	(error: Error): UpdateListSettingsFailed =>
		createAction(USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_FAILED, error)
);

//Update Email
export const updateEmailStart = withMatcher(
	(newEmail: string): UpdateEmailStart =>
		createAction(USER_ACTION_TYPES.UPDATE_EMAIL_START, newEmail)
);

export const updateEmailSuccess = withMatcher(
	(newEmail: newEmail): UpdateEmailSuccess =>
		createAction(USER_ACTION_TYPES.UPDATE_EMAIL_SUCCESS, newEmail)
);

export const updateEmailFailed = withMatcher(
	(error: Error): UpdateEmailFailed =>
		createAction(USER_ACTION_TYPES.UPDATE_EMAIL_FAILED, error)
);
