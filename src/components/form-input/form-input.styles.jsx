import styled from "styled-components";


export const FORM_INPUT_LABEL = styled.div`
  text-align: start;
  font-size: 1.4rem;
  padding: 0 1rem;
  margin-bottom: 0.6rem;
`;

export const INPUT = styled.input`
  border-radius: var(--border-radius);
  height: 4rem;
  outline: none;
  padding: 0 2rem;
  border: none;
  font-size: 1.4rem;
  background-color: var(--default-body-color);
  color: white;
`;

export const GROUP = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;