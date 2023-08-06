//Firebase
import { getCollectionList } from "../../utils/firebase/firebase.utils";

//Reducer shorthand
import {
	createAction,
	Action,
	ActionWithPayLoad,
} from "../../utils/reducer/reducer.utils";
import { Dispatch } from "redux";

//Action types
import { LIST_ACTION_TYPES, List, Show } from "./list.types";

//DB List Actions
export type FetchCategoriesStart = Action<LIST_ACTION_TYPES.FETCH_LIST_START>;
export type FetchCategoriesFailed = ActionWithPayLoad<
	LIST_ACTION_TYPES.FETCH_LIST_FAILED,
	Error
>;
export type FetchCategoriesSuccess = ActionWithPayLoad<
	LIST_ACTION_TYPES.FETCH_LIST_SUCCESS,
	List
>;

//Local Actions
export type AddShowList = ActionWithPayLoad<
	LIST_ACTION_TYPES.ADD_LIST_SHOW,
	Show
>;
export type UpdateShowList = ActionWithPayLoad<
	LIST_ACTION_TYPES.UPDATE_LIST_SHOW,
	Show
>;
export type DeleteShowList = ActionWithPayLoad<
	LIST_ACTION_TYPES.DELETE_LIST_SHOW,
	Show
>;

//Search Actions
export type SetSearchString = ActionWithPayLoad<
	LIST_ACTION_TYPES.SET_SEARCH_STRING,
	string
>;
export type SetFilterSort = ActionWithPayLoad<
	LIST_ACTION_TYPES.SET_FILTER_SORT,
	string
>;
export type SetFilterType = ActionWithPayLoad<
	LIST_ACTION_TYPES.SET_FILTER_TYPE,
	string
>;

export type CategoryAction =
	| FetchCategoriesStart
	| FetchCategoriesFailed
	| FetchCategoriesSuccess
	| AddShowList
	| UpdateShowList
	| DeleteShowList
	| SetSearchString
	| SetFilterSort
	| SetFilterType;

//DB List Actions
export const fetchListStart = (): FetchCategoriesStart =>
	createAction(LIST_ACTION_TYPES.FETCH_LIST_START);

export const fetchListSuccess = (listArray: List): FetchCategoriesSuccess =>
	createAction(LIST_ACTION_TYPES.FETCH_LIST_SUCCESS, listArray);

export const fetchListFailed = (error: Error): FetchCategoriesFailed =>
	createAction(LIST_ACTION_TYPES.FETCH_LIST_FAILED, error);

export const fetchListAsync = currentUser => async dispatch => {
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
export const addShowList = (newShow: Show): AddShowList =>
	createAction(LIST_ACTION_TYPES.ADD_LIST_SHOW, newShow);

export const updateShowList = (updatedShow: Show): UpdateShowList =>
	createAction(LIST_ACTION_TYPES.UPDATE_LIST_SHOW, updatedShow);

export const deleteShowList = (deletedShow: Show): DeleteShowList =>
	createAction(LIST_ACTION_TYPES.DELETE_LIST_SHOW, deletedShow);

//Filtered List Actions

export const setSearchString =
	(
		searchString: string
	): ((dispatch: Dispatch<CategoryAction>) => SetSearchString) =>
	(dispatch: Dispatch<CategoryAction>): SetSearchString =>
		dispatch(createAction(LIST_ACTION_TYPES.SET_SEARCH_STRING, searchString));

export const setFilterType =
	(
		filterType: string
	): ((dispatch: Dispatch<CategoryAction>) => SetSearchString) =>
	(dispatch: Dispatch<CategoryAction>): SetSearchString =>
		dispatch(createAction(LIST_ACTION_TYPES.SET_SEARCH_STRING, filterType));

export const setFilterSort =
	(
		filterSort: string
	): ((dispatch: Dispatch<CategoryAction>) => SetSearchString) =>
	(dispatch: Dispatch<CategoryAction>): SetSearchString =>
		dispatch(createAction(LIST_ACTION_TYPES.SET_SEARCH_STRING, filterSort));
