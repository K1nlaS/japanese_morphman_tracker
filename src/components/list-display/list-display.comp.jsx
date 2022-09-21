//Misc


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

const ListDisplay = ({ list }) => {

  //Checks if there are shows with the specified status in the list array
  const statusShowsExist = (list, status) => {
    return list.some(show => show.status.toLowerCase() === status);
  };

  return (
    <LIST_SECTION>
      {
        list.length > 0 ? (statuses.map(status => (

          statusShowsExist(list, status) && (
            <ListStatus key={status} status={status}>
              <ListHead />
              <div>
                {
                  list.map(show => show.status.toLowerCase() === status && <ListDisplayItem show={show} key={show.id} />)
                }
              </div>
            </ListStatus>
          )
        )))
          : <div>No shows</div>
      }
    </LIST_SECTION>
  );
};

export default ListDisplay;