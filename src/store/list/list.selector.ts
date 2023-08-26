import { ListState } from "./list.reducer";
import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectListReducer = (state: RootState): ListState => state.list;

export const selectList = createSelector(selectListReducer, list => list);
