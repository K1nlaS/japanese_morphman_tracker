import "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export enum LIST_ACTION_TYPES {
	FETCH_LIST_START = "list/SET_LIST_START",
	FETCH_LIST_SUCCESS = "list/FETCH_LIST_SUCCESS",
	FETCH_LIST_FAILED = "list/FETCH_LIST_FAILED",
	SET_SEARCH_STRING = "list/SET_SEARCH_STRING",
	SET_FILTER_TYPE = "list/SET_FILTER_TYPE",
	SET_FILTER_SORT = "list/SET_FILTER_SORT",
	ADD_LIST_SHOW_START = "list/ADD_LIST_SHOW_START",
	ADD_LIST_SHOW_FAILED = "list/ADD_LIST_SHOW_FAILED",
	ADD_LIST_SHOW_SUCCESS = "list/ADD_LIST_SHOW_SUCCESS",
	UPDATE_LIST_SHOW_START = "list/UPDATE_LIST_SHOW_START",
	UPDATE_LIST_SHOW_FAILED = "list/UPDATE_LIST_SHOW_FAILED",
	UPDATE_LIST_SHOW_SUCCESS = "list/UPDATE_LIST_SHOW_SUCCESS",
	DELETE_LIST_SHOW_START = "list/DELETE_LIST_SHOW_START",
	DELETE_LIST_SHOW_FAILED = "list/DELETE_LIST_SHOW_FAILED",
	DELETE_LIST_SHOW_SUCCESS = "list/DELETE_LIST_SHOW_SUCCESS",
}

export type Show = {
	Media: {
		bannerImage: string;
		coverImage: {
			color: string;
			extraLarge: string;
			large: string;
			meduim: string;
			description: string;
			id: number;
			sideUrl: string;
			title: {
				english: string;
				native: string;
				romaji: string;
			};
		};
	};
	createdAt: Timestamp;
	historyChange: historyChange[];
	id: string;
	title: string;
	knownInstances: string;
	lineReadability: string;
	unknownMorphs: string;
	type: string;
	status: string;
	updatedAt: Timestamp;
};

export type historyChange = {
	id: string;
	knownInstances: string;
	lineReadability: string;
	uknownMorphs: string;
	updatedAt: Timestamp;
};
