//Misc
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Firebase
import { updateListDocument, deleteListDocument } from "../../utils/firebase/firebase.utils";

//Selectors
import { selectCurrentUser } from "../../store/user/user.selector";

//Redux
import { fetchListAsync } from "../../store/list/list.action";

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
  title: "",
  knownInstances: "",
  lineReadability: "",
  uknownMorphs: "",
  status: "",
  formType: ""
};

const EditShowForm = ({ show, closeModal }) => {

  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

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
  const { knownInstances, lineReadability, uknownMorphs, status, title, formType } = formFields;

  useEffect(() => {
    setFormFields({
      id: id,
      knownInstances: knownInstancesData,
      lineReadability: lineReadabilityData,
      uknownMorphs: uknownMorphsData,
      status: statusData,
      formType: typeData,
      title: titleData,
    });
  }, []);

  const titleChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

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
    closeModal(false);

    dispatch(fetchListAsync(currentUser));
  };

  const deleteClickHandler = async () => {
    await deleteListDocument(currentUser, id);

    closeModal(false);

    dispatch(fetchListAsync(currentUser));
  };

  console.log(formFields);

  return (
    <EDIT_CONTAINER>
      <HEADER bannerImage={bannerImage} >
        <HEADER_CONTENT>
          <HEADER_COVER coverImg={coverImage.medium} />
          <HEADER_TITLE onChange={titleChangeHandler} value={title} name="title" spellCheck={false} />
          <Button form="editForm">Save</Button>
        </HEADER_CONTENT>
      </HEADER>
      <BODY>
        <FORM_CONTAINER id="editForm" onSubmit={formSubmitHandler}>
          <DropDown onChange={dropdownStatusChangeHandle} statusValue={status} label="Status" options={statusSelectOptions} />

          <FormInput label="Line Readability %" type="number" name="lineReadability" id="lineReadability" value={lineReadability} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

          <FormInput label="Known Instances %" type="number" name="knownInstances" id="knownInstances" value={knownInstances} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

          <FormInput label="Uknown Morphs (Optional)" type="number" name="uknownMorphs" id="uknownMorphs" value={uknownMorphs} onChange={inputChangeHandler} min="0" step="1" />

          <DropDown onChange={dropdownTypeChangeHandle} statusValue={formType} label="Type" options={typeSelectOptions} />
        </FORM_CONTAINER>

        <BODY_FOOTER>
          <FOOTER_DATES>
            <FOOTER_DATE>Created: {new Date(createdAt.seconds * 1000).toLocaleDateString("ukr")}</FOOTER_DATE>
          </FOOTER_DATES>
          <Button onClick={deleteClickHandler} buttonType={BUTTON_TYPE_CLASSES.formDelete}>Delete</Button>
        </BODY_FOOTER>

      </BODY>
    </EDIT_CONTAINER>
  );
};

export default EditShowForm;