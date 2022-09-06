//Reducer shorthand
import { createAction } from "../../utils/reducer/reducer.utils";

//Action types
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
