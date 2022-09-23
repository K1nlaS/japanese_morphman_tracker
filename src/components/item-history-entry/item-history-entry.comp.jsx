//Misc
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

//Redux
import { fetchListAsync } from "../../store/list/list.action";

//Firebase
import { updateHistoryEntry } from "../../utils/firebase/firebase.utils";

//Components
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.comp";

//Styled Components
import {
  ENTRY_CONTAINER,
  ENTRY_STAT,
  ENTRY_UPDATED,
  ENTRY_INPUT_HOLDER,
  BUTTON_CONTAINER
} from "./item-history-entry.styles";

const defaultFormFields = {
  id: "",
  lineReadability: "",
  knownInstances: "",
  uknownMorphs: "",
};

const ItemHistoryEntry = ({ historyEntry, showId, arrayIndex }) => {

  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const [isChanged, setIsChanged] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { lineReadability: dataLineReadability, knownInstances: dataKnownInstances, uknownMorphs: dataUknownMorphs, updatedAt, id } = historyEntry;

  const { lineReadability, knownInstances, uknownMorphs } = formFields;

  useEffect(() => {
    setFormFields({
      id,
      lineReadability: dataLineReadability,
      knownInstances: dataKnownInstances,
      uknownMorphs: dataUknownMorphs,
    });
  }, [id, dataLineReadability, dataKnownInstances, dataUknownMorphs]);

  const inputFocusHandler = e => {
    e.target.placeholder = "";
    e.target.value = formFields[e.target.name];
  };
  const inputBlurHandler = e => {
    e.target.placeholder = `${formFields[e.target.name]}${e.target.name !== "uknownMorphs" ? "%" : ""}`;
    e.target.value = "";
  };

  const inputChangeHandler = (e) => {
    let { name, value } = e.target;

    if (value < 0) {
      value = "0";
    }

    if ((value > 100) || (name === "lineReadability" || name === "knownInstances")) {
      value = "100";
    }

    setFormFields({ ...formFields, [name]: value });
    setIsChanged(true);
  };

  const submitClickHandler = async () => {
    await updateHistoryEntry(currentUser, showId, formFields);
    dispatch(fetchListAsync(currentUser));
  };

  return (
    <ENTRY_CONTAINER>
      <span>{arrayIndex + 1}</span>
      <ENTRY_INPUT_HOLDER>
        <ENTRY_STAT name="lineReadability" placeholder={`${lineReadability}%`} onFocus={inputFocusHandler} onBlur={inputBlurHandler} onChange={inputChangeHandler} type="number" min="0" max="100" step="0.01" />
      </ENTRY_INPUT_HOLDER>

      <ENTRY_INPUT_HOLDER>
        <ENTRY_STAT name="knownInstances" placeholder={`${knownInstances}%`} onFocus={inputFocusHandler} onBlur={inputBlurHandler} onChange={inputChangeHandler} type="number" min="0" max="100" step="0.01" />
      </ENTRY_INPUT_HOLDER>

      <ENTRY_INPUT_HOLDER>
        <ENTRY_STAT name="uknownMorphs" placeholder={uknownMorphs} onFocus={inputFocusHandler} onBlur={inputBlurHandler} onChange={inputChangeHandler} type="number" min="0" step="1" />
      </ENTRY_INPUT_HOLDER>

      <ENTRY_UPDATED>{new Date(updatedAt.seconds * 1000).toLocaleDateString("ukr")}</ENTRY_UPDATED>

      <BUTTON_CONTAINER>
        {
          isChanged && <Button buttonType={BUTTON_TYPE_CLASSES.formAction} onClick={submitClickHandler}>Update</Button>
        }
      </BUTTON_CONTAINER>

    </ENTRY_CONTAINER>
  );
};

export default ItemHistoryEntry;
