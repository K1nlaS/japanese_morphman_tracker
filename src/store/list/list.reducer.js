//Action types
import { LIST_ACTION_TYPES } from "./list.types";

export const LIST_INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: null
};

export const listReducer = (state = LIST_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case LIST_ACTION_TYPES.FETCH_LIST_START:
      return { ...state, isLoading: true };

    case LIST_ACTION_TYPES.FETCH_LIST_SUCCESS:
      return { ...state, list: payload, isLoading: false };

    case LIST_ACTION_TYPES.FETCH_LIST_FAILED:
      return { ...state, isLoading: false, error: payload };

    default: return state;
  }
};