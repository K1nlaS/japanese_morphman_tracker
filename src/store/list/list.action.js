//Firebase
import { getCollectionList } from "../../utils/firebase/firebase.utils";

//Reducer shorthand
import { createAction } from "../../utils/reducer/reducer.utils";

//Action types
import { LIST_ACTION_TYPES } from "./list.types";

export const fetchListStart = () =>
  createAction(LIST_ACTION_TYPES.FETCH_LIST_START);

export const fetchListSuccess = (listArray) =>
  createAction(LIST_ACTION_TYPES.FETCH_LIST_SUCCESS, listArray);

export const fetchListFailed = (error) =>
  createAction(LIST_ACTION_TYPES.FETCH_LIST_FAILED, error);

export const fetchListAsync = (currentUser) => async (dispatch) => {
  dispatch(fetchListStart());

  if (!currentUser) {
    dispatch(fetchListSuccess([]));
  } else {
    try {
      const list = await getCollectionList(currentUser);
      dispatch(fetchListSuccess(list));
    } catch (error) {
      dispatch(fetchListFailed(error));
    }
  }
};