//Misc
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultBanner from "../../assets/404_banner.jpg";

//Icons
import { MdEdit } from "react-icons/md";

//Firebase
import { updateListDocument, deleteListDocument, getCollectionItem } from "../../utils/firebase/firebase.utils";

//Selectors
import { selectCurrentUser } from "../../store/user/user.selector";

//Redux
import { deleteShowList, updateShowList } from "../../store/list/list.action";

//Components
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.comp";
import FormInput from "../form-input/form-input.comp";
import DropDown from "../dropdown/dropdown.comp";
import ListDisplayItemHistory from "../list-display-item-history/list-display-item-history.comp";

//Styled Components
import {
  BODY,
  HEADER,
  EDIT_CONTAINER,
  HEADER_CONTENT,
  HEADER_COVER,
  HEADER_TITLE_CONTAINER,
  HEADER_TITLE,
  FORM_CONTAINER,
  BODY_FOOTER,
  DATES,
  DATE,
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
  { value: "OVA", label: "OVA" },
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
    Media = {},
    id,
    title: titleData,
    status: statusData,
    knownInstances: knownInstancesData,
    lineReadability: lineReadabilityData,
    uknownMorphs: uknownMorphsData,
    type: typeData,
    createdAt,
    updatedAt
  } = show;
  const { bannerImage = "", coverImage = "" } = Media;

  const [isHistory, setIsHistory] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { knownInstances, lineReadability, uknownMorphs, status, title, formType } = formFields;

  useEffect(() => {
    setFormFields({
      id: id,
      knownInstances: knownInstancesData,
      lineReadability: lineReadabilityData,
      uknownMorphs: uknownMorphsData,
      status: statusData,
      type: typeData,
      title: titleData,
    });
  }, [knownInstancesData, lineReadabilityData, uknownMorphsData, statusData, typeData, titleData, id]);

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
    setFormFields({ ...formFields, type: value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const updatedShowRef = await updateListDocument(currentUser, formFields);
    closeModal(false);

    const updatedShow = await getCollectionItem(currentUser, updatedShowRef);
    dispatch(updateShowList(updatedShow));
  };

  const deleteClickHandler = async () => {
    const deletedShowRef = await deleteListDocument(currentUser, id);
    const deletedShow = await getCollectionItem(currentUser, deletedShowRef);

    dispatch(deleteShowList(deletedShow));
    closeModal(false);
  };


  return (
    <>
      <EDIT_CONTAINER>
        <DATES>
          <DATE>Updated: <span>{new Date(updatedAt.seconds * 1000).toLocaleDateString("ukr")}</span></DATE>
          <DATE>Created: <span>{new Date(createdAt.seconds * 1000).toLocaleDateString("ukr")}</span></DATE>
        </DATES>

        <HEADER $bannerImage={bannerImage ? bannerImage : defaultBanner} >
          <HEADER_CONTENT>
            <HEADER_COVER $coverImg={coverImage ? coverImage.medium : defaultBanner} />
            <HEADER_TITLE_CONTAINER>
              <MdEdit />
              <HEADER_TITLE onChange={titleChangeHandler} value={title} name="title" spellCheck={false} />
            </HEADER_TITLE_CONTAINER>

            {!isHistory && (<Button form="editForm">Save</Button>)}

          </HEADER_CONTENT>
        </HEADER>
        <BODY>
          {
            !isHistory ? (
              <FORM_CONTAINER id="editForm" onSubmit={formSubmitHandler}>
                <DropDown onChange={dropdownStatusChangeHandle} statusValue={status} label="Status" options={statusSelectOptions} />

                <FormInput label="Line Readability %" type="number" name="lineReadability" id="lineReadability" value={lineReadability} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

                <FormInput label="Known Instances %" type="number" name="knownInstances" id="knownInstances" value={knownInstances} onChange={inputChangeHandler} min="0" max="100" step="0.01" required />

                <FormInput label="Uknown Morphs (Optional)" type="number" name="uknownMorphs" id="uknownMorphs" value={uknownMorphs} onChange={inputChangeHandler} min="0" step="1" />

                <DropDown onChange={dropdownTypeChangeHandle} statusValue={formType} label="Type" options={typeSelectOptions} />
              </FORM_CONTAINER>
            ) : (<ListDisplayItemHistory show={show} />)
          }




          <BODY_FOOTER>
            <Button onClick={() => setIsHistory(!isHistory)} buttonType={BUTTON_TYPE_CLASSES.formAction}>History</Button>

            <Button onClick={deleteClickHandler} buttonType={BUTTON_TYPE_CLASSES.formDelete}>Delete</Button>
          </BODY_FOOTER>
        </BODY>
      </EDIT_CONTAINER>

    </>
  );
};

export default EditShowForm;