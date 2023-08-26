//Action types
import { AnyAction } from "redux";
import { CurrentUser } from "./user.types";
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
	updateEmailFailed,
	updateEmailStart,
	updateEmailSuccess,
	updateListSettingsFailed,
	updateListSettingsStart,
	updateListSettingsSuccess,
} from "./user.action";

export type UserState = {
	readonly currentUser: CurrentUser | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = USER_INITIAL_STATE,
	action = {} as AnyAction
) => {
	//Sign in & Sign Out
	if (signInSuccess.match(action)) {
		return { ...state, currentUser: action.payload };
	}
	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	//Update Settings
	if (updateListSettingsSuccess.match(action)) {
		return {
			...state,
			currentUser: { ...state.currentUser, ...action.payload },
			isLoading: false,
		};
	}
	if (updateListSettingsStart.match(action)) {
		return { ...state, isLoading: true };
	}

	//Update Email
	if (updateEmailStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (updateEmailSuccess.match(action)) {
		return {
			...state,
			currentUser: { ...state.currentUser, ...action.payload },
			isLoading: false,
		};
	}

	//Fails
	if (
		updateEmailFailed.match(action) ||
		updateListSettingsFailed.match(action) ||
		signUpFailed.match(action) ||
		signOutFailed.match(action) ||
		signInFailed.match(action)
	) {
		return { ...state, isLoading: false, error: action.payload };
	}

	return state;
};
