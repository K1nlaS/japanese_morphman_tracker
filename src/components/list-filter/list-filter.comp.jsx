//Misc

//Components
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.comp";
import FilterSearch from "../list-filter-search/list-filter-search.comp";

//Styled Components
import {
  FILTER_CONTAINER,
  FILTER_BUTTONS
} from "./list-filter.styles";

const ListFilter = ({ addShowModalToggle, isModal }) => {

  const toggleModal = () => addShowModalToggle(!isModal);

  return (
    <FILTER_CONTAINER>

      <FILTER_BUTTONS>
        <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={toggleModal}>Add</Button>
      </FILTER_BUTTONS>

      <FilterSearch />


    </FILTER_CONTAINER>
  );
};

export default ListFilter;