//Misc

//Styled Components
import {
  MODAL_CONTAINER,
  MODAL_BACKGROUND,
  CLOSE_BUTTON
} from "./modal.styles";

const Modal = ({ children, closeModal }) => {

  const closeHandle = () => closeModal(false);

  return (
    <MODAL_BACKGROUND>
      <MODAL_CONTAINER>
        < CLOSE_BUTTON onClick={closeHandle}>x</CLOSE_BUTTON>
        {children}
      </MODAL_CONTAINER>
    </MODAL_BACKGROUND>
  );
};

export default Modal;