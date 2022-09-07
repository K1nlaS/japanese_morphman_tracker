//Misc
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import { ContentContainer } from "../../components/styled/styled.components";
import AddShowFormComponent from "../../components/add-show-form/add-show-form.comp";

//Firebase
import { getCollectionList } from "../../utils/firebase/firebase.utils";

//Redux
import { selectCurrentUser } from "../../store/user/user.selector";
import { setListMap } from "../../store/list/list.action";


const List = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const getListArray = async () => {
      if (user) {
        const list = await getCollectionList(user);
        dispatch(setListMap(list));
      }
    };

    getListArray();

  }, [dispatch, user]);

  return (
    <ContentContainer>
      <AddShowFormComponent />
    </ContentContainer>
  );
};

export default List;