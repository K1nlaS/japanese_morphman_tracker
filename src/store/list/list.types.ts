import "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export enum LIST_ACTION_TYPES {
	FETCH_LIST_START = "list/SET_LIST_START",
	FETCH_LIST_SUCCESS = "list/FETCH_LIST_SUCCESS",
	FETCH_LIST_FAILED = "list/FETCH_LIST_FAILED",
	SET_SEARCH_STRING = "/list/SET_SEARCH_STRING",
	SET_FILTER_TYPE = "/list/SET_FILTER_TYPE",
	SET_FILTER_SORT = "/list/SET_FILTER_SORT",
	ADD_LIST_SHOW = "/list/ADD_LIST_SHOW",
	UPDATE_LIST_SHOW = "/list/UPDATE_LIST_SHOW",
	DELETE_LIST_SHOW = "/list/DELETE_LIST_SHOW",
}

export type List = {
	createdAt: Timestamp;
	defaultSort: string;
	email: string;
	titleLanguage: string;
	username: string;
};

export type Show = {
	id: string;
	title: string;
	knownInstances: string;
	lineReadability: string;
	unknownMorphs: string;
	type: string;
	status: string;
};
