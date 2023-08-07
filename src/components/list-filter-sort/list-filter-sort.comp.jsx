//Misc
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import DropDownSort from "../dropdown-sort/dropdown-sort.comp";

//Styled Components
import {
  SORT_CONTAINER,
  SORT_BODY
} from "./list-filter-sort.styles";
import { FILTER_HEADER } from "../list-filter-status/list-filter-status.styles";

//Redux
import { setFilterSort } from "../../store/list/list.action";

//Selectors
import { selectList } from "../../store/list/list.selector";


const sortSelectOptions = [
  { value: "Title", label: "Title" },
  { value: "Readability", label: "Readability" },
  { value: "Known Instances", label: "Known Instances" },
  { value: "Uknown Morphs", label: "Uknown Morphs" },
  { value: "Last Updated", label: "Last Updated" },
  { value: "Last Added", label: "Last Added" },
];

const ListFilterSort = () => {

  const dispatch = useDispatch();

  const { sortOption } = useSelector(selectList);

  useEffect(() => {
    dispatch(setFilterSort(sortOption));
  }, [dispatch, sortOption]);

  const dropDownSortChangeHandler = (selectedOption) => {
    dispatch(setFilterSort(selectedOption));
  };

  return (
    <SORT_CONTAINER>
      <FILTER_HEADER>Sort</FILTER_HEADER>

      <SORT_BODY>
        <DropDownSort onChange={dropDownSortChangeHandler} options={sortSelectOptions} defaultOption={sortOption} />
      </SORT_BODY>
    </SORT_CONTAINER>
  );
};

export default ListFilterSort;