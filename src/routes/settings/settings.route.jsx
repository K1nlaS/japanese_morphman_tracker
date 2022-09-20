//Misc

//Components
import SettingsNavigation from "../../components/settings-navigation/settings-navigation.comp";

//Styled Components
import {
  SETTINGS_CONTAINER,
} from "./settings.styles";
import { CONTENT_CONTAINER } from "../../components/styled/styled.components";
import { Outlet } from "react-router-dom";

const Settings = () => {



  return (
    <CONTENT_CONTAINER>
      <SETTINGS_CONTAINER>

        <SettingsNavigation />

        <Outlet />

      </SETTINGS_CONTAINER>
    </CONTENT_CONTAINER>
  );
};

export default Settings;