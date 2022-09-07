//Action types
import { LIST_ACTION_TYPES } from "./list.types";

export const LIST_INITIAL_STATE = {
  list: []
};

export const categoriesReducer = (state = LIST_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case LIST_ACTION_TYPES.SET_LIST_MAP:
      return { ...state, list: payload };

    default: return state;
  }
};