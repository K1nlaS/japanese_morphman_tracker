import styled from "styled-components";


export const EDIT_CONTAINER = styled.div`
  width: 100rem;
`;

export const HEADER = styled.div`
  background-image: url('${props => props.bannerImage}');
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 250px #2f3133;
  border-radius: var(--border-radius);
  height: 180px;
`;

export const HEADER_CONTENT = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  padding: 5rem;
  padding-bottom: 0;

  button {
    margin-left: auto;
    margin-bottom: 1.5rem;
  }
`;

export const HEADER_TITLE_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem;
  width: 100%;

  svg {
    font-size: 1.8rem;
    color: white;
  }
`;

export const HEADER_COVER = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100px;
  margin-bottom: -3rem;
  border-radius: 0.3rem;
  background-position: 50%;
  background-size: cover;
  background-image: url('${props => props.coverImg}');
`;

export const HEADER_TITLE = styled.input`
  background: none;
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 0.9rem 1rem;
  
  color: white;
  transition: .3s;
  border-radius: var(--border-radius);

  &:focus {
    box-shadow: inset 0 0 0 100px var(--primary-button-color);
  }

  &::selection { background: var(--primary-white-color); }
`;

export const BODY = styled.div`
  padding: 5rem;
  padding-top: 6rem;
`;

export const FORM_CONTAINER = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 4rem;
`;

export const BODY_FOOTER = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FOOTER_DATES = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-direction: column;
`;
export const FOOTER_DATE = styled.div`
  color: #a1a1a1;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`;