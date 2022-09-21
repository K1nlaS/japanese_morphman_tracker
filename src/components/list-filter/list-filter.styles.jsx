import styled from "styled-components";

export const FILTER_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FILTER_BUTTONS = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1rem;
  
  button {
    flex: 1;
    margin: 0;
  }

  button:last-child {
    background-color: orange;
    display: flex;
    justify-content: center;
  }
`;