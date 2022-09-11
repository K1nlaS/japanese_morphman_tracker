import styled from "styled-components";

export const MODAL_BACKGROUND = styled.div`
  z-index: 2000;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 40%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const MODAL_CONTAINER = styled.div`
  z-index: 2010;
  margin: 0 auto;
  margin-top: 15vh;
  position: relative;
  max-width: 400px;
  text-align: center;
  padding: 4rem 4rem;
  border-radius: var(--border-radius);
  background-color: var(--primary-white-color);
`;

export const CLOSE_BUTTON = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 1.8rem;
  position: absolute;
  right: 2rem;
  top: 2rem;
  background-color: transparent;
  transition: .3s;
  
  &:hover {
    color: white;
    text-shadow: 0 0 10px white;
  }
`;