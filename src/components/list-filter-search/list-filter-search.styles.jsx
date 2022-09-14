import styled from "styled-components";

export const SEARCH_CONTAINER = styled.div`
  position: relative;

  svg {
    position: absolute;
    font-size: 1.8rem;
    left: 0.6rem;
    height: 100%;
  }
`;

export const FILTER_INPUT = styled.input`
  outline: none;
  border: none;
  background-color: var(--primary-white-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  padding-left: 3.6rem;
  max-width: 100%;
  font-size: 1.4rem;
  color: white;

  &::placeholder {
    color: white;
    font-weight: 200;
  }
`;