//Misc
import { NavLink } from "react-router-dom";

//Styled Components
import {
  SETTINGS_NAVIGATION_CONTAINER,
  SETTINGS_TITLE,
  SETTINGS_LINKS,
} from "./settings-navigation.styles";

const SettingsNavigation = () => {
  return (
    <SETTINGS_NAVIGATION_CONTAINER>
      <SETTINGS_TITLE>Settings</SETTINGS_TITLE>

      <SETTINGS_LINKS>
        <NavLink to={"/settings/"}>Account</NavLink>
        <NavLink to={"/settings/lists"}>Lists</NavLink>
      </SETTINGS_LINKS>
    </SETTINGS_NAVIGATION_CONTAINER>
  );
};

export default SettingsNavigation;