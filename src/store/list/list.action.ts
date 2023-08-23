//Reducer shorthand
import {
	createAction,
	Action,
	ActionWithPayLoad,
	withMatcher,
} from "../../utils/reducer/reducer.utils";

//Action types
import { LIST_ACTION_TYPES, Show } from "./list.types";

type FormFields = {
	title: string;
	knownInstances: string;
	lineReadability: string;
	uknownMorphs: string;
	type: { value: string; label: string };
	status: { value: string; label: string };
};

type UpdatedFormFields = FormFields & {
	id: string;
	status: string;
	type: string;
};

//DB List Actions
export type FetchCategoriesStart = Action<LIST_ACTION_TYPES.FETCH_LIST_START>;
export type FetchCategoriesFailed = ActionWithPayLoad<
	LIST_ACTION_TYPES.FETCH_LIST_FAILED,
	Error
>;
export type FetchCategoriesSuccess = ActionWithPayLoad<
	LIST_ACTION_TYPES.FETCH_LIST_SUCCESS,
	Show[]
>;

//Add Show
export type AddShowListStart = ActionWithPayLoad<
	LIST_ACTION_TYPES.ADD_LIST_SHOW_START,
	FormFields
>;
export type AddShowListFailed = ActionWithPayLoad<
	LIST_ACTION_TYPES.ADD_LIST_SHOW_FAILED,
	Error
>;
export type AddShowListSuccess = ActionWithPayLoad<
	LIST_ACTION_TYPES.ADD_LIST_SHOW_SUCCESS,
	Show
>;

//Update Show
export type UpdateShowListStart = ActionWithPayLoad<
	LIST_ACTION_TYPES.UPDATE_LIST_SHOW_START,
	UpdatedFormFields
>;
export type UpdateShowListFailed = ActionWithPayLoad<
	LIST_ACTION_TYPES.UPDATE_LIST_SHOW_FAILED,
	Error
>;
export type UpdateShowListSuccess = ActionWithPayLoad<
	LIST_ACTION_TYPES.UPDATE_LIST_SHOW_SUCCESS,
	Show
>;

//Delete Show
export type DeleteShowListStart = ActionWithPayLoad<
	LIST_ACTION_TYPES.DELETE_LIST_SHOW_START,
	string
>;
export type DeleteShowListFailed = ActionWithPayLoad<
	LIST_ACTION_TYPES.DELETE_LIST_SHOW_FAILED,
	Error
>;
export type DeleteShowListSuccess = ActionWithPayLoad<
	LIST_ACTION_TYPES.DELETE_LIST_SHOW_SUCCESS,
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

//DB List Actions
export const fetchListStart = withMatcher(
	(): FetchCategoriesStart => createAction(LIST_ACTION_TYPES.FETCH_LIST_START)
);

export const fetchListSuccess = withMatcher(
	(listArray: Show[]): FetchCategoriesSuccess =>
		createAction(LIST_ACTION_TYPES.FETCH_LIST_SUCCESS, listArray)
);

export const fetchListFailed = withMatcher(
	(error: Error): FetchCategoriesFailed =>
		createAction(LIST_ACTION_TYPES.FETCH_LIST_FAILED, error)
);

//Add Show
export const addShowListStart = withMatcher(
	(formFields: FormFields): AddShowListStart =>
		createAction(LIST_ACTION_TYPES.ADD_LIST_SHOW_START, formFields)
);
export const addShowListFailed = withMatcher(
	(error: Error): AddShowListFailed =>
		createAction(LIST_ACTION_TYPES.ADD_LIST_SHOW_FAILED, error)
);
export const addShowListSuccess = withMatcher(
	(show: any): AddShowListSuccess =>
		createAction(LIST_ACTION_TYPES.ADD_LIST_SHOW_SUCCESS, show)
);

//Update Show
export const updateShowListStart = withMatcher(
	(formFields: UpdatedFormFields): UpdateShowListStart =>
		createAction(LIST_ACTION_TYPES.UPDATE_LIST_SHOW_START, formFields)
);
export const updateShowListFailed = withMatcher(
	(error: Error): UpdateShowListFailed =>
		createAction(LIST_ACTION_TYPES.UPDATE_LIST_SHOW_FAILED, error)
);
export const updateShowListSuccess = withMatcher(
	(updatedShow: Show): UpdateShowListSuccess =>
		createAction(LIST_ACTION_TYPES.UPDATE_LIST_SHOW_SUCCESS, updatedShow)
);

//Delete Show
export const deleteShowListStart = withMatcher(
	(id: string): DeleteShowListStart =>
		createAction(LIST_ACTION_TYPES.DELETE_LIST_SHOW_START, id)
);
export const deleteShowListFailed = withMatcher(
	(error: Error): DeleteShowListFailed =>
		createAction(LIST_ACTION_TYPES.DELETE_LIST_SHOW_FAILED, error)
);
export const deleteShowListSuccess = withMatcher(
	(deletedShow: Show): DeleteShowListSuccess =>
		createAction(LIST_ACTION_TYPES.DELETE_LIST_SHOW_SUCCESS, deletedShow)
);

//Filtered List Actions
export const setSearchString = withMatcher(
	(searchString: string): SetSearchString =>
		createAction(LIST_ACTION_TYPES.SET_SEARCH_STRING, searchString)
);

export const setFilterType = withMatcher(
	(filterType: string): SetFilterType =>
		createAction(LIST_ACTION_TYPES.SET_FILTER_TYPE, filterType)
);

export const setFilterSort = withMatcher(
	(filterSort: string): SetFilterSort =>
		createAction(LIST_ACTION_TYPES.SET_FILTER_SORT, filterSort)
);
