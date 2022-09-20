//Misc
import { useState } from "react";

//Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

//Styled Components
import {
  PROFILE_MENU_CONTAINER,
  PROFILE_ICON,
  PROFILE_CONTAINER,
  PROFILE_DROPDOWN_CONTAINER,
  SINGLE_ITEM
} from "./profile-menu.styles";

const ProfileMenu = ({ children }) => {

  const [isDropDown, setIsDropDown] = useState(false);

  const onProfileEnterHandler = () => {
    setIsDropDown(true);
  };

  const onProfileLeaveHandler = () => {
    setIsDropDown(false);
  };

  return (
    <PROFILE_MENU_CONTAINER>

      <PROFILE_CONTAINER onMouseEnter={onProfileEnterHandler} >
        <PROFILE_ICON />
        <MdKeyboardArrowDown />
      </PROFILE_CONTAINER>

      {
        isDropDown && (
          <PROFILE_DROPDOWN_CONTAINER onMouseLeave={onProfileLeaveHandler}>

            <SINGLE_ITEM>
              <IoMdSettings />
              <NavLink to={"/settings"}>Settings</NavLink>
            </SINGLE_ITEM>

            <SINGLE_ITEM>
              <RiLogoutBoxRFill />
              {children}
            </SINGLE_ITEM>

          </PROFILE_DROPDOWN_CONTAINER>
        )
      }


    </PROFILE_MENU_CONTAINER>
  );
};

export default ProfileMenu;