import styled from "styled-components";

export const SETTINGS_NAVIGATION_CONTAINER = styled.div`
  
`;

export const SETTINGS_TITLE = styled.div`
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

export const SETTINGS_LINKS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  a {
    padding: 0.6rem 1rem;
    border-radius: var(--border-radius);
  }

  .active {
    background-color: var(--primary-white-color);
  }
`;