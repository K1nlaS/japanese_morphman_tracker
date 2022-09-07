//Misc

//Styled Components
import {
  GROUP,
  FORM_INPUT_LABEL,
  INPUT
} from "./form-input.styles";

const FormInput = ({ label, id, ...otherProps }) => {
  return (
    <GROUP>
      {label && <FORM_INPUT_LABEL htmlFor={id}>{label}</FORM_INPUT_LABEL>}
      <INPUT {...otherProps} id={id} />
    </GROUP>
  );
};

export default FormInput;