import styled from "styled-components";

export const SETTINGS_LIST_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
  padding-bottom: 3rem;
  background-color: var(--primary-white-color);
  border-radius: var(--border-radius);
`;

export const SINGLE_SETTING = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SETTING_NAME = styled.div`
  font-size: 1.4rem;
`;