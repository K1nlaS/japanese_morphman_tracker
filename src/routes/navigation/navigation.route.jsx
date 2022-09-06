//Misc
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//Firebase
import { signOutUser } from "../../utils/firebase/firebase.utils";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";

//Components
import { CustomLink, LINK_TYPE_CLASSES } from "../../components/custom-link/custom-link.comp";

//Styled Components
import {
  NavBar,
  NavBarContainer,
  JmtLogo,
  NavLinks,
  AuthLinks,
  SButton
} from "./navigation.styles";

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <NavBar>
        <NavBarContainer>

          <div>
            <JmtLogo to="/" />
          </div>


          <NavLinks>
            <CustomLink to="/" linkType={LINK_TYPE_CLASSES.navBarLink}>Home</CustomLink>
          </NavLinks>

          <AuthLinks>
            {
              currentUser ? (
                <SButton onClick={signOutUser}>Sign Out</SButton>
              ) : (
                <>
                  <CustomLink to="/auth/login" linkType={LINK_TYPE_CLASSES.navBarLink}>Login</CustomLink>
                  <CustomLink to="/auth/signup" linkType={LINK_TYPE_CLASSES.defaultButtonLink}>Sign Up</CustomLink>
                </>
              )
            }

          </AuthLinks>

        </NavBarContainer>
      </NavBar>

      <Outlet />

    </>
  );
};

export default Navigation;