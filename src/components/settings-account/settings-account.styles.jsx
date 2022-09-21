import styled from "styled-components";

export const SETTINGS_ACCOUNT_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
  padding-bottom: 3rem;
  background-color: var(--primary-white-color);
  border-radius: var(--border-radius);

  button {
    margin-top: 1rem;
  }
`;

export const INPUT_CONTAINER = styled.div`
  

  div {
    margin: 0;
  }
`;

export const PASSWORD_INPUT_GROUP = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  div {
    margin: 0;
  }

  input:placeholder-shown {
    letter-spacing: normal;
  }
`;