//Misc
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//Firebase
import { signOutUser } from "../../utils/firebase/firebase.utils";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";

//Components
import { CustomLink, LINK_TYPE_CLASSES } from "../../components/custom-link/custom-link.comp";
import ProfileMenu from "../../components/profile-menu/profile-menu.comp";

//Styled Components
import {
  NAV_BAR,
  NAV_BAR_CONTAINER,
  JMT_LOGO,
  NAV_LINKS,
  AUTH_LINKS,
} from "./navigation.styles";
import { Button, BUTTON_TYPE_CLASSES } from "../../components/button/button.comp";

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <NAV_BAR>
        <NAV_BAR_CONTAINER>

          <div>
            <JMT_LOGO to="/home/" />
          </div>


          <NAV_LINKS>
            <CustomLink to="/home/" linkType={LINK_TYPE_CLASSES.navBarLink}>Home</CustomLink>
          </NAV_LINKS>

          {
            currentUser ? (
              <ProfileMenu >
                <Button buttonType={BUTTON_TYPE_CLASSES.plain} onClick={signOutUser}>Logout</Button>
              </ProfileMenu>
            ) : (
              <AUTH_LINKS>
                <CustomLink to="/auth/login" linkType={LINK_TYPE_CLASSES.navBarLink}>Login</CustomLink>
                <CustomLink to="/auth/signup" linkType={LINK_TYPE_CLASSES.defaultButtonLink}>Sign Up</CustomLink>
              </AUTH_LINKS>
            )
          }


        </NAV_BAR_CONTAINER>
      </NAV_BAR>

      <Outlet />

    </>
  );
};

export default Navigation;