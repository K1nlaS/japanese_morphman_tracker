import React from 'react';
import { useState } from "react";

//Icons
import { BiDotsHorizontalRounded } from "react-icons/bi";

//Styled Components
import {
  ITEM_CONTAINER,
  ITEM_COVER,
  COVER_IMG,
  ITEM_TITLE,
  ITEM_READABILITY,
  ITEM_KNOWN_INSTANCES,
  ITEM_UKNOWN_MORPHS,
  ITEM_TYPE,
  ITEM_LINK,
  ITEM_EDIT
} from "./list-display-item.styles";

const ListDisplayItem = ({ show }) => {

  const { title, lineReadability, knownInstances, uknownMorphs, type, Media } = show;
  const { coverImage, siteUrl } = Media;

  const [itemHover, setItemHover] = useState(false);

  const itemHoverHandler = () => {
    setItemHover(!itemHover);
  };

  return (
    <ITEM_CONTAINER onMouseEnter={itemHoverHandler} onMouseLeave={itemHoverHandler}>
      <ITEM_COVER >
        {
          itemHover
            ? (<ITEM_EDIT ><BiDotsHorizontalRounded /></ITEM_EDIT>)
            : <COVER_IMG imgUrl={coverImage.medium} />
        }
      </ITEM_COVER>

      <ITEM_TITLE>
        <ITEM_LINK href={siteUrl}>{title}</ITEM_LINK>
      </ITEM_TITLE>

      <ITEM_READABILITY>{lineReadability}%</ITEM_READABILITY>

      <ITEM_KNOWN_INSTANCES>{knownInstances}%</ITEM_KNOWN_INSTANCES>

      <ITEM_UKNOWN_MORPHS>{uknownMorphs}</ITEM_UKNOWN_MORPHS>

      <ITEM_TYPE>{type}</ITEM_TYPE>
    </ITEM_CONTAINER>
  );
};

export default ListDisplayItem;