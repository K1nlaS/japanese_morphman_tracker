//Misc
import { useState } from "react";
import { useDispatch } from "react-redux";

//Components
import FormInput from "../form-input/form-input.comp";
import { Button } from "../button/button.comp";
import DropDown from "../dropdown/dropdown.comp";

//Styled Components
import {
  DROP_DOWNS_CONTAINER,
  FORM_CONTAINER
} from "./add-show-form.styles";

//Firebase
import { addShowListStart } from "../../store/list/list.action";

const typeSelectOptions = [
  { value: "TV", label: "TV" },
  { value: "Movie", label: "Movie" },
  { value: "OVA", label: "OVA" },
];

const statusSelectOptions = [
  { value: "Planning", label: "Planning" },
  { value: "Watching", label: "Watching" },
  { value: "Completed", label: "Completed" },
  { value: "Ready", label: "Ready" },
  { value: "Legacy", label: "Legacy" },
];

const defaultFormFields = {
  title: "",
  knownInstances: "",
  lineReadability: "",
  uknownMorphs: "",
  type: typeSelectOptions[0].value,
  status: statusSelectOptions[0].value
};

const AddShowFormComponent = ({ closeModal }) => {

  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, knownInstances, lineReadability, uknownMorphs } = formFields;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const dropdownTypeChangeHandle = (selectedOption) => {
    const { value } = selectedOption;
    setFormFields({ ...formFields, type: value });
  };

  const dropdownStatusChangeHandle = (selectedOption) => {
    const { value } = selectedOption;
    setFormFields({ ...formFields, status: value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    closeModal(false);

    dispatch(addShowListStart({ formFields }));
  };


  return (
    <FORM_CONTAINER>
      <form onSubmit={formSubmitHandler}>
        <FormInput label="Title" type="text" name="title" id="title" value={title} onChange={inputChangeHandler} required />

        <FormInput label="Known Instances %" type="number" name="knownInstances" id="knownInstances" value={knownInstances} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

        <FormInput label="Line Readability %" type="number" name="lineReadability" id="lineReadability" value={lineReadability} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

        <FormInput label="Uknown Morphs (Optional)" type="number" name="uknownMorphs" id="uknownMorphs" value={uknownMorphs} onChange={inputChangeHandler} min="0" step="1" />

        <DROP_DOWNS_CONTAINER>
          <DropDown label="Type" options={typeSelectOptions} onChange={dropdownTypeChangeHandle} />
          <DropDown label="Status" options={statusSelectOptions} onChange={dropdownStatusChangeHandle} />
        </DROP_DOWNS_CONTAINER>

        <Button>Add</Button>
      </form>
    </FORM_CONTAINER>
  );
};

export default AddShowFormComponent;