//Reducer shorthand
import { createAction } from "../../utils/reducer/reducer.utils";

//Action types
import { LIST_ACTION_TYPES } from "./list.types";

export const setListMap = (listMap) =>
  createAction(LIST_ACTION_TYPES.SET_LIST_MAP, listMap);