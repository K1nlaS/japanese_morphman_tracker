import styled from "styled-components";

export const FORM_CONTAINER = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 4rem;
  padding-top: 6rem;
  width: 60rem;

  button {
    margin: 0;
    background-color: green;

    &:hover {
      background-color: #019401;
    }
  }
`;

export const FILE_UPLOAD = styled.div`
  width: 100%;
`;

export const FILE_SELECT_BUTTON = styled.div`
  background-color: var(--default-hover-background-color);
	padding: 1rem;
	display: inline-block;
`;

export const FILE_SELECT_NAME = styled.div`
  display: inline-block;
	padding: 1rem;
`;

export const FILE_UPLOAD_SELECT = styled.label`
  display: block;
	color: var(--text-color);
	cursor: pointer;
	text-align: left;
	background-color: var(--default-body-color);
	overflow: hidden;
	position: relative;
	border-radius: var(--border-radius);

  input[type="file"] {
    display: none;
  }

  &:hover {
    ${FILE_SELECT_BUTTON} {
      background: #324759;
	    color: #ffffff;
	    transition: all 0.2s ease-in-out;
	    -moz-transition: all 0.2s ease-in-out;
	    -webkit-transition: all 0.2s ease-in-out;
	    -o-transition: all 0.2s ease-in-out;
    }
  }
`;