//Misc
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Firebase
import { listBatchUpdate } from "../../utils/firebase/firebase.utils";

//Selectors
import { selectCurrentUser } from "../../store/user/user.selector";

//Components
import { Button } from "../button/button.comp";

//Saga
import { fetchListStart } from "../../store/list/list.action";

//Styled Components
import {
  FORM_CONTAINER,
  FILE_UPLOAD_SELECT,
  FILE_SELECT_BUTTON,
  FILE_SELECT_NAME,
  FILE_UPLOAD
} from "./batch-updater.styles";

const BatchUpdateForm = ({ closeModal }) => {

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const [rawFile, setRawFile] = useState("");
  const [inputName, setInputName] = useState("No file chosen...");

  const inputChangeHandler = (e) => {
    const file = e.target.files[0];
    const name = e.target.files[0].name;

    setInputName(name);

    const reader = new FileReader();
    const textFile = /text.*/;

    if (!file.type.match(textFile)) return;

    reader.readAsText(file);

    reader.onload = () => {
      const fileRaw = reader.result.toString();
      setRawFile(fileRaw);
    };

    reader.onerror = () => {
      console.log("file error");
    };

  };

  const fileSubmitHandler = async () => {
    await listBatchUpdate(currentUser, rawFile);
    dispatch(fetchListStart(currentUser));
    closeModal(false);
  };

  return (
    <FORM_CONTAINER>

      <FILE_UPLOAD>
        <FILE_UPLOAD_SELECT htmlFor="upload">
          <FILE_SELECT_BUTTON >Choose File</FILE_SELECT_BUTTON>
          <FILE_SELECT_NAME>{inputName}</FILE_SELECT_NAME>
          <input type="file" onChange={inputChangeHandler} id="upload" />
        </FILE_UPLOAD_SELECT>
      </FILE_UPLOAD>

      <Button onClick={fileSubmitHandler}>Update</Button>
    </FORM_CONTAINER>
  );
};

export default BatchUpdateForm;