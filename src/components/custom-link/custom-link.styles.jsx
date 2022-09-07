import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const DEFAULT_LINK = styled(NavLink)`
  padding: 1rem 1.2rem;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: .3s;

  &:hover {
    color: white;
  }
`;

export const NAV_BAR_LINK = styled(DEFAULT_LINK)`
  &.active {
    border-bottom: 2px solid var(--primary-button-color);
  }
`;

export const DEFAULT_BUTTON_LINK = styled(DEFAULT_LINK)`
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