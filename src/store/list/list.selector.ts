import { ListState } from "./list.reducer";

export const selectList = (state: ListState) => state.list;
export const selectSearchString = (state: ListState) => state.searchString;
export const selectFilterType = (state: ListState) => state.filterType;
export const selectFilterSort = (state: ListState) => state.sortOption;
