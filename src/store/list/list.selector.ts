import { ListState } from "./list.reducer";

export const selectList = (state: ListState) => state.list;
