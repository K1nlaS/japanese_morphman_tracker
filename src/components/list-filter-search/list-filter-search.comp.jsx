//Misc
import { useDispatch } from "react-redux";

//Icons
import { AiOutlineSearch } from "react-icons/ai";

//Redux
import { setSearchString } from "../../store/list/list.action";

//Styled Components
import {
  FILTER_INPUT,
  SEARCH_CONTAINER
} from "./list-filter-search.styles";

const FilterSearch = () => {

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    dispatch(setSearchString(e.target.value));
  };

  return (
    <SEARCH_CONTAINER>
      <AiOutlineSearch />
      <FILTER_INPUT placeholder="Filter" onChange={inputChangeHandler} />
    </SEARCH_CONTAINER>
  );
};

export default FilterSearch;