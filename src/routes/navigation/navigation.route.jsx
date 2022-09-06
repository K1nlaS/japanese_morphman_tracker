//Misc
import { Outlet } from "react-router-dom";
import { useContext } from "react";

//Firebase
import { signOutUser } from "../../utils/firebase/firebase.utils";

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

//Contexts
import { UserContext } from "../../contexts/user.context";


const Navigation = () => {

  const { currentUser } = useContext(UserContext);

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