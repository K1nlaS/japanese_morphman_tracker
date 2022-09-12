//Misc
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import { CONTENT_CONTAINER } from "../../components/styled/styled.components";
import AddShowFormComponent from "../../components/add-show-form/add-show-form.comp";
import ListDisplay from "../../components/list-display/list-display.comp";
import { Button, BUTTON_TYPE_CLASSES } from "../../components/button/button.comp";
import Modal from "../../components/modal/modal.comp";

//Styled Components
import { LIST_CONTAINER } from "./list.styles";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";
import { fetchListAsync } from "../../store/list/list.action";

//Selectors
import { selectList } from "../../store/list/list.selector";



const List = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { list } = useSelector(selectList);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchListAsync(currentUser));
  }, [dispatch, currentUser]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <CONTENT_CONTAINER>
        {currentUser && (
          <LIST_CONTAINER>
            <div>
              <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={toggleModal}>Add</Button>
            </div>


            <ListDisplay list={list} />
          </LIST_CONTAINER>
        )}
      </CONTENT_CONTAINER>

      {
        isModalOpen && (
          <Modal closeModal={setIsModalOpen}>
            <AddShowFormComponent />
          </Modal>
        )
      }
    </>
  );
};

export default List;