//Misc
import { useDispatch } from "react-redux";

//Components
import DropDownType from "../dropdown-type/dropdown-type.comp";

//Styled Components
import {
  TYPE_CONTAINER,
  TYPE_BODY
} from "./list-filter-type.styles";
import { FILTER_HEADER } from "../list-filter-status/list-filter-status.styles";

//Redux
import { setFilterType } from "../../store/list/list.action";

const typeSelectOptions = [
  { value: "TV", label: "TV" },
  { value: "Movie", label: "Movie" },
  { value: "OVA", label: "OVA" },
];

const ListFiltersType = () => {

  const dispatch = useDispatch();

  const dropDownTypeChangeHandler = (selectedOption) => {
    dispatch(setFilterType(selectedOption));
  };

  return (
    <TYPE_CONTAINER>
      <FILTER_HEADER>Filters</FILTER_HEADER>

      <TYPE_BODY>
        <DropDownType onChange={dropDownTypeChangeHandler} options={typeSelectOptions} isClearable={true} placeholder={"Format"} />
      </TYPE_BODY>

    </TYPE_CONTAINER>
  );
};

export default ListFiltersType;