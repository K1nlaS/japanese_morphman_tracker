//Misc
import { useDispatch } from "react-redux";
import { updateListSettingsStart } from "../../store/user/user.action";

//Components
import DropDownSort from "../dropdown-sort/dropdown-sort.comp";
import DropDownTitleLanguage from "../dropdown-title-language/dropdown-title-language.comp";

//Styled Components
import {
  SINGLE_SETTING,
  SETTING_NAME,
  SETTINGS_LIST_CONTAINER
} from "./settings-lists.styles";


const SettingsLists = () => {

  const dispatch = useDispatch();

  const listOrderChangeHandler = (selectedOption) => {
    const toPost = { defaultSort: selectedOption.value };

    dispatch(updateListSettingsStart({ toPost }));
  };

  const titleLanguageChangeHandler = (selectedOption) => {
    const toPost = { titleLanguage: selectedOption.value };

    dispatch(updateListSettingsStart({ toPost }));
  };

  return (

    <SETTINGS_LIST_CONTAINER>

      <SINGLE_SETTING>
        <SETTING_NAME>Title Language</SETTING_NAME>
        <DropDownTitleLanguage onChange={titleLanguageChangeHandler} />
      </SINGLE_SETTING>

      <SINGLE_SETTING>
        <SETTING_NAME>Default List Order</SETTING_NAME>
        <DropDownSort onChange={listOrderChangeHandler} specificStyles={{
          control: (styles) => ({
            ...styles,
            backgroundColor: "var(--default-body-color)",
            border: "none",
            height: "2rem",
            borderRadius: "var(--border-radius)",
            fontSize: "1.4rem",
          }),

          menu: (styles) => ({
            ...styles,
            backgroundColor: "var(--default-body-color)",
            borderRadius: "var(--border-radius)",
          })
        }} />
      </SINGLE_SETTING>


    </SETTINGS_LIST_CONTAINER>
  );
};

export default SettingsLists;