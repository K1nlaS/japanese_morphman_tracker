//Misc

//Styled Components
import {
  LIST_STATUS_CONTAINER,
  LIST_STATUS_SECTION
} from "./list-status.styles";

const ListStatus = ({ children, status }) => {

  return (
    <LIST_STATUS_CONTAINER>
      <h3>{status}</h3>
      <LIST_STATUS_SECTION>
        {children}
      </LIST_STATUS_SECTION>
    </LIST_STATUS_CONTAINER>
  );
};

export default ListStatus;