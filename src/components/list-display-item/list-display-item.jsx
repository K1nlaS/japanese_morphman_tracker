import React from 'react';

//Styled Components
import {
  ITEM_CONTAINER,
} from "./list-display-item.styles";

const ListDisplayItem = ({ show }) => {

  return (
    <ITEM_CONTAINER>
      <div className="cover">IMG</div>
      <div className="title">{show.title}</div>
      <div className="readability">{show.lineReadability}</div>
      <div className="known-instances">{show.knownInstances}</div>
      <div className="uknown-morphs">{show.uknownMorphs}</div>
      <div className="type">{show.lineReadability}</div>
      <div className="status">{show.status}</div>
    </ITEM_CONTAINER>
  );
};

export default ListDisplayItem;