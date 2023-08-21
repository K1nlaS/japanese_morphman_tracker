//Reducer shorthand
import { createAction } from "../../utils/reducer/reducer.utils";

//Action types
import { USER_ACTION_TYPES } from "./user.types";

//Other
export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);


//Sign In
export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);


//Sign Up
export const signUpStart = (email, password, username) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, username });

export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);


//Sign Out
export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);


//Update List Settings
export const updateListSettingsStart = (postData) =>
  createAction(USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_START, postData);

export const updateListSettingsSuccess = (postData) =>
  createAction(USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_SUCCESS, postData);

export const updateListSettingsFailed = (error) =>
  createAction(USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_FAILED, error);

//Update Email
export const updateEmailStart = (newEmail) =>
  createAction(USER_ACTION_TYPES.UPDATE_EMAIL_START, newEmail);

export const updateEmailSuccess = (newEmail) =>
  createAction(USER_ACTION_TYPES.UPDATE_EMAIL_SUCCESS, newEmail);

export const updateEmailFailed = (error) =>
  createAction(USER_ACTION_TYPES.UPDATE_EMAIL_FAILED, error);
