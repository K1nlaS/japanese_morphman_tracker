import { takeLatest, all, call, put } from "typed-redux-saga";
import {
	addNewListDocument,
	deleteListDocument,
	getCollectionItem,
	getCollectionList,
	updateListDocument,
} from "../../utils/firebase/firebase.utils";
import {
	fetchListSuccess,
	fetchListFailed,
	setSearchString,
	setFilterSort,
	setFilterType,
	addShowListFailed,
	addShowListSuccess,
	deleteShowListFailed,
	deleteShowListSuccess,
	updateShowListFailed,
	updateShowListSuccess,
} from "./list.action";
import { LIST_ACTION_TYPES } from "./list.types";
import { getCurrentUser } from "../../utils/firebase/firebase.utils";

//Generators
export function* fetchListAsync() {
	const userAuth = yield* call(getCurrentUser);

	if (!userAuth) {
		yield* put(fetchListSuccess([]));
	} else {
		try {
			const list = yield* call(getCollectionList, userAuth);
			yield* put(fetchListSuccess(list));
		} catch (error) {
			yield* put(fetchListFailed(error));
		}
	}
}

export function* addShow({ payload: { formFields } }) {
	try {
		const userAuth = yield* call(getCurrentUser);
		const newShow = yield* call(addNewListDocument, userAuth, formFields);
		const show = yield* call(getCollectionItem, userAuth, newShow);

		yield* put(addShowListSuccess(show));
	} catch (error) {
		yield* put(addShowListFailed(error));
	}
}

export function* deleteShow({ payload: { id } }) {
	try {
		const userAuth = yield* call(getCurrentUser);
		const deletedShowRef = yield* call(deleteListDocument, userAuth, id);
		const deletedShow = yield* call(
			getCollectionItem,
			userAuth,
			deletedShowRef
		);

		yield* put(deleteShowListSuccess(deletedShow));
	} catch (error) {
		yield* put(deleteShowListFailed(error));
	}
}

export function* updateShow({ payload: formFields }) {
	try {
		const userAuth = yield* call(getCurrentUser);
		const updatedShowRef = yield* call(
			updateListDocument,
			userAuth,
			formFields
		);
		const updatedShow = yield* call(
			getCollectionItem,
			userAuth,
			updatedShowRef
		);

		yield* put(updateShowListSuccess(updatedShow));
	} catch (error) {
		yield* put(updateShowListFailed(error));
	}
}

//Entry Point Sagas
export function* onFetchList() {
	yield* takeLatest(LIST_ACTION_TYPES.FETCH_LIST_START, fetchListAsync);
}

export function* onSetSearchString() {
	yield* takeLatest(LIST_ACTION_TYPES.SET_SEARCH_STRING, setSearchString);
}

export function* onFilterSort() {
	yield* takeLatest(LIST_ACTION_TYPES.SET_FILTER_SORT, setFilterSort);
}

export function* onFilterType() {
	yield* takeLatest(LIST_ACTION_TYPES.SET_FILTER_TYPE, setFilterType);
}

export function* onAddShow() {
	yield* takeLatest(LIST_ACTION_TYPES.ADD_LIST_SHOW_START, addShow);
}

export function* onDeleteShow() {
	yield* takeLatest(LIST_ACTION_TYPES.DELETE_LIST_SHOW_START, deleteShow);
}

export function* onUpdateShow() {
	yield* takeLatest(LIST_ACTION_TYPES.UPDATE_LIST_SHOW_START, updateShow);
}

//Sagas Export
export function* listSaga() {
	yield* all([
		call(onFetchList),
		call(onSetSearchString),
		call(onFilterSort),
		call(onAddShow),
		call(onDeleteShow),
		call(onUpdateShow),
	]);
}
