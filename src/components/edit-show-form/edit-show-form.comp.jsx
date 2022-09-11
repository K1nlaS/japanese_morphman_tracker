//Misc
import { useState } from "react";

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
import { useEffect } from "react";



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
  formKnownInstances: "",
  formLineReadability: "",
  formUknownMorphs: "",
  formStatus: "",
  formType: ""
};

const EditShowForm = ({ show }) => {

  const { Media, title, status, knownInstances, lineReadability, uknownMorphs, type, createdAt } = show;
  const { bannerImage, coverImage } = Media;


  const [formFields, setFormFields] = useState(defaultFormFields);
  const { formKnownInstances, formLineReadability, formUknownMorphs, formStatus, formType } = formFields;

  useEffect(() => {
    setFormFields({
      formKnownInstances: knownInstances,
      formLineReadability: lineReadability,
      formUknownMorphs: uknownMorphs,
      formStatus: status,
      formType: type
    });
  }, []);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const dropdownStatusChangeHandle = (selectedOption) => {
    const { value } = selectedOption;
    setFormFields({ ...formFields, formStatus: value });
  };

  const dropdownTypeChangeHandle = (selectedOption) => {
    const { value } = selectedOption;
    setFormFields({ ...formFields, formType: value });
  };

  return (
    <EDIT_CONTAINER>
      <HEADER bannerImage={bannerImage} >
        <HEADER_CONTENT>
          <HEADER_COVER coverImg={coverImage.medium} />
          <HEADER_TITLE>{title}</HEADER_TITLE>
          <Button>Save</Button>
        </HEADER_CONTENT>
      </HEADER>
      <BODY>
        <FORM_CONTAINER>
          <DropDown onChange={dropdownStatusChangeHandle} statusValue={formStatus} label="Status" options={statusSelectOptions} />

          <FormInput label="Line Readability %" type="number" name="formLineReadability" id="lineReadability" value={formLineReadability} onChange={inputChangeHandler} />

          <FormInput label="Known Instances %" type="number" name="formKnownInstances" id="knownInstances" value={formKnownInstances} onChange={inputChangeHandler} />

          <FormInput label="Uknown Morphs (Optional)" type="number" name="formUknownMorphs" id="uknownMorphs" value={formUknownMorphs} onChange={inputChangeHandler} />

          <DropDown onChange={dropdownTypeChangeHandle} statusValue={formType} label="Type" options={typeSelectOptions} />
        </FORM_CONTAINER>

        <BODY_FOOTER>
          <FOOTER_DATES>
            <FOOTER_DATE>Created: {new Date(createdAt * 1000).toLocaleDateString("ukr")}</FOOTER_DATE>
          </FOOTER_DATES>
          <Button buttonType={BUTTON_TYPE_CLASSES.formDelete}>Delete</Button>
        </BODY_FOOTER>

      </BODY>
    </EDIT_CONTAINER>
  );
};

export default EditShowForm;