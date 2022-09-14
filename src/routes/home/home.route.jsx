//Misc
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import { CONTENT_CONTAINER } from "../../components/styled/styled.components";
import AddShowFormComponent from "../../components/add-show-form/add-show-form.comp";
import ListDisplay from "../../components/list-display/list-display.comp";
import Modal from "../../components/modal/modal.comp";
import ListFilter from "../../components/list-filter/list-filter.comp";

//Styled Components
import { LIST_CONTAINER } from "./home.styles";

//Redux
import { fetchListAsync, setSearchString } from "../../store/list/list.action";

//Selectors
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectFilterType, selectList, selectSearchString, } from "../../store/list/list.selector";


function Home() {

  const dispatch = useDispatch();

  const { status } = useParams();

  const currentUser = useSelector(selectCurrentUser);
  const { list } = useSelector(selectList);
  const searchString = useSelector(selectSearchString);
  const filterType = useSelector(selectFilterType);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredList, setFilteredList] = useState(list);

  useEffect(() => {
    dispatch(fetchListAsync(currentUser));
    dispatch(setSearchString(""));
  }, [dispatch, currentUser]);

  useEffect(() => {
    const anilistTitleFilter = (anilistTitles) => {
      return Object.values(anilistTitles).some(title => title.toLowerCase().includes(searchString.toLowerCase()));
    };

    let newFilteredList = list
      .filter(show => {
        return show.title.toLowerCase().includes(searchString.toLowerCase()) || anilistTitleFilter(show.Media.title);
      });

    if (status) {
      newFilteredList = newFilteredList
        .filter(show => show.status === status);
    }

    if (filterType) {
      newFilteredList = newFilteredList
        .filter(show => show.type.toLowerCase() === filterType.value.toLowerCase());
    }

    setFilteredList(newFilteredList);
  }, [searchString, list, status, filterType]);

  return (
    <>
      <CONTENT_CONTAINER>
        {currentUser && (
          <LIST_CONTAINER>
            <ListFilter addShowModalToggle={setIsModalOpen} isModal={isModalOpen} />

            <ListDisplay list={filteredList} />
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
}

export default Home;