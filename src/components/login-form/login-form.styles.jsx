import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
  padding: 4rem 4rem;
  border-radius: var(--border-radius);
  background-color: var(--primary-white-color);
`;

export const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

export const SButton = styled.button`
  border: none;
  color: white;
  background-color: var(--primary-button-color);
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 3rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: 3rem;
  transition: .3s;

  &:hover {
    background-color: var(--button-hover-color);
  }
`;

export const SLink = styled(Link)`
  margin-top: 8rem;

  span {
    color: var(--primary-button-color)
  }
`;