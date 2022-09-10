//Misc
import { useSelector } from "react-redux";

//Redux
import { selectList } from "../../store/list/list.selector";

//Components
import ListDisplayItem from "../list-display-item/list-display-item";
import ListHead from "../list-display-head/list-display-head.comp";

//Styled Components
import { LIST_SECTION } from "./list-display.styles";


const ListPreview = () => {

  const { list } = useSelector(selectList);

  return (
    <LIST_SECTION>
      <ListHead />
      <div>
        {
          list.map(show => <ListDisplayItem show={show} key={show.id} />)
        }
      </div>
    </LIST_SECTION>
  );
};

export default ListPreview;