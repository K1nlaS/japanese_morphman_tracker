import styled from "styled-components";

export const ITEM_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  transition: .1s;
  border-radius: 0.4rem;

  &:hover {
    background-color: var(--primary-button-color);
    color: white;
    position: relative;

    a {
      color: white;
    }
  }
`;

export const HOVER_COVER_PREVIEW = styled.div`
  content: "";
  background-image: url('${props => props.coverImage}');
  background-size: cover;
  background-position: 50%;
  display: block;
  position: absolute;
  width: 12.6rem;
  height: 18rem;
  border-radius: var(--border-radius);
  left: -14rem;
`;

export const ITEM_COVER = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  max-width: 6rem;
  min-height: 4rem;
`;

export const ITEM_EDIT = styled.div`
  background-color: rgba(var(--color-overlay),.2);
  border-radius: 0.3rem;
  cursor: pointer;
  width: 4rem;
  height: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 3rem;
  }
`;

export const COVER_IMG = styled.div`
  background-image: url('${props => props.imgUrl}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  border-radius: 0.3rem;
  width: 4rem;
  height: 4rem;
`;

export const ITEM_TITLE = styled.div`
  flex: 5;
  padding-left: 2rem;
  text-align: left;


  a {
    padding: 0;
    display: inline;
    white-space: pre-wrap;
  }
`;

export const ITEM_READABILITY = styled.div`
  flex: 1;
  text-align: center;
`;

export const ITEM_KNOWN_INSTANCES = styled.div`
  flex: 1;
  text-align: center;
`;

export const ITEM_UKNOWN_MORPHS = styled.div`
  flex: 1;
  text-align: center;

  span {
    color: #9b9b9b
  }
`;

export const ITEM_TYPE = styled.div`
  flex: 1;
  text-align: center;
`;

export const ITEM_LINK = styled.a`
  padding: 1rem 1.2rem;
  white-space: nowrap;
  transition: .3s;
`;