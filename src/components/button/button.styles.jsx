import styled from "styled-components";

export const DEFAULT_BUTTON = styled.button`
  border: none;
  color: white;
  background-color: var(--primary-button-color);
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 3rem;
  border-radius: var(--border-radius);
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