//Misc
import { useSelector } from "react-redux";

//Redux
import { selectList } from "../../store/list/list.selector";

//Components
import ListDisplayItem from "../list-display-item/list-display-item";


const ListPreview = () => {

  const { list } = useSelector(selectList);

  return (
    <div>
      {
        list.map(show => <ListDisplayItem show={show} key={show.id} />)
      }
    </div>
  );
};

export default ListPreview;