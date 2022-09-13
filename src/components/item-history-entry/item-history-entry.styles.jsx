import styled from "styled-components";

export const ENTRY_CONTAINER = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 1rem;
  transition: .3s;

  &:hover {
    background-color: var(--default-body-color);
  }

  span {
    width: 20px;
  }
`;

export const ENTRY_STAT = styled.input`
  font-size: 1.4rem;
  text-align: center;
  height: 2.4rem;
  width: 80px;

  border: none;
  border-radius: 0.3rem;
  outline: none;
  background-color: transparent;
  color: white;
  cursor: pointer;

  &:focus {
    background-color: var(--primary-button-color);
  }

  &::placeholder {
    color: white;
  }

  &::selection { background: var(--primary-white-color); }
`;

export const ENTRY_INPUT_HOLDER = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const ENTRY_UPDATED = styled.div`
  flex: 1;
  color: white;
`;

export const BUTTON_CONTAINER = styled.div`
  flex: 1;
  
  button {
    margin: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    background-color: #bb7900;
    height: 2.4rem;

    &:hover {
      background-color: #dd9001;
    }
  }
`;