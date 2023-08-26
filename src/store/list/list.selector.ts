import { ListState } from "./list.reducer";
import { createSelector } from "reselect";

export const selectListReducer = (state): ListState => state.list;

export const selectList = createSelector(selectListReducer, list => list);
