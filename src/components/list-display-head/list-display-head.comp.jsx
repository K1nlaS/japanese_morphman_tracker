import React from 'react';

//Styled Components
import {
  ITEM_CONTAINER,
  ITEM_COVER,
  ITEM_TITLE,
  ITEM_READABILITY,
  ITEM_KNOWN_INSTANCES,
  ITEM_UKNOWN_MORPHS,
  ITEM_TYPE
} from "../list-display-item/list-display-item.styles";

const ListHead = () => {
  return (
    <ITEM_CONTAINER>
      <ITEM_COVER ></ITEM_COVER>

      <ITEM_TITLE>Title</ITEM_TITLE>

      <ITEM_READABILITY>Readability</ITEM_READABILITY>

      <ITEM_KNOWN_INSTANCES>Known Instances</ITEM_KNOWN_INSTANCES>

      <ITEM_UKNOWN_MORPHS>Study</ITEM_UKNOWN_MORPHS>

      <ITEM_TYPE>Type</ITEM_TYPE>
    </ITEM_CONTAINER>
  );
};

export default ListHead;