//Misc
import React from 'react';
import { useState } from "react";
import defaultBanner from "../../assets/404_banner.jpg";

//Icons
import { BiDotsHorizontalRounded } from "react-icons/bi";

//Components
import Modal from "../modal/modal.comp";
import EditShowForm from "../edit-show-form/edit-show-form.comp";

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
  ITEM_EDIT,
  HOVER_COVER_PREVIEW
} from "./list-display-item.styles";
import { useEffect } from "react";

const ListDisplayItem = ({ show }) => {

  const { title, lineReadability, knownInstances, uknownMorphs, type, Media = {} } = show;
  const { coverImage = "", siteUrl = "" } = Media;


  const [itemHover, setItemHover] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);

  const editClickHandler = (e) => {
    setIsEditForm(true);
  };

  useEffect(() => {
    setItemHover(false);
  }, [isEditForm]);

  return (
    <>
      <ITEM_CONTAINER onMouseEnter={() => setItemHover(true)} onMouseLeave={() => setItemHover(false)}>

        {
          itemHover && (<HOVER_COVER_PREVIEW coverImage={coverImage ? coverImage.large : defaultBanner} />)
        }

        <ITEM_COVER>
          {
            itemHover
              ? (<ITEM_EDIT onClick={editClickHandler}><BiDotsHorizontalRounded /></ITEM_EDIT>)
              : <COVER_IMG imgUrl={coverImage ? coverImage.medium : defaultBanner} />
          }
        </ITEM_COVER>

        <ITEM_TITLE>
          <ITEM_LINK href={siteUrl}>{title}</ITEM_LINK>
        </ITEM_TITLE>

        <ITEM_READABILITY>{lineReadability}%</ITEM_READABILITY>

        <ITEM_KNOWN_INSTANCES>{knownInstances}%</ITEM_KNOWN_INSTANCES>

        <ITEM_UKNOWN_MORPHS>{uknownMorphs ? uknownMorphs : <span>Empty</span>}</ITEM_UKNOWN_MORPHS>

        <ITEM_TYPE>{type}</ITEM_TYPE>
      </ITEM_CONTAINER>

      {
        isEditForm && (
          <Modal closeModal={setIsEditForm}>
            <EditShowForm show={show} />
          </Modal>
        )
      }
    </>
  );
};

export default ListDisplayItem;