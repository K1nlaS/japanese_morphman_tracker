import styled from "styled-components";

export const HISTORY_HEADER = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;

  svg {
    font-size: 2rem;
  }
`;

export const HISTORY_STAT = styled.div`
  flex: 1;
  text-align: center;
`;

export const HISTORY_STATS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 20rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1rem;
    
  }

  &::-webkit-scrollbar-track {
    background-color: var(--default-body-color);
    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 100px var(--primary-button-color);
    border-radius: 0.4rem;
  }

`;