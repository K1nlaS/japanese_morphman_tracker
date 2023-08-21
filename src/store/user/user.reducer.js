//Action types
import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    //Sign in & Sign Out
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };


    //Update Settings
    case USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_SUCCESS:
      return { ...state, currentUser: { ...state.currentUser, ...payload }, isLoading: false };

    case USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_START:
      return { ...state, isLoading: true };


    //Update Email
    case USER_ACTION_TYPES.UPDATE_EMAIL_START:
      return { ...state, isLoading: true };

    case USER_ACTION_TYPES.UPDATE_EMAIL_SUCCESS:
      return { ...state, currentUser: { ...state.currentUser, ...payload }, isLoading: false };

    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.UPDATE_LIST_SETTINGS_FAILED:
    case USER_ACTION_TYPES.UPDATE_EMAIL_FAILED:
      return { ...state, error: payload };

    default: return state;
  }
};