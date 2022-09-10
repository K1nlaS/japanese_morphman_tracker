//Misc
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import { CONTENT_CONTAINER } from "../../components/styled/styled.components";
import AddShowFormComponent from "../../components/add-show-form/add-show-form.comp";
import ListDisplay from "../../components/list-display/list-display";
import { Button, BUTTON_TYPE_CLASSES } from "../../components/button/button.comp";
import Modal from "../../components/modal/modal.comp";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";
import { fetchListAsync } from "../../store/list/list.action";



const List = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchListAsync(currentUser));
  }, [dispatch, currentUser]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <CONTENT_CONTAINER>
      <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={toggleModal}>Add</Button>
      {
        isModalOpen && (
          <Modal closeModal={setIsModalOpen}>
            <AddShowFormComponent />
          </Modal>
        )
      }

      <ListDisplay />
    </CONTENT_CONTAINER>
  );
};

export default List;