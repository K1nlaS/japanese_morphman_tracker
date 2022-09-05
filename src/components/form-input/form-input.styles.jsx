import styled from "styled-components";


export const FormInputLabel = styled.label`
  text-align: start;
  margin-bottom: 0.6rem;
`;

export const Input = styled.input`
  border-radius: var(--border-radius);
  height: 4rem;
  outline: none;
  padding: 0 2rem;
  border: none;
  font-size: 1.6rem;
  background-color: var(--default-body-color);
  color: white;
`;

export const Group = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;