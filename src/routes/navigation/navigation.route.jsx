//Misc
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//Firebase
import { signOutUser } from "../../utils/firebase/firebase.utils";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";

//Styled Components
import {
  NavBar,
  NavBarContainer,
  LogoContainer,
  JmtLogo,
  NavLinks,
  SLink,
  AuthLinks,
  AuthLink,
  SButton
} from "./navigation.styles";

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <NavBar>
        <NavBarContainer>

          <LogoContainer>
            <JmtLogo />
          </LogoContainer>

          <NavLinks>
            <SLink to="/">Home</SLink>
          </NavLinks>

          <AuthLinks>
            {
              currentUser ? (
                <SButton onClick={signOutUser}>Sign Out</SButton>
              ) : (
                <>
                  <AuthLink to="/auth/login">Login</AuthLink>
                  <AuthLink to="/auth/signup">Sign Up</AuthLink>
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