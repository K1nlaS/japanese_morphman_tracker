//Action types
import { AnyAction } from "redux";
import { LIST_ACTION_TYPES, Show } from "./list.types";
import {
	fetchListStart,
	fetchListFailed,
	fetchListSuccess,
	addShowList,
	updateShowList,
	deleteShowList,
} from "./list.action";

export type ListState = {
	readonly list: Show[];
	readonly filteredList: [];
	readonly searchString: string;
	readonly filterType: string;
	readonly sortOption: string;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const LIST_INITIAL_STATE: ListState = {
	list: [],
	filteredList: [],
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
	if (fetchListStart.match(action)) {
		return { ...state, isLoading: true };
	}

	if (fetchListSuccess.match(action)) {
		return { ...state, list: action.payload, isLoading: false };
	}

	if (fetchListFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}

	if (addShowList.match(action)) {
		return { ...state, list: [...state.list, action.payload] };
	}

	if (updateShowList.match(action)) {
		const updatedList = state.list.map((show: Show) =>
			show.id === action.payload.id ? { ...action.payload } : show
		);
		return { ...state, list: [...updatedList] };
	}

	if (deleteShowList.match(action)) {
		const filteredList = state.list.filter(
			(show: Show) => show.id !== action.payload.id
		);
		return { ...state, list: [...filteredList] };
	}

	switch (action.type) {
		// 	case LIST_ACTION_TYPES.FETCH_LIST_START:
		// 		return { ...state, isLoading: true };

		// 	case LIST_ACTION_TYPES.FETCH_LIST_SUCCESS:
		// 		return { ...state, list: action.payload, isLoading: false };

		// 	case LIST_ACTION_TYPES.FETCH_LIST_FAILED:
		// 		return { ...state, isLoading: false, error: action.payload };

		case LIST_ACTION_TYPES.SET_SEARCH_STRING:
			console.log(action.payload);
			return { ...state, searchString: action.payload };

		case LIST_ACTION_TYPES.SET_FILTER_TYPE:
			return { ...state, filterType: action.payload };

		case LIST_ACTION_TYPES.SET_FILTER_SORT:
			return { ...state, sortOption: action.payload };

		// 	case LIST_ACTION_TYPES.ADD_LIST_SHOW:
		// 		return { ...state, list: [...state.list, action.payload] };

		// 	case LIST_ACTION_TYPES.UPDATE_LIST_SHOW:
		// 		const updatedList = state.list.map((show: Show) =>
		// 			show.id === action.payload.id ? { ...action.payload } : show
		// 		);
		// 		return { ...state, list: [...updatedList] };

		// 	case LIST_ACTION_TYPES.DELETE_LIST_SHOW:
		// 		const filteredList = state.list.filter(
		// 			(show: Show) => show.id !== action.payload.id
		// 		);
		// 		return { ...state, list: [...filteredList] };

		default:
			return state;
	}
};
