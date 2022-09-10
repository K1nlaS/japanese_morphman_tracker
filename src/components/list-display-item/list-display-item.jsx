import React from 'react';

//Styled Components
import {
  ITEM_CONTAINER,
  ITEM_COVER,
  COVER_IMG,
  ITEM_TITLE,
  ITEM_READABILITY,
  ITEM_KNOWN_INSTANCES,
  ITEM_UKNOWN_MORPHS,
  ITEM_TYPE
} from "./list-display-item.styles";
import { CustomLink } from "../custom-link/custom-link.comp";

const ListDisplayItem = ({ show }) => {

  const { id, title, lineReadability, knownInstances, uknownMorphs, type, Media } = show;
  const { coverImage } = Media;

  return (
    <ITEM_CONTAINER>
      <ITEM_COVER >
        <COVER_IMG imgUrl={coverImage.medium} />
      </ITEM_COVER>

      <ITEM_TITLE>
        <CustomLink to={id}>{title}</CustomLink>
      </ITEM_TITLE>

      <ITEM_READABILITY>{lineReadability}%</ITEM_READABILITY>

      <ITEM_KNOWN_INSTANCES>{knownInstances}%</ITEM_KNOWN_INSTANCES>

      <ITEM_UKNOWN_MORPHS>{uknownMorphs}</ITEM_UKNOWN_MORPHS>

      <ITEM_TYPE>{type}</ITEM_TYPE>
    </ITEM_CONTAINER>
  );
};

export default ListDisplayItem;