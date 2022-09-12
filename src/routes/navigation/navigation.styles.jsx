import styled from "styled-components";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

export const NAV_BAR = styled.div`
  width: 100%;
  background: var(--primary-white-color);
`;

export const NAV_BAR_CONTAINER = styled.div`
  max-width: 1200px;
  height: 75px;
  padding: 0 40px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const JMT_LOGO = styled(Link)`
  background-image: url("${logo}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius);
`;


export const NAV_LINKS = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: flex-start;
`;

export const AUTH_LINKS = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;