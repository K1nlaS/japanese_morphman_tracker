//Misc
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import FormInput from "../form-input/form-input.comp";
import { Button } from "../button/button.comp";
import { FormContainer } from "../../routes/authentication/authentication.styles";

//Redux
import { setListMap } from "../../store/list/list.action";
import { selectList } from "../../store/list/list.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

//Firebase
import { getList, addNewListDocument } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
  title: "",
  knownInstances: "",
  lineReadability: "",
  uknownMorphs: "",
};

const AddShowFormComponent = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, knownInstances, lineReadability, uknownMorphs } = formFields;

  const user = useSelector(selectCurrentUser);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    addNewListDocument(user, formFields);
  };

  return (
    <FormContainer>
      <form onSubmit={formSubmitHandler}>
        <FormInput label="Title" type="text" name="title" id="title" value={title} onChange={inputChangeHandler} required />

        <FormInput label="Known Instances %" type="number" name="knownInstances" id="knownInstances" value={knownInstances} onChange={inputChangeHandler} />

        <FormInput label="Line Readability %" type="number" name="lineReadability" id="lineReadability" value={lineReadability} onChange={inputChangeHandler} />

        <FormInput label="Uknown Morphs (Optional)" type="number" name="uknownMorphs" id="uknownMorphs" value={uknownMorphs} onChange={inputChangeHandler} />

        <Button>Add</Button>
      </form>
    </FormContainer>

  );
};

export default AddShowFormComponent;