//Action types
import { AnyAction } from "redux";
import { Show } from "./list.types";
import {
	fetchListStart,
	fetchListFailed,
	fetchListSuccess,
	addShowListStart,
	addShowListFailed,
	addShowListSuccess,
	updateShowListStart,
	updateShowListFailed,
	updateShowListSuccess,
	deleteShowListStart,
	deleteShowListFailed,
	deleteShowListSuccess,
	setFilterSort,
	setSearchString,
	setFilterType,
} from "./list.action";

export type ListState = {
	readonly list: Show[];
	readonly searchString: string;
	readonly filterType: string;
	readonly sortOption: string;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const LIST_INITIAL_STATE: ListState = {
	list: [],
	searchString: "",
	filterType: "",
	sortOption: "",
	isLoading: false,
	error: null,
};

export const listReducer = (
	state = LIST_INITIAL_STATE,
	action = {} as AnyAction
): ListState => {
	//List Fetch
	if (fetchListStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (fetchListSuccess.match(action)) {
		return { ...state, list: action.payload, isLoading: false };
	}
	if (fetchListFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}

	//Add Show
	if (addShowListStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (addShowListSuccess.match(action)) {
		return { ...state, list: [...state.list, action.payload] };
	}
	if (addShowListFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}

	//Update Show
	if (updateShowListStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (updateShowListSuccess.match(action)) {
		const updatedList = state.list.map((show: Show) =>
			show.id === action.payload.id ? { ...action.payload } : show
		);
		return { ...state, list: [...updatedList] };
	}
	if (updateShowListFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}

	//Delete Show
	if (deleteShowListStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (deleteShowListSuccess.match(action)) {
		const filteredList = state.list.filter(
			(show: Show) => show.id !== action.payload.id
		);
		return { ...state, list: [...filteredList] };
	}
	if (deleteShowListFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}

	//Local Changes
	if (setFilterSort.match(action)) {
		return { ...state, sortOption: action.payload };
	}
	if (setSearchString.match(action)) {
		return { ...state, searchString: action.payload };
	}
	if (setFilterType.match(action)) {
		return { ...state, filterType: action.payload };
	}

	return state;
};
