import styled from "styled-components";

export const DEFAULT_BUTTON = styled.button`
  display: block;
  border: none;
  color: white;
  background-color: var(--primary-button-color);
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1rem 3rem;
  border-radius: 1rem;
  cursor: pointer;
  margin-top: 3rem;
  transition: .3s;

  &:hover {
    background-color: var(--button-hover-color);
  }
`;

export const PLAIN_BUTTON = styled.div`
  padding: 1rem 1.2rem;
  white-space: nowrap;
  cursor: pointer;
  transition: .3s;

  &:hover {
    color: white;
  }
`;

export const FORM_DELETE_BUTTOM = styled(DEFAULT_BUTTON)`
  font-weight: 400;
  font-size: 1.2rem;
  border-radius: 0.6rem;
  background-color: var(--default-body-color);

  &:hover {
    background-color: var(--button-hover-color-red);
  }
`;

export const FORM_ACTION_BUTTON = styled(FORM_DELETE_BUTTOM)`
  background-color: var(--primary-button-color);

  &:hover {
    background-color: var(--button-hover-color);
  }
`;