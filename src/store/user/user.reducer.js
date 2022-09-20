//Action types
import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  settings: {},
  isLoading: false,
  error: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case USER_ACTION_TYPES.FETCH_SETTINGS_START:
      return { ...state, isLoading: true };

    case USER_ACTION_TYPES.FETCH_SETTINGS_SUCCESS:
      return { ...state, settings: payload, isLoading: false };

    case USER_ACTION_TYPES.FETCH_SETTINGS_FAILED:
      return { ...state, isLoading: false, error: payload };

    default: return state;
  }
};