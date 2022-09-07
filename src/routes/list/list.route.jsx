//Misc
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import { CONTENT_CONTAINER } from "../../components/styled/styled.components";
import AddShowFormComponent from "../../components/add-show-form/add-show-form.comp";
import ListPreview from "../../components/list-display/list-preview";
import { Button, BUTTON_TYPE_CLASSES } from "../../components/button/button.comp";
import Modal from "../../components/modal/modal.comp";

//Firebase
import { getCollectionList } from "../../utils/firebase/firebase.utils";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";
import { setListMap } from "../../store/list/list.action";



const List = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchList, setFetchList] = useState(true);

  useEffect(() => {
    const getListArray = async () => {
      if (currentUser) {
        const list = await getCollectionList(currentUser);
        dispatch(setListMap(list));
        console.log("fetchin list", list);
      } else {
        dispatch(setListMap([]));
      }
    };

    getListArray();
    setFetchList(false);

  }, [dispatch, currentUser, fetchList]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <CONTENT_CONTAINER>
      <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={toggleModal}>Add</Button>
      {
        isModalOpen && (
          <Modal closeModal={setIsModalOpen}>
            <AddShowFormComponent fetchList={setFetchList} />
          </Modal>
        )
      }

      <ListPreview />
    </CONTENT_CONTAINER>
  );
};

export default List;