//Firebase
import { getCollectionList } from "../../utils/firebase/firebase.utils";

//Reducer shorthand
import { createAction } from "../../utils/reducer/reducer.utils";

//Action types
import { LIST_ACTION_TYPES } from "./list.types";

//DB List Actions
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

//Local DB Actions
export const addShowList = (newShow) =>
  createAction(LIST_ACTION_TYPES.ADD_LIST_SHOW, newShow);

export const updateShowList = (updatedShow) =>
  createAction(LIST_ACTION_TYPES.UPDATE_LIST_SHOW, updatedShow);

export const deleteShowList = (deletedShow) =>
  createAction(LIST_ACTION_TYPES.DELETE_LIST_SHOW, deletedShow);

//Filtered List Actions

export const setSearchString = (searchString) => (dispatch) =>
  dispatch(createAction(LIST_ACTION_TYPES.SET_SEARCH_STRING, searchString));

export const setFilterType = (filterType) => (dispatch) =>
  dispatch(createAction(LIST_ACTION_TYPES.SET_FILTER_TYPE, filterType));

export const setFilterSort = (filterSort) => (dispatch) =>
  dispatch(createAction(LIST_ACTION_TYPES.SET_FILTER_SORT, filterSort));
