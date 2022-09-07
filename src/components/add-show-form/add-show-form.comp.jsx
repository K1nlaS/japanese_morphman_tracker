//Misc
import { useState } from "react";
import { useSelector } from "react-redux";

//Components
import FormInput from "../form-input/form-input.comp";
import { Button } from "../button/button.comp";
import DropDown from "../dropdown/dropdown.comp";

//Styled Components
import { DROP_DOWNS_CONTAINER } from "./add-show-form.styles";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";

//Firebase
import { addNewListDocument } from "../../utils/firebase/firebase.utils";

const typeSelectOptions = [
  { value: "TV", label: "TV" },
  { value: "Movie", label: "Movie" },
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

const AddShowFormComponent = ({ fetchList }) => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, knownInstances, lineReadability, uknownMorphs } = formFields;

  const user = useSelector(selectCurrentUser);

  const resetFormField = () => setFormFields(defaultFormFields);

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

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await addNewListDocument(user, formFields);

      resetFormField();
      fetchList(true);
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <FormInput label="Title" type="text" name="title" id="title" value={title} onChange={inputChangeHandler} required />

      <FormInput label="Known Instances %" type="number" name="knownInstances" id="knownInstances" value={knownInstances} onChange={inputChangeHandler} />

      <FormInput label="Line Readability %" type="number" name="lineReadability" id="lineReadability" value={lineReadability} onChange={inputChangeHandler} />

      <FormInput label="Uknown Morphs (Optional)" type="number" name="uknownMorphs" id="uknownMorphs" value={uknownMorphs} onChange={inputChangeHandler} />

      <DROP_DOWNS_CONTAINER>
        <DropDown options={typeSelectOptions} onChange={dropdownTypeChangeHandle} />
        <DropDown options={statusSelectOptions} onChange={dropdownStatusChangeHandle} />
      </DROP_DOWNS_CONTAINER>

      <Button>Add</Button>
    </form>
  );
};

export default AddShowFormComponent;