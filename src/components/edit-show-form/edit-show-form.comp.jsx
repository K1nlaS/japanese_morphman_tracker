//Misc
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//Firebase
import { updateListDocument, deleteListDocument } from "../../utils/firebase/firebase.utils";

//Selectors
import { selectCurrentUser } from "../../store/user/user.selector";

//Components
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.comp";
import FormInput from "../form-input/form-input.comp";
import DropDown from "../dropdown/dropdown.comp";

//Styled Components
import {
  BODY,
  HEADER,
  EDIT_CONTAINER,
  HEADER_CONTENT,
  HEADER_COVER,
  HEADER_TITLE,
  FORM_CONTAINER,
  BODY_FOOTER,
  FOOTER_DATES,
  FOOTER_DATE
} from "./edit-show-form.styles";

const statusSelectOptions = [
  { value: "Planning", label: "Planning" },
  { value: "Watching", label: "Watching" },
  { value: "Completed", label: "Completed" },
  { value: "Ready", label: "Ready" },
  { value: "Legacy", label: "Legacy" },
];

const typeSelectOptions = [
  { value: "TV", label: "TV" },
  { value: "Movie", label: "Movie" },
];

const defaultFormFields = {
  id: "",
  knownInstances: "",
  lineReadability: "",
  uknownMorphs: "",
  status: "",
  formType: ""
};

const EditShowForm = ({ show }) => {

  const currentUser = useSelector(selectCurrentUser);

  const {
    Media,
    id,
    title: titleData,
    status: statusData,
    knownInstances: knownInstancesData,
    lineReadability: lineReadabilityData,
    uknownMorphs: uknownMorphsData,
    type: typeData,
    createdAt
  } = show;
  const { bannerImage, coverImage } = Media;


  const [formFields, setFormFields] = useState(defaultFormFields);
  const { knownInstances, lineReadability, uknownMorphs, status, formType } = formFields;

  useEffect(() => {
    setFormFields({
      id: id,
      knownInstances: knownInstancesData,
      lineReadability: lineReadabilityData,
      uknownMorphs: uknownMorphsData,
      status: statusData,
      formType: typeData
    });
  }, []);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const dropdownStatusChangeHandle = (selectedOption) => {
    const { value } = selectedOption;
    setFormFields({ ...formFields, status: value });
  };

  const dropdownTypeChangeHandle = (selectedOption) => {
    const { value } = selectedOption;
    setFormFields({ ...formFields, formType: value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    await updateListDocument(currentUser, formFields);
  };

  const deleteClickHandler = async () => {
    await deleteListDocument(currentUser, id);
  };

  return (
    <EDIT_CONTAINER>
      <HEADER bannerImage={bannerImage} >
        <HEADER_CONTENT>
          <HEADER_COVER coverImg={coverImage.medium} />
          <HEADER_TITLE>{titleData}</HEADER_TITLE>
          <Button form="editForm">Save</Button>
        </HEADER_CONTENT>
      </HEADER>
      <BODY>
        <FORM_CONTAINER id="editForm" onSubmit={formSubmitHandler}>
          <DropDown onChange={dropdownStatusChangeHandle} statusValue={status} label="Status" options={statusSelectOptions} />

          <FormInput label="Line Readability %" type="number" name="lineReadability" id="lineReadability" value={lineReadability} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

          <FormInput label="Known Instances %" type="number" name="knownInstances" id="knownInstances" value={knownInstances} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

          <FormInput label="Uknown Morphs (Optional)" type="number" name="uknownMorphs" id="uknownMorphs" value={uknownMorphs} onChange={inputChangeHandler} min="0" step="1" required />

          <DropDown onChange={dropdownTypeChangeHandle} statusValue={formType} label="Type" options={typeSelectOptions} />
        </FORM_CONTAINER>

        <BODY_FOOTER>
          <FOOTER_DATES>
            <FOOTER_DATE>Created: {new Date(createdAt * 1000).toLocaleDateString("ukr")}</FOOTER_DATE>
          </FOOTER_DATES>
          <Button onClick={deleteClickHandler} buttonType={BUTTON_TYPE_CLASSES.formDelete}>Delete</Button>
        </BODY_FOOTER>

      </BODY>
    </EDIT_CONTAINER>
  );
};

export default EditShowForm;