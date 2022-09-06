import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const NavBar = styled.div`
  width: 100%;
  background: var(--primary-white-color);
`;

export const NavBarContainer = styled.div`
  max-width: 1200px;
  height: 75px;
  padding: 0 40px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  width: 50px;
`;

export const JmtLogo = styled.div`
  
`;


export const NavLinks = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SLink = styled(NavLink)`
  
`;

export const AuthLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const AuthLink = styled(NavLink)`
  padding: 1rem 1.2rem;
  white-space: nowrap;

  .login {

  }

  .sign-up {
    
  }
`;

export const SButton = styled.div`
  padding: 1rem 1.2rem;
  white-space: nowrap;
  cursor: pointer;
`;