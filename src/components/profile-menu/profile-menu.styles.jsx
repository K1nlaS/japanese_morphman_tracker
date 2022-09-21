import styled from "styled-components";

export const PROFILE_MENU_CONTAINER = styled.div`
  position: relative;
  z-index: 1000;
`;

export const PROFILE_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;

  svg {
    font-size: 2rem;
    transition: .3s;
  }

  &:hover {
    svg {
      color: white;
    }
  }
`;

export const PROFILE_USERNAME = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
`;

export const PROFILE_DROPDOWN_CONTAINER = styled.div`
  position: absolute;
  border-radius: var(--border-radius);
  box-shadow: 0 14px 30rem rgba(0,5,15,.25),0 4px 4px rgba(0,5,15,.25);
  background-color: var(--primary-white-color);
  padding: 2rem 2.6rem;
  top: 5rem;
  left: -4rem;

  font-size: 1.4rem;

`;

export const SINGLE_ITEM = styled.div`
  display: flex;
  padding: 1rem 1.2rem;
  gap: 0.6rem;

  div {
    padding: 0;
  }

  a {
    transition: .3s;
  }

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    a {
      color: white;
    }
  }

  &:last-child {
    color: rgb(232, 93, 117);
  }
`;