import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const defaultLink = styled(NavLink)`
  padding: 1rem 1.2rem;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: .3s;

  &:hover {
    color: white;
  }
`;

export const NavBarLink = styled(defaultLink)`
  &.active {
    border-bottom: 2px solid var(--primary-button-color);
  }
`;

export const defaultButtonLink = styled(defaultLink)`
  border: none;
  color: white;
  background-color: var(--primary-button-color);
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: .3s;

  &:hover {
    background-color: var(--button-hover-color);
  }
`;