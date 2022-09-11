//Misc
import { useSelector } from "react-redux";

//Redux
import { selectList } from "../../store/list/list.selector";

//Components
import ListStatus from "../list-status/list-status.comp";
import ListDisplayItem from "../list-display-item/list-display-item";
import ListHead from "../list-display-head/list-display-head.comp";

//Styled Components
import { LIST_SECTION } from "./list-display.styles";

const statuses = [
  "watching",
  "ready",
  "planning",
  "legacy",
  "completed",
];

const ListPreview = ({ list }) => {

  //Checks if there are shows with the specified status in the list array
  const statusShowsExist = (list, status) => {
    return list.some(show => show.status.toLowerCase() === status);
  };

  return (
    <LIST_SECTION>
      {
        statuses.map(status => (

          statusShowsExist(list, status) && (
            <ListStatus status={status}>
              <ListHead />
              <div>
                {
                  list.map(show => show.status.toLowerCase() === status && <ListDisplayItem show={show} key={show.id} />)
                }
              </div>
            </ListStatus>
          )
        ))
      }
    </LIST_SECTION>
  );
};

export default ListPreview;