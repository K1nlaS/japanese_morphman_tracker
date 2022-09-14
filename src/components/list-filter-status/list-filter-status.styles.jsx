import styled from "styled-components";


export const STATUS_FILTER_CONTAINER = styled.div`
  span {
      opacity: 0;
      transition: .3s all;
    }

    &:hover {
      span {
        opacity: 100;
      }
    }
`;

export const FILTER_HEADER = styled.div`
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

export const FILTER_BODY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const NAV_ITEM = styled.div`
  a {
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 1rem;
    border-radius: var(--border-radius);
  }

  .active {
    background-color: var(--primary-white-color);
  }
`;