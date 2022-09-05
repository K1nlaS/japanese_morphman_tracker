//Misc
import { Outlet } from "react-router-dom";

//Styled Components
import {
  NavBar,
  NavBarContainer,
  LogoContainer,
  JmtLogo,
  NavLinks,
  SLink,
  AuthLinks,
  AuthLink
} from "./navigation.styles";



const Navigation = () => {


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
            <AuthLink to="/auth/login">Login</AuthLink>
            <AuthLink to="/auth/signup">Sign Up</AuthLink>
          </AuthLinks>

        </NavBarContainer>
      </NavBar>

      <Outlet />

    </>
  );
};

export default Navigation;