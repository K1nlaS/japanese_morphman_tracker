//Misc

//Components
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.comp";
import FilterSearch from "../list-filter-search/list-filter-search.comp";
import ListFilterStatus from "../list-filter-status/list-filter-status.comp";
import ListFiltersType from "../list-filter-type/list-filter-type.comp";
import ListFilterSort from "../list-filter-sort/list-filter-sort.comp";

//Styled Components
import {
  FILTER_CONTAINER,
  FILTER_BUTTONS
} from "./list-filter.styles";

const ListFilter = ({ addShowModalToggle, batchFormModal, list }) => {

  const toggleAddFormModal = () => addShowModalToggle(true);
  const toggleBatchFormModal = () => batchFormModal(true);

  return (
    <FILTER_CONTAINER>

      <FILTER_BUTTONS>
        <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={toggleAddFormModal}>Add</Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={toggleBatchFormModal}>Batch</Button>
      </FILTER_BUTTONS>

      <FilterSearch />

      <ListFilterStatus list={list} />

      <ListFiltersType />

      <ListFilterSort />

    </FILTER_CONTAINER>
  );
};

export default ListFilter;