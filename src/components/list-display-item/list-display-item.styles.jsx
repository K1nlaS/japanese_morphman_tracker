import styled from "styled-components";

export const ITEM_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const ITEM_COVER = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  max-width: 6rem;
  min-height: 4rem;
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
`;

export const ITEM_TYPE = styled.div`
  flex: 1;
  text-align: center;
`;